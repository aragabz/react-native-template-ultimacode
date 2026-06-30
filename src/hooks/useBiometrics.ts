import { useState, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricsState {
  isAvailable: boolean;
  isAuthenticated: boolean;
  authenticate: (promptMessage?: string) => Promise<boolean>;
  checkAvailability: () => Promise<void>;
}

/**
 * Hook for biometric authentication using expo-local-authentication.
 * Supports fingerprint, face recognition, and iris scanning.
 */
export function useBiometrics(): BiometricsState {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAvailability = useCallback(async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsAvailable(hasHardware && isEnrolled);
  }, []);

  const authenticate = useCallback(async (promptMessage = 'Authenticate to continue') => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      disableDeviceFallback: false,
      cancelLabel: 'Cancel',
    });

    setIsAuthenticated(result.success);
    return result.success;
  }, []);

  return {
    isAvailable,
    isAuthenticated,
    authenticate,
    checkAvailability,
  };
}
