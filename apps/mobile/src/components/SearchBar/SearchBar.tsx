import React from 'react';
import { TextInput } from 'react-native';
import { Input, InputProps } from '../Input';
import { AppIcon } from '../AppIcon';

export interface SearchBarProps extends Omit<InputProps, 'leftSlot' | 'rightSlot' | 'clearable' | 'isPassword' | 'label' | 'errorMessage' | 'helperText' | 'required'> {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  loading?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
}

export const SearchBar = React.forwardRef<TextInput, SearchBarProps>(({
  placeholder = 'بحث...',
  ...rest
}, ref) => {
  return (
    <Input
      ref={ref}
      placeholder={placeholder}
      leftSlot={<AppIcon name="Search" size="md" color="secondary" />}
      clearable={true}
      returnKeyType="search"
      autoCorrect={false}
      autoCapitalize="none"
      accessibilityRole="search"
      {...rest}
    />
  );
});

SearchBar.displayName = 'SearchBar';
