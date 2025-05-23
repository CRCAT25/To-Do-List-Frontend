import { defineStore } from 'pinia'
import axios from 'axios'
import { TaskDTO } from '@/dto/TaskDTO'

// Nếu bạn dùng Vite, biến môi trường phải có tiền tố VITE_
const taskUrl: string = import.meta.env.VITE_TASK_API_BASE_URL;
if (!taskUrl) {
  throw new Error('VITE_TASK_API_BASE_URL is not defined');
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as TaskDTO[],
    currentTask: null as TaskDTO | null
  }),
  actions: {
    async fetchTasks(status: string = '') {
      const res = await axios.get<TaskDTO[]>(`${taskUrl}?status=${status}`)
      this.tasks = res.data
    },

    async getTask(id: number) {
      const res = await axios.get<TaskDTO>(`${taskUrl}/${id}`)
      this.currentTask = res.data
    },

    async addTask(task: TaskDTO) {
      const res = await axios.post<TaskDTO>(`${taskUrl}`, task)
      this.tasks.push(res.data)
    },

    async updateTask(task: TaskDTO) {
      const res = await axios.put<TaskDTO>(`${taskUrl}/${task.id}`, task)
      const index = this.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) this.tasks[index] = res.data
    },

    async deleteTask(id: number) {
      await axios.delete(`${taskUrl}/${id}`)
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})
