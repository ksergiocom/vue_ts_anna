<script setup lang="ts">
    import {AuthService} from '@/services/auth.service'
    import {ref} from 'vue'
    import { useAlertStore } from '@/stores';

    const store = useAlertStore()

    const formData = ref({
        email:'',
        password:'',
    })
    const isLoading = ref(false)

    const valid = ref(false)

    const emit = defineEmits(['created'])

    const handleSubmit = async () => {
        try {
            isLoading.value = true
            const newUser = await AuthService.createNewUser(formData.value)
            store.setSnackbar({
          color:'green',
          text:`User ${newUser.user.email} created`
        })
            emit('created')
        } catch (error) {
            store.setSnackbar({
          color:'red',
          text:`Can't create user`
        })
        } finally {
            isLoading.value = false
        }
    }
</script>

<template>
    <v-form :disabled="isLoading" :valid="valid" @submit.prevent="handleSubmit">
        <v-text-field label="Email" v-model="formData.email" type="email"></v-text-field>
        <v-text-field class="mt-5" label="Password" v-model="formData.password" type="password"></v-text-field>
        <v-btn type="submit" @click="handleSubmit" block class="bg-green mt-5">Create user</v-btn>
    </v-form>
</template>

<style scoped>
    form{
        max-width: 30%;
        min-width: 300px;
        margin: auto;
    }
</style>