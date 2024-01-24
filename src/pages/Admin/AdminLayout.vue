<script setup lang="ts">

</script>

<template>
    <main class="pa-5">
        <v-btn-toggle density="compact">
            <v-btn :class="['bg-grey-darken-1',$route.path.includes('/admin/folders')?'':'text-grey']" to="/admin/folders">Folders</v-btn>
            <v-btn :class="['bg-grey-darken-1',$route.path.includes('/admin/users')?'':'text-grey']" to="/admin/users">Users</v-btn>
        </v-btn-toggle>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>
    main{
        padding:2rem;
        max-width: 750px;
        height: 100%;
        min-height: 100vh;
    }

    nav{
        padding:1rem 0;
    }

    nav ul{
        display:flex;
        gap:1rem;
    }
</style>