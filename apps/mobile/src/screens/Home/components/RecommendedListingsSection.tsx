import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { ListingFeedItem } from '../../../../api/listings.api';
import { RootStackParamList } from '../../../../navigation/RootNavigator';

interface RecommendedListingsSectionProps {
  data: ListingFeedItem[];
}

export const RecommendedListingsSection: React.FC<RecommendedListingsSectionProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const recommended = data.slice(2, 5);

  if (recommended.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title2" color="textPrimary">موصى بها لك</AppText>
        <AppText variant="bodyBase" color="textSecondary" style={styles.subtitle}>خيارات تناسب اهتماماتك</AppText>
      </View>
      <View style={styles.list}>
        {recommended.map(item => (
          <ListingCard
            key={item.id}
            image={item.primaryImage || 'https://via.placeholder.com/800x600?text=No+Image'}
            title={item.title}
            location={`${item.location.area}، ${item.location.city}`}
            price={item.monthlyRent}
            featured={item.isFeatured}
            available={item.availabilityStatus === 'AVAILABLE'}
            onPress={() => navigation.navigate('PropertyDetails', { listingId: item.id })}
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
