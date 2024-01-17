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
        padding: 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 200px);
        grid-auto-flow: dense;
        grid-auto-rows: 120px;
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

/* Esta es la forma fija de colocar el grid */

/* .celda:first-child{
    grid-column: span 2;
    grid-row: span 2;
}

.celda:nth-child(3n){
    grid-row: span 2;
}

.celda:nth-child(4n){
    grid-row: span 2;
    grid-column: span 2;
} */

.h2{
    grid-column: span 2;
    grid-row: span 2;
}

.v{
    grid-row: span 2;
}
</style>