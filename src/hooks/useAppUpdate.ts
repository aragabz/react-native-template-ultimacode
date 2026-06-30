import { useState, useCallback } from 'react';
import Constants from 'expo-constants';

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'up-to-date' | 'error';

interface AppUpdateState {
  status: UpdateStatus;
  isUpdateAvailable: boolean;
  currentVersion: string;
  latestVersion?: string;
  checkForUpdate: () => Promise<void>;
}

/**
 * Hook for checking app updates.
 *
 * For OTA updates, integrate with expo-updates:
 *   import * as Updates from 'expo-updates';
 *   const update = await Updates.checkForUpdateAsync();
 *
 * For store updates, implement a version check against your API.
 */
export function useAppUpdate(): AppUpdateState {
  const currentVersion = Constants.expoConfig?.version ?? '0.0.0';
  const [status, setStatus] = useState<UpdateStatus>('idle');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | undefined>(undefined);

  const checkForUpdate = useCallback(async () => {
    setStatus('checking');
    try {
      // Placeholder: Replace with expo-updates or custom API call
      // const update = await Updates.checkForUpdateAsync();
      // if (update.isAvailable) { ... }

      // No-op check — reports up-to-date
      setIsUpdateAvailable(false);
      setLatestVersion(currentVersion);
      setStatus('up-to-date');
    } catch {
      setStatus('error');
    }
  }, [currentVersion]);

  return {
    status,
    isUpdateAvailable,
    currentVersion,
    latestVersion,
    checkForUpdate,
  };
}
