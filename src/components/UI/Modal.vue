<template>
    <div @click.stop="$emit('close')" class="modal-background">
        <div @click.stop="" class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .modal-background{
        position: fixed;
        display: grid;
        place-items: center;
        top:0;
        left:0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 30;
    }

    .modal{
        padding: 1rem;
        background-color: white;
    }

</style>