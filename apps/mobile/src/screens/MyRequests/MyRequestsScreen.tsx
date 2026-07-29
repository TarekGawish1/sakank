import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../../components';
import {
  RequestCard,
  FilterChips,
  EmptyState,
  RequestsSkeleton,
  ErrorCard,
} from './components';
import { RequestStatus } from './components/StatusBadge';
import { useMyStayRequests } from '../../hooks/stayRequests';
import { useSession } from '../../hooks/auth/useSession';
import { StayRequestResponse } from '../../api/stayRequests.api';
import { AppIcon, Button } from '../../components';

export const MyRequestsScreen: React.FC = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useMyStayRequests();
  const { user, isGuest, logout } = useSession();

  const requests = data?.items || [];

  const renderHeader = () => (
    <View style={styles.header}>
      <AppText variant="title1" color="textPrimary" weight="bold">
        طلباتي
      </AppText>
      <AppText variant="bodySm" color="textSecondary" style={styles.subtitle}>
        تابع جميع طلبات السكن الخاصة بك
      </AppText>
    </View>
  );

  const renderItem: ListRenderItem<StayRequestResponse> = ({ item }) => (
    <RequestCard 
      id={item.id}
      image={item.listing.primaryImage || 'https://via.placeholder.com/800x600?text=No+Image'}
      title={item.listing.title}
      address={item.listing.location}
      requestedDate={new Date(item.createdAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
      moveInDate={new Date(item.moveInDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
      price={item.listing.monthlyRent.toString()}
      status={item.status.toLowerCase() as RequestStatus}
    />
  );

  const renderContent = () => {
    if (isGuest && !user) {
      return (
        <View style={styles.guestContainer}>
          <View style={styles.guestIconContainer}>
            <AppIcon name="AlertCircle" size="xl" color="tertiary" />
          </View>
          <AppText variant="title2" color="textPrimary" weight="bold" style={styles.guestTitle}>
            يرجى تسجيل الدخول
          </AppText>
          <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.guestDesc}>
            يجب عليك تسجيل الدخول لعرض طلباتك
          </AppText>
          <Button
            title="تسجيل الدخول"
            onPress={() => logout()}
            hierarchy="primary"
            size="large"
            style={styles.guestButton}
          />
        </View>
      );
    }

    if (isLoading && !isRefetching) {
      return <RequestsSkeleton />;
    }

    if (isError) {
      return <ErrorCard onRetry={() => refetch()} />;
    }

    if (requests.length === 0) {
      return <EmptyState />;
    }

    return (
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={refetch} 
            colors={[theme.colors.surfacePrimary]} 
            tintColor={theme.colors.surfacePrimary} 
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <View style={styles.filtersContainer}>
        <FilterChips />
      </View>
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
  },
  subtitle: {
    marginTop: theme.spacing[4],
  },
  filtersContainer: {
    paddingBottom: theme.spacing[16],
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  listContent: {
    padding: theme.spacing[24],
  },
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[32],
  },
  guestIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceDefault,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[24],
  },
  guestTitle: {
    marginBottom: theme.spacing[8],
  },
  guestDesc: {
    marginBottom: theme.spacing[32],
  },
  guestButton: {
    width: '100%',
  }
});
