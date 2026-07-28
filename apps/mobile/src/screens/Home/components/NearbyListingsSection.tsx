import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { ListingFeedItem } from '../../../../api/listings.api';

interface NearbyListingsSectionProps {
  data: ListingFeedItem[];
}

export const NearbyListingsSection: React.FC<NearbyListingsSectionProps> = ({ data }) => {
  const nearby = data.slice(0, 2);

  if (nearby.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppText variant="title2" color="textPrimary">بالقرب منك</AppText>
          <AppText variant="bodyBase" color="textSecondary" style={styles.subtitle}>عقارات قريبة من موقعك الحالي</AppText>
        </View>
        <AppText variant="bodyBase" color="textBrand">عرض الكل</AppText>
      </View>
      <View style={styles.list}>
        {nearby.map(item => (
          <ListingCard
            key={item.id}
            image={item.primaryImage || 'https://via.placeholder.com/800x600?text=No+Image'}
            title={item.title}
            location={`${item.location.area}، ${item.location.city}`}
            price={item.monthlyRent}
            featured={item.isFeatured}
            available={item.availabilityStatus === 'AVAILABLE'}
            onPress={() => {}}
            onFavoritePress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing[24],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing[16],
    marginBottom: theme.spacing[16],
  },
  subtitle: {
    marginTop: theme.spacing[4],
  },
  list: {
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[16],
  },
});
