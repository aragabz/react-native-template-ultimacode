type MMKVConfig = {
  id: string;
  encryptionKey?: string;
  encryptionType?: string;
};

const loadSecureStorage = (storedKey: string | null) => {
  const keychain = new Map<string, string>();
  if (storedKey) keychain.set('secure-storage-encryption-key', storedKey);

  const instances: { config: MMKVConfig; encrypt: jest.Mock }[] = [];
  const setItem = jest.fn((name: string, value: string) => {
    keychain.set(name, value);
  });

  jest.isolateModules(() => {
    jest.doMock('react-native-mmkv', () => ({
      createMMKV: (config: MMKVConfig) => {
        const instance = { config, encrypt: jest.fn() };
        instances.push(instance);
        return instance;
      },
    }));
    jest.doMock('expo-secure-store', () => ({
      AFTER_FIRST_UNLOCK: 'AFTER_FIRST_UNLOCK',
      getItem: (name: string) => keychain.get(name) ?? null,
      setItem,
    }));
    jest.doMock('expo-crypto', () => ({
      getRandomBytes: (n: number) =>
        Uint8Array.from({ length: n }, (_, i) => i * 7),
    }));
    jest.requireActual('@services/mmkvStorage');
  });

  const secure = instances.find(i => i.config.id === 'secure-storage');
  if (!secure) throw new Error('secure-storage instance was not created');
  return { secure, setItem, keychain };
};

describe('secureMMKVStorage encryption key', () => {
  it('generates a random 32-char key, stores it, and re-encrypts legacy data', () => {
    const { secure, setItem, keychain } = loadSecureStorage(null);
    const key = keychain.get('secure-storage-encryption-key');

    expect(key).toHaveLength(32);
    expect(key).not.toBe('app-secure-key');
    expect(setItem).toHaveBeenCalledWith('secure-storage-encryption-key', key, {
      keychainAccessible: 'AFTER_FIRST_UNLOCK',
    });
    // Opened with the legacy key so existing data is readable, then re-encrypted.
    expect(secure.config.encryptionKey).toBe('app-secure-key');
    expect(secure.encrypt).toHaveBeenCalledWith(key, 'AES-256');
  });

  it('saves the key before re-encrypting, so a failed save leaves data readable', () => {
    const { secure, setItem } = loadSecureStorage(null);
    expect(setItem.mock.invocationCallOrder[0]).toBeLessThan(
      secure.encrypt.mock.invocationCallOrder[0],
    );
  });

  it('reuses the stored key on later launches without re-encrypting', () => {
    const storedKey = 'k'.repeat(32);
    const { secure, setItem } = loadSecureStorage(storedKey);

    expect(secure.config).toEqual({
      id: 'secure-storage',
      encryptionKey: storedKey,
      encryptionType: 'AES-256',
    });
    expect(secure.encrypt).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
