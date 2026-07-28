import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

export const NoticeCard = () => {
  return (
    <View style={styles.container}>
      <AppIcon name="Info" size="md" color="secondary" />
      <AppText variant="caption" color="textSecondary" style={styles.text}>
        سيقوم المالك بمراجعة طلبك قبل قبوله. لن يتم سحب أي مبلغ حتى يتم قبول الطلب.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[16],
    backgroundColor: theme.colors.surfaceSubdued,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    gap: theme.spacing[12],
  },
  text: {
    flex: 1,
    lineHeight: 20,
  }
});
