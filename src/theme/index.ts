import { colors, Colors } from './colors';
import { elevation, Elevation } from './elevation';
import { iconSizes, IconSizes } from './iconSizes';
import { radii, Radii } from './radii';
import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
  iconSizes,
  radii,
  elevation,
};

export type { Colors, Spacing, Typography, IconSizes, Radii, Elevation };
export { colors, spacing, typography, iconSizes, radii, elevation };
