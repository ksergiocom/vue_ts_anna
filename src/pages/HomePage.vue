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
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
            <div id="hero-text" class="d-flex flex-column justify-between h-100 pa-10 text-center">
                <div class="d-flex flex-column my-auto h-full">
                    <h1 class="text-white ">Welcome!</h1>
                    <p class="text-white ">Where every click tells a story.</p>
                </div>
            </div>
        </v-parallax>
        <section id="gallery">
            <Gallery :photos="photos"/>
        </section>
    </main>
</template>


<style scoped>
    article{
        background-color: white;
        border-radius: 5px;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    #hero{
        height: 70vh;
    }

    @media (min-width: 600px) {   

        #gallery{
            width: 80%;
            margin: auto;
        }
        
        #hero-text{
            width: 75%;
            margin: auto;
        }

    }

    @media (min-width: 1200px) {   

        #gallery{
            width: 85%;
            margin: auto;
        }

        #hero-text{
            width: 50%;
            margin: auto;
        }
    }
</style>