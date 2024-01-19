<script setup lang="ts">
    import {ref} from 'vue'
    import {auth} from '@/firebase'
    import {signInWithEmailAndPassword} from 'firebase/auth'
    import { useRouter } from 'vue-router'

    let email = ref('sergio@ksergio.com')
    let password = ref('asdasd')

    const router = useRouter()

    const handleSubmit = async () => {
    
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email.value, password.value)
            console.log({userCredentials})
            router.push('/')
        } catch (error:any) {
            alert('Error en SignInPage')
            console.log(error.code)
            console.log(error.message)
        }
    }
    
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <input type="submit" value="Submit">
    </form>
</template>

<style scoped>

</style>