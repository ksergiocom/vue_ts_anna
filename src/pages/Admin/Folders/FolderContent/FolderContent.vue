<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { usersCollection } from '@/firebase';
    import { useCollection} from 'vuefire'
    import {AuthService} from '@/services/auth.service'
    import {StorageService} from '@/services/storage.service'
    import { useRoute, useRouter } from 'vue-router';
    import { useAlertStore } from '@/stores';

    import AuthorizedUsers from './AuthorizedUsers.vue';
    import Modal from '@/components/UI/Modal.vue';
    import Spinner from '@/components/UI/Spinner.vue';

    import { UserData, Photo } from '@/types';

    const users = useCollection<UserData>(usersCollection) as any
    const files = ref<any[]>([])
    const uploadedFiles = ref<FileList|null>()
    const showAuthorizedUsersModal = ref(false)
    const authorizedUsers = ref<UserData[]>([])
    const isLoading = ref(false)
    const fileInput = ref()
    const store = useAlertStore()

    const router = useRouter()
    const folderName = useRoute().params.folderName as string

    onMounted(async ()=>{
        isLoading.value = true
        try {
            authorizedUsers.value = await AuthService.getAuthorizedUsers(folderName)
            files.value = await StorageService.getFiles('/shared/'+folderName)
        } catch (error) {
            store.setSnackbar({
                color:'red',
                text:`Error getting files`
            })
        } finally {
            isLoading.value = false
        }
    })

    const handleDeleteFolder = async () => {
        if(!confirm('Are you sure?')) return false
        try {
            await StorageService.deleteFolder(`shared/${folderName}`)
            router.push('/admin/folders')
        } catch (error) {
            store.setSnackbar({
            color:'red',
            text:`Error deleting folder`
            })
        }
    }

    const selectFiles = async () => {
        if(fileInput.value){
            fileInput.value.click()
        }
    }

    const handleUploadFiles = async () => {
        if (uploadedFiles.value) {
            isLoading.value = true

            try {
                await StorageService.uploadFiles(`shared/${folderName}`, uploadedFiles.value)
                // Actualizar la lista de archivos después de cargar nuevos archivos
                files.value = await StorageService.getFiles('/shared/' + folderName)
                store.setSnackbar({
                    color:'green',
                    text:`Files uploaded`
                })
            } catch (error) {
                store.setSnackbar({
                    color:'red',
                    text:`Error uploading files`
                    })
            } finally {
                isLoading.value = false
            }
        }
    }

    const handleFileSelection = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        uploadedFiles.value = input.files;
        await handleUploadFiles()
    }

    const handleDeleteFile = async (fileName: string) => {
        if(!confirm('Are you sure?')) return false
        isLoading.value = true
        try {
            
            await StorageService.deleteFile(`shared/${folderName}/${fileName}`)
            // Actualizar la lista de archivos después de eliminar un archivo
            files.value = await StorageService.getFiles('/shared/' + folderName)
            store.setSnackbar({
                color:'green',
                text:`File ${fileName} deleted`
            })
        } catch (error) {
            store.setSnackbar({
          color:'red',
          text:`Can't delete the file ${fileName}`
        })
        } finally {
            isLoading.value = false
        }
    }

    const handleUpdatedAuthorizedUsers = async () => {
        authorizedUsers.value = await AuthService.getAuthorizedUsers(folderName)
    }

    const openFile = async (fileName:string) => {
        await StorageService.openFile('shared/'+folderName+'/'+fileName)
    }

</script>

<template>
    <div>
        <h3 class="text-h3 mt-7 d-flex">Folder: {{ folderName }}</h3>
        <div class="mt-5 d-flex ga-3 flex-wrap">
            <v-btn :disabled="isLoading" class="bg-green" @click="selectFiles">Upload files</v-btn>
            <v-btn class="bg-grey-darken-1" @click="showAuthorizedUsersModal=true">Set users</v-btn>
            <v-btn class="bg-red" @click="handleDeleteFolder">Delete folder</v-btn>
        </div>
        <form>
            <input ref="fileInput" class="hidden" type="file" multiple @change="handleFileSelection" accept="image/*">
        </form>
        <v-card class="mt-7 bg-grey-darken-2">
            <div v-if="isLoading" class="justify-center d-flex">
                <Spinner class="pa-5 mx-auto" color="white" :opacity="50" ></Spinner>
            </div>
            <v-list v-else="isLoading" class="bg-grey-darken-2">
                <div v-if="files.length>0">
                    <v-list-item  v-for="file in files" :key="file.id">
                        <div class="d-flex justify-space-between">
                            <span @click="openFile(file)">{{ file }}</span>
                            <v-icon class="hover" icon="mdi-close" @click="handleDeleteFile(file)"></v-icon>
                        </div>
                    </v-list-item>
                </div>
                <div class="text-center text-grey" v-else>
                    <v-list-item>Folder is empty</v-list-item>
                </div>
            </v-list>
        </v-card>
        <Modal v-if="showAuthorizedUsersModal==true" @close="showAuthorizedUsersModal=false">
            <AuthorizedUsers :users="users" :authorizedUsers="authorizedUsers" :folderName="folderName" @updated="handleUpdatedAuthorizedUsers"/>
        </Modal>
    </div>
</template>

<style scoped>
    .hover:hover{
        background-color: rgb(82, 82, 82);
        border-radius: 100%;
        padding: 0.5rem;
    }

    .hidden{
        display: none;
    }
</style>