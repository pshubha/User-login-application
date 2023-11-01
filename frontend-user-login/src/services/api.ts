// src/services/api.ts

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333' // Replace with your API URL
})

export default api
