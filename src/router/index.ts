/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserApi } from '@/composables/api'
import { contextPluginSymbol } from '@/plugins/context'
import { inject } from 'vue'
export const routerMenu = {
  homePage: 'Index',
}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: routerMenu.homePage,
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
        meta: { requiresAuth: true },
        component: () => import('@/pages/shop/shopRusult.vue'),
      },
      {
        path: '/receipt/:receiptId',
        name: 'Receipt',
        meta: { requiresAuth: true },
        component: () => import('@/pages/shop/receiptPage.vue'),
      },
      {
        path: '/',
        component: () => import('@/pages/personal/personal.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '/personal/profile',
            name: 'Profile',
            component: () => import('@/pages/personal/menu/profile.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/purchase',
            name: 'Purchase',
            component: () => import('@/pages/personal/menu/purchase.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/sales',
            name: 'Sales',
            component: () => import('@/pages/personal/menu/sales.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/products',
            name: 'Products',
            component: () => import('@/pages/personal/menu/products.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/admin',
            name: 'Admin',
            component: () => import('@/pages/personal/menu/admin.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/:catchAll(.*)',
            redirect: '/personal/menu1',
          },
        ],
      },
      {
        path: '/personal',
        redirect: '/personal/menu1',
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/View.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login/login.vue'),
      },
      {
        path: '/registerCustomer',
        name: 'RegisterCustomer',
        component: () => import('@/pages/register/registerCustomer.vue'),
      },

      {
        path: '/registerFarmer',
        name: 'RegisterFarmer',
        component: () => import('@/pages/register/registerFarmer.vue'),
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = inject(contextPluginSymbol)!
  if (user.userInfomation.value == null) {
    await user.getUserInfomation()
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user.userInfomation.value == null) {
      alert('กรุณาล็อคอิน')
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
