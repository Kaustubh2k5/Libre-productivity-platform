import axios from 'axios';
import {
  getRefreshToken,
  storeAccessToken,
  removeAuthTokens,
} from './auth.util';

const api = axios.create({
  baseURL: 'http://localhost:8081/auth/refresh',
});

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await api.post('/auth/refresh', {
      refreshToken,
    });

    const accessToken = response.data?.data?.accessToken;

    if (!accessToken) {
      throw new Error('Access token missing in refresh response');
    }

    storeAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    removeAuthTokens();
    throw error;
  }
};