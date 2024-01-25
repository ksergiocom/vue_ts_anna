<script setup lang="ts">
    import Gallery from '@/components/Gallery.vue'
    import HeroImg from '@/assets/img/hero.jpg'

    import { onMounted, ref } from 'vue';
    import { PhotosService } from '@/services/photos.service';
    import { Photo } from '@/types';

    let photos = ref<Photo[]>([])

    onMounted(async ()=>{
        photos.value = await PhotosService.getPublicPhotos()
    })
</script>

<template>
    <main>
        <v-parallax
        id="hero"
        class="text-white pa-10"
        :src="HeroImg"
        >
            <div id="hero-text">
                <h1>¿No soy acaso un perro precioso?</h1>
                <p>Si todavía no estás convencido mira bien las fotos que vienen a continuación. Seguro que te parezco irresistiblemente atractivo.</p>
                <RouterLink class="sobre-mi" to="/contact">Sobre mí</RouterLink>
            </div>
        </v-parallax>
        <section id="gallery">
            <Gallery :photos="photos"/>
        </section>
    </main>
</template>


<style scoped>

    article{
        background-color: white;
        border-radius: 5px;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .sobre-mi{
        color: white;
        text-decoration: none;
        border: 1px solid white;
        background-color: rgba(255, 255, 255, 0);
        display: inline-block;
        width: fit-content;
        padding: 0.5rem 1.5rem;
        margin-top: 1rem;
        transition: all 150ms ease-in;
    }

    .sobre-mi:hover{
        color: black;
        background-color: white;
        border: 1px solid white;
    }

    #hero{
        height: 80vh;
    }

    #hero-text{
        text-align: center;
    }

    #hero-text h1{
        letter-spacing: -0.1rem;
        line-height: 1.8rem;
        margin-bottom: 1rem;
    }

    #hero-text p{
        letter-spacing: -0.01rem;
        line-height: 1.3rem;
    }

    #hero-text a{
        width: 100%;
        text-align: center;
        display: block;
    }

    @media (min-width: 400px) {   
        
        #hero-text{
            width: 80%;
            margin-right: auto;
            text-align: left;
        }

        #hero-text a{
        width: fit-content;
        text-align: center;
        display: inline-block;
    }

    }


    @media (min-width: 600px) {   
        
        #hero-text{
            width: 50%;
            margin-right: auto;
        }

        #hero-text a{
        width: fit-content;
        text-align: center;
        display: inline-block;
    }

    }

    @media (min-width: 1200px) {   

        #hero-text{
            width: 40%;
            margin-right: auto;
        }
    }
</style>