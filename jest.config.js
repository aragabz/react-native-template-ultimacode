module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|@tanstack|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|expo|expo-.*|@expo/.*|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants$': '<rootDir>/src/constants',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@i18n$': '<rootDir>/src/i18n',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@theme$': '<rootDir>/src/theme',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.(ttf|otf|png|jpg|jpeg|gif|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 55,
      lines: 70,
      statements: 70,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/__tests__/**',
  ],
};
