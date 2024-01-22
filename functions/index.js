const { onObjectFinalized, onObjectDeleted } = require("firebase-functions/v2/storage");
const { onDocumentDeleted } = require('firebase-functions/v2/firestore')
const { getStorage , getDownloadURL} = require("firebase-admin/storage");
const functionsv1 = require('firebase-functions');
const logger = require("firebase-functions/logger");
const path = require('path')
const {FieldValue} = require('firebase-admin/firestore')

const admin = require('firebase-admin')

// Biblioteca para redimensionamiento de imágenes
const sharp = require("sharp");

admin.initializeApp()
const db = admin.firestore()

/**
 * Resize de la imagen, cambiado a Webp y cambiado de nombre. Se borra la original.
 */
exports.resizeImagen = onObjectFinalized({ 
  cpu: 2,
  region: 'europe-west3',
  memory:'1GiB',
}, async (event) => {

  const fileBucket = event.data.bucket; // Bucket de almacenamiento que contiene el archivo.
  const filePath = event.data.name; // Ruta del archivo en el bucket.
  const contentType = event.data.contentType; // Tipo de contenido del archivo.
  const fileName = path.basename(filePath).split('.')[0] // El nombre del archivo sin la extension


  // Salir si esto se activa en un archivo que no es una imagen.
  if (!contentType.startsWith("image/")) {
    return logger.log("Esto no es una imagen.");
  }

  // Aqui las imagenes SHARED
  if(filePath.startsWith('shared/')){
    const bucket = getStorage().bucket(fileBucket);
    const downloadResponse = await bucket.file(filePath).download();
    const imageBuffer = downloadResponse[0];

    const metadata = await sharp(imageBuffer).metadata()

    const folderName = filePath.split('/')[1]

    // Guardar datos en Firestore
    const datosFirestore = {
      nombreOriginal: path.basename(filePath),
      // nombreNuevo: nuevoNombre,
      filePath: filePath,
      ancho: metadata.width, // Coloca el valor real del ancho de la imagen
      alto: metadata.height, // Coloca el valor real del alto de la imagen
      orientacion: metadata.width>metadata.height ? "horizontal":"vertical", // Ajusta según la orientación real de la imagen
      pesoOriginal: imageBuffer.length, // Tamaño en bytes del archivo original
      // pesoNuevo: thumbnailBuffer.length, // Tamaño en bytes de la miniatura
      fechaSubida: FieldValue.serverTimestamp(),
    }
  
    await db.collection('shared').doc(folderName).collection('files').doc(path.basename(filePath)).set(datosFirestore)
    return logger.log('Se ha guardado una imagen para compartir')
  }


  // IMAGENES PUBLIC PHOTOS _____________________________

  // Solo las fotos que van a public tienen que ser redimensinoadas. El resto van RAW tal cual se suben
  if(!filePath.startsWith('public_photos/')){
    return logger.log("Este archivo no es publico por eso se sube RAW")
  }
  if (filePath.includes('rszd_')){
    return logger.log("Esta imagen ya se ha sido tratada.")
  }


  // Descargar el archivo en memoria desde el bucket.
  const bucket = getStorage().bucket(fileBucket);
  const downloadResponse = await bucket.file(filePath).download();
  const imageBuffer = downloadResponse[0];
  logger.log("Imagen descargada!");

  // Generar una miniatura utilizando sharp.
  const nuevoNombre = 'rszd_'+fileName+'.webp'
  const thumbnailBuffer = await sharp(imageBuffer).resize({
    width: 800,
    height: 800,
    fit: 'inside',
    withoutEnlargement: true,
  })
  .webp({quality:85})
  .toBuffer()
  logger.log("Imagen transformada");

  // Generar un nombre aleatorio para la nueva imagen.
  const nuevoFilePath = path.join(path.dirname(filePath), nuevoNombre);

  // Subir la miniatura y eliminar la imagen original.
  const metadata = await sharp(thumbnailBuffer).metadata();

  await bucket.file(nuevoFilePath).save(thumbnailBuffer, { metadata }) // Subir la nueva imagen

  const url = await getDownloadURL(bucket.file(nuevoFilePath))

  // Guardar datos en Firestore
  const datosFirestore = {
    nombreOriginal: path.basename(filePath),
    nombreNuevo: nuevoNombre,
    filePath: nuevoFilePath,
    ancho: metadata.width, // Coloca el valor real del ancho de la imagen
    alto: metadata.height, // Coloca el valor real del alto de la imagen
    orientacion: metadata.width>metadata.height ? "horizontal":"vertical", // Ajusta según la orientación real de la imagen
    pesoOriginal: imageBuffer.length, // Tamaño en bytes del archivo original
    pesoNuevo: thumbnailBuffer.length, // Tamaño en bytes de la miniatura
    fechaSubida: FieldValue.serverTimestamp(),
    borrada: false, // Por defecto, no borrada
    urlPublica: url, // URL para servir en el frontend
  }

  await db.collection('public_photos').add(datosFirestore)

  await bucket.file(filePath).delete(), // Eliminar la imagen original

  logger.log("Nueva imagen subida y antigua eliminada.");
});

exports.deleteImage = onObjectDeleted({ cpu: 2, region: 'europe-west3' },async event => {
  const filePath = event.data.name; // Ruta del archivo en el bucket.

  // PUBLICAS
  if(filePath.startsWith('public_photos/')){
    const qs = await db.collection('public_photos').where("filePath","==",filePath).get()
    
    qs.docs.forEach(doc=>{
      doc.ref.delete()
    })

    return logger.log('Se ha borrado una imagen publica')
  }

  // SHARED
  if(filePath.startsWith('shared/')){
    const folderName = filePath.split('/')[1]

    const qs = await db.collection('shared').doc(folderName).collection('files').where("filePath","==",filePath).get()
    
    qs.docs.forEach(doc=>{
      doc.ref.delete()
    })

    return logger.log('Se ha borrado una imagen compartida')
  }
})


exports.saveUserToFirestore = functionsv1.auth.user().onCreate(async user=>{
  logger.log(user)
  await db.collection('users').doc(user.uid).set({
    email: user.email,
    fechaRegistro: FieldValue.serverTimestamp(), 
    admin: false,
  })
})

exports.deleteUserFromFirestore = functionsv1.auth.user().onDelete(async user=>{
  logger.log(user)
  await db.collection('users').doc(user.uid).delete()
})

exports.sharedFolderDeletedFromFirestore = onDocumentDeleted({
  region: 'europe-west3',
  document: '/shared/{folderName}'
}, async (event)=>{
  const folderName = event.params.folderName


  const bucket = admin.storage().bucket()

  const [files] = await bucket.getFiles({ prefix: `shared/${folderName}/` });

  const deletePromises = files.map(file => file.delete());

  // Esperar a que se completen todas las eliminaciones
  await Promise.all(deletePromises);

  logger.log('Eliminados todos los archivos de ese folder')

})

exports.userDeletedFromFirestore = onDocumentDeleted({
    region: 'europe-west3',
    document: '/users/{userId}'
  }, async event => {
    const userId = event.params.userId

      await admin.auth().deleteUser(userId);

      // Recorrer la colección "shared" y actualizar los documentos
      const sharedCollection = admin.firestore().collection('shared');
      const sharedDocs = await sharedCollection.where('authorizedUsersId', 'array-contains', userId).get();

      const updatePromises = [];

      sharedDocs.forEach((doc) => {
        const authorizedUsersId = doc.data().authorizedUsersId || [];
        const updatedAuthorizedUsersId = authorizedUsersId.filter(uid => uid !== userId);

        // Actualizar el documento en la colección "shared"
        updatePromises.push(doc.ref.update({ authorizedUsersId: updatedAuthorizedUsersId }));
      });

      await Promise.all(updatePromises);

      logger.log({
        sharedCollection,
        sharedDocs,
        updatePromises,
        authorizedUsersId,
        updated
      })

      console.log('Usuario eliminado correctamente y actualizado en la colección "shared".');
      return null;
  }
)