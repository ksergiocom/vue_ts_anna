<script setup lang="ts">

</script>

<template>
    <main class="mt-0 pt-0 ma-5 pa-5">
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
    }

    nav{
        padding:1rem 0;
    }

    nav ul{
        display:flex;
        gap:1rem;
    }
</style>