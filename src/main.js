import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
