<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhotosService } from '@/services/photos.service'
import Gallery from '@/components/Gallery.vue';
import { auth } from '@/firebase'
import { Photo } from '@/types';
import Spinner from '@/components/UI/Spinner.vue';
import { useAlertStore } from '@/stores'

const photos = ref<Photo[]>([])
const isLoading = ref(false)
const store = useAlertStore()

async function getOrientation(blob: Blob): Promise<'horizontal' | 'vertical'> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const orientation = img.width > img.height ? 'horizontal' : 'vertical';
            resolve(orientation);
        };
        img.src = URL.createObjectURL(blob);
    });
}

onMounted(async () => {
    isLoading.value = true
    try {
        const uid = auth.currentUser?.uid
        if (!uid) throw Error('No hay usuario logeado')
        const blobs = await PhotosService.getSharedPhotosBlobs(uid)

        const orientationPromises = blobs.map(blob => getOrientation(blob));
        const orientations = await Promise.all(orientationPromises);

        blobs.forEach((blob, index) => {
            photos.value.push({
                urlPublica: URL.createObjectURL(blob),
                orientacion: orientations[index]
            })
        })

    } catch (error) {
        console.log({error})
    store.setSnackbar({
        color: 'red',
        text: "Something went wrong!"
    })
} finally {
    isLoading.value = false
}
})


</script>

<template>
    <main>
        <Spinner v-if="isLoading" :opacity="50"></Spinner>
        <div v-else>
            <p class="text-grey text-h6" v-if="photos.length < 1">No photos shared</p>
            <Gallery v-else :photos="photos" />
        </div>
    </main>
</template>

<style scoped>
main {
    display: grid;
    place-items: center;
    margin: 1rem 1rem 1rem;
    min-height: 50vh;
}
</style>