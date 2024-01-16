const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { nanoid } = require("nanoid");
const logger = require("firebase-functions/logger");
const path = require('path')

// Biblioteca para redimensionamiento de imágenes
const sharp = require("sharp");

initializeApp();

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

  // Descargar el archivo en memoria desde el bucket.
  const bucket = getStorage().bucket(fileBucket);
  const downloadResponse = await bucket.file(filePath).download();
  const imageBuffer = downloadResponse[0];
  logger.log("Imagen descargada!");

  // Generar una miniatura utilizando sharp.
  const nuevoNombre = 'rszd_'+nanoid()
  const thumbnailBuffer = await sharp(imageBuffer).resize({
    width: 1920,
    height: 1920,
    fit: 'inside',
    withoutEnlargement: true,
  })
  .toBuffer()
  logger.log("Imagen transformada");

  // Generar un nombre aleatorio para la nueva imagen.
  const nuevoFilePath = path.join(path.dirname(filePath), nuevoNombre);

  // Subir la miniatura y eliminar la imagen original.
  const metadata = { contentType };

  bucket.file(nuevoFilePath).save(thumbnailBuffer, { metadata }), // Subir la nueva imagen
  bucket.file(filePath).delete(), // Eliminar la imagen original

  logger.log("Nueva imagen subida y antigua eliminada.");
});
