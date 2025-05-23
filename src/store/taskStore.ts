import { defineStore } from 'pinia'
import api from '../services/api'
import { TaskDTO } from '@/dto/TaskDTO'
import { ResponseDTO } from '@/dto/ResponseDTO';

// Nếu bạn dùng Vite, biến môi trường phải có tiền tố VITE_
const taskUrl: string = import.meta.env.VITE_TASK_API_BASE_URL;
if (!taskUrl) {
  throw new Error('VITE_TASK_API_BASE_URL is not defined');
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as TaskDTO[],
    currentTask: null as TaskDTO | null,
    isLoading: false,
    error: '' as string
  }),
  actions: {
    async fetchTasks() {
      const res = (await api.get<ResponseDTO<TaskDTO[]>>(`${taskUrl}`)).data;
      this.tasks = res.data;
    },

    async getTask(id: number) {
      const res = (await api.get<ResponseDTO<TaskDTO>>(`${taskUrl}/${id}`)).data;
      this.currentTask = res.data;
    },

    async addTask(task: TaskDTO) {
      const res = (await api.post<ResponseDTO<TaskDTO>>(`${taskUrl}`, task)).data;
      this.tasks.push(res.data);
    },

    async updateTask(task: TaskDTO) {
      const res = (await api.put<ResponseDTO<TaskDTO>>(`${taskUrl}/${task.id}`, task)).data;
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) this.tasks[index] = res.data;
    },

    async deleteTask(id: number) {
      const res = (await api.delete<ResponseDTO<any>>(`${taskUrl}/${id}`)).data;
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
})
