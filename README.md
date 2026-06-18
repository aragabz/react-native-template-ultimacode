# React Native Template

## Prerequisites

- Node.js >= 22.11.0
- Yarn
- CocoaPods (for iOS)
- Xcode (for iOS)
- Android Studio (for Android)

## Getting Started

```sh
yarn install
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

## Project Structure

```
src/
├── app/              # App entry point, providers
├── components/ui/    # Reusable UI primitives
├── navigation/       # Navigators, types, linking config
├── screens/          # Screen components
│   └── auth/         # Auth flow screens
├── services/         # API client, endpoints, hooks
├── store/            # Zustand stores
├── theme/            # Colors, spacing, typography
├── types/            # Global type declarations
└── utils/            # Utility functions
```

## Native Module Configuration

This project integrates several Expo modules. Below are the native configurations required for each.

### react-native-screens

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. `pod 'RNScreens'` is auto-linked. |
| Android  | No special permissions. Uses `androidx.fragment.app.Fragment`. |

### react-native-safe-area-context

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Auto-linked. |
| Android  | No special permissions. Auto-linked. |

### react-native-gesture-handler

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Auto-linked. |
| Android  | `MainActivity.java` must extend `ReactActivity` and delegate `onCreate` to `GestureHandlerRootView`. Already configured in this template. |

### react-native-async-storage / @react-native-async-storage/async-storage

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Auto-linked. |
| Android  | No special permissions. Auto-linked. |

### expo-secure-store

| Platform | Requirement |
|----------|-------------|
| iOS      | **Keychain Sharing** entitlement must be enabled in `ios/<project>/<project>.entitlements`. Xcode auto-manages this when the pod is linked. |
| Android  | Uses `EncryptedSharedPreferences` (AndroidX Security Crypto). Min SDK 23+. |

### expo-splash-screen

| Platform | Requirement |
|----------|-------------|
| iOS      | A `LaunchScreen.storyboard` must exist (created by default RN init). The module hooks into it to show/hide the splash. |
| Android  | A splash theme is defined in `android/app/src/main/res/values/styles.xml`. The module manages its visibility. |

### expo-status-bar

| Platform | Requirement |
|----------|-------------|
| iOS      | `UIViewControllerBasedStatusBarAppearance` must be `YES` (default in this template). |
| Android  | No special permissions. Manages the translucent status bar via `setSystemUiVisibility`. |

### expo-font

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Font files are bundled as resources. |
| Android  | No special permissions. Font files are placed in `android/app/src/main/assets/fonts/`. |

### react-native-screens (native-stack)

| Platform | Requirement |
|----------|-------------|
| iOS      | Must have `RNScreens` pod installed. iOS 12+ required. |
| Android  | No additional setup. |

## Android Permissions (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

This is required for network requests through `axios`. No additional permissions are declared since the template does not use camera, location, or notifications.

## iOS Info.plist Keys

- `NSAppTransportSecurity` — Allows arbitrary loads for development; restrict in production.
- `UIViewControllerBasedStatusBarAppearance` — Enables per-view-controller status bar styling (required by `expo-status-bar`).
- `UILaunchStoryboardName` — References the launch screen used by `expo-splash-screen`.

## Environment Variables

| Variable    | Description                  | Default                          |
|-------------|------------------------------|----------------------------------|
| `API_URL`   | Base URL for the API client  | `https://jsonplaceholder.typicode.com` |
| `API_KEY`   | API key (optional)           | —                                |
| `ENABLE_ANALYTICS` | Feature flag           | `false`                          |

Values are loaded from `.env` at build time and exposed via `expo-constants` `extra` config.

## Adding Custom Fonts

1. Place `.ttf` or `.otf` files in `src/theme/fonts/`.
2. Register them in the `useFonts()` call in `src/app/App.tsx`:

```ts
const [fontsLoaded] = useFonts({
  'Inter-Regular': require('../theme/fonts/Inter-Regular.ttf'),
  'Inter-Bold': require('../theme/fonts/Inter-Bold.ttf'),
});
```

3. Reference them by name in your `typography.ts` theme file.
