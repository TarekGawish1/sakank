import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../../theme';
import { AppText, AppIcon } from '../../../../components';

export const PropertyHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.badges}>
        <View style={styles.badge}>
          <AppText variant="caption" color="textInverse" weight="bold">فيلا</AppText>
        </View>
        <View style={[styles.badge, styles.availableBadge]}>
          <AppText variant="caption" color="success" weight="bold">متاح</AppText>
        </View>
      </View>
      
      <View style={styles.titleRow}>
        <AppText variant="headline" color="textPrimary" weight="bold" style={styles.title}>
          فيلا فاخرة بتصميم عصري
        </AppText>
      </View>

      <AppText variant="title1" color="brandPrimary" weight="bold" style={styles.price}>
        2,500,000 ريال
      </AppText>

      <View style={styles.locationContainer}>
        <AppIcon name="MapPin" size="sm" color="tertiary" />
        <AppText variant="bodySm" color="textSecondary" style={styles.address}>
          الرياض، حي الملقا، شارع الأمير محمد بن سعد
        </AppText>
      </View>
      
      <View style={styles.locationContainer}>
        <AppIcon name="Navigation" size="sm" color="tertiary" />
        <AppText variant="caption" color="textTertiary" style={styles.address}>
          يبعد 2 كم عن المركز
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[24],
    gap: theme.spacing[12],
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing[8],
    marginBottom: theme.spacing[4],
  },
  badge: {
    paddingHorizontal: theme.spacing[12],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.brandPrimary,
  },
  availableBadge: {
    backgroundColor: theme.colors.surfaceSuccessSubtle,
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
  },
  price: {
    marginTop: -theme.spacing[4],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[8],
  },
  address: {
    flex: 1,
  },
});
