import {collection, getDocs, query, limit, doc} from 'firebase/firestore'

import {db} from '@/firebase'
import {Photo} from '@/types'

class PhotosService {
    public static async getPublicPhotos(limitTo:number=24):Promise<Photo[]>{
       
        const q = query(collection(db,'public_photos'),limit(limitTo))

        const querySnapshot = await getDocs(q)
        
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


    public static async getSharedPhotos(id:string):Promise<Photo[]>{
       
        const querySnapshot = await getDocs(collection(doc(collection(db,'shared'),id),'photos'))
        
        const photos:Photo[] = []

        querySnapshot.forEach((doc) => {
            console.log(doc)
            photos.push({
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

        return photos
    }
}

export {PhotosService}