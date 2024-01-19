<script setup lang="ts">
    import Image from '@/components/Image.vue'
    import {ref, onMounted} from 'vue'
    import {PhotosService} from '@/services/photos.service'
    import { Photo } from '@/types'

    // Necesario para este componente solo.
    interface PhotoWithCSSClass extends Photo {
        cssClass:'v'|'h'|'h2'
    }

    const photos = ref<PhotoWithCSSClass[]>([])

    onMounted(async () => {  
        // SOLO PARA VALORES PARES!
        const photosJSON = await PhotosService.getPublicPhotos(20)

        //Para que me cuadren todas. La superficie total sumada debe ser multiplo de 6.  
        let v = 0
        let h = 0
        
        photosJSON.forEach(photo=>{
            switch (photo.orientacion){
                case 'vertical':
                    v++
                    break
                default:
                    h++
            }
        })

        // Calculando superficies
        const sTotalMin = v*2+h
        const sTotalMax = v*2+h*4

        const sTotalMedia = Math.floor((sTotalMin+sTotalMax)/2)
        // Buscar el siguiente multiplo de 6 a partir de la media
        const sTotalMediaSiguienteMultiploDe6 = (Math.floor((sTotalMedia)/6)+1)*6

        // Estas no dependen de nada. Son tal cual.
        const sParaVerticales = v*2

        // Superficie total disponible para las horizontales
        let sParaHorizontales = sTotalMediaSiguienteMultiploDe6 - sParaVerticales
        // Aqui hay truco. A veces no hay horizontales suficientes
        // Sacamos la cantidad total y comprobamos si existen h pequeñas + h grandes suficientes.
        // Si no es así agregar una H2 y restar 4 H y volver a comprobar. etc.
        
        // Porcentaje en cual aparecen las grandes respecto a las pequeñas por defecto. PARA AJUSTAR EL MINIMO QUE APARECEN.
        const PORCENTAJE_PROPORCION = 1/3
        let sParaH2 = PORCENTAJE_PROPORCION * sParaHorizontales

        let cantidadH2 = Math.floor(sParaH2/4)
        // Ahora como se trunca. Tenemos que buscar cuanta superficie real nos queda para las pequeñas
        let cantidadH = sParaHorizontales - (cantidadH2*4)

        // Comprobar si la cantidad calculada es MAYOR que h(cantidad disponible que viene del server)
        while(cantidadH+cantidadH2 > h+1 ){
            cantidadH2++
            cantidadH = cantidadH - 4
        }

        console.table({
            h,
            v,
            sParaHorizontales,
            sParaVerticales,
            sTotalMediaSiguienteMultiploDe6,
            sParaV:v*2,
            sParaH:cantidadH,
            sParaH2Usada:cantidadH2*4,
            sRestante:sTotalMediaSiguienteMultiploDe6-cantidadH2*4-cantidadH-sParaVerticales,
            cantidadH,
            cantidadH2,
            cantidadV:v,
            modulo6V:sParaVerticales%6,
            modulo6H:sParaHorizontales%6,
        })

        let cantidadHGrandesDisponibles = cantidadH2
        let cantidadHPequeñasDisponibles = cantidadH
        const photosWithClasses = photosJSON.map((photo):PhotoWithCSSClass=>{
            if(photo.orientacion=='vertical'){
                return {
                    ...photo,
                    cssClass:'v',
                }
            }
            if(photo.orientacion=='horizontal'){
                if(cantidadHGrandesDisponibles){
                    cantidadHGrandesDisponibles--
                    return {
                    ...photo,
                    cssClass:'h2',
                    }
                }else{
                    cantidadHPequeñasDisponibles--
                    return {
                    ...photo,
                    cssClass:'h',
                    }
                }
            }
            return {
                ...photo,
                cssClass:'h'
            }
        })

        photos.value = photosWithClasses
    })



</script>

<template>
    <section>
        <div v-for="photo in photos" :class="['celda',photo.cssClass]" :key="photo.id">
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

@media (min-width:900px) {
    section{
        grid-template-columns: repeat(3, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.67 * (100vw / 3)); 
    }


}

</style>
