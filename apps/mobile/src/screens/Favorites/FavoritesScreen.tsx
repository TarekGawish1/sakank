import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Pressable } from 'react-native';
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

const MOCK_TODAY: MockListing[] = [
  {
    id: '1',
    title: 'فيلا فاخرة',
    location: '5 غرف • جديد',
    price: '2,500,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
  },
  {
    id: '2',
    title: 'شقة مودرن',
    location: 'غرفة 1 • 5.0',
    price: '85,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
  }
];

const MOCK_YESTERDAY: MockListing[] = [
  {
    id: '3',
    title: 'دور أرضي',
    location: '4.99 • عائلية',
    price: '1,200,000',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.99,
  },
  {
    id: '4',
    title: 'شقة استوديو',
    location: 'غرفة 1 • 4.96',
    price: '45,000',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.96,
  },
  {
    id: '5',
    title: 'غرفة فندقية',
    location: 'سرير 1',
    price: '30,000',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
  }
];

type ViewState = 'loading' | 'error' | 'empty' | 'data';

export const FavoritesScreen: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('data');

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <AppIcon name="ArrowLeft" size="md" color="primary" style={styles.backIcon} />
        <Pressable onPress={() => {}}>
          <AppText variant="button" color="textPrimary" weight="bold" style={styles.editBtn}>
            تعديل
          </AppText>
        </Pressable>
      </View>
      <AppText variant="display" color="textPrimary" weight="bold" style={styles.mainTitle}>
        المفضلة
      </AppText>
    </View>
  );

  const renderGridSection = (title: string, data: MockListing[]) => (
    <View style={styles.sectionContainer}>
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.sectionTitle}>
        {title}
      </AppText>
      <View style={styles.grid}>
        {data.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <ListingCard
              image={item.image}
              title={item.title}
              location={item.location}
              price={item.price}
              rating={item.rating}
              favorite={true}
              onFavoritePress={() => {}}
            />
          </View>
        ))}
      </View>
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
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {renderGridSection('اليوم', MOCK_TODAY)}
            {renderGridSection('الأمس', MOCK_YESTERDAY)}
          </ScrollView>
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
