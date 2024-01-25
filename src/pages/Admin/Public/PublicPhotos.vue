<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {StorageService} from '@/services/storage.service'
    import { useRoute } from 'vue-router';
    import { useAlertStore } from '@/stores';

    import Spinner from '@/components/UI/Spinner.vue';

    const files = ref<any[]>([])
    const uploadedFiles = ref<FileList|null>()
    const isLoading = ref(false)
    const fileInput = ref()
    const store = useAlertStore()

    const folderName = useRoute().params.folderName as string

    onMounted(async ()=>{
        isLoading.value = true
        try {
            files.value = await StorageService.getFiles('/public_photos')
        } catch (error) {
            store.setSnackbar({
                color:'red',
                text:`Error getting files`
            })
        } finally {
            isLoading.value = false
        }
    })

    const selectFiles = async () => {
        if(fileInput.value){
            fileInput.value.click()
        }
    }

    const handleUploadFiles = async () => {
        if (uploadedFiles.value) {
            isLoading.value = true

            try {
                await StorageService.uploadFiles(`public_photos/`, uploadedFiles.value)
                // Actualizar la lista de archivos después de cargar nuevos archivos
                files.value = await StorageService.getFiles('/public_photos')
                store.setSnackbar({
                    color:'green',
                    text:`Files uploaded`
                })
            } catch (error) {
                console.log({error})
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
            
            await StorageService.deleteFile(`/public_photos/${fileName}`)
            // Actualizar la lista de archivos después de eliminar un archivo
            files.value = await StorageService.getFiles('/public_photos')
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

    const openFile = async (fileName:string) => {
        await StorageService.openFile('public_photos/'+fileName)
    }

</script>

<template>
    <div>
        <h3 class="text-h3 mt-7 d-flex">{{ folderName }}</h3>
        <div class="mt-5 d-flex ga-3 flex-wrap">
            <v-btn :disabled="isLoading" class="bg-green" @click="selectFiles">Upload files</v-btn>
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
                            <span class="downloadable" @click="openFile(file)">{{ file }}</span>
                            <v-icon class="hover" icon="mdi-close" @click="handleDeleteFile(file)"></v-icon>
                        </div>
                    </v-list-item>
                </div>
                <div class="text-center text-grey" v-else>
                    <v-list-item>Folder is empty</v-list-item>
                </div>
            </v-list>
        </v-card>
    </div>
</template>

<style scoped>
    *{
        transition: color 0.1s ease-in;
        transition: background-color 0.1s ease-in;
    }

    .hover{
        border-radius: 100%;
        padding: 0.5rem;
    }
    .hover:hover{
        background-color: rgb(82, 82, 82);
    }

    .downloadable:hover{
        cursor: pointer;
        color: rgb(209, 209, 209);
    }

    .hidden{
        display: none;
    }
</style>