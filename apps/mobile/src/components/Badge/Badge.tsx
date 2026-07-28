import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { AppText, SemanticColor } from '../AppText';

export type BadgeVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type BadgeAppearance = 'solid' | 'soft' | 'outlined';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  appearance = 'soft',
  size = 'md',
  leftSlot,
  rightSlot,
  style,
  accessibilityLabel,
}) => {
  // Determine Text and Background Colors
  let bgColor = 'transparent';
  let borderColor = 'transparent';
  let textColor: SemanticColor = 'textPrimary';

  switch (variant) {
    case 'brand':
      if (appearance === 'solid') {
        bgColor = theme.colors.surfacePrimary;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.colors.surfacePrimarySubtle;
        textColor = 'textBrand';
      } else {
        borderColor = theme.colors.borderBrand;
        textColor = 'textBrand';
      }
      break;

    case 'success':
      if (appearance === 'solid') {
        bgColor = theme.colors.success;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.palette.green50;
        textColor = 'success';
      } else {
        borderColor = theme.colors.success;
        textColor = 'success';
      }
      break;

    case 'warning':
      if (appearance === 'solid') {
        bgColor = theme.colors.warning;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.palette.orange50;
        textColor = 'warning';
      } else {
        borderColor = theme.colors.warning;
        textColor = 'warning';
      }
      break;

    case 'error':
      if (appearance === 'solid') {
        bgColor = theme.colors.error;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.colors.surfaceErrorSubtle;
        textColor = 'error';
      } else {
        borderColor = theme.colors.borderError;
        textColor = 'error';
      }
      break;

    case 'info':
      if (appearance === 'solid') {
        bgColor = theme.colors.info;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.palette.blue50;
        textColor = 'info';
      } else {
        borderColor = theme.colors.info;
        textColor = 'info';
      }
      break;

    case 'neutral':
    default:
      if (appearance === 'solid') {
        bgColor = theme.colors.surfaceInverse;
        textColor = 'textInverse';
      } else if (appearance === 'soft') {
        bgColor = theme.colors.surfaceSubdued;
        textColor = 'textSecondary';
      } else {
        borderColor = theme.colors.borderStrong;
        textColor = 'textSecondary';
      }
      break;
  }

  // Determine Size properties
  let paddingV = 0;
  let paddingH = 0;
  let typographyVariant: 'caption' | 'label' | 'bodySm' = 'caption';
  
  switch (size) {
    case 'lg':
      paddingV = 6;
      paddingH = theme.spacing[12];
      typographyVariant = 'bodySm';
      break;
    case 'md':
      paddingV = theme.spacing[4];
      paddingH = theme.spacing[8];
      typographyVariant = 'label';
      break;
    case 'sm':
    default:
      paddingV = 2;
      paddingH = 6;
      typographyVariant = 'caption';
      break;
  }

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: appearance === 'outlined' ? 1 : 0,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
        },
        style,
      ]}
      accessible={true}
      accessibilityLabel={accessibilityLabel || label}
    >
      {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}
      <AppText variant={typographyVariant} color={textColor} numberOfLines={1}>
        {label}
      </AppText>
      {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: theme.radius.full, // pill shape
  },
  leftSlot: {
    marginRight: theme.spacing[4],
  },
  rightSlot: {
    marginLeft: theme.spacing[4],
  },
});
