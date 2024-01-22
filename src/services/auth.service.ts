import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import { UserData } from "@/types";


class AuthService {
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
}

export {AuthService}