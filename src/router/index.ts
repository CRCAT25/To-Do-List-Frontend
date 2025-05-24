// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TaskView.vue'
import UserView from '@/views/UserView.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const routes = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/auth',
    component: LoginView,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/userView',
    name: 'UserView',
    component: UserView,
    props: false
  },
  {
    path: '/tasks',
    name: 'TaskView',
    component: TaskView,
    props: false
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
