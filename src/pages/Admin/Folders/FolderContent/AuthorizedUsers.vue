<script setup lang="ts">
    import { UserData } from '@/types';
    import { ref, computed } from 'vue';
    import { AuthService } from '@/services/auth.service';

    const props = defineProps<{
        users:UserData[]
        folderName:string
        authorizedUsers:UserData[]
    }>()

    const emits = defineEmits(['updated'])
    
    const select = ref<null|UserData>()
    const usuariosNoAutorizados = computed(() => {
        // Filtrar usuarios que no están autorizados
        return props.users.filter(user => !props.authorizedUsers.some(authUser => authUser.id === user.id));
    })

    const handleChange = async () => {
        if(select.value == null) return false
        await AuthService.asignarUsuarioACarpeta(props.folderName, select.value.id)
        emits('updated')
        select.value = null
    }

    const handleRemoveUser = async (user:UserData) => {
        await AuthService.removerUsuarioACarpeta(props.folderName, user.id)
        emits('updated')
    }

</script>


<template>
    <div>
        <v-card >
            <v-list density="compact" class="bg-grey-darken-1">
                <v-list-item v-if="props.authorizedUsers.length<1">
                    <div class="d-flex justify-center text-grey px-5">
                        No users authorized
                    </div>
                </v-list-item>
                <div v-else>
                    <v-list-item v-for="user in props.authorizedUsers" :key="user.id">
                        <div class="d-flex justify-space-between">
                            <span>{{ user.email }}</span>
                            <v-icon class="hover ml-5" icon="mdi-close" @click="handleRemoveUser(user)"></v-icon>
                        </div>
                    </v-list-item>
                </div>
            </v-list>
        </v-card>
        <v-combobox
            class="mt-5"
            label="Add user"
            :items="usuariosNoAutorizados"
            :return-object="true"
            item-title="email"
            v-model="select"
            no-data-text="No users available"
            :hide-no-data="true"
            @update:model-value="handleChange"
        ></v-combobox>
        <!-- <h3>Selected users:</h3>
        <ul>
            <li v-for="user in newAuthorizedUsers" :key="user.id">{{ user.email }}</li>
        </ul> -->
        <!-- <button @click="updateAuthorizedUsers">Confirm</button> -->
    </div>
</template>



<style scoped>
    .hover:hover{
        background-color: rgb(82, 82, 82);
        border-radius: 100%;
        padding: 0.5rem;
    }
</style>