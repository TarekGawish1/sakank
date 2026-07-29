import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { Typography } from './Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-16 py-8 rounded-sm',    // radius 8px (sm), padding small
  md: 'px-24 py-12 rounded-md',   // radius 12px (md), padding medium
  lg: 'px-32 py-16 rounded-lg',   // radius 16px (lg), padding large
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const isEffectivelyDisabled = disabled || isLoading;

  // Base classes for the container
  let containerClasses = `flex-row items-center justify-center ${sizeClasses[size]}`;
  let labelColor: 'inverse' | 'brand' | 'primary' | 'disabled' = 'inverse';

  if (isEffectivelyDisabled) {
    containerClasses += ' bg-neutrals-100 border border-neutrals-200';
    labelColor = 'disabled';
  } else {
    switch (variant) {
      case 'primary':
        containerClasses += ' bg-primary-500 active:bg-primary-700';
        labelColor = 'inverse';
        break;
      case 'secondary':
        containerClasses += ' bg-primary-50 active:bg-primary-100';
        labelColor = 'brand';
        break;
      case 'outline':
        containerClasses += ' bg-transparent border border-neutrals-200 active:bg-neutrals-50';
        labelColor = 'primary';
        break;
      case 'ghost':
        containerClasses += ' bg-transparent active:bg-neutrals-50';
        labelColor = 'brand';
        break;
    }
  }

  return (
    <TouchableOpacity
      className={`${containerClasses} ${className}`}
      disabled={isEffectivelyDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={labelColor === 'inverse' ? '#FFFFFF' : '#155EEF'} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <View className="me-8">{leftIcon}</View>}
          <Typography variant="label" color={labelColor} align="center">
            {label}
          </Typography>
          {rightIcon && <View className="ms-8">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};
