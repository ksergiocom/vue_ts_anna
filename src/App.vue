<script setup lang="ts">
  import Navbar from '@/components/Navbar/Navbar.vue'
  import Snackbar from './components/UI/Snackbar.vue';
</script>

<template>
  <Navbar/>
  <RouterView/>
  <Snackbar/>
</template>