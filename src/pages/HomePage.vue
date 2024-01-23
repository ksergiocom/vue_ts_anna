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
        <v-parallax
        id="hero"
        class="mb-10"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 class="text-h4 font-weight-thin mb-4">
                Vue, Firebase y TS
            </h1>
            <p class="text-center w-1/2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia nihil quo error est dolores qui, tempore ratione esse voluptatem sequi, laborum incidunt ea quaerat vero cupiditate doloremque. Est, officia.
            </p>
            </div>
        </v-parallax>
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

    #hero{
        height: 100vh;
    }
</style>