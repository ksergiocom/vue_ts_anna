<script setup lang="ts">
    import Image from '@/components/Image.vue'
    import {computed} from 'vue'
    import { Photo } from '@/types'

    // Necesario para este componente solo.
    interface PhotoWithCSSClass extends Photo {
        cssClass:'v'|'h'|'h2'
    }
    
    const props = defineProps<{
        photos:Photo[]
    }>()

    const photosWithCSSClass = computed(():PhotoWithCSSClass[]=>{

        let v = 0
        let h = 0
        
        props.photos.forEach((photo:Photo)=>{
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


        // console.table({
        //     h,
        //     v,
        //     sParaHorizontales,
        //     sParaVerticales,
        //     sTotalMediaSiguienteMultiploDe6,
        //     sParaV:v*2,
        //     sParaH:cantidadH,
        //     sParaH2Usada:cantidadH2*4,
        //     sRestante:sTotalMediaSiguienteMultiploDe6-cantidadH2*4-cantidadH-sParaVerticales,
        //     cantidadH,
        //     cantidadH2,
        //     cantidadV:v,
        //     modulo6V:sParaVerticales%6,
        //     modulo6H:sParaHorizontales%6,
        // })

        let cantidadVDisponibles = v
        let cantidadHGrandesDisponibles = cantidadH2
        let cantidadHPequeñasDisponibles = cantidadH
        const photosWithClasses = props.photos.map((photo):PhotoWithCSSClass=>{
            if(photo.orientacion=='vertical'){
                --cantidadVDisponibles

                if(cantidadVDisponibles){
                    return {
                        ...photo,
                        cssClass:'v',
                    }
                }else{
                    return {
                        ...photo,
                        cssClass:'h',
                    }
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

        
        // Colocar los dos primeros siempre uno h y otro v para romper la simetria.
        const photosMezcladas = photosWithClasses.sort(()=>Math.random() - 0.5)
        
        const idxH = photosMezcladas.findIndex(photo=>photo.cssClass=='h')
        const photoH = photosMezcladas.splice(idxH,1)
        
        const idxV = photosMezcladas.findIndex(photo=>photo.cssClass=='v')
        const photoV = photosMezcladas.splice(idxV,1)

        const idxV2th = photosMezcladas.findIndex(photo=>photo.cssClass=='v')
        const photoV2th = photosMezcladas.splice(idxV2th,1)

        photosMezcladas.unshift(...photoV)
        photosMezcladas.unshift(...photoH)
        photosMezcladas.unshift(...photoV2th)




        
        return photosMezcladas
    })


</script>

<template>
    <div class="grid">
        <div v-for="photo in photosWithCSSClass" :class="['celda',photo.cssClass]" :key="photo.id">
            <Image :photo="photo"/>
        </div>
    </div>
</template>

<style scoped>
    .grid {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Dos columnas de igual ancho */
        grid-auto-rows: calc(0.55 * (100vw / 2)); 

        grid-auto-flow: dense;
        gap: 0.7rem;
        justify-content: center;
        margin: 0.7rem;
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
        grid-column-end: span auto;
        grid-row-end: span auto;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 13px 27px -5px #32325d40,0 8px 16px -8px #0000004d,0 -6px 16px -6px #00000008;
    }
   

    .h2{
        grid-column: span 2;
        grid-row: span 2;
    }

    .v{
        grid-row: span 2;
    }

    @media (min-width:500px) {
        .grid{
            gap: 1.3rem;
            margin: 1.3rem;
        }
    }

    @media (min-width:1000px) {
        .grid{
            grid-template-columns: repeat(3, 1fr); /* Dos columnas de igual ancho */
            grid-auto-rows: calc(0.55 * (100vw / 3)); 
            gap: 2rem;
            margin: 2rem;
        }
    }

</style>
