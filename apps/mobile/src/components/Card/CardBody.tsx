import React from 'react';
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface CardBodyProps extends ViewProps {
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

export const CardBody: React.FC<CardBodyProps> = ({
  padding = 'md',
  style,
  children,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.body,
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
  body: {
    width: '100%',
    flexDirection: 'column',
  },
});
