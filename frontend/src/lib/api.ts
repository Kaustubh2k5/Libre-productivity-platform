import axios from 'axios';
import { getAccessToken } from './auth.util';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
