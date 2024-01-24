<script setup lang="ts">
    import {useAlertStore} from '@/stores'
    
    const store = useAlertStore()

</script>

<template>
    <Transition>
        <div v-if="store.isSet" :class="[`bg-${store.snackbar.color} py-3 px-5 d-flex justify-end`]">
            <span>{{store.snackbar.text}}</span>
            <v-icon @click="store.setSnackbar({text:'',color:'blue'})" class="ml-auto" icon="mdi-close"></v-icon>
        </div>
    </Transition>
</template>

<style scoped>
div{
    position: relative;
    z-index: 1;
    margin-bottom: 1rem;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.15s ease-in;
    transform: translateY(0);
    
}

.v-enter-from,
.v-leave-to {
    /* opacity: 0; */
    transform: translateY(-100%);
}
</style>