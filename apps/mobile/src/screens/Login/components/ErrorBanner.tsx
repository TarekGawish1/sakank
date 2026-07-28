import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <AppIcon name="AlertCircle" size="sm" color="error" />
      <AppText variant="caption" color="textError" weight="medium" style={styles.text}>
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceErrorSubtle,
    padding: theme.spacing[12],
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderError,
    gap: theme.spacing[8],
    marginBottom: theme.spacing[24],
  },
  text: {
    flex: 1,
  }
});
