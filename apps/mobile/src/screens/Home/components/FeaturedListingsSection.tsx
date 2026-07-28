import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { ListingFeedItem } from '../../../../api/listings.api';

interface FeaturedListingsSectionProps {
  data: ListingFeedItem[];
}

export const FeaturedListingsSection: React.FC<FeaturedListingsSectionProps> = ({ data }) => {
  const featured = data.filter(l => l.isFeatured).length > 0 
    ? data.filter(l => l.isFeatured) 
    : data.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title2" color="textPrimary">عقارات مميزة</AppText>
        <AppText variant="bodyBase" color="textSecondary" style={styles.subtitle}>اكتشف أفضل السكنات المختارة</AppText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {featured.map(item => (
          <View key={item.id} style={styles.cardWrapper}>
            <ListingCard
              image={item.primaryImage || 'https://via.placeholder.com/800x600?text=No+Image'}
              title={item.title}
              location={`${item.location.area}، ${item.location.city}`}
              price={item.monthlyRent}
              featured={item.isFeatured}
              available={item.availabilityStatus === 'AVAILABLE'}
              onPress={() => {}}
              onFavoritePress={() => {}}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing[24],
  },
  header: {
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
  cardWrapper: {
    width: 320,
  },
});
