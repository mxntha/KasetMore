/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { defineComponent } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes : RouteRecordRaw[]= [{
  path:"/login", component: () => import("@/pages/login.vue"),
},
{
  path:"/register", component: () => import("@/pages/register.vue"),

},
{
  path:"/", component: () => import("@/pages/index.vue"),

}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
