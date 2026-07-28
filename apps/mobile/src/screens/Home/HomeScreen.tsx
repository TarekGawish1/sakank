import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { AppText, ListingCard } from '../../components';
import { HomeHeader } from './components/HomeHeader';
import { QuickFilters } from './components/QuickFilters';
import { ListingsApi, ListingFeedItem } from '../../api/listings.api';
import { ApiError } from '../../api/errors';

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<ListingFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ListingsApi.getListings();
      setListings(response.items || []);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('حدث خطأ أثناء تحميل العقارات');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.brandPrimary} />
          <AppText variant="bodyBase" style={styles.loadingText}>جاري تحميل العقارات...</AppText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <AppText variant="bodyBase" color="error" style={styles.errorText}>{error}</AppText>
        </View>
      );
    }

    if (listings.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <AppText variant="bodyBase" color="textSecondary">لا توجد عقارات متاحة حالياً</AppText>
        </View>
      );
    }

    return (
      <View style={styles.listContainer}>
        {listings.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            <ListingCard
              image={item.primaryImage || 'https://via.placeholder.com/800x600?text=No+Image'}
              title={item.title}
              location={`${item.location.area}، ${item.location.city}`}
              price={item.monthlyRent}
              ownerName="مالك العقار" // Placeholder since feed doesn't include owner name
              featured={item.isFeatured}
              available={item.availabilityStatus === 'AVAILABLE'}
              onPress={() => {}}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} accessible accessibilityLabel="الشاشة الرئيسية">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <QuickFilters />
        
        {renderContent()}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    padding: theme.spacing[32],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: theme.spacing[16],
    color: theme.colors.textSecondary,
  },
  errorText: {
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[24],
    gap: theme.spacing[16],
  },
  cardWrapper: {
    width: '100%',
  },
  bottomSpacer: {
    height: theme.spacing[40],
  },
});
