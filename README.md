# React Native Template Ultimacode

An Expo + React Native template built with TypeScript, React Navigation, Zustand, TanStack Query, i18next, MMKV, and a reusable UI kit.

This template is designed to be copied into a new app quickly while keeping a clean structure for navigation, state, networking, localization, theming, and native features.

## What’s included

- **Expo / React Native** app shell with TypeScript strict mode
- **React Navigation** with stack + tabs
- **Zustand** for local app state and persisted settings
- **TanStack Query** for server state and caching
- **i18next** with English and Arabic support
- **RTL switching** based on the selected language
- **MMKV storage** for fast persisted and secure local storage
- **Reusable UI components** such as Button, Card, Modal, Toast, EmptyState, LoadingSpinner, TextField, and more
- **Theme system** with light/dark/system mode support
- **Example API layer** using Axios + Zod validation
- **Expo features** like splash screen, notifications, localization, local authentication, and image optimization
- **Test setup** for components, hooks, stores, navigation, and services

## Template structure

```text
src/
  app/            App bootstrap
  components/     Reusable UI components
  constants/      App config, regex, storage keys
  hooks/          Shared hooks
  i18n/           Translations and language setup
  navigation/     Navigators, linking, and route types
  screens/        Example app screens
  services/       API client, query client, storage, analytics, crash reporting
  store/          Zustand stores
  theme/          Colors, spacing, typography, icon sizes
  types/          Global and environment TypeScript declarations
  utils/          Helper functions
```

## App flow

- On first launch, the app shows an **Onboarding** screen.
- After onboarding is dismissed, the app opens the **Main** tab navigator.
- Tabs include **Home**, **Demo**, **Settings**, and **Showcase**.
- A **Details** screen is available from the stack navigator.
- **Showcase** is shown only in development builds.

## Core features

### Navigation

- Root stack: `Onboarding`, `Main`, `Details`
- Bottom tabs: `Home`, `Demo`, `Settings`, `Showcase`
- Deep links:
  - `rn-template://home`
  - `rn-template://demo`
  - `rn-template://settings`
  - `rn-template://showcase`
  - `rn-template://details/:id`

### State management

- `useSettingsStore` persists onboarding and language
- `useThemeStore` persists light/dark/system mode
- `useCounterStore` is a simple example store
- MMKV backs persisted Zustand state

### Networking

- `apiClient` is configured with Axios
- `createQueryClient()` sets default TanStack Query caching and retry behavior
- Example endpoints use Zod schemas for response validation
- Demo screen fetches posts from `/posts`

### Localization

- Languages: **English** and **Arabic**
- Device language is used on first launch
- Selected language is stored locally
- RTL mode is enabled automatically for Arabic

### Theme

- Central theme tokens are defined in `src/theme`
- `useAppTheme()` resolves the active palette from the selected mode and system color scheme

### Native / device features

- Push notifications hook
- Biometric authentication hook
- Network status hook
- App update hook placeholder
- Optional analytics and crash reporting abstractions

## Getting started

### 1) Install dependencies

```bash
yarn install
```

### 2) Install iOS pods

```bash
npx pod-install
```

### 3) Start Metro

```bash
yarn start
```

### 4) Run on a device or simulator

```bash
yarn ios:dev
yarn android:dev
```

You can also use the staging and production scripts:

```bash
yarn ios:staging
yarn ios:prod
yarn android:staging
yarn android:prod
```

## Available scripts

- `yarn start` / `yarn start:dev`
- `yarn start:staging`
- `yarn start:prod`
- `yarn ios:dev`
- `yarn ios:staging`
- `yarn ios:prod`
- `yarn android:dev`
- `yarn android:staging`
- `yarn android:prod`
- `yarn lint`
- `yarn lint:fix`
- `yarn typecheck`
- `yarn format`
- `yarn format:check`
- `yarn test`

## Environment files

The app loads environment-specific values from:

- `.env.development`
- `.env.staging`
- `.env.production`

The active file is selected by `NODE_ENV`.

Supported variables:

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | Chooses the runtime environment |
| `API_URL` | Base URL for Axios requests |
| `API_KEY` | Optional API key placeholder |
| `ENABLE_ANALYTICS` | Enables the analytics abstraction |
| `SENTRY_DSN` | Enables crash reporting integration |

The Expo config also changes the app name and native bundle/package IDs per environment.

## Path aliases

These aliases are configured in Babel, Metro, TypeScript, and Jest:

- `@api`
- `@components`
- `@screens`
- `@store`
- `@services`
- `@hooks`
- `@utils`
- `@constants`
- `@navigation`
- `@i18n`
- `@theme`

## Creating a new app from this template

Use the provided script:

```bash
./create.sh MyApp ~/Projects/MyApp com.mycompany.myapp
```

Arguments:

1. **Project name** in PascalCase
2. **Destination path**
3. **Package namespace / bundle identifier**

The script copies the template, renames iOS and Android identifiers, replaces template strings, and removes generated artifacts.

## Notes

- The app uses `react-native-dotenv` for environment imports.
- SVG files are handled through a custom Metro transformer.
- Tests and mocks are already configured for React Native, navigation, and asset imports.
- The template includes example screens and services so you can replace or extend them for a real product quickly.
