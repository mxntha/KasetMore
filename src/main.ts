/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// Composables
import { createApp } from 'vue'
const app = createApp(App).use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions)
registerPlugins(app)

app.mount('#app')
