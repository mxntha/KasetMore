/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { defineComponent } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@/pages/homePage/index.vue'),
      },
      {
        path: '/product/:productId',
        name: 'ProductDetail',
        component: () => import('@/pages/product/productDetail.vue'),
      },
      {
        path: '/buyResult/:productId',
        name: 'BuyResult',
        component: () => import('@/pages/shop/shopRusult.vue'),
      },
      {
        path: '/receipt/:receiptId',
        name: 'Receipt',
        component: () => import('@/pages/shop/receiptPage.vue'),
      },
      {
        path: '/personal',
        component: () => import('@/pages/shop/personal.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/pages/login/login.vue'),
  },
  {
    path: '/registerCustomer',
    component: () => import('@/pages/register/registerCustomer.vue'),
  },
  
  {
    path: '/registerFarmer',
    name: 'RegisterFarmer',
    component: () => import('@/pages/register/registerFarmer.vue'),
  },
 
  {
    path: '/shoppingCart',
    component: () => import('@/pages/shop/shoppingCart.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
