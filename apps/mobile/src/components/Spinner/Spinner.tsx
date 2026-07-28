import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { theme } from '../../theme';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor =
  | 'primary'
  | 'secondary'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'error'
  | 'disabled';

export interface SpinnerProps extends Omit<ActivityIndicatorProps, 'color' | 'size'> {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const getSizeValue = (size: SpinnerSize): number => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 16;
    case 'md':
      return 24;
    case 'lg':
      return 32;
    case 'xl':
      return 48;
    default:
      return 24;
  }
};

const getColorValue = (color: SpinnerColor): string => {
  switch (color) {
    case 'secondary':
      return theme.colors.iconSecondary;
    case 'inverse':
      return theme.colors.iconInverse;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    case 'disabled':
      return theme.colors.textTertiary;
    case 'primary':
    default:
      return theme.colors.iconBrand;
  }
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  accessibilityLabel = 'Loading...',
  importantForAccessibility = 'yes',
  style,
  ...rest
}) => {
  const numericSize = getSizeValue(size);
  const resolvedColor = getColorValue(color);

  return (
    <ActivityIndicator
      size={numericSize}
      color={resolvedColor}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={importantForAccessibility}
      style={style}
      {...rest}
    />
  );
};
