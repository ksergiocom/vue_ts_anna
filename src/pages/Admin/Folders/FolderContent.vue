<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {AuthService} from '@/services/auth.service'
    import {StorageService} from '@/services/storage.service'
    import { useRoute, useRouter } from 'vue-router';

    const users = ref()
    const files = ref<String[]>([])
    const uploadedFiles = ref<FileList|null>()

    const router = useRouter()
    const folderName = useRoute().params.folderName as string

    onMounted(async ()=>{
        users.value = await AuthService.getUsers()
        files.value = await StorageService.getFiles('/shared/'+folderName)
    })

    const handleDeleteFolder = async () => {
        await StorageService.deleteFolder(`shared/${folderName}`)
        router.push('/admin/folders')
    }

    const handleUploadFiles = async () => {
        if (uploadedFiles.value) {
            await StorageService.uploadFiles(`shared/${folderName}`, uploadedFiles.value)
            // Actualizar la lista de archivos después de cargar nuevos archivos
            files.value = await StorageService.getFiles('/shared/' + folderName)
        }
    }

    const handleFileSelection = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        uploadedFiles.value = input.files;
        await handleUploadFiles()
    }

    const handleDeleteFile = async (fileName: string) => {
        await StorageService.deleteFile(`shared/${folderName}/${fileName}`)
        // Actualizar la lista de archivos después de eliminar un archivo
        files.value = await StorageService.getFiles('/shared/' + folderName)
    }

</script>

<template>
    <div>
        <h3>Folder: {{ folderName }}</h3>
        <button @click="handleDeleteFolder">Delete this folder</button>
        <form @submit.prevent="handleUploadFiles">
            <input type="file" multiple @change="handleFileSelection">
        </form>
        <ul>
            <li v-for="file in files">
                <span>{{ file }}</span>
                <button @click="handleDeleteFile(file as string)">Delete</button>
            </li>
        </ul>
    </div>
</template>