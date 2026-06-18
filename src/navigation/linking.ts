import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from '@navigation/types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rn-template://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          SignUp: 'signup',
          ForgotPassword: 'forgot-password',
        },
      },
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
