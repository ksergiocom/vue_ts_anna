<script  setup  lang="ts">
    import {withDefaults} from  'vue'
    const  props  =  withDefaults(defineProps<{
        color?:string
        opacity?:number
    }>(),{
        color:'black',
        opacity:100,
    })
</script>

<template>
    <div>
        <span :style="`color:${props.color}; opacity:${props.opacity}%`"></span>
    </div>
</template>


<style  scoped>
    span{
        display: block;
        height: 2rem;
        width: 2rem;
        opacity: 50%;
        border: 0.35rem  solid;
        border-radius: 50%;
        border-left-color: transparent;
        animation: spin linear  1s  infinite;
    }

    @keyframes  spin{
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>