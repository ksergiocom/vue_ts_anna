const { onObjectFinalized, onObjectDeleted } = require("firebase-functions/v2/storage");
const { getStorage , getDownloadURL} = require("firebase-admin/storage");
const { nanoid } = require("nanoid");
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
exports.resizeImagen = onObjectFinalized({ cpu: 2, region: 'europe-west3' }, async (event) => {

  const fileBucket = event.data.bucket; // Bucket de almacenamiento que contiene el archivo.
  const filePath = event.data.name; // Ruta del archivo en el bucket.
  const contentType = event.data.contentType; // Tipo de contenido del archivo.


  // Salir si esto se activa en un archivo que no es una imagen.
  if (!contentType.startsWith("image/")) {
    return logger.log("Esto no es una imagen.");
  }

  if (filePath.includes('rszd_')){
    return logger.log("Esta imagen ya se ha sido tratada.")
  }

  // Solo las fotos que van a public tienen que ser redimensinoadas. El resto van RAW tal cual se suben
  if(!filePath.startsWith('public_photos')){
    return logger.log("Este archivo no es publico por eso se sube RAW")
  }

  // Descargar el archivo en memoria desde el bucket.
  const bucket = getStorage().bucket(fileBucket);
  const downloadResponse = await bucket.file(filePath).download();
  const imageBuffer = downloadResponse[0];
  logger.log("Imagen descargada!");

  // Generar una miniatura utilizando sharp.
  const nuevoNombre = 'rszd_'+nanoid()+'.webp'
  const thumbnailBuffer = await sharp(imageBuffer).resize({
    width: 1920,
    height: 1920,
    fit: 'inside',
    withoutEnlargement: true,
  })
  .webp()
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

  console.log(filePath)

  const qs = await db.collection('public_photos').where("filePath","==",filePath).get()

  qs.docs.forEach(doc=>{
    doc.ref.delete()
  })

})