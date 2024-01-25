b<script setup lang="ts">
import Modal from '@/components/UI/Modal.vue'
import { usersCollection } from '@/firebase'
import { useCollection } from 'vuefire'
import {ref} from 'vue'
import { UserData } from '@/types'

import CreateUser from './Modals/CreateUser.vue'

let showCreateModal = ref(false) 
const users = useCollection<UserData[]>(usersCollection) as any // Aqui falta el withConverter para trabajar con TS

</script>

<template>
    <div>
        <!-- <v-btn class="bg-green mt-5" @click="showCreateModal=true">Create new user</v-btn> -->
        <v-card class="mt-5">
            <v-table class="dark bg-grey-darken-1">
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.email }}</td>
                        <td class="text-right">
                            <v-icon v-if="user.admin" icon="mdi-shield-crown"></v-icon>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <Modal v-if="showCreateModal" @close="showCreateModal=false">
            <CreateUser @created="showCreateModal=false"/>
        </Modal>
    </div>
</template>