# React Native Template — Copilot Instructions

This is a **React Native + Expo** template (v0.86.0 RN, v57.0.1 Expo) using **TypeScript**, **Yarn**, **Zustand**, **TanStack React Query**, **React Navigation**, **Zod**, **i18next**, and **MMKV**.

## Project structure

```
src/
  app/App.tsx           # Root entry — providers, splash screen, init
  components/ui/        # Reusable UI components
  screens/              # Screen components (suffixed with "Screen")
  navigation/           # RootNavigator + TabNavigator + types
  store/                # Zustand stores
  services/             # Axios client, query client, endpoints, hooks
  hooks/                # Custom React hooks (useAppTheme, useNetworkStatus, etc.)
  theme/                # colors, typography, spacing, iconSizes
  i18n/                 # i18next init + en.json + ar.json
  constants/            # config, storageKeys, regex
  types/                # Ambient type declarations
  utils/                # Pure utility functions
```

## Import aliases

Use `@components/`, `@screens/`, `@store/`, `@services/`, `@hooks/`, `@utils/`, `@constants`, `@theme`, `@i18n`, `@navigation/`. Environment variables from `@env`.

## Conventions

- **Named exports** for everything except `App.tsx` (default export).
- **PascalCase** for files: components, screens, stores, hooks.
- **camelCase** for utilities, constants, services.
- `type` over `interface` for props and state.
- Co-locate `__tests__/` next to the file under test.
- Components: destructure defaults in function signature (no `defaultProps`);
  use `StyleSheet.create()` at bottom; dynamic colors via `useAppTheme()`.
- Screens: suffix with `Screen`; receive typed navigation/route props
  (`RootStackScreenProps<'Name'>`, `BottomTabScreenProps<ParamList>`).
- Stores: `create<StoreType>()`, persist with `zustandMMKVStorage`.
- Services: Axios `apiClient`, Zod schema validation on responses,
  TanStack Query hooks in `services/hooks/`.

## Testing

- Jest + `@testing-library/react-native`.
- Run `yarn test`, `yarn test:watch`, `yarn lint`, `yarn typecheck`.
- Husky + lint-staged runs lint/typecheck pre-commit.

## Build & run

- `yarn install` (Yarn Berry, immutable install).
- `yarn start:dev`, `yarn ios:dev`, `yarn android:dev`.
- Multi-env: `.env.development`, `.env.staging`, `.env.production`.

## Styling

- `StyleSheet.create()` — no inline styles for layout.
- Theme tokens from `@theme`: `spacing`, `typography`, `iconSizes`.
- Colors from `useAppTheme()`: `const { colors, isDark } = useAppTheme()`.
- i18n: `useTranslation()` hook, flat JSON files in `src/i18n/`.
- RTL supported via `I18nManager`.
