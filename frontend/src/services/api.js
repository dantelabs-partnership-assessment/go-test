import axios from 'axios'

const API_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTasks = async () => {
  const response = await api.get('/tasks')
  return response.data
}

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData)
  return response.data
}

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
}

export const toggleTask = async (id) => {
  const response = await api.patch(`/tasks/${id}/toggle`)
  return response.data
}

export default api