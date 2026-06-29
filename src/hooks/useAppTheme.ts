import { useColorScheme } from 'react-native';
import { useThemeStore } from '@store/useThemeStore';
import { colors, type Colors } from '@theme/colors';

export type AppTheme = {
  colors: Colors;
  isDark: boolean;
};

export const useAppTheme = (): AppTheme => {
  const mode = useThemeStore((s) => s.mode);
  const systemColorScheme = useColorScheme();
  const resolvedMode = mode === 'system' ? systemColorScheme : mode;
  const isDark = resolvedMode === 'dark';

  return {
    colors: isDark ? colors.dark : colors.light,
    isDark,
  };
};
