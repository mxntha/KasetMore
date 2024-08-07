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
        component: () => import('@/layouts/default/View.vue'),
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
            path: '/shop/:email',
            name: 'Shop',
            component: () => import('@/pages/shop/shopPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/PersonalView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/personal/profile',
        name: 'Profile',
        component: () => import('@/pages/personal/profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/personal/purchase',
        name: 'Purchase',
        component: () => import('@/pages/personal/purchase.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/personal/sales',
        name: 'Sales',
        component: () => import('@/pages/personal/sales.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/personal/products',
        name: 'Products',
        component: () => import('@/pages/personal/products/index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/personal/admin',
        name: 'Admin',
        component: () => import('@/pages/personal/admin.vue'),
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
  {
    path: '/',
    component: () => import('@/layouts/default/View.vue'),
    children: [
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/pages/cart/cartView.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login/login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/pages/register/register.vue'),
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(/*process.env.BASE_URL*/ ''),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = inject(contextPluginSymbol)!
  if (user.userInfomation.value == null) {
    await user.getUserInfomation()
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(from)

    if (user.userInfomation.value == null) {
      if (from.name) {
        localStorage.setItem('redirect', from.name.toString())
        if (from.params) {
          localStorage.setItem('params', JSON.stringify(from.params))
        }
      }
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
