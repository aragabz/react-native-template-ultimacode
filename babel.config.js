module.exports = (api) => ({
  presets: ['babel-preset-expo'],
  plugins: [
    // Jest maps `@env` to __mocks__/env.js instead: the inlining is unreliable
    // once coverage instrumentation has rewritten the code.
    !api.env('test') && [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@api': './src/services',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@i18n': './src/i18n',
          '@theme': './src/theme',
        },
      },
    ],
  ].filter(Boolean),
});
