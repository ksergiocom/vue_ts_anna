import { createApp } from 'vue'
import router from './router'
import VueLazyLoad from 'vue3-lazyload'

import App from './App.vue'
import './style.css'


const app = createApp(App)

app.use(VueLazyLoad,{})
app.use(router)
app.mount('#app')
