<script setup lang="ts">
    import {ref} from 'vue'
    import {auth} from '@/firebase'
    import {signInWithEmailAndPassword} from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { useAlertStore } from '@/stores'

    let email = ref('')
    let password = ref('')
    const store = useAlertStore()
    const isLoading = ref(false)

    const router = useRouter()

    const handleSubmit = async () => {
        isLoading.value = true
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email.value, password.value)
            store.setSnackbar({
                color:'green',
                text:'Loged in as '+userCredentials.user.email
            })
            const token = await userCredentials.user.getIdTokenResult()
            if(token.claims.admin){
                router.push('/admin')
            }else{
                router.push('/shared')
            }
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
            <v-text-field variant="outlined" v-model="email" type="email" label="Email"></v-text-field>
            <v-text-field variant="outlined" v-model="password" type="password" label="Password"></v-text-field>
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