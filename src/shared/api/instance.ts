import axios from 'axios';

import { CONFIG } from '../model/config';

// disable cors

export const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

