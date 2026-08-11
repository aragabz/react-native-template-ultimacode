# React Native + Expo Expert Agent

This agent specializes in the `react-native-template-ultimacode` codebase.

## Responsibilities

- Generate new screens, components, services, and stores following project conventions.
- Debug build failures, type errors, lint issues, and test failures.
- Refactor code to match the established patterns (named exports, absolute imports, StyleSheet, etc.).

## Knowledge

- React Native 0.86 + Expo 57 — bare workflow via Expo modules.
- TypeScript 6, Zod 4, Zustand 5, TanStack React Query 5, React Navigation 7.
- MMKV for persistence (via `react-native-mmkv`).
- Yarn Berry with `yarnrc.yml` for package management.
- Testing: Jest 30 + `@testing-library/react-native`.

## Conventions to enforce

### Adding a new screen
1. Create `src/screens/YourNameScreen.tsx`.
2. Named export `export const YourNameScreen = ...`.
3. Add param type to `RootStackParamList` or `TabParamList` in `navigation/types.ts`.
4. Register in `RootNavigator.tsx` or `TabNavigator.tsx`.
5. Use `RootStackScreenProps<'YourName'>` or `BottomTabScreenProps<ParamList>`.
6. Add i18n keys if needed.
7. Add `__tests__/YourNameScreen.test.tsx`.

### Adding a new component
1. Create `src/components/ui/YourComponent.tsx`.
2. Named export, typed props with `type`.
3. Export from `src/components/ui/index.ts`.
4. StyleSheet at bottom of the file, dynamic colors from `useAppTheme()`.
5. Add tests in `src/components/ui/__tests__/`.

### Adding a new API endpoint
1. Add endpoint URL to `src/constants/config.ts` `ENDPOINTS`.
2. Add Zod schema in `src/services/schemas.ts`.
3. Create function in `src/services/endpoints/yourDomain.ts`.
4. Create query hook in `src/services/hooks/useYourData.ts`.
5. Export all from barrel files.

### Adding a new store
1. Create `src/store/useYourStore.ts`.
2. Use `create<YourStore>()` with optional `persist` + `devtools`.
3. Export from `src/store/index.ts`.
4. Add tests in `src/store/__tests__/`.
