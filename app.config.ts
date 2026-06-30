import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const ENV = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    name: 'ReactNativeTemplate (Dev)',
    bundleIdentifier: 'com.template.dev',
    package: 'com.template.dev',
  },
  staging: {
    name: 'ReactNativeTemplate (Staging)',
    bundleIdentifier: 'com.template.staging',
    package: 'com.template.staging',
  },
  production: {
    name: 'ReactNativeTemplate',
    bundleIdentifier: 'com.template.app',
    package: 'com.template.app',
  },
} as const;

const currentEnv = envConfig[ENV as keyof typeof envConfig] ?? envConfig.development;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: currentEnv.name,
  slug: 'reactnativetemplate',
  version: '1.0.0',
  ios: {
    ...config.ios,
    bundleIdentifier: currentEnv.bundleIdentifier,
  },
  android: {
    ...config.android,
    package: currentEnv.package,
  },
  extra: {
    env: ENV,
    apiUrl: process.env.API_URL ?? 'https://jsonplaceholder.typicode.com',
    apiKey: process.env.API_KEY ?? '',
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
    sentryDsn: process.env.SENTRY_DSN ?? '',
  },
});
