/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
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
        component: () => import('@/pages/personal/personal.vue'),
        children: [
          {
            path: '/personal/menu1',
            component: () => import('@/pages/personal/menu/menu1.vue'),
          },
          {
            path: '/personal/menu2',
            beforeEnter: (e) => {
              console.log('2')
              alert('เพิ่ม route ของเมนู2รึยัง?')
              // ลบอันนี้ด้วยถ้ามาเเก้เเล้ว
            },
            component: () => import('@/pages/personal/menu/menu1.vue'),
          },
          {
            path: '/personal/menu3',
            beforeEnter: (e) => {
              alert('เพิ่ม route ของเมนู3รึยัง?')
            },
            component: () => import('@/pages/personal/menu/menu1.vue'),
          },
          {
            path: '/personal/menu4',
            beforeEnter: (e) => {
              alert('เพิ่ม route ของเมนู4รึยัง?')
            },
            component: () => import('@/pages/personal/menu/menu1.vue'),
          },
          {
            path: '/personal/:catchAll(.*)',
            redirect: '/personal/menu1',
          },
        ],
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
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
