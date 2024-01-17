<script setup lang="ts">
    import mainLogo from "@/assets/img/main-logo.jpg";
    import NavbarMobile from "./NavbarMobile.vue";
</script>

<template>
    <nav>
        <h3>
            <img id="main-logo" :src="mainLogo" alt="main-logo">
        </h3>
        <NavbarMobile/>
    </nav>
</template>


<style scoped>
    nav{
        display: flex;
        position: sticky;
        top: 0;
        background-color: white;
        justify-content: space-between;
        padding: 1rem 1.3rem;
        z-index: 10;
    }
    
    ul{
        display: flex;
        gap: 1rem;
    }
    
    #main-logo{
        height: 3rem;
    }

</style>