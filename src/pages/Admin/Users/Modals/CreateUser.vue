<script setup lang="ts">
    import {AuthService} from '@/services/auth.service'
    import {ref} from 'vue'

    const formData = ref({
        email:'',
        password:'',
    })

    const valid = ref(false)

    const emit = defineEmits(['created'])

    const handleSubmit = async () => {
        console.log(formData.value)
        const newUser = await AuthService.createNewUser(formData.value)
        console.log({newUser})
        emit('created')
    }
</script>

<template>
    <v-form :valid="valid" @submit.prevent="handleSubmit">
        <v-text-field label="Email" v-model="formData.email" type="email"></v-text-field>
        <v-text-field label="Password" v-model="formData.password" type="password"></v-text-field>
        <v-btn type="submit" @click="handleSubmit" block class="bg-green">Create user</v-btn>
    </v-form>
</template>

<style scoped>
    form{
        min-width: 300px;
        padding: 1rem;
    }
</style>