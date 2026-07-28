import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { MOCK_LISTINGS } from '../mockData';

export const RecommendedListingsSection: React.FC = () => {
  // Mock taking some listings for recommended
  const recommended = MOCK_LISTINGS.slice(2, 5);

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
            {...item}
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
