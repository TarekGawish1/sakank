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
        height: 52,
        borderRadius: 26,
        paddingHorizontal: theme.spacing[20],
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(0, 0, 0, 0.05)',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
      }}
      {...rest}
    />
  );
});

SearchBar.displayName = 'SearchBar';
