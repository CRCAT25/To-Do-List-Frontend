import { defineStore } from 'pinia'
import axios from 'axios'

const taskUrl = import.meta.env.TASK_API_BASE_URL

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTask: null
  }),
  actions: {
    async fetchTasks(status = '') {
      const res = await axios.get(`${taskUrl}?status=${status}`)
      this.tasks = res.data
    },
    async getTask(id) {
      const res = await axios.get(`${taskUrl}/${id}`)
      this.currentTask = res.data
    },
    async addTask(task) {
      const res = await axios.post(`${taskUrl}`, task)
      this.tasks.push(res.data)
    },
    async updateTask(task) {
      const res = await axios.put(`${taskUrl}/${task.id}`, task)
      const index = this.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) this.tasks[index] = res.data
    },
    async deleteTask(id) {
      await axios.delete(`${taskUrl}/${id}`)
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})
