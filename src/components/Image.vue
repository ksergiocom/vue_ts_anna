<script setup lang="ts">
    import {ref} from 'vue'
    import MainLogo from '@/assets/img/main-logo.jpg'
    import { Photo } from '@/types'

    let imgTag = ref<HTMLImageElement>()

    const props = defineProps<{
        photo: Photo;
    }>();

    const handleClick = () => {
        const url = props.photo.urlPublica // Reemplaza con tu URL
        window.open(url, '_blank');
    }

</script>

<template>
    <div @click="handleClick">
        <img ref="imgTag" class="hidden image" v-lazy="{
            src:props.photo.urlPublica,
            loading:MainLogo,
        }">
    </div>
</template>

<style scoped>
    div{
        display: flex;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        overflow: hidden;
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: opacity 150ms ease-in;
        /* transition: transform 50ms ease-in; */
    }

    .image[lazy="loading"] {
        opacity: 0;
        overflow: hidden;

    }

    .image[lazy="loaded"] {
        height: 100%;
        width: 100%;
        object-fit: cover;
        overflow: hidden;

    }

    .image[lazy="loaded"]:hover{
        /* transform: scale(101%); */
        cursor: pointer;
    }


</style> 