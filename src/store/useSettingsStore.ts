import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { zustandMMKVStorage } from '@services/mmkvStorage';

export type AppLanguage = 'en' | 'ar';

type SettingsState = {
  onboardingSeen: boolean;
  language: AppLanguage;
  setOnboardingSeen: (seen: boolean) => void;
  setLanguage: (language: AppLanguage) => void;
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        onboardingSeen: false,
        language: 'en',
        setOnboardingSeen: (onboardingSeen) => set({ onboardingSeen }),
        setLanguage: (language) => set({ language }),
      }),
      {
        name: 'settings-storage',
        storage: createJSONStorage(() => zustandMMKVStorage),
      }
    ),
    { enabled: __DEV__, name: 'settings-store' }
  )
);

export const selectOnboardingSeen = (state: SettingsState) => state.onboardingSeen;
export const selectLanguage = (state: SettingsState) => state.language;
