import axios from 'axios';
import { getAccessToken } from '../../../lib/auth.util';
import type { SandboxTable } from '../types/sandbox.types';

const sandboxApi = axios.create({
  baseURL: import.meta.env.VITE_SANDBOX_API_URL ?? 'http://localhost:8083/api/sandbox',
});

sandboxApi.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function createSandboxTable(table: SandboxTable) {
  const response = await sandboxApi.post<{ success: boolean; data: SandboxTable }>('/tables', table);

  return response.data.data;
}
