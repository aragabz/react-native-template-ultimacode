// Values for `@env` under Jest (babel.config.js skips react-native-dotenv in tests).
module.exports = {
  NODE_ENV: 'test',
  API_URL: 'https://dummyjson.com',
  API_KEY: '',
  ENABLE_ANALYTICS: 'false',
  SENTRY_DSN: '',
};
