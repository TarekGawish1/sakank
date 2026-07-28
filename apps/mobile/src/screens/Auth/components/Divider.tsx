import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text = 'أو' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text ? (
        <AppText variant="caption" color="textSecondary" style={styles.text}>
          {text}
        </AppText>
      ) : null}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[32],
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
  },
  text: {
    paddingHorizontal: theme.spacing[16],
  }
});
