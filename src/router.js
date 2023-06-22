import { createRouter, createWebHistory } from 'vue-router'
import ForgotPassword from './views/ForgotPassword.vue'

const routes = [
  {
    path: '/',
    component: ForgotPassword,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/forgot',
    component: ForgotPassword,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") === null) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router