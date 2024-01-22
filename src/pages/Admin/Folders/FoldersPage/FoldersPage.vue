<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {StorageService} from '@/services/storage.service'
    import Modal from '@/components/UI/Modal.vue'
    import CrearFolderModal from './CrearFolderModal.vue';

    const folders = ref<String[]>([])
    const showModal = ref(false)

    const fetchFolders = async () => {
        folders.value = await StorageService.getFolders('shared')
    }

    onMounted(async ()=>{
        await fetchFolders()
    })

    const handleCreatedFolder = async () => {
        showModal.value = false
        await fetchFolders()

    }

</script>

<template>
    <div>
        <h3>Folders page</h3>
        <button @click="showModal=true">Crear folder</button>
        <table>
            <thead>
                <th>Folder name</th>
            </thead>
            <tbody>
                <tr v-for="folder in folders">
                    <td>
                        <RouterLink :to="`/admin/folders/${folder}`">{{ folder }}</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal v-show="showModal" @close="showModal=false">
            <CrearFolderModal @created="handleCreatedFolder"/>
        </Modal>
    </div>
</template>