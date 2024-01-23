<script setup lang="ts">
    import {useAlertStore} from '@/stores'
    import { watchEffect, ref} from 'vue';
    
    const store = useAlertStore()
    const isSet = ref(false)
    const type = ref<'info'|'success'|'error'>('info')

    // Tengo que hacerlo asi, si no , se queja vue por el timeout del store.
    watchEffect(()=>{
        if(store.isSet) isSet.value = true
        else isSet.value = false
    })

    watchEffect(()=>{
            switch (store.snackbar.color){
                case 'red':
                    type.value = 'error'
                    break
                case 'green':
                    type.value = 'success'
                    break
                default:
                    type.value = 'info'
                    break
            }
    })

</script>

<template>
    <v-alert :type="type" closable>
        {{store.snackbar.text}}
    </v-alert>
</template>