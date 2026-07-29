import React from 'react';
import { TextInput } from 'react-native';
import { Input, InputProps } from '../Input';
import { AppIcon } from '../AppIcon';
import { theme } from '../../theme';

export interface SearchBarProps extends Omit<InputProps, 'leftSlot' | 'rightSlot' | 'clearable' | 'isPassword' | 'label' | 'errorMessage' | 'helperText' | 'required'> {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  loading?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
}

export const SearchBar = React.forwardRef<TextInput, SearchBarProps>(({
  placeholder = 'ابحث عن جامعة، حي أو سكن...',
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
      inputContainerStyle={{
        height: theme.spacing[48],
        borderRadius: theme.radius.full,
        paddingHorizontal: theme.spacing[20],
        backgroundColor: theme.colors.surfaceDefault,
        borderColor: theme.colors.borderSubtle,
        borderWidth: 1,
        ...theme.elevation.sm,
      }}
      {...rest}
    />
  );
});

SearchBar.displayName = 'SearchBar';
