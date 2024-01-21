import { getStorage, ref, listAll , uploadString} from "firebase/storage";
import { doc, setDoc, getDoc } from 'firebase/firestore'

import {app, db} from '@/firebase'

const storage = getStorage(app);


class StorageService {
    
    public static async getFolders(path:string){
        const listRef = ref(storage,path)

        const res = await listAll(listRef)
        const folders = res.prefixes.map(folder=>folder.name)
        
        return folders
    }

    public static async getFiles(path:string){
        const listRef = ref(storage,path)

        const res = await listAll(listRef)
        let files = res.items.map(file=>file.name)
        files = files.filter(file=>file!=='.gf')
        
        return files
    }

    public static async createFolder(path:string){
        // Comprobar si no existe una carpeta con ese nombre
        const docSnapshot = await getDoc(doc(db,path))
        if(docSnapshot.exists()) return false

        // Crear la carpeta
        await setDoc(doc(db,path),{
            authorizedUsersId:[]
        })

        // Para crear en el storage una carpeta vacia tiene que contener algo,
        // si no, no aparece en el panel de admin de firebase.
        // Un truco algo feo. El archivi .gf se filtra luego.
        const newFolderRef = ref(storage, path+'/.gf')
        await uploadString(newFolderRef,'Este archivo es un GhostFile para crear una carpeta :)')
        return true
    }


    // public static async uploadPublicPhoto(files:FileList){
    //     const storage = getStorage()

    //     const promises = []

    //     Array.from(files).forEach(file=> {
    //         const originalFileName = file.name
    //         const photoFileRef = ref(storage, 'public_photos/'+originalFileName)
    //         const promise = uploadBytes(photoFileRef, file)
    //         console.log(originalFileName)

    //         promises.push(promise)
    //     })

    //     await Promise.all(files)
    //     console.log('Uploaded successfully!')
    // }

}

export {StorageService}