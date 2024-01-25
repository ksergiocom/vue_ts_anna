<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { PhotosService } from '@/services/photos.service'
import Gallery from '@/components/Gallery.vue';
import { auth } from '@/firebase'
import { Photo } from '@/types';
import { useAlertStore } from '@/stores'
import { getStorage, ref as refStorage, getBlob } from 'firebase/storage'
import JSZip from 'jszip';

const photos = ref<Photo[]>([])
const isLoading = ref(false)
const isDownloading = ref(false)
const downloadedCount = ref(0)
const photosCount = ref(0)
const store = useAlertStore()
const blobsArray = ref<Blob[]>([])

const progress = computed(()=>downloadedCount.value/photosCount.value*100)

onMounted(async () => {
    isLoading.value = true
    try {
        const uid = auth.currentUser?.uid
        if (!uid) throw Error('No hay usuario logeado')
        const photosDocs = await PhotosService.getSharedPhotosDocs(uid)
        
        photosCount.value = photosDocs.length

        const storage = getStorage()
        for(const photo of photosDocs){
            const photoRef = refStorage(storage, photo.filePath)
            const blob = await getBlob(photoRef)
            blobsArray.value.push(blob)
            const url = URL.createObjectURL(blob)
            downloadedCount.value++
            photos.value.push({
                ...photo,
                urlPublica: url
            })
        }
        



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


const downloadZip = async () => {
    isDownloading.value = true;
    try {
        const zip = new JSZip();

        // Agregar blobs al archivo ZIP
        for (let i = 0; i < blobsArray.value.length; i++) {
            const blob = blobsArray.value[i];
            zip.file(photos.value[i].nombreOriginal, blob, { binary: true });
        }

        // Generar archivo ZIP
        const content = await zip.generateAsync({ type: 'blob' });

        // Descargar archivo ZIP
        const url = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'shared-photos.zip');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error(error);
    } finally {
        isDownloading.value = false;
    }
};

</script>

<template>
    <main>
        <div v-if="isLoading" class="d-flex flex-column ga-3 justify-center text-center">
            <v-progress-circular :width="6" class="mx-auto" color="grey" :model-value="progress"></v-progress-circular>
            <p class="text-grey-darken-3">Downloaded: {{ downloadedCount }} / {{ photosCount }}</p>
        </div>
        <div v-else>
            <p class="text-grey text-h6" v-if="photos.length < 1">No photos shared</p>
            <div v-else >
                <v-btn :disabled="isDownloading" :loading="isDownloading" class="btn" @click="downloadZip" color="green my-2">Download all</v-btn>
                <Gallery :photos="photos" />
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: grid;
    place-items: center;
    min-height: 50vh;
}

.btn{
    margin: 1rem;
}

@media (min-width:500px) {
    .btn{
        margin: 1rem 1.3rem; 
    }   
}

@media (min-width:1000px) {
    .btn{
        margin: 1rem 2rem;
    }   
}

</style>