import type { RootStackParamList } from '@navigation/types';
import type { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rn-template://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Demo: 'demo',
          List: 'list',
          Forms: 'forms',
          Offline: 'offline',
          Settings: 'settings',
          Showcase: 'showcase',
        },
      },
      Details: 'details/:id',
    },
  },
};
