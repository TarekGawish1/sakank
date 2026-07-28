import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  I18nManager,
} from 'react-native';
import { theme } from '../../theme';

export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonSize = 'large' | 'medium';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  hierarchy = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const isRTL = I18nManager.isRTL;

  // Determine styles based on hierarchy
  const getHierarchyStyles = (
    pressed: boolean
  ): { container: ViewStyle; text: TextStyle; loaderColor: string } => {
    switch (hierarchy) {
      case 'secondary':
        return {
          container: {
            backgroundColor: pressed
              ? theme.colors.surfaceSubdued
              : theme.colors.surfaceDefault,
            borderColor: theme.colors.borderStrong,
            borderWidth: 1,
          },
          text: { color: theme.colors.textPrimary },
          loaderColor: theme.colors.textPrimary,
        };
      case 'tertiary':
        return {
          container: {
            backgroundColor: pressed
              ? theme.colors.surfacePrimarySubtle
              : theme.colors.surfaceSubdued,
            borderWidth: 0,
          },
          text: { color: theme.colors.textBrand },
          loaderColor: theme.colors.textBrand,
        };
      case 'text':
        return {
          container: {
            backgroundColor: pressed
              ? theme.colors.surfaceSubdued
              : 'transparent',
            borderWidth: 0,
          },
          text: { color: theme.colors.textBrand },
          loaderColor: theme.colors.textBrand,
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: pressed
              ? theme.colors.surfacePrimaryPressed
              : theme.colors.surfacePrimary,
            borderWidth: 0,
          },
          text: { color: theme.colors.textInverse },
          loaderColor: theme.colors.textInverse,
        };
    }
  };

  // Determine styles based on size
  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'medium':
        return {
          height: 40,
          paddingHorizontal: theme.spacing[16],
        };
      case 'large':
      default:
        return {
          height: 48,
          paddingHorizontal: theme.spacing[24],
        };
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => {
        const hierarchyStyles = getHierarchyStyles(pressed);
        const sizeStyles = getSizeStyles();

        return [
          styles.baseContainer,
          sizeStyles,
          hierarchyStyles.container,
          isDisabled && styles.disabledContainer,
          style,
        ];
      }}
    >
      {({ pressed }) => {
        const hierarchyStyles = getHierarchyStyles(pressed);

        return (
          <>
            {loading ? (
              <ActivityIndicator
                color={hierarchyStyles.loaderColor}
                size="small"
                style={styles.loader}
              />
            ) : null}

            {!loading && leadingIcon ? (
              <React.Fragment>{leadingIcon}</React.Fragment>
            ) : null}

            <Text
              style={[
                styles.baseText,
                hierarchyStyles.text,
                isDisabled && styles.disabledText,
                textStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>

            {!loading && trailingIcon ? (
              <React.Fragment>{trailingIcon}</React.Fragment>
            ) : null}
          </>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    gap: theme.spacing[8],
  },
  baseText: {
    ...theme.typography.button,
    textAlign: 'center',
  },
  disabledContainer: {
    opacity: theme.opacity.disabled,
  },
  disabledText: {
    // Opacity handles the visual disabled state, but we can override colors if needed
  },
  loader: {
    marginRight: theme.spacing[8],
  },
});
