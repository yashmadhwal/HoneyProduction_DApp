import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';


import './style.css'

import '../types/bignumber'
import '../types/string'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
