import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

interface AuthHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon name={icon as any} size="xl" color="primary" />
      </View>
      <AppText variant="display" color="textPrimary" weight="bold" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="bodyBase" color="textSecondary" align="center">
        {subtitle}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing[8],
    marginBottom: theme.spacing[32],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[16],
  },
  title: {
    textAlign: 'center',
  }
});
