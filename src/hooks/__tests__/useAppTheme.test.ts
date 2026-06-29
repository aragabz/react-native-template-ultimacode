import { renderHook } from '@testing-library/react-native';
import { useThemeStore } from '@store/useThemeStore';
import { useAppTheme } from '../useAppTheme';

// useAppTheme uses useColorScheme from react-native.
// The global jest.setup mocks useAppTheme directly, so we need to unmock it
// and instead control the theme store + system color scheme.
jest.unmock('@hooks/useAppTheme');

// Mock useColorScheme at module level
let mockColorScheme: 'light' | 'dark' | null = 'light';
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockColorScheme,
}));

describe('useAppTheme', () => {
  beforeEach(() => {
    mockColorScheme = 'light';
    useThemeStore.setState({ mode: 'system' });
  });

  it('returns light colors when system is light and mode is system', async () => {
    mockColorScheme = 'light';
    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(false);
    expect(result.current.colors.background).toBe('#FFFFFF');
  });

  it('returns dark colors when system is dark and mode is system', async () => {
    mockColorScheme = 'dark';
    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(true);
    expect(result.current.colors.background).toBe('#000000');
  });

  it('forces light mode regardless of system', async () => {
    mockColorScheme = 'dark';
    useThemeStore.setState({ mode: 'light' });

    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(false);
    expect(result.current.colors.primary).toBe('#007AFF');
  });

  it('forces dark mode regardless of system', async () => {
    mockColorScheme = 'light';
    useThemeStore.setState({ mode: 'dark' });

    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(true);
    expect(result.current.colors.primary).toBe('#0A84FF');
  });

  it('returns full color palette', async () => {
    const { result } = await renderHook(() => useAppTheme());

    expect(result.current.colors).toHaveProperty('primary');
    expect(result.current.colors).toHaveProperty('background');
    expect(result.current.colors).toHaveProperty('surface');
    expect(result.current.colors).toHaveProperty('text');
    expect(result.current.colors).toHaveProperty('textSecondary');
    expect(result.current.colors).toHaveProperty('border');
    expect(result.current.colors).toHaveProperty('error');
    expect(result.current.colors).toHaveProperty('success');
  });
});
