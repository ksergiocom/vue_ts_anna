<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import {PhotosService} from '@/services/photos.service'
    // import Gallery from '@/components/Gallery.vue';
    import {auth} from '@/firebase'

    const photosBlob= ref<Blob[]>([])

    onMounted(async ()=>{
        try {
            const uid = auth.currentUser?.uid
            console.log({uid})
            if(!uid) throw Error('No hay usuario logeado')
            photosBlob.value = await PhotosService.getSharedPhotosBlobs(uid)
            console.log(photosBlob.value)
        } catch (error) {
            console.error({error})
            alert('Ha ocurrido un error en SharedPage')
        }
    })
    
</script>

<template>
    <!-- <Gallery :photos="photos"/> -->
    <p>Testing</p>
</template>