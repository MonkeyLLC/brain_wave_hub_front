
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import App from './App.vue'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(ElementPlus, { size: 'small', zIndex: 1000 })
