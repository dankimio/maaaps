import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'

import './main.css'
import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] })

app.mount('#app')
