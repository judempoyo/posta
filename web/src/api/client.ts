import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.response?.data?.data?.requires_2fa) {
      const auth = useAuthStore()
      const message = error.response?.data?.error?.message || 'Your session has expired'
      auth.logout()
      window.location.href = `/login?error=${encodeURIComponent(message)}`
    }
    return Promise.reject(error)
  }
)

export default api
