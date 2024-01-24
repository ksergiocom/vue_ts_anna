<script setup lang="ts">
    import {useAlertStore} from '@/stores'
    
    const store = useAlertStore()

</script>

<template>
    <div v-if="store.isSet" :class="[`bg-${store.snackbar.color} py-3 px-5 d-flex justify-end`]">
        <span>{{store.snackbar.text}}</span>
        <v-icon @click="store.setSnackbar({text:'',color:'blue'})" class="ml-auto" icon="mdi-close"></v-icon>
    </div>
</template>