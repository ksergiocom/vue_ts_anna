<script setup lang="ts">
    import { UserData } from '@/types';
    import { ref, computed } from 'vue';
    import { AuthService } from '@/services/auth.service';
    import { useAlertStore } from '@/stores';

    const props = defineProps<{
        users:UserData[]
        folderName:string
        authorizedUsers:UserData[]
    }>()

    const emits = defineEmits(['updated'])
    
    const select = ref<null|UserData>()
    const isLoading = ref(false)
    const store = useAlertStore()

    const usuariosNoAutorizados = computed(() => {
        // Filtrar usuarios que no están autorizados
        return props.users.filter(user => !props.authorizedUsers.some(authUser => authUser.id === user.id));
    })

    const handleChange = async () => {
        try {
            if(select.value==null || select.value.email == null || select.value.id == null) return false
            isLoading.value = true
            await AuthService.asignarUsuarioACarpeta(props.folderName, select.value.id)
            emits('updated')
            store.setSnackbar({
                color:'green',
                text:`${select.value.email} authorized to ${props.folderName}`
            })
            select.value = null
        } catch (error) {
            store.setSnackbar({
          color:'red',
          text:`Error assigning user to folder`
        })
        } finally {
            isLoading.value = false
        }
    }

    const handleRemoveUser = async (user:UserData) => {
        try {
            isLoading.value = true
            await AuthService.removerUsuarioACarpeta(props.folderName, user.id)
            emits('updated')
            store.setSnackbar({
                color:'green',
                text:`${user.email} removed from authorized`
            })
        } catch (error) {
            store.setSnackbar({
          color:'red',
          text:`Can't remove ${user.email} from authorized`
        })
        } finally {
            isLoading.value = false
        }
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
        <v-form :disabled="isLoading">
            <v-combobox
            variant="outlined"
                :loading="isLoading"
                :disabled="isLoading"
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
        </v-form>
    </div>
</template>



<style scoped>
    .hover:hover{
        background-color: rgb(82, 82, 82);
        border-radius: 100%;
        padding: 0.5rem;
    }

    form{
        max-width: 30%;
        min-width: 300px;
        margin: auto;
    }
</style>