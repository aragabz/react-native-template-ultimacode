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
          Settings: 'settings',
          Showcase: 'showcase',
        },
      },
      Details: 'details/:id',
    },
  },
};
