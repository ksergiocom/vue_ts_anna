<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import {PhotosService} from '@/services/photos.service'
    import { Photo } from '@/types';
    import Gallery from '@/components/Gallery.vue';

    const id = useRoute().params.id as string
    const photos = ref<Photo[]>([])
    // const router = useRouter()

    onMounted(async ()=>{
        try {
            photos.value = await PhotosService.getSharedPhotos(id)
            if(photos.value.length<1){
                alert('No se han encontrado fotos. Ver SharedPage')
            }
            
        } catch (error) {
            console.error({error})
            alert('Ha ocurrido un error en SharedPage')
        }
    })
    
</script>

<template>
    <Gallery :photos="photos"/>
</template>