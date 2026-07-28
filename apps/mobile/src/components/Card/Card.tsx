import React from 'react';
import { View, ViewProps, StyleSheet, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { theme, Theme } from '../../theme';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = keyof Theme['radius'];

export interface CardProps extends Omit<ViewProps, 'style'> {
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  pressable?: boolean;
  onPress?: PressableProps['onPress'];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const getPaddingValue = (padding: CardPadding): number => {
  switch (padding) {
    case 'sm':
      return theme.spacing[8];
    case 'md':
      return theme.spacing[16];
    case 'lg':
      return theme.spacing[24];
    case 'none':
    default:
      return 0;
  }
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'none',
  radius = 'md',
  pressable = false,
  disabled = false,
  onPress,
  style,
  children,
  accessibilityRole,
  ...rest
}) => {
  const isPressable = pressable || !!onPress;

  const getVariantStyles = (pressed: boolean): ViewStyle => {
    let baseStyle: ViewStyle = {
      borderRadius: theme.radius[radius],
      padding: getPaddingValue(padding),
      width: '100%',
    };

    switch (variant) {
      case 'outlined':
        baseStyle = {
          ...baseStyle,
          backgroundColor: pressed ? theme.colors.surfaceSubdued : theme.colors.surfaceDefault,
          borderWidth: 1,
          borderColor: theme.colors.borderDefault,
        };
        break;
      case 'filled':
        baseStyle = {
          ...baseStyle,
          backgroundColor: pressed ? theme.colors.surfaceSubdued : theme.colors.surfaceSubdued,
          borderWidth: 0,
        };
        break;
      case 'elevated':
      default:
        baseStyle = {
          ...baseStyle,
          backgroundColor: pressed ? theme.colors.surfaceSubdued : theme.colors.surfaceDefault,
          ...theme.elevation.sm,
          borderWidth: 0,
        };
        break;
    }

    if (disabled) {
      baseStyle.opacity = theme.opacity.disabled;
    }

    return baseStyle;
  };

  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole={accessibilityRole || 'button'}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [getVariantStyles(pressed), style]}
        {...(rest as any)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[getVariantStyles(false), style]}
      accessibilityRole={accessibilityRole}
      {...rest}
    >
      {children}
    </View>
  );
};
