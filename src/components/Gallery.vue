<script setup lang="ts">
    import Image from '@/components/Image.vue'
    import {ref, onMounted, computed} from 'vue'
    import {PhotosService} from '@/services/photos.service'
    import { Photo } from '@/types'

    const photos = ref<Photo[]>([])
    /*
      Romper la simetría.

      Para romper la simetría inicial los dos primeros elementos tiene que tener altos diferentes.
      Esto lo consigo usando una imagen vertical y una horizontal pequeña, o viceversa.
      No utilizo la vertical y la horizontal grande porque tienen el mismo alto, por lo que quedan rectas.

      Ahora lo importante es buscar la primera imagen vertical y la primera horizontal
      y colocarlas como las dos primeras para poder crear este efecto.
    */

    onMounted(async () => {  
        // Deben ser multiplos de 4 para evitar huecos en el grid
        const photosJSON = await PhotosService.getPublicPhotos(4*20)

        // Busco la primer foto horizontal y la primer vertical
        const idxPhotoHorizontal = photos.value.findIndex(photo=>photo.orientacion=='horizontal')
        const photoHorizontal = photos.value.splice(idxPhotoHorizontal,1)

        const idxPhotoVertical = photos.value.findIndex(photo=>photo.orientacion=='vertical')
        const photoVertical = photos.value.splice(idxPhotoVertical,1)

        /*
          Inserto las dos fotos en las dos primeras posiciones, en orden "aleatorio".
        */
        if(Math.random()>0.5){
            // El spread operator es por haber usado el splice arriba...
            photosJSON.unshift(...photoHorizontal)
            photosJSON.unshift(...photoVertical)
        }else{
            photosJSON.unshift(...photoVertical)
            photosJSON.unshift(...photoHorizontal)
        }

        photos.value = photosJSON

    })

    // Asignando las clases de CSS
    const computedPhotos = computed(()=>{

        // Voy a usar un array que almacena las dos ultimas clases aplicadas.
        const ultimasClasses:Array<'v'|'v2'|'h'|'h2'> = []

        return photos.value.map((photo,idx)=>{
            const {orientacion} = photo

            // TS me obliga a declarar un default. Si no da error abajo.
            let cssClass:'v'|'v2'|'h'|'h2' = 'h'

            if(orientacion == 'vertical'){
                cssClass = 'v'
                /*
                  Si las dos ultimas clases usadas son la misma cambiarla por 
                  una horizontal. Aunque la imagen sea vertical. Da igual.
                */
                if(ultimasClasses.length>1 && ultimasClasses.every(el=>el==='v')){
                    cssClass = 'h'
                }
            }
            if(orientacion == 'horizontal'){
                
                cssClass = Math.random() > 0.5 ? 'h2' : 'h'
                /*
                    El primer y segundo elemento nunca puede ser uno grande.
                    Porque como va acompañado con un elemento vertical, no crearía 
                    la asimetría que buscamos. (Se quedarían como a la misma altura)
                */
                if(idx==0 || idx==1){
                   cssClass = 'h'
                }

                // Si la clase seleccionada es la misma que las dos ultimas, cambiarla por la otra
                if(ultimasClasses.length>1 && ultimasClasses.every(el=>el==='h')){
                    cssClass = cssClass == 'h' ? 'h2' : 'h'
                }
            }
            
            ultimasClasses.push(cssClass)
            if(ultimasClasses.length>2){
                ultimasClasses.shift()
            }
            
            return{
                ...photo,
                cssClass,
            }
        })
    })



</script>

<template>
    <section>
        <div v-for="photo in computedPhotos" :class="['celda',photo.cssClass]" :key="photo.id">
            <Image :photo="photo"/>
        </div>
    </section>
</template>

<style scoped>
    section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 2)); 

        /* grid-template-columns: repeat(auto-fit, 200px);
        grid-auto-rows: 120px; */
        grid-auto-flow: dense;
        gap: 5px;
        justify-content: center;
    }

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.celda{
    display: flex;
    height: 100%;
    width: 100%;
}

.h2{
    grid-column: span 2;
    grid-row: span 2;
}

.v{
    grid-row: span 2;
}



@media (min-width:800px) {
    section{
        grid-template-columns: repeat(3, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 3)); 
    }
}

@media (min-width:1200px) {
    section{
        grid-template-columns: repeat(4, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 3)); 
    }
}

</style>