import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL + '/api'

const instance = axios.create({
  baseURL: baseURL,
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
