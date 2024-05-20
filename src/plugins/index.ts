/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import search from './search'
import context from './context'
import VueApexCharts from 'vue3-apexcharts'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(search).use(context).use(VueApexCharts)
}
