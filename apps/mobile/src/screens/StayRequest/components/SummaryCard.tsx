import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export const SummaryCard = () => {
  return (
    <View style={styles.container}>
      <AppText variant="title2" weight="bold" color="textPrimary" style={styles.title}>
        ملخص الدفع
      </AppText>

      <View style={styles.row}>
        <AppText variant="bodySm" color="textSecondary">الإيجار الشهري</AppText>
        <AppText variant="bodySm" color="textPrimary">2,500,000 ريال</AppText>
      </View>

      <View style={styles.row}>
        <AppText variant="bodySm" color="textSecondary">رسوم الخدمة</AppText>
        <AppText variant="bodySm" color="textPrimary">5,000 ريال</AppText>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <AppText variant="bodyBase" weight="bold" color="textPrimary">الإجمالي</AppText>
        <AppText variant="bodyBase" weight="bold" color="brandPrimary">2,505,000 ريال</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.xl,
    padding: theme.spacing[20],
    gap: theme.spacing[16],
  },
  title: {
    marginBottom: theme.spacing[4],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
    marginVertical: theme.spacing[4],
  }
});
