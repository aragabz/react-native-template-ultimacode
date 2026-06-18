import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppLanguage = 'en' | 'ar' | 'fr';

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
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    { enabled: __DEV__, name: 'settings-store' }
  )
);

export const selectOnboardingSeen = (state: SettingsState) => state.onboardingSeen;
export const selectLanguage = (state: SettingsState) => state.language;
