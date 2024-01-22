<script setup lang="ts">
    import { UserData } from '@/types';
    import { ref } from 'vue';
    import { AuthService } from '@/services/auth.service';

    const props = defineProps<{
        users:UserData[]
        folderName:string
        authorizedUsers:UserData[]
    }>()

    const emits = defineEmits(['updated'])
    
    let select = ref<null|UserData>()
    let newAuthorizedUsers = ref<UserData[]>([])

    const handleChange = () => {
        if(select.value == null) newAuthorizedUsers.value = []
        if(select.value){
            newAuthorizedUsers.value.push(select.value)
        }
    }

    const updateAuthorizedUsers = async () => {
        const authorizedUsersId = newAuthorizedUsers.value.map(user=>user.id)
        await AuthService.asignarUsuariosACarpeta(props.folderName, authorizedUsersId)
        emits('updated')
    }

</script>


<template>
    <div>
        <section>
            <h2>Authorized users:</h2>
            <ul>
                <li v-for="user in props.authorizedUsers" :key="user.id">{{ user.email }}</li>
            </ul>
        </section>
        <select v-model="select" name="user" @change="handleChange">
            <option :value="null">-- Clear all --</option>
            <option v-for="user in props.users" :value="user" :key="user.id">{{ user.email }}</option>
        </select>
        <h3>Selected users:</h3>
        <ul>
            <li v-for="user in newAuthorizedUsers" :key="user.id">{{ user.email }}</li>
        </ul>
        <button @click="updateAuthorizedUsers">Confirm</button>
    </div>
</template>