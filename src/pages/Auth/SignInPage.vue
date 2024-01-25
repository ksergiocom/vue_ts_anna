<script setup lang="ts">
    import {ref} from 'vue'
    import {auth} from '@/firebase'
    import {sendSignInLinkToEmail} from 'firebase/auth'
    import { useAlertStore } from '@/stores'

    const store = useAlertStore()

    let email = ref('')
    const isLoading = ref(false)
    const linkSent = ref(false)

    const actionCodeSettings = {
        // Aqui la ruta donde tiene que comprobarse el token
        url: 'http://localhost:5173/sign-in/finish',
        handleCodeInApp: true,
    };


    const handleSubmit = async () => {
        isLoading.value = true
        try {
            await sendSignInLinkToEmail(auth, email.value, actionCodeSettings)

            // Se guarda para terminar el login en la pagin sign-in/finish
            window.localStorage.setItem('emailForSignIn', email.value);
            store.setSnackbar({
                color:'green',
                text:'We sent you a mail to loggin!'
            })
            linkSent.value = true
            
        } catch (error:any) {
            store.setSnackbar({
                color:'red',
                text:'Invalid credentials'
            })
        } finally {
            isLoading.value = false
        }
    }
    
</script>

<template>
    <div>
        <v-form :disabled="isLoading" class="pa-5 mt-7" @submit.prevent="handleSubmit">
            <p v-if="linkSent" class="text-grey-darken-2 mb-5"> &#128232; Check your email!</p>
            <v-text-field variant="outlined" v-model="email" type="email" label="Email"></v-text-field>
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