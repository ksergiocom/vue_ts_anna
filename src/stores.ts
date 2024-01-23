import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Snackbar } from './types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const admin = ref(false)

  onAuthStateChanged(auth, async (changedUser) => {
    if (changedUser) {
      const token = await changedUser.getIdTokenResult()
      user.value = changedUser.email
      admin.value = token.claims.admin as boolean
      console.log('User signed in!')
    } else {
      user.value = ''
      admin.value = false
    }
  })

  return { user, admin }
})


export const useAlertStore = defineStore('alert', () => {
  const snackbar = ref<Snackbar>({
    color: 'blue',
    text: '',
  })
  const timeout = ref<NodeJS.Timeout>()

  function setSnackbar (data:Snackbar) {
    if(timeout.value) clearTimeout(timeout.value)

    snackbar.value = data

    timeout.value = setTimeout(()=>{
      snackbar.value = {
        color:'blue',
        text:''
      }
    },10000)    
  }

  const isSet = computed(function (){
    if(!snackbar.value) return false
    if(snackbar.value.text)return true
    return false
  })

  return {
    snackbar,
    setSnackbar,
    isSet,
  }
})