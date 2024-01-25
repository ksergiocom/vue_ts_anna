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
        ...doc.data()
      })
    })

    return publicPhotos
  }

  public static async getSharedPhotosDocs(userId: string): Promise<Photo[]> {
    const authorizedFoldersQuery = query(
      collection(db, 'shared'),
      where('authorizedUsersId', 'array-contains', userId)
    );
  
    const authorizedFoldersSnapshot = await getDocs(authorizedFoldersQuery);
    const photos: Photo[] = [];
  
    for (const folderSnapshot of authorizedFoldersSnapshot.docs) {
      const folderId = folderSnapshot.id;
  
      // Obtener la referencia a la colección de archivos dentro de la carpeta actual
      const filesCollectionRef = collection(db, 'shared', folderId, 'files');
  
      // Obtener los documentos dentro de la colección de archivos
      const filesSnapshot = await getDocs(filesCollectionRef);
  
      // Iterar sobre los documentos y agregar la información necesaria a la lista de fotos
      filesSnapshot.forEach((fileDoc) => {
        const fileData = fileDoc.data();
        // Supongamos que cada documento tiene una propiedad 'url' que contiene la URL de la foto

        photos.push({
          id:fileDoc.id,
          ...fileData,
        });
      });
    }
  
    return photos;
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