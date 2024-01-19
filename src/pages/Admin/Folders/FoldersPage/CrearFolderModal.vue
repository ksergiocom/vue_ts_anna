<script setup lang="ts">
    import {ref} from 'vue'
    import {StorageService} from '@/services/storage.service'
    
    const emit = defineEmits(['created'])

    let folderName = ref('')
    
    const crearFolder = async () => {
        StorageService.createFolder('shared/'+folderName.value)
        alert(folderName.value)
        emit('created')
    }
</script>

<template>
    <form @submit.prevent="crearFolder">
        <input type="text" placeholder="Folder name" v-model="folderName">
        <input type="submit" value="Create">
    </form>
</template>