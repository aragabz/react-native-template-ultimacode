jest.mock('@hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      surface: '#F2F2F7',
      text: '#000000',
      textSecondary: '#3C3C4399',
      border: '#C6C6C8',
      error: '#FF3B30',
      success: '#34C759',
    },
    isDark: false,
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, null]),
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('expo-constants', () => {
  const Constants = {
    expoConfig: {
      extra: {
        apiUrl: 'https://jsonplaceholder.typicode.com',
        apiKey: 'test-key',
        enableAnalytics: false,
      },
    },
    manifest: {},
  };
  return { __esModule: true, default: Constants };
});

jest.mock('react-i18next', () => {
  const en = require('./src/i18n/en.json');

  const flatten = (obj, prefix) => {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixed = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(acc, flatten(obj[key], prefixed));
      } else {
        acc[prefixed] = obj[key];
      }
      return acc;
    }, {});
  };

  const flatEn = flatten(en, '');

  return {
    useTranslation: () => ({
      t: (key, params) => {
        let value = flatEn[key] || key;
        if (params) {
          Object.entries(params).forEach(([k, v]) => {
            value = value.replace(`{{${k}}}`, String(v));
          });
        }
        return value;
      },
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
    }),
    initReactI18next: { type: '3rdParty', init: jest.fn() },
  };
});

jest.mock('@i18n', () => ({
  changeLanguage: jest.fn(),
  getCurrentLanguage: () => 'en',
  onRtlChange: () => jest.fn(),
  default: jest.fn().mockResolvedValue('en'),
  __esModule: true,
}));

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }],
  getCalendars: () => [],
  locale: 'en',
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  const SafeAreaProvider = ({ children }) =>
    React.createElement(React.Fragment, null, children);
  const SafeAreaView = ({ children, style }) =>
    React.createElement('View', { style }, children);
  return {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    SafeAreaInsetsContext: React.createContext(insets),
    SafeAreaFrameContext: React.createContext(frame),
    initialWindowMetrics: { insets, frame },
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const mockComponent = (displayName) => {
    const Comp = (props) => React.createElement('View', props, props.children);
    Comp.displayName = displayName;
    return Comp;
  };
  return {
    default: mockComponent('Svg'),
    Svg: mockComponent('Svg'),
    SvgXml: () => null,
    SvgUri: () => null,
    Circle: mockComponent('Circle'),
    Rect: mockComponent('Rect'),
    Path: mockComponent('Path'),
    Line: mockComponent('Line'),
    G: mockComponent('G'),
    Text: mockComponent('Text'),
    Polygon: mockComponent('Polygon'),
    Polyline: mockComponent('Polyline'),
    Ellipse: mockComponent('Ellipse'),
    Defs: mockComponent('Defs'),
    ClipPath: mockComponent('ClipPath'),
    LinearGradient: mockComponent('LinearGradient'),
    RadialGradient: mockComponent('RadialGradient'),
    Stop: mockComponent('Stop'),
    Image: mockComponent('Image'),
    Use: mockComponent('Use'),
    Symbol: mockComponent('Symbol'),
    TSpan: mockComponent('TSpan'),
    Mask: mockComponent('Mask'),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    TouchableOpacity: View,
    TouchableHighlight: View,
    TouchableWithoutFeedback: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    PureNativeButton: View,
    gestureHandlerRootHOC: (Component) => Component,
    Directions: {},
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi',
  }),
}));

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Image: React.forwardRef((props, ref) =>
      React.createElement(View, { ...props, ref }),
    ),
  };
});

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn().mockResolvedValue({ status: 'undetermined' }),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getExpoPushTokenAsync: jest.fn().mockResolvedValue({ data: 'ExponentPushToken[mock]' }),
  setNotificationHandler: jest.fn(),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  AndroidImportance: { MAX: 5 },
  setNotificationChannelAsync: jest.fn(),
}));

jest.mock('expo-device', () => ({
  isDevice: true,
}));

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn().mockResolvedValue(true),
  isEnrolledAsync: jest.fn().mockResolvedValue(true),
  authenticateAsync: jest.fn().mockResolvedValue({ success: true }),
  AuthenticationType: { FINGERPRINT: 1, FACIAL_RECOGNITION: 2, IRIS: 3 },
  supportedAuthenticationTypesAsync: jest.fn().mockResolvedValue([1, 2]),
}));
