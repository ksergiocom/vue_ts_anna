import {collection, getDocs, query, limit} from 'firebase/firestore'

import {db} from '@/firebase'
import {Photo} from '@/types'

class PhotosService {
    public static async getPublicPhotos(limitTo:number=24):Promise<Photo[]>{

        /*
          Es importante que el limit sea un multiplo de 4.
          Los elementos que se colocan en el grid son:
          a=(1,1)
          b=(2,1) , b=2a
          c=(2,2) , c=2b , c=4a

          Si no son multiplos de 4 pueden dejar huecos en el grid.
        */
       
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
}

export {PhotosService}