import React from 'react';
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface CardHeaderProps extends ViewProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const getPaddingValue = (padding: 'none' | 'sm' | 'md' | 'lg'): number => {
  switch (padding) {
    case 'sm': return theme.spacing[8];
    case 'md': return theme.spacing[16];
    case 'lg': return theme.spacing[24];
    case 'none':
    default: return 0;
  }
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  padding = 'md',
  style,
  children,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.header,
        { padding: getPaddingValue(padding) },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
