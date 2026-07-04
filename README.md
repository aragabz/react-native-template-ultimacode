# React Native Template — UltimaCode

A production-ready React Native template with Expo modules, Zustand, TanStack Query, React Navigation, i18n (RTL-ready), and a full UI component library.

## Features

- ⚡ **React Native 0.86** with New Architecture enabled
- 🏗️ **Expo modules** (no Expo Go — bare workflow with cherry-picked modules)
- 🧭 **React Navigation 7** — native-stack, bottom-tabs, deep linking
- 🗂️ **Zustand** — lightweight state management with persist middleware
- 🔄 **TanStack Query v5** — data fetching, caching, background refresh
- 🌍 **i18next** — multi-language with RTL support (English + Arabic)
- 🎨 **Themed UI components** — Button, TextField, Card, Modal, Toast, Icon, OptimizedImage, and more
- 🔐 **Auth flow** — Login, Sign Up, Forgot Password with secure token storage + refresh
- 🛡️ **Error Boundary** — graceful crash recovery with crash reporting integration
- 📡 **Network awareness** — offline banner + useNetworkStatus hook
- 🔔 **Push notifications** — expo-notifications with permission management
- 🔑 **Biometric auth** — fingerprint/face unlock via expo-local-authentication
- 🖼️ **Optimized images** — expo-image with memory+disk caching
- 👋 **Onboarding flow** — conditional first-launch screens
- 📊 **Analytics & Crash Reporting** — pluggable service abstractions (Sentry/Segment ready)
- ✅ **Zod validation** — runtime API response validation
- 🧪 **Jest + RNTL** — 150+ tests with coverage thresholds (70/70/60/55)
- 🔄 **CI/CD** — GitHub Actions (lint, typecheck, test)
- ♿ **Accessibility** — roles, labels, states on all UI components
- 📏 **ESLint + Prettier + Husky** — enforced code quality on every commit
- 🛤️ **Path aliases** — clean imports via `@components/`, `@store/`, `@constants/`, etc.
- 🧰 **CLI scaffolding tool** — `npx react-native-template-ultimacode MyApp`

---

## Creating a New Project

### Option 1 — CLI (recommended)

```sh
npx react-native-template-ultimacode MyApp
cd MyApp
yarn install
```

The CLI handles renaming all files, packages, and identifiers automatically.

### Option 2 — GitHub Template

Click **"Use this template"** on the [GitHub repository](https://github.com/aragabz/react-native-template-ultimacode), then:

```sh
git clone git@github.com:your-org/your-new-app.git
cd your-new-app
```

### Option 3 — degit (no Git history)

```sh
npx degit aragabz/react-native-template-ultimacode my-app
cd my-app
```

### Option 4 — Manual clone

```sh
git clone git@github.com:aragabz/react-native-template-ultimacode.git my-app
cd my-app
rm -rf .git && git init
```

### After scaffolding (Options 2–4)

1. Run `./create.sh MyApp ./. com.yourcompany.myapp` — or manually:
2. Search for `ReactNativeTemplate` across the project and replace with your app name.
3. Update names in `app.json` and `package.json`.
4. Rename `ios/ReactNativeTemplate.xcodeproj` and `ios/ReactNativeTemplate/`.
5. Run `yarn install`.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 22.11.0 |
| Yarn | Berry (v4) |
| CocoaPods | Latest (iOS) |
| Xcode | 15+ (iOS) |
| Android Studio | Latest + JDK 17 (Android) |

## Getting Started

```sh
yarn install
# Environment files are already included:
# .env.development, .env.staging, .env.production
```

### iOS

```sh
cd ios && bundle exec pod install && cd ..
yarn ios
```

### Android

```sh
yarn android
```

---

## Project Structure

```
src/
├── app/                # App entry, providers, splash handling
├── components/
│   └── ui/             # Reusable UI primitives (Button, TextField, Card, Modal, Toast, Icon, etc.)
├── constants/          # App-wide constants
├── hooks/              # Custom React hooks (useAppTheme, etc.)
├── i18n/               # Translations (en.json, ar.json) and RTL management
├── navigation/         # RootNavigator, TabNavigator, AuthNavigator, types, deep linking
├── screens/            # Screen components
│   └── auth/           # Login, SignUp, ForgotPassword
├── services/           # API client (Axios), endpoint definitions, React Query hooks
├── store/              # Zustand stores (auth, theme, settings, counter)
├── theme/              # Colors (light/dark), spacing, typography, icon sizes
├── types/              # Global type declarations (SVG, __DEV__)
└── utils/              # Utility functions
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  ErrorBoundary + CrashReporting                         │
├─────────────────────────────────────────────────────────┤
│  App.tsx (providers: Gesture, SafeArea, QueryClient, Nav)│
│  ├── OfflineBanner (network status indicator)            │
│  └── Toast (global notifications)                        │
├─────────────────────────────────────────────────────────┤
│  Navigation Layer (React Navigation)                     │
│  ├── OnboardingScreen (first-launch gate)                │
│  ├── AuthNavigator (Login, SignUp, ForgotPassword)       │
│  └── TabNavigator (Home, Demo, Showcase*, Settings)      │
├─────────────────────────────────────────────────────────┤
│  State: Zustand           │  Data: TanStack Query        │
│  (auth, theme, settings)  │  (API hooks + Zod validation)│
├─────────────────────────────────────────────────────────┤
│  Services: Axios client + endpoint modules               │
│  Analytics │ Crash Reporting │ Push Notifications         │
├─────────────────────────────────────────────────────────┤
│  Hooks: useAppTheme, useNetworkStatus, useAppUpdate,     │
│         usePushNotifications, useBiometrics               │
├─────────────────────────────────────────────────────────┤
│  Utils: date, timing, validators, string                 │
│  Constants: storageKeys, regex, config, endpoints        │
└─────────────────────────────────────────────────────────┘
* Showcase tab visible in __DEV__ mode only
```

---

## Path Aliases

| Alias | Maps To |
|-------|---------|
| `@api/*` | `src/services/*` |
| `@components/*` | `src/components/*` |
| `@screens/*` | `src/screens/*` |
| `@store/*` | `src/store/*` |
| `@services/*` | `src/services/*` |
| `@hooks/*` | `src/hooks/*` |
| `@utils/*` | `src/utils/*` |
| `@constants` | `src/constants` |
| `@navigation/*` | `src/navigation/*` |
| `@i18n` | `src/i18n` |
| `@theme` | `src/theme` |

Aliases are configured in `tsconfig.json`, `babel.config.js`, `metro.config.js`, and `jest.config.js`.

---

## UI Components

All components are exported from `@components/ui`:

| Component | Description |
|-----------|-------------|
| `Button` | Variants: primary, secondary, outline, ghost. Supports loading/disabled states. |
| `TextField` | Labeled input with error state, secure entry, multiline. |
| `Card` | Elevated container with border and shadow. |
| `Modal` | Overlay modal with title, close button, backdrop dismiss. |
| `Toast` | Animated notification (success/error/info) via `useToastStore`. |
| `LoadingSpinner` | Centered ActivityIndicator with optional message. |
| `EmptyState` | Placeholder with title, message, and optional CTA. |
| `Icon` | Wraps `@expo/vector-icons` with themed sizes. |
| `SvgIcon` | Inline SVG rendering via `react-native-svg`. |
| `ErrorBoundary` | Catches React errors with fallback UI + crash reporting. |
| `OfflineBanner` | Red banner shown when device is offline. |
| `OptimizedImage` | expo-image wrapper with caching, transitions, contentFit. |

### Icon Families

`MaterialIcons` (default), `MaterialCommunityIcons`, `Ionicons`, `FontAwesome`, `Feather`, `AntDesign`, `Entypo`, `EvilIcons`, `Fontisto`, `Foundation`, `Octicons`, `SimpleLineIcons`, `Zocial`.

```tsx
import { Icon } from '@components/ui';

<Icon name="home" size="md" />
<Icon family="Ionicons" name="person-circle" size="lg" color="#007AFF" />
```

### SVG Files

`.svg` files are transformed into React components via `react-native-svg-transformer`:

```tsx
import Logo from '../assets/logo.svg';
<Logo width={100} height={100} />
```

---

## State Management (Zustand)

| Store | Purpose | Persisted |
|-------|---------|-----------|
| `useAuthStore` | User, token, login/logout, hydration | ✅ |
| `useThemeStore` | Light/dark/system mode | ✅ (MMKV) |
| `useSettingsStore` | Language, onboarding flag | ✅ (MMKV) |
| `useCounterStore` | Demo counter | ❌ |
| `useToastStore` | Toast visibility & message | ❌ |

All persisted stores use `devtools` middleware (enabled in `__DEV__` only).

---

## Theming (Dark / Light Mode)

The template has full dark/light mode support via the `useAppTheme` hook — the single source of truth for all components and screens.

### How It Works

```
useThemeStore (persisted)     useColorScheme() (system)
        │                              │
        └──────── useAppTheme ─────────┘
                      │
              { colors, isDark }
                      │
        ┌─────────────┼─────────────┐
   Components       Screens     Navigation
```

1. **`useThemeStore`** persists the user's choice: `'light'`, `'dark'`, or `'system'`
2. **`useAppTheme()`** resolves the effective theme by combining the store value with the system color scheme
3. **Every screen and component** calls `useAppTheme()` — no hardcoded colors anywhere

### Usage

```tsx
import { useAppTheme } from '@hooks/useAppTheme';

const MyScreen = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
};
```

### Switching Themes

```tsx
import { useThemeStore } from '@store/useThemeStore';

const { setMode } = useThemeStore();
setMode('dark');   // force dark
setMode('light');  // force light
setMode('system'); // follow device setting
```

### Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `primary` | `#007AFF` | `#0A84FF` |
| `background` | `#FFFFFF` | `#000000` |
| `surface` | `#F2F2F7` | `#1C1C1E` |
| `text` | `#000000` | `#FFFFFF` |
| `textSecondary` | `#3C3C43` (60%) | `#EBEBF5` (60%) |
| `border` | `#C6C6C8` | `#38383A` |
| `error` | `#FF3B30` | `#FF453A` |
| `success` | `#34C759` | `#30D158` |

Add new tokens in `src/theme/colors.ts` — they'll be available everywhere via `useAppTheme()`.

### Navigation Theme

`App.tsx` passes a React Navigation theme derived from `useAppTheme()`, so header bars, tab bars, and stack backgrounds all follow the current mode automatically.

---

## Environment Variables with react-native-dotenv

This template uses `react-native-dotenv` with `@env` imports.

- Babel plugin: `module:react-native-dotenv` in `babel.config.js`
- Module name: `@env`
- Environment selection: `NODE_ENV`

Supported files:

- `.env`
- `.env.development`
- `.env.staging`
- `.env.production`

Import variables in code:

```ts
import { API_URL, API_KEY } from '@env';
```

TypeScript declarations for `@env` are defined in `src/types/env.d.ts`.

---

## Data Fetching (TanStack Query)

API hooks live in `src/services/hooks/`. The Axios client (`src/services/apiClient.ts`) is configured with:
- `baseURL` from `APP_CONFIG.API_BASE_URL`
- `timeout` from `APP_CONFIG.API_TIMEOUT`

`APP_CONFIG.API_BASE_URL` resolves in this order:
1. `API_URL` imported from `@env`
2. Default: `https://dummyjson.com`

```tsx
import { usePosts } from '@api/hooks/usePosts';

const { data, isLoading, isError, refetch } = usePosts();
```

---

## Internationalization (i18n)

- Supported languages: **English** (`en`), **Arabic** (`ar`)
- Device locale is auto-detected on first launch
- Language preference is persisted in MMKV
- RTL layout is applied automatically for Arabic
- The app tree remounts on RTL change via a key mechanism

```tsx
import { changeLanguage } from '@i18n';
changeLanguage('ar'); // switches language and applies RTL
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_URL` | Base URL for the API client | `https://dummyjson.com` |
| `API_KEY` | API key (optional) | — |
| `ENABLE_ANALYTICS` | Feature flag | `false` |
| `SENTRY_DSN` | Crash reporting DSN (optional) | — |

Configure values in `.env.development`, `.env.staging`, and `.env.production`. Values are exposed via Expo `extra` and available through `expo-constants` at runtime.

In app code, import variables from `@env`:

```ts
import { API_URL, ENABLE_ANALYTICS } from '@env';
```

> ⚠️ Do not commit real secrets in any `.env.*` file.

---

## Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn start:dev` | Start Metro with development env |
| `yarn start:staging` | Start Metro with staging env |
| `yarn start:prod` | Start Metro with production env |
| `yarn ios` | Run on iOS simulator |
| `yarn ios:dev` | Run iOS app with development env |
| `yarn ios:staging` | Run iOS app with staging env |
| `yarn ios:prod` | Run iOS app with production env |
| `yarn android` | Run on Android emulator |
| `yarn android:dev` | Run Android app with development env |
| `yarn android:staging` | Run Android app with staging env |
| `yarn android:prod` | Run Android app with production env |
| `yarn test` | Run Jest test suite |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | Lint source files |
| `yarn lint:fix` | Auto-fix lint issues |
| `yarn typecheck` | Run TypeScript compiler check |
| `yarn format` | Format with Prettier |
| `yarn format:check` | Check formatting |

---

## Testing

Tests use **Jest** + **React Native Testing Library**. Run with:

```sh
yarn test
```

Test structure mirrors source:
```
src/
├── components/ui/__tests__/   # UI component tests
├── navigation/__tests__/      # Navigator integration tests
├── screens/__tests__/         # Screen render tests
├── screens/auth/__tests__/    # Auth screen tests
├── services/hooks/__tests__/  # API hook tests
└── store/__tests__/           # Store unit tests
```

Mocks are centralized in `jest.setup.js` (native modules, navigation, i18n, storage).

---

## Native Module Configuration

| Module | iOS | Android |
|--------|-----|---------|
| react-native-screens | Auto-linked | Auto-linked |
| react-native-safe-area-context | Auto-linked | Auto-linked |
| react-native-gesture-handler | Auto-linked | Already configured in template |
| expo-secure-store | Keychain Sharing entitlement (auto) | EncryptedSharedPreferences (min SDK 23) |
| expo-splash-screen | LaunchScreen.storyboard | Splash theme in styles.xml |
| expo-status-bar | `UIViewControllerBasedStatusBarAppearance = YES` | No extra config |
| expo-font | Font files bundled as resources | Fonts in `assets/fonts/` |
| react-native-svg | Auto-linked | Auto-linked (JDK 17+) |
| @expo/vector-icons | Icon fonts bundled in binary | Icon fonts bundled in APK |

---

## Deep Linking

Configured in `src/navigation/linking.ts` with the `rn-template://` prefix:

| Route | Path |
|-------|------|
| Login | `rn-template://login` |
| Sign Up | `rn-template://signup` |
| Forgot Password | `rn-template://forgot-password` |
| Home | `rn-template://home` |
| Demo | `rn-template://demo` |
| Settings | `rn-template://settings` |
| Details | `rn-template://details/:id` |

---

## Build Troubleshooting

### Android: "jlink executable does not exist"

Gradle is resolving a JRE instead of a full JDK. Fix:

```sh
export JAVA_HOME=$(/usr/libexec/java_home)
```

Or add to `android/gradle.properties`:

```properties
org.gradle.java.home=/path/to/your/jdk17
```

---

## Adding Custom Fonts

1. Place `.ttf` / `.otf` files in `src/theme/fonts/`.
2. Register in `useFonts()` in `src/app/App.tsx`:

```ts
const [fontsLoaded] = useFonts({
  'Inter-Regular': require('../theme/fonts/Inter-Regular.ttf'),
  'Inter-Bold': require('../theme/fonts/Inter-Bold.ttf'),
});
```

3. Reference by name in `src/theme/typography.ts`.

---

## Environment Configuration

The project supports multiple environments via `.env` files:

| File | Purpose |
|------|---------|
| `.env.development` | Development environment values |
| `.env.staging` | Staging environment values |
| `.env.production` | Production environment values |

Switch environments by setting `NODE_ENV` before running:

```sh
NODE_ENV=staging npx expo start
```

Or use package scripts:

```sh
yarn start:staging
yarn ios:staging
yarn android:staging
```

`app.config.ts` automatically applies per-env bundle identifiers and app names.

---

## Testing

```sh
yarn test              # Run all tests
yarn test --coverage   # Run with coverage report
yarn test --watch      # Watch mode
```

Coverage thresholds are enforced: 70% statements, 70% lines, 60% branches, 55% functions.

---

## Contributing

1. **Fork** the repository and create a feature branch from `develop`.
2. **Install** dependencies: `yarn install`
3. **Write tests first** — follow TDD. All new features must include tests.
4. **Follow existing patterns** — use path aliases, Zustand for state, hooks for logic.
5. **Lint before committing** — `yarn lint` (Husky runs this automatically).
6. **Keep commits atomic** — one logical change per commit with descriptive messages.
7. **Open a PR** — target `develop`, fill the template, and request review.

### Code Style

- TypeScript strict mode enabled
- ESLint with import ordering enforced
- Prettier for formatting
- No `console.log` in production code (use crash reporting / analytics services)

---

## License

MIT
