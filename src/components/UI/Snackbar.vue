<script setup lang="ts">
    import {useAlertStore} from '@/stores'
    import { watchEffect, ref} from 'vue';
    
    const store = useAlertStore()
    const isSet = ref(false)

    const handleClose = () => {
        store.setSnackbar({
            color:'blue',
            text:''
        })
    }

    // Tengo que hacerlo asi, si no , se queja vue por el timeout del store.
    watchEffect(()=>{
        if(store.isSet) isSet.value = true
        else isSet.value = false
    })

</script>

<template>
    <v-snackbar location="left bottom" :color="store.snackbar.color" v-model="isSet">
        {{store.snackbar.text}}

        <template v-slot:actions>
            <v-icon @click="handleClose()" icon="mdi-close"></v-icon>
        </template>
    </v-snackbar>
</template>