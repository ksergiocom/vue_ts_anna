<script setup lang="ts">
    import {defineProps,withDefaults} from 'vue'

    const props = withDefaults(defineProps<{
        color?:'white'|'black'
    }>(),{
        color:'black'
    })
</script>

<template>
    <span :class="[props.color]"></span>
</template>

<style scoped>
    span{
        display: inline-block;
        height: 2rem;
        width: 2rem;
        opacity: 50%;
        border: 0.35rem solid;
        border-radius: 50%;

        animation: spin linear 1s infinite;
    }
    
    .black{
        border-color: black;
        border-left-color: transparent;
    }

    .white{
        border-color: white;
        border-left-color: transparent;
    }

    @keyframes spin{
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


</style>