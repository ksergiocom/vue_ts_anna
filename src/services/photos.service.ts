import { collection, getDocs, query, where } from 'firebase/firestore'
import { getStorage, ref, listAll, getBlob } from 'firebase/storage'

import { db } from '@/firebase'
import { Photo } from '@/types'

class PhotosService {
  public static async getPublicPhotos(): Promise<Photo[]> {

    const q = query(collection(db, 'public_photos'))

    const querySnapshot = await getDocs(q)

    const publicPhotos: Photo[] = []

    querySnapshot.forEach((doc) => {
      publicPhotos.push({
        id: doc.id,
        nombreNuevo: doc.data().nombreNuevo,
        nombreOriginal: doc.data().nombreOriginal,
        filePath: doc.data().filePath,
        ancho: doc.data().ancho,
        alto: doc.data().alto,
        orientacion: doc.data().orientacion,
        pesoNuevo: doc.data().pesoNuevo,
        fechaSubida: doc.data().fechaSubida,
        borrada: doc.data().borrada,
        urlPublica: doc.data().urlPublica
      })
    })

    return publicPhotos
  }


  public static async getSharedPhotosBlobs(userId: string): Promise<Blob[]> {
    const authorizedFoldersQuery = query(
      collection(db, 'shared'),
      where('authorizedUsersId', 'array-contains', userId)
    );

    const authorizedFoldersSnapshot = await getDocs(authorizedFoldersQuery);
    const blobs: Blob[] = [];

    // Recorrer las carpetas autorizadas
    for (const folderDoc of authorizedFoldersSnapshot.docs) {
      const folderId = folderDoc.id;

      // Obtener la lista de fotos en la carpeta del storage
      const storage = getStorage();
      const storageRef = ref(storage, `shared/${folderId}/`);
      const photosList = await listAll(storageRef);

      // Descargar cada foto (excluyendo archivos con extensión .gf)
      for (const photoRef of photosList.items) {
        if (!photoRef.name.endsWith('.gf')) {
          const blob = await getBlob(photoRef);
          blobs.push(blob);
        }
      }
    }

    return blobs;
  }

}

export { PhotosService }