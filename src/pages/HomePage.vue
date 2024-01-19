<script setup lang="ts">
    import Gallery from '@/components/Gallery.vue'
    import { onMounted, ref } from 'vue';
    import { PhotosService } from '@/services/photos.service';
    import { Photo } from '@/types';

    let photos = ref<Photo[]>([])

    onMounted(async ()=>{
        photos.value = await PhotosService.getPublicPhotos()
    })
</script>

<template>
    <main>
        <Gallery :photos="photos"/>
    </main>
</template>


<style scoped>
    @media (min-width: 800px) {
        main{
            width: 60%;
            margin: auto;
        }
    }
</style>