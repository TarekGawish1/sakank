import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AppText, Button, Card, AppIcon } from '../../components';

import {
  PropertyGallery,
  PropertyHeader,
  PropertyInfoCard,
  AmenitiesSection,
  DescriptionSection,
  OwnerCard,
  BottomCTA,
  PropertyDetailsSkeleton
} from './components';

type ViewState = 'loading' | 'error' | 'empty' | 'data';
type PropertyDetailsNavProp = NativeStackNavigationProp<HomeStackParamList>;

export const PropertyDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<PropertyDetailsNavProp>();
  const { listingId } = (route.params as { listingId?: string }) || {};

  const [viewState, setViewState] = useState<ViewState>('data');

  if (viewState === 'loading') {
    return <PropertyDetailsSkeleton />;
  }

  if (viewState === 'error') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Card variant="outlined" padding="lg" radius="lg" style={styles.errorCard}>
            <AppIcon name="AlertCircle" size="lg" color="error" style={styles.errorIcon} />
            <AppText variant="title2" color="textPrimary" weight="bold" align="center">حدث خطأ</AppText>
            <AppText variant="bodySm" color="textSecondary" align="center" style={styles.errorDesc}>
              تعذر تحميل تفاصيل العقار. يرجى المحاولة مرة أخرى.
            </AppText>
            <Button title="إعادة المحاولة" onPress={() => setViewState('loading')} hierarchy="secondary" />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  if (viewState === 'empty') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <AppIcon name="Home" size="xl" color="tertiary" style={styles.errorIcon} />
          <AppText variant="title2" color="textPrimary" weight="bold" align="center">عقار غير موجود</AppText>
          <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.errorDesc}>
            عذراً، هذا العقار لم يعد متاحاً أو تم حذفه.
          </AppText>
          <Button title="العودة للرئيسية" onPress={() => {}} hierarchy="primary" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        <PropertyGallery />
        <View style={styles.content}>
          <PropertyHeader />
          <PropertyInfoCard />
          <AmenitiesSection />
          <DescriptionSection />
          <OwnerCard />
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomCTA />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: theme.colors.surfaceDefault,
    marginTop: -theme.spacing[24],
    borderTopLeftRadius: theme.radius.xl, // radius xl is 24, safe fallback
    borderTopRightRadius: theme.radius.xl,
    overflow: 'hidden',
  },
  bottomSpacer: {
    height: 120, // space for sticky bottom cta
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
