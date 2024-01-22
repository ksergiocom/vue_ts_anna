import {defineStore} from 'pinia'
import {ref} from 'vue'
import {auth} from '@/firebase'
import {onAuthStateChanged} from 'firebase/auth'

export const useAuthStore = defineStore('auth', ()=>{
    const user = ref()
    const admin = ref(false)

    onAuthStateChanged(auth, async (changedUser) => {
        if(changedUser){
            const token = await changedUser.getIdTokenResult()
            user.value = changedUser.email
            admin.value = token.claims.admin as boolean
          console.log('User signed in!')
        }else{
          user.value = ''
          admin.value = false
        }
      })

    return {user, admin}
})