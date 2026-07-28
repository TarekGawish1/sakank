import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';
import { IconName } from '../../../components/AppIcon';
import { ListingDetails } from '../../../api/listings.api';

// Helper to map backend amenities to icons
const getAmenityIcon = (name: string): IconName => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('wifi') || lowercaseName.includes('إنترنت')) return 'Wifi';
  if (lowercaseName.includes('ac') || lowercaseName.includes('تكييف')) return 'Wind';
  if (lowercaseName.includes('elevator') || lowercaseName.includes('مصعد')) return 'ArrowUpCircle';
  if (lowercaseName.includes('kitchen') || lowercaseName.includes('مطبخ')) return 'Coffee';
  if (lowercaseName.includes('security') || lowercaseName.includes('حراسة')) return 'Shield';
  if (lowercaseName.includes('parking') || lowercaseName.includes('مواقف')) return 'Car';
  return 'CheckCircle';
};

interface AmenitiesSectionProps {
  listing: ListingDetails;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ listing }) => {
  const amenities = listing.amenities || [];

  if (amenities.length === 0) return null;

  return (
    <View style={styles.container}>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.title}>
        المرافق والخدمات
      </AppText>
      
      <View style={styles.grid}>
        {amenities.map((item, index) => (
          <View key={index} style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <AppIcon name={getAmenityIcon(item)} size="sm" color="primary" />
            </View>
            <AppText variant="bodySm" color="textSecondary" align="center">
              {item}
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
