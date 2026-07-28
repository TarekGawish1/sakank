import { colors, palette } from './colors';
import { typography, fonts } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { elevation } from './elevation';
import { opacity } from './opacity';
import { layout } from './layout';

export const theme = {
  colors,
  palette,
  typography,
  fonts,
  spacing,
  radius,
  elevation,
  opacity,
  layout,
};

export type Theme = typeof theme;
