<script setup lang="ts">
    
</script>

<template>
    <nav>
        <h3>Namastephotography</h3>
        <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/admin">Admin</RouterLink></li>
        </ul>
    </nav>
</template>


<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        padding: 1rem;
    }
    
    ul{
        display: flex;
        gap: 1rem;
    }
</style>