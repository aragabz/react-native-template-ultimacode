# React Native Template — UltimaCode

A production-ready React Native template with Expo modules, Zustand, TanStack Query, React Navigation, i18n (RTL-ready), and a full UI component library.

## Features

- ⚡ **React Native 0.85** with New Architecture enabled
- 🏗️ **Expo modules** (no Expo Go — bare workflow with cherry-picked modules)
- 🧭 **React Navigation 7** — native-stack, bottom-tabs, deep linking
- 🗂️ **Zustand** — lightweight state management with persist middleware
- 🔄 **TanStack Query v5** — data fetching, caching, background refresh
- 🌍 **i18next** — multi-language with RTL support (English + Arabic)
- 🎨 **Themed UI components** — Button, TextField, Card, Modal, Toast, Icon, and more
- 🔐 **Auth flow** — Login, Sign Up, Forgot Password with secure token storage
- 🧪 **Jest + React Native Testing Library** — 25 tests covering stores, hooks, screens, and navigation
- 📏 **ESLint + Prettier + Husky** — enforced code quality on every commit
- 🛤️ **Path aliases** — clean imports via `@components/`, `@store/`, `@theme/`, etc.
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
cp .env.example .env   # Configure your environment
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
├── hooks/              # Custom React hooks
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
┌─────────────────────────────────────────────────────┐
│  App.tsx (providers: Gesture, SafeArea, QueryClient, Nav)  │
├─────────────────────────────────────────────────────┤
│  Navigation Layer (React Navigation)                │
│  ├── AuthNavigator (Login, SignUp, ForgotPassword)  │
│  └── TabNavigator (Home, Demo, Showcase*, Settings) │
├─────────────────────────────────────────────────────┤
│  State: Zustand           │  Data: TanStack Query   │
│  (auth, theme, settings)  │  (API hooks + caching)  │
├─────────────────────────────────────────────────────┤
│  Services: Axios client + interceptors              │
│  (auto-attach token, 401 → logout)                  │
└─────────────────────────────────────────────────────┘
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
| `useAuthStore` | User, token, login/logout, hydration | ✅ (hybrid: AsyncStorage + SecureStore for token) |
| `useThemeStore` | Light/dark/system mode | ✅ (AsyncStorage) |
| `useSettingsStore` | Language, onboarding flag | ✅ (AsyncStorage) |
| `useCounterStore` | Demo counter | ❌ |
| `useToastStore` | Toast visibility & message | ❌ |

All persisted stores use `devtools` middleware (enabled in `__DEV__` only).

---

## Data Fetching (TanStack Query)

API hooks live in `src/services/hooks/`. The Axios client (`src/services/apiClient.ts`) automatically:
- Attaches the Bearer token from `useAuthStore`
- Logs out the user on 401 responses

```tsx
import { usePosts } from '@api/hooks/usePosts';

const { data, isLoading, isError, refetch } = usePosts();
```

---

## Internationalization (i18n)

- Supported languages: **English** (`en`), **Arabic** (`ar`)
- Device locale is auto-detected on first launch
- Language preference is persisted in AsyncStorage
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
| `API_URL` | Base URL for the API client | `https://jsonplaceholder.typicode.com` |
| `API_KEY` | API key (optional) | — |
| `ENABLE_ANALYTICS` | Feature flag | `false` |

Copy `.env.example` to `.env` and configure. Values are exposed via `expo-constants` at build time.

> ⚠️ `.env` is git-ignored. Never commit secrets.

---

## Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn ios` | Run on iOS simulator |
| `yarn android` | Run on Android emulator |
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
| @react-native-async-storage/async-storage | Auto-linked | Auto-linked |
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

## License

MIT
