<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { sharedCollection, usersCollection } from '@/firebase'
    import { useCollection} from 'vuefire'
    import Modal from '@/components/UI/Modal.vue'
    import CrearFolderModal from './CrearFolderModal.vue';
    import { UserData, Folder } from '@/types';

    interface FolderWithUser extends Folder {
        authorizedUsers:UserData[]
    }

    const folders = useCollection<Folder>(sharedCollection) as any
    const users = useCollection<UserData>(usersCollection) as any
    const showModal = ref(false)
    
    const foldersWithUsers = computed(():FolderWithUser[]=>{
        const withUsers = folders.value.map((folder:Folder)=>{
            const folderAuthorizedUsers = folder.authorizedUsersId?.map(id=>{
                return users.value.filter((user:UserData)=>user.id==id)[0]
            })

            return {
                id:folder.id,
                authorizedUsersId: folder.authorizedUsersId,
                authorizedUsers: folderAuthorizedUsers,
            }
        })

        return withUsers.sort((folder1:FolderWithUser, folder2: FolderWithUser) => {
            if(folder1.id && folder2.id){
                return folder1.id.toLocaleLowerCase() > folder2.id.toLocaleLowerCase()
            }
        })
    })

</script>

<template>
    <div>
        <v-btn class="bg-green mt-5" @click="showModal=true">Create folder</v-btn>
        <v-card class="mt-5">
            <v-table density="comfortable" class="bg-grey-darken-1" theme="dark" :hover="true">
                <tbody>
                    <tr v-for="folder in foldersWithUsers" :key="folder.id">
                        <td>
                            <RouterLink class="text-white" :to="'/admin/folders/'+folder.id">
                            {{ folder.id }}
                            </RouterLink>
                        </td>
                        <td class="text-right">
                            <v-chip :class="user && user.admin?'bg-red':''" v-for="user in folder.authorizedUsers" :key="user?.id">
                                {{ user?.email }}
                            </v-chip>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <Modal v-show="showModal" @close="showModal=false">
            <CrearFolderModal @created="showModal=false"/>
        </Modal>
    </div>
</template>