// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TaskView from '../views/TaskView.vue'

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/tasks', component: TaskView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
