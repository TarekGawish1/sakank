import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';
import { IconName } from '../../../components/AppIcon';

const AMENITIES: { id: string, name: string, icon: IconName }[] = [
  { id: '1', name: 'واي فاي', icon: 'Wifi' },
  { id: '2', name: 'تكييف', icon: 'Wind' },
  { id: '3', name: 'مصعد', icon: 'ArrowUpCircle' },
  { id: '4', name: 'مطبخ', icon: 'Coffee' },
  { id: '5', name: 'حراسة', icon: 'Shield' },
  { id: '6', name: 'مواقف', icon: 'Car' },
];

export const AmenitiesSection = () => {
  return (
    <View style={styles.container}>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.title}>
        المرافق والخدمات
      </AppText>
      
      <View style={styles.grid}>
        {AMENITIES.map((item) => (
          <View key={item.id} style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <AppIcon name={item.icon} size="sm" color="primary" />
            </View>
            <AppText variant="bodySm" color="textSecondary" align="center">
              {item.name}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[24],
  },
  title: {
    marginBottom: theme.spacing[16],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[16],
  },
  amenityItem: {
    width: '30%',
    alignItems: 'center',
    gap: theme.spacing[8],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
