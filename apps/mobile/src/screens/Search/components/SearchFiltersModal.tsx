import React from 'react';
import { View, StyleSheet, Modal, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon, Button } from '../../../components';

export interface SearchFiltersModalProps {
  visible: boolean;
  onClose: () => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedGender: string | null;
  setSelectedGender: (gender: string | null) => void;
  selectedFurnish: string | null;
  setSelectedFurnish: (furnish: string | null) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  selectedDistance: string | null;
  setSelectedDistance: (distance: string | null) => void;
  onApply: () => void;
}

const PROPERTY_TYPES = ['شقق', 'غرف', 'استوديو'];
const GENDERS = ['طالبات', 'طلاب'];
const FURNISHING = ['غير مفروش', 'مفروش'];
const AMENITIES = ['Wi-Fi', 'تكييف', 'موقف سيارات', 'غسالة', 'مصعد'];
const DISTANCES = ['0–1 كم', '1–3 كم', '3–5 كم'];

export const SearchFiltersModal: React.FC<SearchFiltersModalProps> = ({
  visible,
  onClose,
  selectedType,
  setSelectedType,
  selectedGender,
  setSelectedGender,
  selectedFurnish,
  setSelectedFurnish,
  selectedAmenities,
  setSelectedAmenities,
  selectedDistance,
  setSelectedDistance,
  onApply,
}) => {
  const toggleAmenity = (item: string) => {
    setSelectedAmenities(
      selectedAmenities.includes(item)
        ? selectedAmenities.filter((i) => i !== item)
        : [...selectedAmenities, item]
    );
  };

  const handleReset = () => {
    setSelectedType(null);
    setSelectedGender(null);
    setSelectedFurnish(null);
    setSelectedAmenities([]);
    setSelectedDistance(null);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="إغلاق الفلاتر"
            style={styles.closeBtn}
            onPress={onClose}
          >
            <AppIcon name="X" size="lg" color="primary" />
          </Pressable>
          <AppText variant="title1" color="textPrimary">
            الفلاتر
          </AppText>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Property Type */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              نوع العقار
            </AppText>
            <View style={styles.chipsContainer}>
              {PROPERTY_TYPES.map((item) => {
                const isActive = selectedType === item;
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, isActive && styles.activeChip]}
                    onPress={() => setSelectedType(item)}
                  >
                    <AppText
                      variant="bodyBase"
                      color={isActive ? 'textInverse' : 'textSecondary'}
                    >
                      {item}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Price Range (Mock) */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              نطاق السعر (شهرياً)
            </AppText>
            <View style={styles.priceRow}>
              <View style={styles.priceInputMock}>
                <AppText variant="caption" color="textSecondary">
                  الحد الأقصى
                </AppText>
                <AppText variant="bodyBase" color="textPrimary">
                  2500 ريال
                </AppText>
              </View>
              <AppText variant="bodyBase" color="textSecondary">-</AppText>
              <View style={styles.priceInputMock}>
                <AppText variant="caption" color="textSecondary">
                  الحد الأدنى
                </AppText>
                <AppText variant="bodyBase" color="textPrimary">
                  500 ريال
                </AppText>
              </View>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              سكن لـ
            </AppText>
            <View style={styles.chipsContainer}>
              {GENDERS.map((item) => {
                const isActive = selectedGender === item;
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, isActive && styles.activeChip]}
                    onPress={() => setSelectedGender(item)}
                  >
                    <AppText
                      variant="bodyBase"
                      color={isActive ? 'textInverse' : 'textSecondary'}
                    >
                      {item}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Furnishing */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              التأثيث
            </AppText>
            <View style={styles.chipsContainer}>
              {FURNISHING.map((item) => {
                const isActive = selectedFurnish === item;
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, isActive && styles.activeChip]}
                    onPress={() => setSelectedFurnish(item)}
                  >
                    <AppText
                      variant="bodyBase"
                      color={isActive ? 'textInverse' : 'textSecondary'}
                    >
                      {item}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              المميزات
            </AppText>
            <View style={styles.chipsContainer}>
              {AMENITIES.map((item) => {
                const isActive = selectedAmenities.includes(item);
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, isActive && styles.activeChip]}
                    onPress={() => toggleAmenity(item)}
                  >
                    <AppText
                      variant="bodyBase"
                      color={isActive ? 'textInverse' : 'textSecondary'}
                    >
                      {item}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Distance */}
          <View style={styles.section}>
            <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
              المسافة من الجامعة
            </AppText>
            <View style={styles.chipsContainer}>
              {DISTANCES.map((item) => {
                const isActive = selectedDistance === item;
                return (
                  <Pressable
                    key={item}
                    style={[styles.chip, isActive && styles.activeChip]}
                    onPress={() => setSelectedDistance(item)}
                  >
                    <AppText
                      variant="bodyBase"
                      color={isActive ? 'textInverse' : 'textSecondary'}
                    >
                      {item}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.applyBtnWrapper}>
            <Button title="تطبيق الفلاتر" onPress={() => { onApply(); onClose(); }} fullWidth />
          </View>
          <Pressable style={styles.resetBtn} onPress={handleReset}>
            <AppText variant="button" color="textPrimary">
              إعادة تعيين
            </AppText>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[20],
    paddingVertical: theme.spacing[16],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  closeBtn: {
    padding: theme.spacing[8],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing[40],
  },
  section: {
    paddingHorizontal: theme.spacing[20],
    paddingVertical: theme.spacing[24],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  sectionTitle: {
    marginBottom: theme.spacing[16],
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[12],
  },
  chip: {
    paddingHorizontal: theme.spacing[20],
    paddingVertical: theme.spacing[12],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: theme.colors.surfacePrimary,
    borderColor: theme.colors.surfacePrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[12],
  },
  priceInputMock: {
    flex: 1,
    height: 64,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing[16],
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[20],
    paddingVertical: theme.spacing[16],
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceDefault,
    gap: theme.spacing[16],
  },
  resetBtn: {
    paddingVertical: theme.spacing[12],
    paddingHorizontal: theme.spacing[16],
  },
  applyBtnWrapper: {
    flex: 1,
  },
});
