import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { zustandMMKVStorage } from '@services/mmkvStorage';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        mode: 'system',
        setMode: (mode) => set({ mode }),
      }),
      {
        name: 'theme-storage',
        storage: createJSONStorage(() => zustandMMKVStorage),
      }
    ),
    { enabled: __DEV__, name: 'theme-store' }
  )
);

export const selectMode = (state: ThemeState) => state.mode;
