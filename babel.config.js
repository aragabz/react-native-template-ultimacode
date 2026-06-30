module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
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
  ],
};
