<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import {PhotosService} from '@/services/photos.service'
    import Gallery from '@/components/Gallery.vue';
    import {auth} from '@/firebase'
    import { Photo } from '@/types';

    const photos = ref<Photo[]>([])

    onMounted(async ()=>{
        try {
            const uid = auth.currentUser?.uid
            if(!uid) throw Error('No hay usuario logeado')
            const blobs = await PhotosService.getSharedPhotosBlobs(uid)

            blobs.forEach(blob=>{
                photos.value.push({
                    urlPublica: URL.createObjectURL(blob)
                })
            })

        } catch (error) {
            console.error({error})
            alert('Ha ocurrido un error en SharedPage')
        }
    })

    
</script>

<template>
    <Gallery :photos="photos"/>
</template>