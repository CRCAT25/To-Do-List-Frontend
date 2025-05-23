// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TaskView.vue'
import UserView from '@/views/UserView.vue'

const routes = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    props: false
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
