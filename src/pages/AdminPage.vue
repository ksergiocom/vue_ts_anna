<script setup lang="ts">
    import {Photo} from '@/types'
    import {onMounted, ref} from 'vue'

    import {PhotosService} from '@/services/photos.service'
    import {StorageService} from '@/services/storage.service'

    const photos = ref<Photo[]>([])
    const selectedFiles = ref<FileList>()

    onMounted(async ()=>{
        const publicPhotos = await PhotosService.getPhotos()
        photos.value = publicPhotos
    })

    function handleFileChange(event:Event){
        const input = event.target as HTMLInputElement
        if(input.files){
            selectedFiles.value = input.files
        }
    }

    async function uploadFile(){
        if(selectedFiles.value){
            await StorageService.uploadPublicPhoto(selectedFiles.value)
        }
    }

</script>

<template>
    <h1>Admin Page</h1>
    <p>Public photos</p>
    <ul>
        <li v-for="photo in photos" :key="photo.id">{{ photo.urlPublica }}</li>
    </ul>
    <input type="file" multiple @change="handleFileChange" />
    <button @click="uploadFile">Subir Archivo</button>
</template>