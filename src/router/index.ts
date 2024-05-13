/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserApi } from '@/composables/api'
export const routerMenu = {
  homePage: 'Index',
}
const userApi = useUserApi()
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
            component: () => import('@/pages/personal/menu/sales.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/personal/menu4',
            beforeEnter: (e) => {
              alert('เพิ่ม route ของเมนู4รึยัง?')
            },
            component: () => import('@/pages/personal/menu/profile.vue'),
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
  // เช็คว่าหน้าที่จะเข้าถึงต้องการการยืนยันตัวตนหรือไม่
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // ถ้าไม่ได้ล็อกอินให้ redirect ไปยังหน้าล็อกอิน
    const jwt = localStorage.getItem('login')
    const isAuth = jwt && (await userApi.checkJwt(jwt))
    console.log('auth', isAuth)
    if (!isAuth) {
      alert('กรุณาล็อคอิน')
      next('/login')
    } else {
      next()
    }
  } else {
    next() // หรือให้ผ่านไปเลย
  }
})

export default router
