import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { theme } from '../../theme';
import { AppText, Button, Card, ListingCard, AppIcon } from '../../components';

interface MockListing {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  rating: number;
  featured?: boolean;
}

const MOCK_FAVORITES: MockListing[] = [
  {
    id: '1',
    title: 'فيلا فاخرة في الياسمين',
    location: 'الرياض، حي الياسمين',
    price: '2,500,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    title: 'شقة مودرن مطلة',
    location: 'جدة، الشاطئ',
    price: '85,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
  },
  {
    id: '3',
    title: 'دور أرضي بحديقة',
    location: 'الدمام، حي الفيصلية',
    price: '1,200,000',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.2,
  }
];

type ViewState = 'loading' | 'error' | 'empty' | 'data';

export const FavoritesScreen: React.FC = () => {
  // For demonstration, we default to 'data' state.
  // In a real app, this would be determined by API/local storage hooks.
  const [viewState, setViewState] = useState<ViewState>('data');
  const [data, setData] = useState<MockListing[]>(MOCK_FAVORITES);

  const handleRemoveFavorite = (id: string) => {
    // UI only task, no actual logic.
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <AppText variant="title1" color="textPrimary" weight="bold">
        المفضلة
      </AppText>
      <AppText variant="bodySm" color="textSecondary" style={styles.subtitle}>
        العقارات التي قمت بحفظها
      </AppText>
      
      {viewState === 'data' && (
        <View style={styles.countContainer}>
          <AppText variant="label" color="textPrimary" weight="medium">
            {data.length} عقار محفوظ
          </AppText>
        </View>
      )}
    </View>
  );

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
          onPress={() => setViewState('loading')}
          hierarchy="secondary"
        />
      </Card>
    </View>
  );

  const renderLoadingSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((key) => (
        <View key={key} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
            <View style={styles.skeletonPrice} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderListingItem: ListRenderItem<MockListing> = ({ item }) => (
    <View style={styles.listingWrapper}>
      <ListingCard
        image={item.image}
        title={item.title}
        location={item.location}
        price={item.price}
        rating={item.rating}
        featured={item.featured}
        favorite={true}
        onFavoritePress={() => handleRemoveFavorite(item.id)}
      />
    </View>
  );

  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return renderLoadingSkeleton();
      case 'error':
        return renderErrorState();
      case 'empty':
        return renderEmptyState();
      case 'data':
      default:
        return (
          <FlatList
            data={data}
            renderItem={renderListingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
          />
        );
    }
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
    paddingTop: theme.spacing[24],
    paddingBottom: theme.spacing[16],
    backgroundColor: theme.colors.surfaceDefault,
  },
  subtitle: {
    marginTop: theme.spacing[4],
  },
  countContainer: {
    marginTop: theme.spacing[16],
    paddingVertical: theme.spacing[8],
    paddingHorizontal: theme.spacing[12],
    backgroundColor: theme.colors.surfaceSubdued,
    alignSelf: 'flex-start',
    borderRadius: theme.radius.full,
  },
  container: {
    flex: 1,
  },
  stateContainer: {
    flex: 1,
    padding: theme.spacing[24],
    justifyContent: 'center',
  },
  listContent: {
    padding: theme.spacing[24],
    paddingTop: theme.spacing[8],
  },
  listingWrapper: {
    marginBottom: theme.spacing[24],
  },
  
  // Empty State Styles
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

  // Error State Styles
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

  // Skeleton Styles
  skeletonContainer: {
    padding: theme.spacing[24],
    gap: theme.spacing[24],
  },
  skeletonCard: {
    width: '100%',
    gap: theme.spacing[12],
  },
  skeletonImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  skeletonContent: {
    gap: theme.spacing[8],
    paddingHorizontal: theme.spacing[4],
  },
  skeletonTitle: {
    width: '70%',
    height: 16,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  skeletonSubtitle: {
    width: '40%',
    height: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSubdued,
    marginTop: theme.spacing[4],
  },
  skeletonPrice: {
    width: '30%',
    height: 18,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSubdued,
    marginTop: theme.spacing[8],
  },
});
