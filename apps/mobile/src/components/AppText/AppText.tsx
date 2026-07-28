import React, { useMemo } from 'react';
import { Text, TextProps, TextStyle, I18nManager, StyleProp } from 'react-native';
import { theme, Theme } from '../../theme';

export type TypographyVariant = keyof Theme['typography'];
export type SemanticColor = keyof Theme['colors'];
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'auto' | 'left' | 'center' | 'right' | 'justify';

export interface AppTextProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: SemanticColor;
  weight?: TextWeight;
  align?: TextAlign;
  style?: StyleProp<TextStyle>;
}

const ARABIC_REGEX = /[\u0600-\u06FF]/;

const getFontWeightStyle = (weight: TextWeight): TextStyle['fontWeight'] => {
  switch (weight) {
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'regular':
    default:
      return '400';
  }
};

const getAlignmentStyle = (align: TextAlign): TextStyle['textAlign'] => {
  if (align === 'auto') {
    return I18nManager.isRTL ? 'right' : 'left';
  }
  return align;
};

const extractString = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();
  if (Array.isArray(children)) return children.map(extractString).join('');
  return '';
};

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'bodyBase',
  color = 'textPrimary',
  weight,
  align = 'auto',
  style,
  ...rest
}) => {
  const textStr = useMemo(() => extractString(children), [children]);
  const isArabic = ARABIC_REGEX.test(textStr);

  const baseTypography = theme.typography[variant];
  const textColor = theme.colors[color];
  const fontFamily = isArabic ? theme.fonts.arabic : theme.fonts.primary;
  const fontWeight = weight ? getFontWeightStyle(weight) : baseTypography.fontWeight;
  const textAlign = getAlignmentStyle(align);

  const dynamicStyle: TextStyle = {
    ...baseTypography,
    fontFamily,
    fontWeight,
    color: textColor,
    textAlign,
  };

  return (
    <Text style={[dynamicStyle, style]} {...rest}>
      {children}
    </Text>
  );
};
