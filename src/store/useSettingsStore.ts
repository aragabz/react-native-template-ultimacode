import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { zustandMMKVStorage } from '@services/mmkvStorage';

type SettingsState = {
  onboardingSeen: boolean;
  setOnboardingSeen: (seen: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      set => ({
        onboardingSeen: false,
        setOnboardingSeen: onboardingSeen => set({ onboardingSeen }),
      }),
      {
        name: 'settings-storage',
        storage: createJSONStorage(() => zustandMMKVStorage),
      },
    ),
    { enabled: __DEV__, name: 'settings-store' },
  ),
);

export const selectOnboardingSeen = (state: SettingsState) =>
  state.onboardingSeen;
