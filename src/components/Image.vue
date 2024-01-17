<script setup lang="ts">
    // import { Photo } from '@/types';
    import {defineProps,ref} from 'vue'

    const props = defineProps<{
        // photo: Photo;
        photo: any
    }>();

    const isLoaded = ref(false)

    const handleImageLoad = () => {
        console.log('Loaded!')
        isLoaded.value = true
    }

</script>

<template>
    <div>
        <div v-show="!isLoaded" class="load-container">Cargando....</div>
        <div class="image-wrapper" v-show="isLoaded">
            <img @load="handleImageLoad" :src="props.photo.url" :alt="'texto-alt'">
        </div>
    </div>
</template>

<style scoped>
    div ,img{
        height: 100%;
        width: 100%;
    }

    img{
        object-fit: cover;
    }

    .load-container{
        background-color: black;
        top: 0;
        left: 0;
        color: white;
    }


</style> 