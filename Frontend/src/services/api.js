import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export const authService = {
  signup: (email, password, name) =>
    api.post('/auth/signup', { email, password, name }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getProfile: () =>
    api.get('/auth/profile'),

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }
}


export const saveToken = (token) => {
  localStorage.setItem('authToken', token)
}


export const getToken = () => {
  return localStorage.getItem('authToken')
}

export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}


export const isAuthenticated = () => {
  return !!getToken()
}

export default api
