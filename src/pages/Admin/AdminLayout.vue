<script setup lang="ts">

</script>

<template>
    <div class="mt-0 pt-0 ma-5 pa-5">
        <v-btn-toggle density="compact">
            <v-btn :class="'bg-grey-darken-1'" to="/admin/folders">Folders</v-btn>
            <v-btn :class="'bg-grey-darken-1'" to="/admin/users">Users</v-btn>
        </v-btn-toggle>
        <RouterView></RouterView>
    </div>
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