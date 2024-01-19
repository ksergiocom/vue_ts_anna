<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {StorageService} from '@/services/storage.service'
    import { useRoute } from 'vue-router';

    let files = ref<String[]>([])
    const folderName = useRoute().params.folderName as string

    onMounted(async ()=>{
        files.value = await StorageService.getFiles('/shared/'+folderName)
        console.log(folderName)
    })

</script>

<template>
    <div>
        <h3>Folder: {{ folderName }}</h3>
        <ul>
            <li v-for="file in files">{{ file }}</li>
        </ul>
    </div>
</template>