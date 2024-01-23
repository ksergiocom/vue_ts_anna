<script setup lang="ts">
    import mainLogo from "@/assets/img/main-logo.jpg";
    import NavbarMobile from "./NavbarMobile.vue";
    import Snackbar from "../UI/Snackbar.vue";
</script>

<template>
    <div class="sticky">
        <nav>
            <h3>
                <RouterLink to="/"><img id="main-logo" :src="mainLogo" alt="main-logo"></RouterLink>
            </h3>
            <NavbarMobile/>
        </nav>
        <Snackbar/>
    </div>
</template>


<style scoped>
    .sticky{
        position: sticky;
        top: 0;
        z-index: 10;
    }

    nav{
        display: flex;
        background-color: white;
        justify-content: space-between;
        padding: 1rem 1.3rem;
    }
    
    ul{
        display: flex;
        gap: 1rem;
    }
    
    #main-logo{
        height: 3rem;
    }

</style>