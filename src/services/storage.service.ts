import { getStorage, ref, uploadBytes } from "firebase/storage";

class StorageService {
    public static async uploadPublicPhoto(files:FileList){
        const storage = getStorage()

        const promises = []

        Array.from(files).forEach(file=> {
            const originalFileName = file.name
            const photoFileRef = ref(storage, 'public_photos/'+originalFileName)
            const promise = uploadBytes(photoFileRef, file)
            console.log(originalFileName)

            promises.push(promise)
        })

        await Promise.all(files)
        console.log('Uploaded successfully!')
    }
}

export {StorageService}