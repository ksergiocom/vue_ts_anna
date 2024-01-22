<script setup lang="ts">
import Modal from '@/components/UI/Modal.vue'
import { usersCollection } from '@/firebase'
import { useCollection } from 'vuefire'
import {ref} from 'vue'
import { UserData } from '@/types'

import CreateUser from './Modals/CreateUser.vue'

let showCreateModal = ref(false) 
const users = useCollection<UserData[]>(usersCollection)

</script>

<template>
    <div>
        <h3>Users page</h3>
        <button @click="showCreateModal=true">Create new user</button>
        <table>
            <thead>
                <th>Email</th>
                <th>Admin</th>
            </thead>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.email }}</td>
                <td>{{ user.admin }}</td>
            </tr>
        </table>

        <Modal v-if="showCreateModal" @close="showCreateModal=false">
            <CreateUser @created="showCreateModal=false"/>
        </Modal>
    </div>
</template>