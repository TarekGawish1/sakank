import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../../theme';
import { AppText, Card, CardBody, AppIcon } from '../../../../components';
import { IconName } from '../../../../components/AppIcon';

const InfoItem = ({ icon, label, value }: { icon: IconName, label: string, value: string | number }) => (
  <View style={styles.infoItem}>
    <View style={styles.iconContainer}>
      <AppIcon name={icon} size="sm" color="primary" />
    </View>
    <AppText variant="caption" color="textSecondary">{label}</AppText>
    <AppText variant="label" color="textPrimary" weight="bold">{value}</AppText>
  </View>
);

export const PropertyInfoCard = () => {
  return (
    <View style={styles.container}>
      <Card variant="outlined" radius="lg">
        <CardBody style={styles.cardBody}>
          <InfoItem icon="BedDouble" label="غرف النوم" value={5} />
          <View style={styles.divider} />
          <InfoItem icon="Bath" label="دورات المياه" value={4} />
          <View style={styles.divider} />
          <InfoItem icon="Maximize" label="المساحة" value="350 م²" />
          <View style={styles.divider} />
          <InfoItem icon="Layers" label="الطابق" value="أرضي" />
        </CardBody>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[24],
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing[16],
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing[4],
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surfacePrimarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.borderSubtle,
  }
});
