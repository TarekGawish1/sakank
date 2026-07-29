import React from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../AppText';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  style,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel || label}
    >
      <AppText
        variant="label"
        weight={selected ? 'semibold' : 'medium'}
        color={selected ? 'textInverse' : 'textSecondary'}
      >
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[16],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  chipSelected: {
    backgroundColor: theme.colors.surfacePrimary,
    borderColor: theme.colors.surfacePrimary,
  },
  chipPressed: {
    opacity: 0.85,
  },
});
