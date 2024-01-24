<script setup lang="ts">
    import {ref} from 'vue'
    import {useAuthStore} from '@/stores'

    let showMenu = ref(false)
    const store = useAuthStore()

    const toggleShowMenu = (shouldShow:boolean) =>{
        showMenu.value = shouldShow
    }


</script>

<template>
    <div class="btn-container">
        <!-- <img @click="toggleShowMenu(true)" class="menu-btn" :src="MenuSVG"/> -->
        <v-icon color="grey-darken-1" icon="mdi-menu" @click="toggleShowMenu(true)"></v-icon>
        <Transition>
            <div v-show="showMenu" class="menu-body" @click="toggleShowMenu(false)">
                <v-icon color="grey-darken-1" icon="mdi-close close-menu-btn"></v-icon>
                <!-- <img @click="toggleShowMenu(false)" class="close-menu-btn menu-btn" :src="CloseSVG"/> -->
                <ul>
                    <li><RouterLink class="" @click="toggleShowMenu(false)" to="/">Home</RouterLink></li>
                    <li v-if="store.user && store.admin"><RouterLink @click="toggleShowMenu(false)" to="/admin">Admin</RouterLink></li>
                    <li><RouterLink class="" @click="toggleShowMenu(false)" to="/contact">Contact</RouterLink></li>
                    <li v-if="!store.user"><RouterLink class="" @click="toggleShowMenu(false)" to="/sign-in">Sign In</RouterLink></li>
                    <li v-if="store.user"><RouterLink class="" @click="toggleShowMenu(false)" to="/shared">Shared</RouterLink></li>
                    <li v-if="store.user"><RouterLink class="" @click="toggleShowMenu(false)" to="/sign-out">Sign Out</RouterLink></li>
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
        text-decoration: none;
        letter-spacing: 0.1rem;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: rgb(128, 128, 128);
        transition: color 0.1s ease;
    }

    .router-link-active{
        color: rgb(83, 83, 83);
    }

    a:hover{
        color: rgb(83, 83, 83);
    }

    .btn-container{
        display: grid;
        place-content: center;
    }
    
    .menu-btn{
        height: 2rem;
        opacity: 70%;
        cursor: pointer;
    }

    .close-menu-btn{
        position: absolute;
        right: 0;
        top: 0;
        margin: 2rem 1rem;
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