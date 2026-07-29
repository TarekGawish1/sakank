import React, { useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerClassName = '',
  className = '',
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  let borderColor = 'border-neutrals-200';
  if (error) {
    borderColor = 'border-error-500';
  } else if (isFocused) {
    borderColor = 'border-primary-500';
  }

  return (
    <View className={`flex-col gap-4 w-full ${containerClassName}`}>
      {label && (
        <Typography variant="label" color="secondary">
          {label}
        </Typography>
      )}
      
      <View 
        className={`flex-row items-center border bg-white rounded-sm px-12 h-[48px] ${borderColor}`}
      >
        {leftIcon && <View className="me-8">{leftIcon}</View>}
        
        <TextInput
          className={`flex-1 font-alexandria text-[14px] text-neutrals-900 ${className}`}
          placeholderTextColor="#94A3B8"
          textAlign="right"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity 
            className="ms-8" 
            onPress={onRightIconPress} 
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </View>
  );
};
