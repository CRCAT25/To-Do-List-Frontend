// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TaskView from '../views/TaskView.vue'

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
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
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
