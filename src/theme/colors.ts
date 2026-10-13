/**
 * Semantic color tokens. Screens and components should only use these names,
 * never raw hex values, so light/dark (and a rebrand) are a one-file change.
 *
 * Layering: `background` (screen) < `surface` (cards, bars, sheets) <
 * `surfaceSecondary` (inputs, secondary buttons, fills inside a surface).
 */
export const colors = {
  light: {
    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    primaryMuted: 'rgba(0, 122, 255, 0.12)',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    surfaceSecondary: '#F2F2F7',
    text: '#000000',
    textSecondary: 'rgba(60, 60, 67, 0.6)',
    textTertiary: 'rgba(60, 60, 67, 0.3)',
    border: '#D1D1D6',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    onStatus: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
    shadow: '#000000',
  },
  dark: {
    primary: '#0A84FF',
    onPrimary: '#FFFFFF',
    primaryMuted: 'rgba(10, 132, 255, 0.2)',
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: 'rgba(235, 235, 245, 0.6)',
    textTertiary: 'rgba(235, 235, 245, 0.3)',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    onStatus: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: '#000000',
  },
};

export type Colors = typeof colors.light;
