import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { MOCK_LISTINGS } from '../mockData';

export const FeaturedListingsSection: React.FC = () => {
  const featured = MOCK_LISTINGS.filter(l => l.featured);

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
              {...item}
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
