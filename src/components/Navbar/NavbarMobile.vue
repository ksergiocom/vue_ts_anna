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
                <ul>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/">Home</RouterLink></li>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/admin">Admin</RouterLink></li>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/contact">Contact</RouterLink></li>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/sign-in">Sign In</RouterLink></li>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/sign-out">Sign Out</RouterLink></li>
                    <li><RouterLink @click="toggleShowMenu(false)" to="/shared">Shared</RouterLink></li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    ul {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    a{
        opacity: 50%;
        color: black;
        text-decoration: none;
        letter-spacing: 0.1rem;
        font-size: 1.5rem;
        text-transform: uppercase;
    }

    .btn-container{
        display: grid;
        place-content: center;
    }
    
    .menu-btn{
        height: 1.7rem;
        opacity: 70%;
        cursor: pointer;
    }

    .close-menu-btn{
        position: absolute;
        right: 0;
        top: 0;
        margin: 1.7rem 1rem;
        z-index: 10;
        cursor: pointer;
    }

    .menu-body{
        background-color: white;
        position: fixed;
        top:0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }

    .v-enter-active,
    .v-leave-active {
    transition: all 0.22s ease-in-out;
    }

    .v-enter-from,
    .v-leave-to {
    transform: translateX(-100%);
    }
</style>