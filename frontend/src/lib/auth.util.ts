import { useAuthStore } from '../features/auth/store/auth.store.js';

/**
 * Imperative helper to retrieve the active access token from authorization state.
 * Useful in non-component contexts like Axios dispatch contexts.
 */
export const getAccessToken = (): string => {
  return useAuthStore.getState().accessToken;
};

/**
 * Imperative helper to retrieve the active refresh token.
 */
export const getRefreshToken = (): string => {
  return useAuthStore.getState().refreshToken;
};

/**
 * Imperative helper to update the active access token.
 */
export const storeAccessToken = (token: string): void => {
  useAuthStore.getState().setAccessToken(token);
};

/**
 * Imperative helper to update the active refresh token.
 */
export const storeRefreshToken = (token: string): void => {
  useAuthStore.getState().setRefreshToken(token);
};

/**
 * Imperative helper to fully clear authentication tokens from client storage.
 */
export const removeAuthTokens = (): void => {
  useAuthStore.getState().clearTokens();
};

/**
 * Custom React hook that connects components reactively with the JWT auth parameters.
 * Guarantees that any state changes automatically trigger view updates.
 */
export const useAuthTokens = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return {
    accessToken,
    refreshToken,
    storeAccessToken,
    storeRefreshToken,
    removeAuthTokens,
  };
};
