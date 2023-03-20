import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'

import './main.css'
import router from './router'
import App from './App.vue'
import { firebaseApp } from './firebase'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
app.mount('#app')
