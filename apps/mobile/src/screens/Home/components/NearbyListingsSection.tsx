import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, ListingCard } from '../../../components';
import { MOCK_LISTINGS } from '../mockData';

export const NearbyListingsSection: React.FC = () => {
  // Mock taking some listings for nearby
  const nearby = MOCK_LISTINGS.slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title1" color="textPrimary">بالقرب منك</AppText>
        <AppText variant="bodyBase" color="textBrand">عرض الكل</AppText>
      </View>
      <View style={styles.list}>
        {nearby.map(item => (
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
    paddingVertical: theme.spacing[16],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: theme.spacing[16],
    marginBottom: theme.spacing[12],
  },
  list: {
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[16],
  },
});
