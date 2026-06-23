import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearTokens: () => void;
}

const useAuthStoreBase = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearTokens: () => set({ 
        accessToken: null, 
        refreshToken: null 
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
