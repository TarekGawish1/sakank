import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../../theme';
import { AppText, Button, Card, CardBody } from '../../components';

export const PropertyDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { listingId } = (route.params as { listingId?: string }) || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <AppText color="textSecondary" style={styles.centerText}>صورة العقار</AppText>
        </View>

        <View style={styles.content}>
          {/* Property Title & Price */}
          <View style={styles.header}>
            <AppText variant="title1" color="textPrimary">عنوان العقار</AppText>
            <AppText variant="title2" color="brandPrimary">السعر هنا</AppText>
          </View>

          {/* Address */}
          <View style={styles.section}>
            <AppText variant="bodyBase" color="textSecondary">العنوان بالتفصيل</AppText>
          </View>

          {/* Property Information */}
          <Card style={styles.sectionCard}>
            <CardBody>
              <AppText variant="title3" color="textPrimary">معلومات العقار</AppText>
              <AppText variant="bodySm" color="textSecondary" style={styles.placeholderText}>
                النوع، السعة، حالة التوفر...
              </AppText>
            </CardBody>
          </Card>

          {/* Amenities */}
          <Card style={styles.sectionCard}>
            <CardBody>
              <AppText variant="title3" color="textPrimary">المرافق</AppText>
              <AppText variant="bodySm" color="textSecondary" style={styles.placeholderText}>
                مرافق العقار...
              </AppText>
            </CardBody>
          </Card>

          {/* Description */}
          <Card style={styles.sectionCard}>
            <CardBody>
              <AppText variant="title3" color="textPrimary">الوصف</AppText>
              <AppText variant="bodySm" color="textSecondary" style={styles.placeholderText}>
                تفاصيل العقار...
              </AppText>
            </CardBody>
          </Card>

          {/* Owner Section */}
          <Card style={styles.sectionCard}>
            <CardBody>
              <AppText variant="title3" color="textPrimary">المالك</AppText>
              <AppText variant="bodySm" color="textSecondary" style={styles.placeholderText}>
                معلومات المالك...
              </AppText>
            </CardBody>
          </Card>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Sticky CTA */}
      <View style={styles.stickyFooter}>
        <Button title="تواصل للحجز" onPress={() => {}} hierarchy="primary" />
      </View>
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
  imageGallery: {
    height: 250,
    backgroundColor: theme.colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing[16],
    gap: theme.spacing[24],
  },
  header: {
    gap: theme.spacing[8],
  },
  section: {
    gap: theme.spacing[8],
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    elevation: 0,
  },
  placeholderText: {
    marginTop: theme.spacing[8],
  },
  bottomSpacer: {
    height: 100,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing[16],
    backgroundColor: theme.colors.surfaceDefault,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
});
