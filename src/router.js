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


export default router