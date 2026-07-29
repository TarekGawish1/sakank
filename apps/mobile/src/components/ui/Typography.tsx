import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type Variant =
  | 'display-xl'
  | 'display-l'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title-l'
  | 'title-m'
  | 'body-l'
  | 'body-m'
  | 'label'
  | 'caption'
  | 'overline';

type Color = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inverse' | 'brand' | 'error' | 'success';

export interface TypographyProps extends RNTextProps {
  variant?: Variant;
  color?: Color;
  align?: 'left' | 'center' | 'right' | 'auto' | 'justify';
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  'display-xl': 'font-alexandriaBold text-[48px] leading-[58px]',
  'display-l': 'font-alexandriaBold text-[40px] leading-[50px]',
  'h1': 'font-alexandriaBold text-[32px] leading-[40px]',
  'h2': 'font-alexandriaBold text-[28px] leading-[36px]',
  'h3': 'font-alexandriaBold text-[24px] leading-[32px]',
  'title-l': 'font-alexandriaSemiBold text-[20px] leading-[28px]',
  'title-m': 'font-alexandriaSemiBold text-[18px] leading-[26px]',
  'body-l': 'font-alexandria text-[16px] leading-[24px]',
  'body-m': 'font-alexandria text-[14px] leading-[22px]',
  'label': 'font-alexandriaMedium text-[14px] leading-[20px]',
  'caption': 'font-alexandria text-[12px] leading-[18px]',
  'overline': 'font-alexandriaMedium text-[11px] leading-[16px]',
};

const colorStyles: Record<Color, string> = {
  primary: 'text-neutrals-900',
  secondary: 'text-neutrals-600',
  tertiary: 'text-neutrals-500',
  disabled: 'text-neutrals-400',
  inverse: 'text-white',
  brand: 'text-primary-600',
  error: 'text-error-500',
  success: 'text-success-500',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  auto: 'text-auto',
  justify: 'text-justify',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body-m',
  color = 'primary',
  align = 'left',
  className = '',
  style,
  children,
  ...props
}) => {
  const combinedClasses = [
    variantStyles[variant],
    colorStyles[color],
    alignStyles[align],
    // Force writing direction to text-start for RTL support
    'text-start',
    className,
  ].join(' ');

  return (
    <RNText className={combinedClasses} style={style} {...props}>
      {children}
    </RNText>
  );
};
