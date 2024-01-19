<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {StorageService} from '@/services/storage.service'

    const folders = ref<String[]>([])
   

    onMounted(async ()=>{
        folders.value = await StorageService.getFolders('shared')
    })
</script>

<template>
    <div>
        <h3>Folders page</h3>
        <ul>
            <li v-for="folder in folders">
                <RouterLink :to="`/admin/folders/${folder}`">{{ folder }}</RouterLink>
            </li>
        </ul>
    </div>
</template>