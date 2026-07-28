import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  I18nManager,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../AppText';
import { Spinner } from '../Spinner';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  // Anatomy
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  
  // Slots
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  
  // Features
  clearable?: boolean;
  onClear?: () => void;
  isPassword?: boolean;
  maxLength?: number;
  
  // State
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  
  // Custom Styles
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    label,
    helperText,
    errorMessage,
    required,
    leftSlot,
    rightSlot,
    prefix,
    suffix,
    clearable,
    onClear,
    isPassword,
    maxLength,
    disabled,
    readOnly,
    loading,
    success,
    error,
    containerStyle,
    inputContainerStyle,
    value,
    defaultValue,
    onChangeText,
    multiline,
    secureTextEntry,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');

  const isRTL = I18nManager.isRTL;
  const isFilled = (value !== undefined ? value.length > 0 : internalValue.length > 0);
  const showClearButton = clearable && isFilled && !disabled && !readOnly;
  const showPasswordToggle = isPassword && !disabled;
  const isError = error || !!errorMessage;

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);
    },
    [onChangeText]
  );

  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText?.('');
    onClear?.();
  }, [onChangeText, onClear]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // Compute Styles
  const getBorderColor = () => {
    if (disabled) return theme.colors.borderSubtle;
    if (isError) return theme.colors.borderError;
    if (success) return theme.colors.success;
    if (isFocused) return theme.colors.borderBrand;
    return theme.colors.borderStrong;
  };

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surfaceDisabled;
    if (isError) return theme.colors.surfaceErrorSubtle;
    return theme.colors.surfaceDefault;
  };

  const textColor = disabled ? theme.colors.textTertiary : theme.colors.textPrimary;
  const currentValueLength = value !== undefined ? value.length : internalValue.length;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label ? (
        <View style={styles.labelContainer}>
          <AppText variant="label" color={disabled ? 'textTertiary' : 'textPrimary'}>
            {label}
            {required && <AppText color="error"> *</AppText>}
          </AppText>
        </View>
      ) : null}

      {/* Input Container */}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            borderWidth: isFocused || isError || success ? 1.5 : 1, // subtle focus bump
            minHeight: multiline ? 80 : 48,
          },
          inputContainerStyle,
        ]}
      >
        {/* Left Slot */}
        {leftSlot && <View style={styles.leftSlot}>{leftSlot}</View>}

        {/* Prefix */}
        {prefix && (
          <AppText variant="bodyBase" color="textSecondary" style={styles.prefix}>
            {prefix}
          </AppText>
        )}

        {/* The Actual Input */}
        <TextInput
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled && !readOnly}
          secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          placeholderTextColor={theme.colors.textTertiary}
          textAlign={isRTL ? 'right' : 'left'}
          style={[
            styles.inputElement,
            {
              color: textColor,
              fontFamily: isRTL ? theme.fonts.arabic : theme.fonts.primary,
              ...theme.typography.bodyBase,
            },
            multiline && styles.inputElementMultiline,
          ]}
          {...rest}
        />

        {/* Loading Indicator */}
        {loading && (
          <Spinner color="primary" size="sm" style={styles.rightSlot} />
        )}

        {/* Suffix */}
        {!loading && suffix && (
          <AppText variant="bodyBase" color="textSecondary" style={styles.suffix}>
            {suffix}
          </AppText>
        )}

        {/* Clear Button */}
        {!loading && showClearButton && !isPassword && (
          <Pressable
            onPress={handleClear}
            style={styles.rightSlot}
            accessibilityRole="button"
            accessibilityLabel="Clear text"
          >
            <AppText variant="caption" color="textTertiary">
              ✕
            </AppText>
          </Pressable>
        )}

        {/* Password Toggle */}
        {!loading && showPasswordToggle && (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.rightSlot}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <AppText variant="label" color="textBrand">
              {isPasswordVisible ? 'Hide' : 'Show'}
            </AppText>
          </Pressable>
        )}

        {/* Right Slot */}
        {!loading && rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
      </View>

      {/* Footer Area: Helper Text / Error / Character Counter */}
      {(helperText || isError || maxLength) && (
        <View style={styles.footerContainer}>
          <View style={styles.footerTextContainer}>
            {isError ? (
              <AppText variant="caption" color="error">
                {errorMessage}
              </AppText>
            ) : helperText ? (
              <AppText variant="caption" color="textSecondary">
                {helperText}
              </AppText>
            ) : null}
          </View>
          
          {maxLength ? (
            <AppText variant="caption" color="textSecondary" style={styles.counterText}>
              {currentValueLength} / {maxLength}
            </AppText>
          ) : null}
        </View>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing[4],
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[12],
  },
  inputElement: {
    flex: 1,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
  },
  inputElementMultiline: {
    textAlignVertical: 'top',
  },
  leftSlot: {
    marginRight: theme.spacing[8],
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSlot: {
    marginLeft: theme.spacing[8],
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefix: {
    marginRight: theme.spacing[4],
  },
  suffix: {
    marginLeft: theme.spacing[4],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing[4],
  },
  footerTextContainer: {
    flex: 1,
    marginRight: theme.spacing[8],
  },
  counterText: {
    textAlign: 'right',
  },
});
