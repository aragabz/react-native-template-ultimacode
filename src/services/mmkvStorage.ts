import { createMMKV } from 'react-native-mmkv';
import { type StateStorage } from 'zustand/middleware';

/**
 * MMKV instance for general app storage.
 * Optimized for fast local read/write operations.
 */
export const mmkvStorage = createMMKV({
  id: 'app-storage',
});

/**
 * Zustand-compatible StateStorage adapter for MMKV.
 * Use with `createJSONStorage(() => zustandMMKVStorage)` in persist middleware.
 */
export const zustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    mmkvStorage.set(name, value);
  },
  getItem: (name: string) => {
    return mmkvStorage.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    mmkvStorage.remove(name);
  },
};

/**
 * MMKV instance for sensitive/encrypted data.
 * Uses encryption key for secure storage.
 */
export const secureMMKVStorage = createMMKV({
  id: 'secure-storage',
  encryptionKey: 'app-secure-key',
});

/**
 * Zustand-compatible StateStorage adapter for encrypted MMKV.
 */
export const zustandSecureMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    secureMMKVStorage.set(name, value);
  },
  getItem: (name: string) => {
    return secureMMKVStorage.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    secureMMKVStorage.remove(name);
  },
};
