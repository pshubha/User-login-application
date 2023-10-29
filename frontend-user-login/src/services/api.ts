// src/services/api.ts

import axios, { AxiosInstance } from 'axios';

// Create a TypeScript interface for your API response data.
interface ApiResponse {
  success: boolean;
  data: any; // Define the data structure according to your API response.
}

// Define an Axios instance for your API requests.
const api: AxiosInstance = axios.create({
  baseURL: 'https://example.com/api', // Replace with your API endpoint
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data as ApiResponse;
  } catch (error) {
    throw error;
  }
};

// Add other API functions as needed.

export default api;
