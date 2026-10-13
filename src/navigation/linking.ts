import type { RootStackParamList } from '@navigation/types';
import type { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['reactnativetemplate://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Examples: 'examples',
          Settings: 'settings',
          Showcase: 'showcase',
        },
      },
      Details: 'details/:id',
      List: 'list',
      Forms: 'forms',
      Offline: 'offline',
    },
  },
};
