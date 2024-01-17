<script setup lang="ts">
    // import Image from '@/components/Image.vue'
    import {ref, onMounted} from 'vue'
    // import {PhotosService} from '@/services/photos.service'
    // import { Photo } from '@/types';

    // let photos = ref<Photo[]>([])
    let mocks = ref<any[]>([])

    onMounted(async () => {
        // photos.value = await PhotosService.getPhotos()
        
        // const res = await fetch('https://picsum.photos/v2/list')
        // const photos = await res.json()

        for(let i=0;i<30;i++){
            const orientacion = Math.random() > 0.5 ? 'h':'v'
            let clase
            if(orientacion == 'h'){
                clase = Math.random() > 0.5 ? '2h': 'h'
            }else{
                clase = 'v'
            }
            mocks.value.push({
                orientacion,
                clase,
                // url: photos[i].download_url,
                url:''
            })
        }
    })




</script>

<template>
    <section>
        <div :class="['celda',i.clase]" v-for="i in mocks" :key="i">
            <img :src="i.url" alt="a">
        </div>
        <!-- <Image v-for="photo in photos" :key="photo.id" :photo="photo"/> -->
    </section>
</template>

<style scoped>
    section {
        background-color: rgb(172, 151, 128);
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 2)); 

        /* grid-template-columns: repeat(auto-fit, 200px);
        grid-auto-rows: 120px; */
        grid-auto-flow: dense;
        gap: 5px;
        justify-content: center;
    }

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.celda{
    display: flex;
    background-color: black;
    color: white;
    height: 100%;
    width: 100%;
}

.h2{
    grid-column: span 2;
    grid-row: span 2;
}

.v{
    grid-row: span 2;
}

@media (min-width:800px) {
    section{
        grid-template-columns: repeat(3, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 3)); 
    }
}

@media (min-width:1200px) {
    section{
        grid-template-columns: repeat(4, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 3)); 
    }
}

</style>