<script setup lang="ts">

</script>

<template>
    <main>
        <h2>Admin Panel</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, voluptatibus!</p>
        <nav>
            <ul>
                <li><RouterLink to="/admin/folders">Folders</RouterLink></li>
                <li><RouterLink to="/admin/users">Users</RouterLink></li>
            </ul>
        </nav>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>
    main{
        padding:2rem;
    }

    nav{
        padding:1rem 0;
    }

    nav ul{
        display:flex;
        gap:1rem;
    }
</style>