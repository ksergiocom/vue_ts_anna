<script setup lang="ts">
    import MenuSVG from '@/assets/img/menu.svg'
    import CloseSVG from '@/assets/img/close.svg'
    import {ref} from 'vue'

    let showMenu = ref(false)

    const toggleShowMenu = (shouldShow:boolean) =>{
        showMenu.value = shouldShow
    }

</script>

<template>
    <div class="btn-container">
        <img @click="toggleShowMenu(true)" class="menu-btn" :src="MenuSVG"/>
        <Transition>
            <div v-show="showMenu" class="menu-body">
                <img @click="toggleShowMenu(false)" class="close-menu-btn menu-btn" :src="CloseSVG"/>
                <p>Menu Body</p>
                <p>{{ showMenu }}</p>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .btn-container{
        display: grid;
        place-content: center;
    }
    
    .menu-btn{
        height: 1.7rem;
        opacity: 70%;
    }

    .close-menu-btn{
        position: absolute;
        right: 0;
        top: 0;
        margin: 1.7rem 1rem;
        z-index: 10;
    }

    .menu-body{
        display: flex;
        background-color: white;
        position: fixed;
        top:0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }


    .v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
}
</style>