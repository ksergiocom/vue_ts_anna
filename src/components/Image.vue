<script setup lang="ts">
    import MainLogo from '@/assets/img/main-logo.jpg'
    import { Photo } from '@/types'


    const props = defineProps<{
        photo: Photo;
    }>();

</script>

<template>
    <div>
        <img v-lazy="{
            src:props.photo.urlPublica,
            loading:MainLogo,
        }">
    </div>
</template>

<style scoped>
    div{
        background-color: black;
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

</style> 