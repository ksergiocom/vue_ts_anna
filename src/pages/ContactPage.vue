<script setup lang="ts">
    import Me from '@/assets/img/loading.jpg'
</script>

<template>
    <main class="pa-5 center text-center">
        <img class="" v-lazy="Me">
        <p class="text-grey-darken-2 pa-5">Este es un proyecto creado con Vue y Firebase. Para más información seguir los enclaces de abajo</p>
        <ul class="d-flex ga-5 justify-center">
            <li><a href="https://ksergio.com/serverless-con-firebase"><v-icon class="hover" size="2.5rem" icon="mdi-web"/></a></li>
            <li><a href="https://github.com/ksergiocom/vue_ts_photos"><v-icon class="hover" size="2.5rem" icon="mdi-github"/></a></li>
            <li><a href="https://twitter.com/ksergiocom"><v-icon class="hover" size="2.5rem" icon="mdi-twitter"/></a></li>
        </ul>
    </main>
</template>


<style scoped>
.center{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

img{
    max-height: 15rem;
    border-radius: 100%;
}

.hover{
    color:rgb(179, 178, 178);
    transition: all 120ms ease-in;
}

.hover:hover{
    color:rgb(122, 122, 122);
    transform: scale(104%);
}

@media (min-width:600px) {
    main div {
        width: 70%;
    }
}

@media (min-width:1200px) {
    main div {
        width: 50%;
    }
}</style>