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
        <AppText variant="title1" color="textPrimary">عقارات مميزة</AppText>
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
    paddingVertical: theme.spacing[16],
  },
  header: {
    paddingHorizontal: theme.spacing[16],
    marginBottom: theme.spacing[12],
  },
  list: {
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[16],
  },
  cardWrapper: {
    width: 320,
  },
});
