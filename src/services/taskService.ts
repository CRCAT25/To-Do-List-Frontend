// taskService.ts
import api from './api'
import type { TaskDTO } from '../dto/TaskDTO'

const taskURL: string = import.meta.env.VITE_TASK_API_BASE_URL || ''
if (!taskURL) {
  throw new Error('VITE_TASK_API_BASE_URL is not defined')
}

export const taskService = {
  async getAllTasks(): Promise<TaskDTO[]> {
    return api.get(taskURL).then(res => res.data.data)
  },

  async getTasksByUserId(userId: number): Promise<TaskDTO[]> {
    return api.get(`${taskURL}/${userId}`).then(res => res.data.data)
  },

  async createTask(task: TaskDTO): Promise<TaskDTO> {
    return api.post(taskURL, task).then(res => res.data.data)
  },

  async updateTask(task: TaskDTO): Promise<TaskDTO> {
    return api.put(taskURL, task).then(res => res.data.data)
  },

  async deleteTask(taskId: number): Promise<void> {
    return api.delete(`${taskURL}/${taskId}`).then(res => res.data.data)
  }
}
