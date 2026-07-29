import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, ActivityIndicator, RefreshControl } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../../components';
import { HomeHeader } from './components/HomeHeader';
import { QuickFilters } from './components/QuickFilters';
import { FeaturedListingsSection } from './components/FeaturedListingsSection';
import { NearbyListingsSection } from './components/NearbyListingsSection';
import { RecommendedListingsSection } from './components/RecommendedListingsSection';
import { useListings } from '../../hooks/listings';

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError, error, refetch, isRefetching } = useListings();

  const listings = data?.items || [];

  const renderContent = () => {
    if (isLoading && !isRefetching) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.surfacePrimary} />
          <AppText variant="bodyBase" style={styles.loadingText}>جاري تحميل العقارات...</AppText>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <AppText variant="bodyBase" color="error" style={styles.errorText}>
            {error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل العقارات'}
          </AppText>
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
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={refetch} 
            colors={[theme.colors.surfacePrimary]} 
            tintColor={theme.colors.surfacePrimary} 
          />
        }
      >
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
  bottomSpacer: {
    height: theme.spacing[40],
  },
});
