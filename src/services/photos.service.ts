import {collection, getDocs} from 'firebase/firestore'

import {db} from '@/firebase'
import {Photo} from '@/types'

class PhotosService {
    public static async getPhotos():Promise<Photo[]>{
        const querySnapshot = await getDocs(collection(db,'public_photos'))
        
        const publicPhotos:Photo[] = []

        querySnapshot.forEach((doc) => {
            publicPhotos.push({
                id:doc.id,
                nombreNuevo:doc.data().nombreNuevo,
                nombreOriginal:doc.data().nombreOriginal,
                filePath:doc.data().filePath,
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
}

export {PhotosService}