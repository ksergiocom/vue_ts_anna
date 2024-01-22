import { db, auth } from "@/firebase";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
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

    public static async asignarUsuariosACarpeta(folderId:string, authorizedUsersId:string[]){
        await updateDoc(doc(db,'shared',folderId),{
            authorizedUsersId
        })
        console.log('Se han actualizado los usuarios autorizados')
        return true
    }
}

export {AuthService}