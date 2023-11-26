import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueQueryPlugin)
app.mount('#app')

