<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { auth } from '@/firebase'
    import {signOut} from 'firebase/auth'
    import { onBeforeMount } from 'vue';
    import {useAlertStore} from '@/stores'


    onBeforeMount(async () => {
        const router = useRouter()
        const store = useAlertStore()

        try {
            await signOut(auth)
        } catch (error) {
            console.log('Ha ocurrido un error en el componente SIGNOUT')
            console.error({error})
        } finally{
            store.setSnackbar({
                color:'green',
                text:'Logged out'
            })
            router.push('/sign-in')
        }
    })

</script>

<template>
    <h1>Login out!</h1>
</template>