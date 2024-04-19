/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { defineComponent } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes : RouteRecordRaw[]= [{
  path:"/login", component: () => import("@/pages/login/login.vue"),
},
{
  path:"/registerCustomer", component: () => import("@/pages/register/registerCustomer.vue"),

},
{
  path:"/", component: () => import("@/pages/index.vue"),

},
{
  path:"/registerFarmer", component: () => import("@/pages/register/registerFarmer.vue"),

},
{
  path:"/accountCust", component: () => import("@/pages/account/accountCust.vue"),

},
{
  path:"/chooseRegister", component: () => import("@/pages/register/chooseRegister.vue"),

},
{
  path:"/personal", component: () => import("@/pages/account/personal.vue"),

},
{
  path:"/completeRegister", component: () => import("@/pages/Alert/completeRegister.vue"),

}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
