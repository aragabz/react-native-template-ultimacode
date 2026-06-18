import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from '@navigation/types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rn-template://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Demo: 'demo',
          Settings: 'settings',
        },
      },
      Details: 'details/:id',
    },
  },
};
