import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStoreState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearTokens: () => void;
}

const useAuthStoreBase = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: 'jwt_secure_access_token_token_abc_123',
      refreshToken: 'refresh_secure_refresh_token_xyz_789',

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearTokens: () => set({ 
        accessToken: '', 
        refreshToken: '' 
      }),
    }),
    {
      name: 'libre_shared_auth_store',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

export const useAuthStore = useAuthStoreBase;
