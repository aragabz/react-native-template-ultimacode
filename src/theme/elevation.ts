/**
 * Shadow presets. Use with the theme's `shadow` color; in dark mode prefer a
 * hairline `border` instead, since shadows are invisible on black.
 */
export const elevation = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
};

export type Elevation = typeof elevation;
