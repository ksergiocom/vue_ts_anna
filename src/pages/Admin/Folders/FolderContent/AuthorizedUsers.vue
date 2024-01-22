<script setup lang="ts">
    import { UserData } from '@/types';
    import { ref } from 'vue';
    import { AuthService } from '@/services/auth.service';

    const props = defineProps<{
        users:UserData[]
        folderName:string
    }>()

    const emits = defineEmits(['updated'])
    
    let select = ref<null|UserData>()
    let authorizedUsers = ref<UserData[]>([])

    const handleChange = () => {
        if(select.value == null) authorizedUsers.value = []
        if(select.value){
            authorizedUsers.value.push(select.value)
        }
    }

    const updateAuthorizedUsers = async () => {
        const authorizedUsersId = authorizedUsers.value.map(user=>user.id)
        await AuthService.asignarUsuariosACarpeta(props.folderName, authorizedUsersId)
        emits('updated')
    }

</script>


<template>
    <div>
        <select v-model="select" name="user" @change="handleChange">
            <option :value="null">-- Clear all --</option>
            <option v-for="user in props.users" :value="user" :key="user.id">{{ user.email }}</option>
        </select>
        <h3>Authorized Users:</h3>
        <ul>
            <li v-for="user in authorizedUsers" :key="user.id">{{ user.email }}</li>
        </ul>
        <button @click="updateAuthorizedUsers">Confirm</button>
    </div>
</template>