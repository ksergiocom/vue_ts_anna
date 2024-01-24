<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import {PhotosService} from '@/services/photos.service'
    import Gallery from '@/components/Gallery.vue';
    import {auth} from '@/firebase'
    import { Photo } from '@/types';
    import Spinner from '@/components/UI/Spinner.vue';

    const photos = ref<Photo[]>([])
    const isLoading = ref(false)

    onMounted(async ()=>{
        isLoading.value = true
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
        } finally {
            isLoading.value = false
        }
    })

    
</script>

<template>
    <main>
        <Spinner v-if="isLoading" :opacity="50"></Spinner>
        <div v-else>
            <p class="text-grey text-h6" v-if="photos.length<1">No photos shared</p>
            <Gallery v-else :photos="photos"/>
        </div>
    </main>
</template>

<style scoped>
    main{
        display: grid;
        place-items: center;
        margin: 1rem 1rem 1rem;
        min-height: 50vh;
    }

</style>