import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { zustandSecureMMKVStorage } from '@services/mmkvStorage';

export type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isHydrating: boolean;
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  setTokens: (token: string, refreshToken?: string) => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        refreshToken: null,
        isHydrating: true,
        login: (user, token, refreshToken) =>
          set({ user, token, refreshToken: refreshToken ?? null }),
        logout: () => set({ user: null, token: null, refreshToken: null }),
        setTokens: (token, refreshToken) =>
          set({ token, ...(refreshToken !== undefined ? { refreshToken } : {}) }),
        hydrate: () => set({ isHydrating: false }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => zustandSecureMMKVStorage),
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
        }),
        onRehydrateStorage: () => () => {
          useAuthStore.setState({ isHydrating: false });
        },
      }
    ),
    { enabled: __DEV__, name: 'auth-store' }
  )
);

export const selectUser = (state: AuthState) => state.user;
export const selectToken = (state: AuthState) => state.token;
export const selectIsAuthenticated = (state: AuthState) => state.token !== null;
export const selectIsHydrating = (state: AuthState) => state.isHydrating;
