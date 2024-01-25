# Vue, TS y Firebase
Una galería de fotos con un panel simple de administración, que permite almacenar fotos y controlar la autorización de quien puede verla o descargarla.

Para el backend se utiliza Firebase, un servicio BaaS de Google. Se usa firestore como base de datos, Storage como almacenamiento, Cloud functions para logica de servidor y Authentication para gestionar los usarios.

El proyecto se ha hecho sin planificar y usando algunas librerías a modo de práctica, por eso su estructura es un poco errática. Se podrían abstraer y simplificar muchas cosas. Lo dejo así para que se vea que he hestado haciendo.

Las cloud functions se pueden reducir con creces, los componentes se pueden abstraer en componentes más pequeños, los serivcios están repartidos de cualquier forma y a veces hago llamadas del SDK de firebase directamente en los componentes, se podrían sacar composables, etc. Lo dejo todo así **para poder ver los pasos que he seguido** creando el proyecto a ciegas.

## ¿Como usar?
Primero hay que crear un archivo **firebase.config.ts** en la carpeta root con las credenciales del proyecto. 

```
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

```

Para construir y desplegar el proyecto hay que seguir los pasos.

```
   npm run build
   firebase deploy
```

Es imprecindible autorizar los CORS al desplegar el proyecto. Para ello hay que utilizar gsutil para permitir mostrar y descargar de las fotos.

```
   gsutil cors set <cors-json-file> gs://<bucket_name>
```

## Cositas extras

Aqui he utilizado alguna biblioteca a mayores como:
   - Pinia
   - Vuefire
   - Vuetify
   - JSzip
   - Vue3-lazyloading