import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';
import { ListingDetails } from '../../../api/listings.api';

interface PropertyHeaderProps {
  listing: ListingDetails;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ listing }) => {
  const isAvailable = listing.availabilityStatus === 'متاح' || listing.availabilityStatus === 'AVAILABLE';

  return (
    <View style={styles.container}>
      <View style={styles.badges}>
        <View style={styles.badge}>
          <AppText variant="caption" color="textInverse" weight="bold">
            {listing.unitType || 'عقار'}
          </AppText>
        </View>
        <View style={[styles.badge, isAvailable ? styles.availableBadge : {}]}>
          <AppText variant="caption" color={isAvailable ? "success" : "textInverse"} weight="bold">
            {listing.availabilityStatus || 'غير متاح'}
          </AppText>
        </View>
      </View>
      
      <View style={styles.titleRow}>
        <AppText variant="headline" color="textPrimary" weight="bold" style={styles.title}>
          {listing.title}
        </AppText>
      </View>

      <AppText variant="title1" color="brandPrimary" weight="bold" style={styles.price}>
        {listing.monthlyRent} ريال / شهر
      </AppText>

      <View style={styles.locationContainer}>
        <AppIcon name="MapPin" size="sm" color="tertiary" />
        <AppText variant="bodySm" color="textSecondary" style={styles.address}>
          {typeof listing.location.governorate === 'object' ? (listing.location.governorate as any).name : listing.location.governorate}، {typeof listing.location.city === 'object' ? (listing.location.city as any).name : listing.location.city}، {typeof listing.location.area === 'object' ? (listing.location.area as any).name : listing.location.area}
        </AppText>
      </View>
      
      {/* We can remove or hide the Navigation distance if we don't have it */}
      <View style={styles.locationContainer}>
        <AppIcon name="Navigation" size="sm" color="tertiary" />
        <AppText variant="caption" color="textTertiary" style={styles.address}>
          المسافة غير متوفرة
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
