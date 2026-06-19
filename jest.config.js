module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|@tanstack|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|expo-status-bar|expo-font|expo-splash-screen|expo-constants|expo-secure-store|@expo/vector-icons|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@theme$': '<rootDir>/src/theme',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.(ttf|otf|png|jpg|jpeg|gif|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
