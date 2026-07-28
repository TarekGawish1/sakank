import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Button, AppIcon } from '../../../components';

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon name="Inbox" size="xl" color="tertiary" />
      </View>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.title}>
        لا توجد طلبات
      </AppText>
      <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.desc}>
        ابدأ بإرسال أول طلب سكن.
      </AppText>
      <Button
        title="استكشف العقارات"
        onPress={() => {}}
        hierarchy="primary"
        size="large"
        style={styles.exploreButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[32],
    marginTop: theme.spacing[40], // push it down a bit inside scroll
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceSubdued,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[24],
  },
  title: {
    marginBottom: theme.spacing[8],
  },
  desc: {
    marginBottom: theme.spacing[32],
  },
  exploreButton: {
    width: '100%',
  },
});
