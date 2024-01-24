<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhotosService } from '@/services/photos.service'
import Gallery from '@/components/Gallery.vue';
import { auth } from '@/firebase'
import { Photo } from '@/types';
import Spinner from '@/components/UI/Spinner.vue';
import { useAlertStore } from '@/stores'
import { getCurrentUser } from 'vuefire'

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

        // Mostrar las fotos de manera incremental
        for (const blob of blobs) {
            isLoading.value = false
            const orientation = await getOrientation(blob);
            photos.value.push({
                urlPublica: URL.createObjectURL(blob),
                orientacion: orientation
            });
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
  try {
    const user = await getCurrentUser() // Reemplaza con la lógica para obtener el ID del usuario

    const response = await fetch(
      `https://europe-west3-vue-anna-dev.cloudfunctions.net/createZip?userId=${user?.uid}`
    );

    if (!response.ok) {
      throw new Error('Error al obtener el archivo ZIP');
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'shared-photos.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error(error);
  }
};


</script>

<template>
    <main>
        <Spinner v-if="isLoading" :opacity="50"></Spinner>
        <div v-else>
            <p class="text-grey text-h6" v-if="photos.length < 1">No photos shared</p>
            <div v-else >
                <v-btn class="btn" @click="downloadZip" color="green my-2">Download all</v-btn>
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