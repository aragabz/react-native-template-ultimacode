import { getRandomBytes } from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
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

const SECURE_STORAGE_ID = 'secure-storage';
const ENCRYPTION_KEY_NAME = 'secure-storage-encryption-key';
// Key shipped by earlier template versions; only used to migrate their data.
const LEGACY_ENCRYPTION_KEY = 'app-secure-key';
const KEY_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const KEY_LENGTH = 32; // AES-256 needs a 32-byte key

/** 32 chars from a 64-char alphabet: 192 bits from a CSPRNG (256 % 64 === 0, so byte % 64 is unbiased). */
const generateEncryptionKey = (): string =>
  Array.from(getRandomBytes(KEY_LENGTH), byte => KEY_ALPHABET[byte % 64]).join(
    '',
  );

/**
 * Opens the encrypted MMKV instance with a per-install random key kept in the
 * Keychain / Android Keystore. On first launch it generates the key and
 * re-encrypts any data written under the legacy hard-coded key.
 */
const createSecureMMKVStorage = () => {
  const storedKey = SecureStore.getItem(ENCRYPTION_KEY_NAME);
  if (storedKey) {
    return createMMKV({
      id: SECURE_STORAGE_ID,
      encryptionKey: storedKey,
      encryptionType: 'AES-256',
    });
  }

  const storage = createMMKV({
    id: SECURE_STORAGE_ID,
    encryptionKey: LEGACY_ENCRYPTION_KEY,
  });
  const key = generateEncryptionKey();
  // Persist the key before re-encrypting: if saving fails, the data stays readable
  // under the legacy key and the migration simply retries on the next launch.
  SecureStore.setItem(ENCRYPTION_KEY_NAME, key, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
  });
  storage.encrypt(key, 'AES-256');
  return storage;
};

/**
 * MMKV instance for sensitive/encrypted data (tokens, secrets).
 */
export const secureMMKVStorage = createSecureMMKVStorage();

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
