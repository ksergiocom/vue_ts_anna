<script setup lang="ts">
    import {ref} from 'vue'
    import {StorageService} from '@/services/storage.service'
    
    const emit = defineEmits(['created'])

    const folderName = ref('')
    const rules = [
    (value:string) => {
          if (value) return true
          if(value.includes(' ')) return 'Folder name cant have blank spaces.'
          return 'Folder name is required.'
        },
    ]
    
    const crearFolder = async () => {
        const wasCreated = await StorageService.createFolder('shared/'+folderName.value)
        if(!wasCreated) return alert('Ya existe!')
        alert('Creada '+folderName.value)
        emit('created')
    }
</script>

<template>
    <v-form @submit.prevent="crearFolder">
      <v-text-field
        v-model="folderName"
        :rules="rules"
        label="Folder name"
      ></v-text-field>
      <v-btn class="bg-green mt-3" type="submit" block>Create folder</v-btn>
    </v-form>
</template>