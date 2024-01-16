<script setup lang="ts">
    import {Photo} from '@/types'
    import {onMounted, ref} from 'vue'
    import {PhotosService} from '@/services/photos.service'

    const photos = ref<Photo[]>([])

    onMounted(async ()=>{
        const publicPhotos = await PhotosService.getPhotos()
        photos.value = publicPhotos
    })

</script>

<template>
    <h1>Admin Page</h1>
    <p>Public photos</p>
    <ul>
        <li v-for="photo in photos" :key="photo.id">{{ photo.name }}</li>
    </ul>
</template>