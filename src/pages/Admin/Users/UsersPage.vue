b<script setup lang="ts">
import Modal from '@/components/UI/Modal.vue'
import { usersCollection } from '@/firebase'
import { useCollection } from 'vuefire'
import {ref} from 'vue'
import { UserData } from '@/types'

import CreateUser from './Modals/CreateUser.vue'

let showCreateModal = ref(false) 
const users = useCollection<UserData[]>(usersCollection) as any

</script>

<template>
    <div>
        <v-btn class="bg-green mt-5" @click="showCreateModal=true">Create new user</v-btn>
        <v-card class="mt-5">
            <v-data-table density="comfortable" :items="users"></v-data-table>
        </v-card>

        <Modal v-if="showCreateModal" @close="showCreateModal=false">
            <CreateUser @created="showCreateModal=false"/>
        </Modal>
    </div>
</template>