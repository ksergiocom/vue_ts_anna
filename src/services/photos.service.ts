import { collection, getDocs, query, limit, where } from 'firebase/firestore'
import { getStorage, ref, listAll, getBlob } from 'firebase/storage'

import { db } from '@/firebase'
import { Photo } from '@/types'

class PhotosService {
    public static async getPublicPhotos(limitTo: number = 24): Promise<Photo[]> {

        const q = query(collection(db, 'public_photos'), limit(limitTo))

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
        const blobPromises: Promise<Blob>[] = [];

        // Recorrer las carpetas autorizadas
        authorizedFoldersSnapshot.forEach(async (folderDoc) => {
            const folderId = folderDoc.id;

            // Obtener la lista de fotos en la carpeta del storage
            const storage = getStorage();
            const storageRef = ref(storage, `shared/${folderId}/`);
            const photosList = await listAll(storageRef);

            // Descargar cada foto (excluyendo archivos con extensión .gf)
            for (const photoRef of photosList.items) {
                if (photoRef.name != '.gf') {
                    const blob = getBlob(photoRef);
                    blobPromises.push(blob);
                }
            }
        });

        return Promise.all(blobPromises);
    }

}

export { PhotosService }