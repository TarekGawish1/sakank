import React from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  className = '',
  ...props
}) => {
  // rounded-lg is 16px as per Design System for main cards
  const baseClasses = 'bg-white rounded-lg border border-neutrals-200 p-16';
  
  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={onPress} 
        className={`${baseClasses} ${className}`}
        {...props as any}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={`${baseClasses} ${className}`} {...props}>
      {children}
    </View>
  );
};
