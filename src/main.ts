import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia, PiniaVuePlugin  } from 'pinia'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(PiniaVuePlugin).use(pinia).mount('#app')
