import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

export const RegisterHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon name="UserPlus" size="xl" color="primary" />
      </View>
      <AppText variant="display" color="textPrimary" weight="bold" style={styles.title}>
        إنشاء حساب
      </AppText>
      <AppText variant="bodyBase" color="textSecondary" align="center">
        أنشئ حسابك للبدء في البحث عن السكن المناسب.
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
