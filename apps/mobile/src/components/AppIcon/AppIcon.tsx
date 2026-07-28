import React from 'react';
import { I18nManager, View, ViewStyle, StyleProp } from 'react-native';
import { icons } from 'lucide-react-native';
import { theme } from '../../theme';

export type IconName = keyof typeof icons;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'error'
  | 'disabled';

export interface AppIconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
}

const getSizeValue = (size: IconSize): number => {
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

const getColorValue = (color: IconColor): string => {
  switch (color) {
    case 'secondary':
      return theme.colors.iconSecondary;
    case 'tertiary':
      return theme.colors.textTertiary;
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

// Icons that convey directional meaning and should mirror in RTL
const rtlMirrorIcons = new Set([
  'ArrowLeft', 'ArrowRight', 'ArrowLeftCircle', 'ArrowRightCircle',
  'ChevronLeft', 'ChevronRight', 'ChevronFirst', 'ChevronLast',
  'MoveLeft', 'MoveRight', 'LogOut', 'LogIn', 'Undo', 'Redo',
  'MessageCircle', 'Send', 'Share', 'Reply', 'Forward'
]);

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 'md',
  color = 'primary',
  style,
  accessibilityLabel,
  importantForAccessibility,
}) => {
  const IconComponent = icons[name] as React.FC<any>;
  
  if (!IconComponent) {
    if (__DEV__) {
      console.warn(`[AppIcon] Icon "${name}" does not exist in lucide-react-native.`);
    }
    return null;
  }

  const numericSize = getSizeValue(size);
  const resolvedColor = getColorValue(color);
  
  // RTL mirror support
  const shouldMirror = I18nManager.isRTL && rtlMirrorIcons.has(name);
  const mirrorStyle: StyleProp<ViewStyle> = shouldMirror ? { transform: [{ scaleX: -1 }] } : {};

  return (
    <View
      style={[mirrorStyle, style]}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={importantForAccessibility || (accessibilityLabel ? 'yes' : 'no')}
    >
      <IconComponent color={resolvedColor} size={numericSize} />
    </View>
  );
};
