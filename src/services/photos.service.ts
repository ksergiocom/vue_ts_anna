import {collection, getDocs} from 'firebase/firestore'

import {db} from '@/firebase'
import { Photo } from '@/types'

class PhotosService {
    public static async getPhotos():Promise<Photo[]>{
        const querySnapshot = await getDocs(collection(db,'public_photos'))
        
        const publicPhotos:Photo[] = []

        querySnapshot.forEach((doc) => {
            publicPhotos.push({
                id:doc.id,
                name:doc.data().name
            })
        })

        return publicPhotos
    }
}

export {PhotosService}