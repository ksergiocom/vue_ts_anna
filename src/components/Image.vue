<script setup lang="ts">
    import { Photo } from '@/types';
    import {defineProps} from 'vue'

    const props = defineProps<{
        photo: Photo;
    }>();

</script>

<template>
    <div>
        <img :src="props.photo.urlPublica" :alt="props.photo.nombreNuevo">
    </div>
</template>

<style scoped>
    img{
        object-fit: cover;
    }
</style>