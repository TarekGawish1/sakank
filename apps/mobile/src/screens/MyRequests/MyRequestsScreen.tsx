import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
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

interface MockRequest {
  id: string;
  image: string;
  title: string;
  address: string;
  requestedDate: string;
  moveInDate: string;
  price: string;
  status: RequestStatus;
}

const MOCK_REQUESTS: MockRequest[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'فيلا فاخرة في الياسمين',
    address: 'الرياض، حي الياسمين',
    requestedDate: '12 أكتوبر 2023',
    moveInDate: '01 نوفمبر 2023',
    price: '2,500,000',
    status: 'pending'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'شقة مودرن مطلة',
    address: 'جدة، الشاطئ',
    requestedDate: '05 سبتمبر 2023',
    moveInDate: '01 أكتوبر 2023',
    price: '85,000',
    status: 'accepted'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'دور أرضي بحديقة',
    address: 'الدمام، حي الفيصلية',
    requestedDate: '20 أغسطس 2023',
    moveInDate: '15 سبتمبر 2023',
    price: '1,200,000',
    status: 'rejected'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'شقة استوديو',
    address: 'الرياض، الملقا',
    requestedDate: '10 يوليو 2023',
    moveInDate: '01 أغسطس 2023',
    price: '45,000',
    status: 'cancelled'
  }
];

type ViewState = 'loading' | 'error' | 'empty' | 'data';

export const MyRequestsScreen: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('data');

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

  const renderItem: ListRenderItem<MockRequest> = ({ item }) => (
    <RequestCard 
      id={item.id}
      image={item.image}
      title={item.title}
      address={item.address}
      requestedDate={item.requestedDate}
      moveInDate={item.moveInDate}
      price={item.price}
      status={item.status}
    />
  );

  const renderContent = () => {
    switch (viewState) {
      case 'loading':
        return <RequestsSkeleton />;
      case 'error':
        return <ErrorCard onRetry={() => setViewState('loading')} />;
      case 'empty':
        return <EmptyState />;
      case 'data':
      default:
        return (
          <FlatList
            data={MOCK_REQUESTS}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        );
    }
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
  }
});
