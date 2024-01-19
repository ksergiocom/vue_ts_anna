<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {StorageService} from '@/services/storage.service'

    let folders = ref([])

    onMounted(async ()=>{
        await StorageService.getSharedFolders()
    })
</script>

<template>
    <div>
        <h3>Folders page</h3>
        <ul>
            <li v-for="folder in folders">{{ folder }}</li>
        </ul>
    </div>
</template>