import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ReactNativeTemplate',
  slug: 'reactnativetemplate',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  },
});
