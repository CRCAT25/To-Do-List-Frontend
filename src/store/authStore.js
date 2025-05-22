import { defineStore } from 'pinia'
import axios from 'axios'

const authUrl = import.meta.env.BASE_URL + 'api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null
  }),
  actions: {
    async login(credentials) {
      const res = await axios.post(`${authUrl}/login`, credentials)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
    },
    async register(data) {
      await axios.post(`${authUrl}/register`, data)
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
