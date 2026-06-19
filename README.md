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

### react-native-svg

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Auto-linked. |
| Android  | No special permissions. Auto-linked. Requires JDK 17+ (see Build Troubleshooting below). |

### @expo/vector-icons & react-native-svg-transformer

| Platform | Requirement |
|----------|-------------|
| iOS      | No special entitlements. Icon fonts are bundled in the app binary. |
| Android  | No special permissions. Icon fonts are bundled in the APK. |

## Icons

### Vector Icons (Icon component)

The `Icon` component wraps `@expo/vector-icons` with theme defaults:

```tsx
import { Icon } from '@components/ui';

// Material Design (default)
<Icon name="home" size="md" color={colors.light.primary} />

// Other families
<Icon family="Ionicons" name="person-circle" />
<Icon family="MaterialCommunityIcons" name="heart" />
<Icon family="FontAwesome" name="star" />

// Sizes from theme: xs, sm, md, lg, xl, xxl (or a number)
```

Supported families: `MaterialIcons`, `MaterialCommunityIcons`, `Ionicons`, `FontAwesome`, `Feather`.

### SVG Icons (SvgIcon component)

For inline SVGs:

```tsx
import { SvgIcon } from '@components/ui';
import { Circle, Rect } from 'react-native-svg';

<SvgIcon width={24} height={24} viewBox="0 0 24 24">
  <Circle cx={12} cy={12} r={10} fill="red" />
</SvgIcon>
```

To import `.svg` files as React components, place them in `src/assets/` and import:

```tsx
import Logo from '@assets/logo.svg';
// Renders as a React Native SVG component
```

## Build Troubleshooting

### Android: "jlink executable does not exist"

If the Android build fails with:

```
jlink executable .../jre/.../bin/jlink does not exist
```

Gradle is resolving a JRE instead of a full JDK. Fix by ensuring `JAVA_HOME` points to a JDK 17+:

```sh
# Set before running yarn android:
export JAVA_HOME=$(/usr/libexec/java_home)
# Or point to your specific JDK:
export JAVA_HOME=/Users/me/.sdkman/candidates/java/current
```

Alternatively, add to `android/gradle.properties`:

```properties
org.gradle.java.home=/path/to/your/jdk
```

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
