<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { usersCollection } from '@/firebase';
    import { useCollection} from 'vuefire'
    import {AuthService} from '@/services/auth.service'
    import {StorageService} from '@/services/storage.service'
    import { useRoute, useRouter } from 'vue-router';

    import AuthorizedUsers from './AuthorizedUsers.vue';
    import Modal from '@/components/UI/Modal.vue';

    import { UserData } from '@/types';

    const users = useCollection<UserData>(usersCollection) as any
    const files = ref<String[]>([])
    const uploadedFiles = ref<FileList|null>()
    const showAuthorizedUsersModal = ref(false)
    const authorizedUsers = ref<UserData[]>([])

    const router = useRouter()
    const folderName = useRoute().params.folderName as string

    onMounted(async ()=>{
        authorizedUsers.value = await AuthService.getAuthorizedUsers(folderName)
        files.value = await StorageService.getFiles('/shared/'+folderName)
    })

    const handleDeleteFolder = async () => {
        if(!confirm('Are you sure?')) return false
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
        if(!confirm('Are you sure?')) return false
        await StorageService.deleteFile(`shared/${folderName}/${fileName}`)
        // Actualizar la lista de archivos después de eliminar un archivo
        files.value = await StorageService.getFiles('/shared/' + folderName)
    }

    const handleUpdatedAuthorizedUsers = async () => {
        showAuthorizedUsersModal.value = false
        authorizedUsers.value = await AuthService.getAuthorizedUsers(folderName)
        alert('Se han actualizado los usarios autorizados')
    }

</script>

<template>
    <div>
        <h3 class="text-h3 mt-7 d-flex">Folder: {{ folderName }}</h3>
        <div class="mt-5 d-flex ga-3">
            <v-btn class="bg-green" @click="showAuthorizedUsersModal=true">Set users</v-btn>
            <v-btn class="bg-red" @click="handleDeleteFolder">Delete folder</v-btn>
        </div>
        <form class="mt-7" @submit.prevent="handleUploadFiles">
            <input type="file" multiple @change="handleFileSelection">
        </form>
        <ul class="mt-7">
            <li v-for="file in files">
                <span>{{ file }}</span>
                <button class="danger" @click="handleDeleteFile(file as string)">Delete</button>
            </li>
        </ul>
        <Modal v-if="showAuthorizedUsersModal==true" @close="showAuthorizedUsersModal=false">
            <AuthorizedUsers :users="users" :authorizedUsers="authorizedUsers" :folderName="folderName" @updated="handleUpdatedAuthorizedUsers"/>
        </Modal>
    </div>
</template>