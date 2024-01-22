import { db, auth } from "@/firebase";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { getDocs, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { UserData } from "@/types";

import { NewUserData } from '@/types'

class AuthService {
    public static async createNewUser(data:NewUserData){
        const userCredential = await createUserWithEmailAndPassword(auth,data.email,data.password)
        return userCredential
    }


    public static async getUsers(){
        const snapshot = await getDocs(collection(db,'users'))
        const users:UserData[] = []

        snapshot.docs.forEach(doc=>{
            users.push({
                id: doc.id,
                email: doc.data().email,
                fechaRegistro: doc.data().fechaRegistro,
            })
        })
        
        return users
    }

    public static async asignarUsuariosACarpeta(folderId:string, authorizedUsersId:string[]):Promise<boolean>{
        await updateDoc(doc(db,'shared',folderId),{
            authorizedUsersId
        })
        console.log('Se han actualizado los usuarios autorizados')
        return true
    }


    // Esto es una chapuza
    public static async getAuthorizedUsers(folderId:string):Promise<UserData[]>{
        const folder = await getDoc(doc(db,'shared',folderId))

        const users:UserData[] = []

        if(folder.data() && folder.data()?.authorizedUsersId){
            for(const uid of folder.data()?.authorizedUsersId){
                const user = await getDoc(doc(db,'users',uid))
                users.push({
                    id:user.id,
                    email:user.data()?.email,
                    fechaRegistro:user.data()?.fechaRegistro,
                })
            }
        }

        return users
    }
}

export {AuthService}