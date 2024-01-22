<script setup lang="ts">

import { AuthService } from '@/services/auth.service'
import {ref, onMounted} from 'vue'
import { UserData } from '@/types'

const users = ref<UserData[]>([])

onMounted(async () => {
    users.value = await AuthService.getUsers()
})

</script>

<template>
    <div>
        <h3>Users page</h3>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user }}</li>
        </ul>
    </div>
</template>