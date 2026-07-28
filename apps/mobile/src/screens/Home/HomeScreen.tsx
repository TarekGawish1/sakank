import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../../components';
import { HomeHeader } from './components/HomeHeader';
import { QuickFilters } from './components/QuickFilters';
import { FeaturedListingsSection } from './components/FeaturedListingsSection';
import { NearbyListingsSection } from './components/NearbyListingsSection';
import { RecommendedListingsSection } from './components/RecommendedListingsSection';
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
      const response = await ListingsApi.getListings({ _t: Date.now() });
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
      <View>
        <FeaturedListingsSection data={listings} />
        <NearbyListingsSection data={listings} />
        <RecommendedListingsSection data={listings} />
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
  bottomSpacer: {
    height: theme.spacing[40],
  },
});
