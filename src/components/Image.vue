<script setup lang="ts">
    import Spinner from '@/components/UI/Spinner.vue';
    // import { Photo } from '@/types';
    import {ref} from 'vue'

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
    <figure class="image__container">
        <div class="image__container--spinner">
            <Spinner color="white" :opacity="80"></Spinner>
        </div>
        <img class="image__container--img" @load="handleImageLoad" :data-src="props.photo.url">
    </figure>
</template>

<style scoped>
    .image__container{
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: black;
        position: relative;
    }

    .image__container--spinner{
        height: 100%;
        display: grid;
        place-content: center;
    }

    .image__container--img{
        position: absolute;
        top: 0;
        left:0;

        opacity: 80%;
        background-color: red;
        height: 100%;
        width: 100%;
    }


</style> 