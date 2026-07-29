import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { theme } from '../../theme';
import { AppText, Button, Card, ListingCard, AppIcon } from '../../components';
import { useFavorites, useToggleFavorite } from '../../hooks/favorites';
import { ListingFeedItem } from '../../api/listings.api';

export const FavoritesScreen: React.FC = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const favorites = data?.items || [];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <AppIcon name="ArrowLeft" size="md" color="primary" style={styles.backIcon} />
      </View>
      <AppText variant="display" color="textPrimary" weight="bold" style={styles.mainTitle}>
        المفضلة
      </AppText>
    </View>
  );

  const renderGridSection = (title: string, data: ListingFeedItem[]) => {
    if (data.length === 0) return null;
    
    return (
      <View style={styles.sectionContainer}>
        <AppText variant="title2" color="textPrimary" weight="bold" style={styles.sectionTitle}>
          {title}
        </AppText>
        <View style={styles.grid}>
          {data.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <ListingCard
                image={item.primaryImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                title={item.title}
                location={`${typeof item.location.area === 'object' ? (item.location.area as any).name : item.location.area}، ${typeof item.location.city === 'object' ? (item.location.city as any).name : item.location.city}`}
                price={item.monthlyRent}
                featured={item.isFeatured}
                available={item.availabilityStatus === 'AVAILABLE' || item.availabilityStatus === 'متاح'}
                favorite={true}
                onFavoritePress={() => toggleFavorite(item.id)}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <AppIcon name="HeartOff" size="xl" color="tertiary" />
      </View>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.emptyTitle}>
        لا توجد عقارات محفوظة
      </AppText>
      <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.emptyDesc}>
        ابدأ بحفظ العقارات التي تعجبك لتظهر هنا.
      </AppText>
      <Button
        title="استكشف العقارات"
        onPress={() => {}}
        hierarchy="primary"
        size="large"
        style={styles.exploreButton}
      />
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.stateContainer}>
      <Card variant="outlined" padding="lg" radius="lg" style={styles.errorCard}>
        <AppIcon name="AlertCircle" size="lg" color="error" style={styles.errorIcon} />
        <AppText variant="title2" color="textPrimary" weight="bold" align="center">
          حدث خطأ
        </AppText>
        <AppText variant="bodySm" color="textSecondary" align="center" style={styles.errorDesc}>
          تعذر تحميل العقارات المحفوظة. يرجى المحاولة مرة أخرى.
        </AppText>
        <Button
          title="إعادة المحاولة"
          onPress={() => refetch()}
          hierarchy="secondary"
        />
      </Card>
    </View>
  );

  const renderLoadingSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.grid}>
        {[1, 2, 3, 4].map((key) => (
          <View key={key} style={styles.gridItem}>
            <View style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonContent}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonSubtitle} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    if (isLoading && !isRefetching) return renderLoadingSkeleton();
    if (isError) return renderErrorState();
    if (favorites.length === 0) return renderEmptyState();

    return (
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={refetch} 
            colors={[theme.colors.surfacePrimary]} 
            tintColor={theme.colors.surfacePrimary} 
          />
        }
      >
        {renderGridSection('عقاراتك المحفوظة', favorites)}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  header: {
    paddingHorizontal: theme.spacing[24],
    paddingTop: theme.spacing[16],
    paddingBottom: theme.spacing[8],
    backgroundColor: theme.colors.surfaceDefault,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[16],
  },
  backIcon: {
    marginLeft: -theme.spacing[8], // Aligns icon with left edge visually
  },
  editBtn: {
    textDecorationLine: 'underline',
  },
  mainTitle: {
    marginBottom: theme.spacing[8],
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing[40],
  },
  sectionContainer: {
    marginTop: theme.spacing[24],
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing[24],
    marginBottom: theme.spacing[16],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing[16], // Slightly less to accommodate grid gaps
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: theme.spacing[8],
    marginBottom: theme.spacing[24],
  },
  
  // State Containers
  stateContainer: {
    flex: 1,
    padding: theme.spacing[24],
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[32],
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceSubdued,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[24],
  },
  emptyTitle: {
    marginBottom: theme.spacing[8],
  },
  emptyDesc: {
    marginBottom: theme.spacing[32],
  },
  exploreButton: {
    width: '100%',
  },
  errorCard: {
    alignItems: 'center',
    gap: theme.spacing[16],
  },
  errorIcon: {
    marginBottom: theme.spacing[8],
  },
  errorDesc: {
    marginBottom: theme.spacing[8],
  },

  // Skeleton
  skeletonContainer: {
    flex: 1,
    paddingTop: theme.spacing[24],
  },
  skeletonCard: {
    width: '100%',
    gap: theme.spacing[8],
  },
  skeletonImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  skeletonContent: {
    gap: theme.spacing[4],
  },
  skeletonTitle: {
    width: '80%',
    height: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  skeletonSubtitle: {
    width: '50%',
    height: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSubdued,
  },
});
