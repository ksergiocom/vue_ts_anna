<template>
    <main class="pa-5">
        <div class="text-grey-darken-4">
            <h1 class="">Hola Mundo!</h1>
            <p>Este es un proyecto de una galería de fotos hecha con Vue, Ts y Firebase.</p>
            <h2 class="">¿Que tiene especial?</h2>
            <p>Es serverless. Todo se guarda en Firebase que es un servicio Backend as a Server. </p>
            <p>Para ello se interactua con la base de datos, autenticacion, almacenamiento mediante unos servicios expuestos
                por ellos. Así tiene una forma un poco peculiar de seguridad.</p>
            <p>Esto quiere decir que tienes que configurar unas reglas de seguridad especiales para dar acceso a los
                recursos.</p>
            <p>De igual forma, la lógica que se debería ejecutar del lado del servidor se lanza a través de cloud functions.
            </p>
            <p>Para ver más detalles visita <a href="https://ksergio.com/">mi web</a> o
                <a href="https://github.com/ksergiocom/vue_ts_photos">el repositorio</a>
            </p>

        </div>
    </main>
</template>


<style scoped>
main {
    background-color: white;
    min-height: 100vh;
}


p {
    margin-bottom: 2rem;
    letter-spacing: -0.02rem;
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