<script setup lang="ts">
    import { ref } from 'vue';
    import { sharedCollection } from '@/firebase'
    import { useCollection} from 'vuefire'
    import Modal from '@/components/UI/Modal.vue'
    import CrearFolderModal from './CrearFolderModal.vue';

    const folders = useCollection(sharedCollection)
    const showModal = ref(false)

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
                        <RouterLink :to="`/admin/folders/${folder.id}`">{{ folder.id }}</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal v-show="showModal" @close="showModal=false">
            <CrearFolderModal @created="showModal=false"/>
        </Modal>
    </div>
</template>