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
    <!-- <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <input type="submit" value="Submit">
    </form> -->
    <div>
        <v-form class="pa-5 mt-7" @submit.prevent="handleSubmit">
            <v-text-field type="email" label="Email"></v-text-field>
            <v-text-field type="password" label="Password"></v-text-field>
            <v-btn type="submit" @click.prevent="handleSubmit" block class="bg-green">Login</v-btn>
        </v-form>
    </div>
</template>

<style scoped>
    div{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        place-content: center;
    }

    form{
        max-width: 30%;
        min-width: 300px;
        margin: auto;
    }
</style>