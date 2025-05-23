import { defineStore } from 'pinia'
import axios from 'axios'
import { SignupRequest } from '@/dto/SignupRequest';
import { AuthRequest } from '@/dto/AuthRequest';

const authUrl = import.meta.env.VITE_BASE_URL + '/auth'
if (!import.meta.env.VITE_BASE_URL) {
  throw new Error('VITE_BASE_URL is not defined');
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null
  }),
  actions: {
    async login(credentials: AuthRequest) {
      const res = await axios.post(`${authUrl}/login`, credentials)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
    },
    
    async register(data: SignupRequest) {
      await axios.post(`${authUrl}/register`, data)
    },

    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
