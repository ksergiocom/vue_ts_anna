import { getStorage, ref, listAll , uploadString, deleteObject, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'

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
        // Validar que el nombre de la carpeta no contenga espacios en blanco
        if (/\s/.test(path)) {
            console.error("El nombre de la carpeta no puede contener espacios en blanco.");
            return false;
        }

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

    public static async deleteFolder(path:string){
        // Eliminar la carpeta en Firestore
        await deleteDoc(doc(db, path));

        // Eliminar todos los archivos en Storage dentro de la carpeta
        const storageRef = ref(storage, path);
        const filesInFolder = await listAll(storageRef);

        // Eliminar cada archivo en la carpeta
        const deleteFilePromises = filesInFolder.items.map(async (fileRef) => {
            await deleteObject(fileRef);
        });

        // Esperar a que se completen todas las eliminaciones de archivos
        await Promise.all(deleteFilePromises);

        console.log(`Carpeta ${path} y sus archivos eliminados exitosamente.`);
        return true;
    }


    public static async uploadFiles(folderPath: string, files: FileList) {
        // Verificar si la carpeta existe en Firestore
        const docSnapshot = await getDoc(doc(db, folderPath));
        if (!docSnapshot.exists()) {
            console.error(`La carpeta ${folderPath} no existe.`);
            return false;
        }

        // Subir cada archivo al folder en Storage
        const uploadFilePromises = Array.from(files).map(async (file) => {
            const fileName = file.name;
            const filePath = `${folderPath}/${fileName}`;
            const fileRef = ref(storage, filePath);

            try {
                await uploadBytes(fileRef, file);
                console.log(`Archivo ${fileName} subido exitosamente a ${folderPath}`);
            } catch (error) {
                console.error(`Error al subir el archivo ${fileName}:`, error);
            }
        });

        // Esperar a que se completen todas las subidas de archivos
        await Promise.all(uploadFilePromises);

        return true;
    }

    public static async deleteFile(filePath: string): Promise<boolean> {
        console.log({filePath})

        // Eliminar el archivo en Storage con las Cloud Funcions se borra automaticamente en firestore.
        const storageRef = ref(getStorage(), filePath);
        await deleteObject(storageRef);

        console.log(`Archivo ${filePath} eliminado exitosamente.`);
        return true;
    }

    // Funcion para setear unos usuarios autorizados en Firestore
    // Estos se utiliza con las rules del storage para el acceso
    public static async setAuthorizedUsers(sharedFolderName:string, usersIds: string[]): Promise<boolean> {
        await updateDoc(doc(db, `shared/${sharedFolderName}`), {
            authorizedUserId:usersIds
        })
        console.log('Se han actualiazado los usarios autorizados')
        return true
    }

}

export {StorageService}