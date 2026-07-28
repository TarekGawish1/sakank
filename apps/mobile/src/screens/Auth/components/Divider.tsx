import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <AppText variant="caption" color="textSecondary" style={styles.text}>
        أو
      </AppText>
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
