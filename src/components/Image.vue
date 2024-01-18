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
        background-color: rgba(0, 0, 0, 0.05);
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: all 250ms ease-in-out;
        overflow: hidden;
    }

    .image[lazy="loading"] {
        opacity: 0;
        filter: blur(4px);
    }


</style> 