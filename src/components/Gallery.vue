<script setup lang="ts">
    import Image from '@/components/Image.vue'
    import { Photo } from '@/types'

    const props = defineProps<{
        photos:Photo[]
    }>()

</script>

<template>
    <div class="grid">
        <v-responsive 
            class="max"
            v-for="photo in props.photos"
            :key="photo.id" 
            :aspect-ratio="photo.orientacion=='horizontal'?'16/9':'9/16'"
        >
            <Image  :photo="photo"/>
        </v-responsive>
    </div>
</template>

<style scoped>
    .grid{
        columns: 6 300px;
        gap: 1em;
    }

    .max{
        margin-bottom: 1em;
    }

    .max:nth-child(2n+1){
        opacity: 50%;
    }
</style>
