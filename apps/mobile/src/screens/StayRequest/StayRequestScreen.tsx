import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AppText, Card, AppIcon, Button } from '../../components';
import {
  PropertySummaryCard,
  RequestForm,
  SummaryCard,
  NoticeCard,
  BottomCTA,
  SuccessState,
  StayRequestSkeleton
} from './components';
import { useCreateStayRequest } from '../../hooks/stayRequests';

type ViewState = 'loading' | 'error' | 'form' | 'success';
type StayRequestNavProp = NativeStackNavigationProp<HomeStackParamList>;
type StayRequestRouteProp = RouteProp<HomeStackParamList, 'StayRequest'>;

export const StayRequestScreen: React.FC = () => {
  const navigation = useNavigation<StayRequestNavProp>();
  const route = useRoute<StayRequestRouteProp>();
  const { listingId } = route.params;

  const [viewState, setViewState] = useState<ViewState>('form');
  const [moveInDate, setMoveInDate] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: createStayRequest, isPending, isError } = useCreateStayRequest();

  const handleSubmit = () => {
    createStayRequest(
      {
        listingId,
        moveInDate: moveInDate || new Date().toISOString(),
        durationMonths: durationMonths ? parseInt(durationMonths, 10) : 6,
        message,
      },
      {
        onSuccess: () => {
          setViewState('success');
        },
        onError: () => {
          setViewState('error');
        }
      }
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <AppText variant="title1" weight="bold" color="textPrimary" style={styles.title}>
        طلب سكن
      </AppText>
      <AppText variant="bodyBase" color="textSecondary">
        راجع بيانات الطلب قبل الإرسال
      </AppText>
    </View>
  );

  const renderContent = () => {
    if (isPending) {
      return <StayRequestSkeleton />;
    }

    if (viewState === 'error' || isError) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Card variant="outlined" padding="lg" radius="lg" style={styles.errorCard}>
              <AppIcon name="AlertCircle" size="lg" color="error" style={styles.errorIcon} />
              <AppText variant="title2" color="textPrimary" weight="bold" align="center">حدث خطأ</AppText>
              <AppText variant="bodySm" color="textSecondary" align="center" style={styles.errorDesc}>
                تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.
              </AppText>
              <Button title="إعادة المحاولة" onPress={() => setViewState('form')} hierarchy="secondary" />
            </Card>
          </View>
        </SafeAreaView>
      );
    }

    if (viewState === 'success') {
      return <SuccessState onBackToHome={() => navigation.popToTop()} />;
    }

    return (
      <View style={styles.screenWrapper}>
        <KeyboardAvoidingView 
          style={styles.keyboardView} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderHeader()}
            <PropertySummaryCard />
            <View style={styles.divider} />
            <RequestForm
              moveInDate={moveInDate}
              onChangeMoveInDate={setMoveInDate}
              durationMonths={durationMonths}
              onChangeDuration={setDurationMonths}
              message={message}
              onChangeMessage={setMessage}
            />
            <View style={styles.divider} />
            <SummaryCard />
            <NoticeCard />
          </ScrollView>
        </KeyboardAvoidingView>
        
        <BottomCTA 
          onSubmit={handleSubmit}
          onCancel={() => navigation.goBack()} 
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  screenWrapper: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing[24],
    gap: theme.spacing[24],
  },
  header: {
    gap: theme.spacing[4],
  },
  title: {
    marginBottom: theme.spacing[4],
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
    marginVertical: theme.spacing[8],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[24],
  },
  errorCard: {
    alignItems: 'center',
    gap: theme.spacing[16],
  },
  errorIcon: {
    marginBottom: theme.spacing[8],
  },
  errorDesc: {
    marginBottom: theme.spacing[16],
  }
});
