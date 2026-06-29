import { useState, useEffect } from 'react';
import NetInfo, { type NetInfoStateType } from '@react-native-community/netinfo';

export type NetworkStatus = {
  isConnected: boolean;
  type: NetInfoStateType | string;
};

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    type: 'unknown',
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setStatus({
        isConnected: state.isConnected ?? true,
        type: state.type,
      });
    });

    return unsubscribe;
  }, []);

  return status;
};
