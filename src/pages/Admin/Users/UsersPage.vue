<script setup lang="ts">
import Modal from '@/components/UI/Modal.vue'
import { AuthService } from '@/services/auth.service'
import {ref, onMounted} from 'vue'
import { UserData } from '@/types'

import CreateUser from './Modals/CreateUser.vue'

let showCreateModal = ref(false) 
const users = ref<UserData[]>([])

const getUsers = async () => {
    users.value = await AuthService.getUsers()
    console.log(users.value)
}

const userCreated = async () => {
    showCreateModal.value = false
    await getUsers()
}

onMounted(async () => {
    await getUsers()
})

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
            <CreateUser @created="userCreated" />
        </Modal>
    </div>
</template>