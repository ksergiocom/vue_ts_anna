<script setup lang="ts">
    import {ref} from 'vue'
    import MainLogo from '@/assets/img/main-logo.jpg'
    import { Photo } from '@/types'

    let imgTag = ref<HTMLImageElement>()

    const props = defineProps<{
        photo: Photo;
    }>();



</script>

<template>
    <div>
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
        background-color: rgba(0,0,0,0.05);
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: all 220ms ease-in;
        overflow: hidden;
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


</style> 