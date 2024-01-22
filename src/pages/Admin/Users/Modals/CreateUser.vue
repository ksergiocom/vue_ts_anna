<script setup lang="ts">
    import {AuthService} from '@/services/auth.service'
    import {ref} from 'vue'

    const formData = ref({
        email:'',
        password:'',
    })

    const emit = defineEmits(['created'])

    const handleSubmit = async () => {
        console.log(formData.value)
        const newUser = await AuthService.createNewUser(formData.value)
        console.log({newUser})
        emit('created')
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="formData.email" placeholder="email" type="email">
        <input v-model="formData.password" placeholder="password" type="password">
        <input type="submit">
    </form>
</template>