module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    // Import ordering
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },
          { pattern: 'react-native', group: 'builtin', position: 'before' },
          { pattern: '@**/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    // Unused imports/variables
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // General quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', 'jest.setup.js', '__mocks__/**'],
      env: { jest: true },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
