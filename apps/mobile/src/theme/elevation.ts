import { Platform } from 'react-native';
import { palette } from './colors';

// Elevation/Shadows following the design system specs
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    ...Platform.select({
      ios: {
        shadowColor: palette.neutral1000,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  md: {
    ...Platform.select({
      ios: {
        shadowColor: palette.neutral1000,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  lg: {
    ...Platform.select({
      ios: {
        shadowColor: palette.neutral1000,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
};
