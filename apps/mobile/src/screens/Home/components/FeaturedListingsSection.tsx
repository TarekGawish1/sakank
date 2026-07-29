import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../../theme';
import { AppText, ListingCard, AppIcon } from '../../../components';
import { ListingFeedItem } from '../../../api/listings.api';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useFavorites, useToggleFavorite } from '../../../hooks/favorites';

interface FeaturedListingsSectionProps {
  data: ListingFeedItem[];
}

export const FeaturedListingsSection: React.FC<FeaturedListingsSectionProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: favoritesData } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();
  
  const favoriteIds = new Set(favoritesData?.items?.map(f => f.id) || []);

  const featured = data.filter(l => l.isFeatured).length > 0 
    ? data.filter(l => l.isFeatured) 
    : data.slice(0, 5);

  if (featured.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="title2" color="textPrimary">عقارات مميزة</AppText>
          <AppText variant="bodyBase" color="textSecondary" style={styles.subtitle}>
            اكتشف أفضل السكنات المختارة
          </AppText>
        </View>
        <Pressable style={styles.arrowButton}>
          <AppIcon name="ArrowLeft" size="sm" color="textPrimary" />
        </Pressable>
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
              location={`${typeof item.location.area === 'object' ? (item.location.area as any).name : item.location.area}، ${typeof item.location.city === 'object' ? (item.location.city as any).name : item.location.city}`}
              price={item.monthlyRent}
              featured={item.isFeatured}
              favorite={favoriteIds.has(item.id)}
              available={item.availabilityStatus === 'AVAILABLE' || item.availabilityStatus === 'متاح'}
              imageAspectRatio={1}
              onPress={() => navigation.navigate('PropertyDetails', { listingId: item.id })}
              onFavoritePress={() => toggleFavorite(item.id)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[16],
    marginBottom: theme.spacing[16],
  },
  headerText: {
    flex: 1,
  },
  arrowButton: {
    padding: theme.spacing[8],
    backgroundColor: theme.colors.surfaceNeutral,
    borderRadius: theme.radius.full,
  },
  subtitle: {
    marginTop: theme.spacing[2],
  },
  list: {
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[12],
  },
  cardWrapper: {
    width: 160,
  },
});
