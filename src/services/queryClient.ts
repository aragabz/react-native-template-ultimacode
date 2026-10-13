import { APP_CONFIG } from '@constants/config';
import NetInfo from '@react-native-community/netinfo';
import { QueryClient, onlineManager } from '@tanstack/react-query';

/**
 * Lets TanStack Query pause while offline and refetch on reconnect.
 * React Native has no browser `online` event, so NetInfo drives it.
 */
export const bindOnlineManager = () =>
  onlineManager.setEventListener(setOnline =>
    NetInfo.addEventListener(state => {
      setOnline(state.isConnected !== false);
    }),
  );

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: APP_CONFIG.STALE_TIME,
        gcTime: APP_CONFIG.GC_TIME,
        retry: APP_CONFIG.MAX_RETRIES,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
