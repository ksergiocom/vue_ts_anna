<script setup lang="ts">
import { auth } from '@/firebase'
import { onMounted } from 'vue';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores'
import Spinner from '@/components/UI/Spinner.vue'

const alertStore = useAlertStore()
const router = useRouter()

onMounted(async () => {
    try{

        const ensureLink = isSignInWithEmailLink(auth, window.location.href)

        // Link invalido!
        if (!ensureLink) {
            // Alerta aviso link invalido
            alertStore.setSnackbar({
                color: 'red',
                text: 'Something went wrong! The link is invalid.'
            })

            // Redirigir
            return router.push('/sign-in')
        }

        // Se guarda en la pagina de login en localstorage.
        const email = window.localStorage.getItem('emailForSignIn')

        if (!email) {
            // Alerta aviso local storage no presente
            alertStore.setSnackbar({
                color: 'red',
                text: 'Something went wrong! Try again.'
            })

            // Redirigir
            return router.push('/sign-in')
        }

        // Aqui se hace el login
        const userCredentials = await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')

        alertStore.setSnackbar({
            color: 'green',
            text: 'Loged in as ' + userCredentials.user.email
        })
        const token = await userCredentials.user.getIdTokenResult()
        if (token.claims.admin) {
            return router.push('/admin')
        }
            
        return router.push('/shared')

    } catch(err){
        return router.push('/sign-in')
    }
})
</script>

<template>
    <main>
        <div class="loading">
            <div>
                <Spinner :opacity="50"/>
                <p class="text-grey-darken-2 mt-5">Wait while you are being logged in</p>
            </div>
        </div>
    </main>
</template>


<style scoped>
    .loading{
        padding: 5rem;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-50%);
        transform: translateY(-50%);
    }
</style>