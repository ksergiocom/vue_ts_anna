<script setup lang="ts">
import { ref } from 'vue'
import { StorageService } from '@/services/storage.service'
import { useAlertStore } from '@/stores';

const emit = defineEmits(['created'])
const store = useAlertStore()

const isLoading = ref(false)
const folderName = ref('')
const rules = [
  (value: string) => {
    if (value) return true
    if (value.includes(' ')) return 'Folder name cant have blank spaces.'
    return 'Folder name is required.'
  },
]

const crearFolder = async () => {
  try {
    isLoading.value = true
    const wasCreated = await StorageService.createFolder('shared/' + folderName.value)
    if (!wasCreated) store.setSnackbar({
      color: 'red',
      text: `Folder ${folderName.value} already exists`
    })
    store.setSnackbar({
      color: 'green',
      text: `Folder ${folderName.value} created`
    })
    emit('created')
  } catch (error) {
    store.setSnackbar({
      color: 'red',
      text: `Can't create folder`
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-form :disabled="isLoading" @submit.prevent="crearFolder">
    <v-text-field variant="outlined" v-model="folderName" :rules="rules" label="Folder name"></v-text-field>
    <v-btn class="bg-green mt-3" type="submit" block>Create folder</v-btn>
  </v-form>
</template>

<style scoped>
    form{
        max-width: 30%;
        min-width: 300px;
        margin: auto;
    }
</style>