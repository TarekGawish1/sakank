import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { theme } from '../../theme';
import { AppText, AppIcon, SearchBar } from '../../components';
import { useNavigation } from '@react-navigation/native';

const MOCK_RECENT = [
  'شقق قريبة من جامعة الملك سعود',
  'استديو حي الملقا',
  'سكن طلاب الرياض',
];

const MOCK_UNIVERSITIES = [
  'جامعة المنصورة',
  'جامعة دمياط',
  'جامعة القاهرة',
  'جامعة عين شمس',
  'جامعة الإسكندرية',
];

const MOCK_AREAS = [
  'حي الجامعة',
  'توريل',
  'مدينة نصر',
  'المعادي',
  'التجمع',
];

const MOCK_SUGGESTIONS = [
  { text: 'جامعة المنصورة', category: 'جامعة' },
  { text: 'جامعة دمياط', category: 'جامعة' },
  { text: 'حي الجامعة', category: 'حي' },
  { text: 'مدينة نصر', category: 'حي' },
  { text: 'شقة مفروشة', category: 'سكن' },
  { text: 'استوديو', category: 'سكن' },
];

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} accessible accessibilityLabel="شاشة البحث">
      <View style={styles.header}>
        <View style={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="ابحث عن جامعة، حي أو سكن..."
            autoFocus={false}
            inputContainerStyle={styles.searchInput}
          />
        </View>
        <Pressable
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="رجوع"
          onPress={() => navigation.goBack()}
        >
          <AppIcon name="ChevronRight" size="lg" color="primary" />
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {searchQuery.length > 0 ? (
          <View style={styles.suggestionsList}>
            {MOCK_SUGGESTIONS.map((item, index) => (
              <Pressable key={index} style={styles.suggestionRow}>
                <View style={styles.suggestionMain}>
                  <AppIcon name="Search" size="md" color="tertiary" />
                  <AppText variant="bodyBase" color="textPrimary" style={styles.suggestionText}>
                    {item.text}
                  </AppText>
                </View>
                {item.category && (
                  <View style={styles.categoryBadge}>
                    <AppText variant="caption" color="textSecondary">
                      {item.category}
                    </AppText>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
                عمليات البحث الأخيرة
              </AppText>
              <View style={styles.recentList}>
                {MOCK_RECENT.map((item, index) => (
                  <View key={index} style={styles.recentItemRow}>
                    <View style={styles.recentItemMain}>
                      <AppIcon name="Search" size="md" color="tertiary" />
                      <AppText variant="bodyBase" color="textPrimary" style={styles.recentText}>
                        {item}
                      </AppText>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="حذف"
                      style={styles.removeBtn}
                    >
                      <AppIcon name="X" size="md" color="tertiary" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            {/* Popular Universities */}
            <View style={styles.section}>
              <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
                الجامعات الأكثر بحثًا
              </AppText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {MOCK_UNIVERSITIES.map((item, index) => (
                  <Pressable key={index} style={styles.chip}>
                    <AppText variant="bodyBase" color="textSecondary">
                      {item}
                    </AppText>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Popular Areas */}
            <View style={styles.section}>
              <AppText variant="title2" color="textPrimary" style={styles.sectionTitle}>
                مناطق شائعة
              </AppText>
              <View style={styles.chipWrapContainer}>
                {MOCK_AREAS.map((item, index) => (
                  <Pressable key={index} style={styles.chip}>
                    <AppText variant="bodyBase" color="textSecondary">
                      {item}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        )}
        
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[16],
    paddingTop: theme.spacing[12],
    paddingBottom: theme.spacing[12],
    gap: theme.spacing[12],
    backgroundColor: theme.colors.surfaceDefault,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  backBtn: {
    padding: theme.spacing[8],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
  },
  searchInput: {
    height: 52,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing[20],
    backgroundColor: theme.colors.surfaceSubdued,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: theme.spacing[24],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing[16],
    marginBottom: theme.spacing[16],
  },
  suggestionsList: {
    paddingHorizontal: theme.spacing[16],
    paddingTop: theme.spacing[16],
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[16],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  suggestionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing[12],
  },
  suggestionText: {
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    backgroundColor: theme.colors.surfaceSubdued,
    borderRadius: theme.radius.sm,
  },
  recentList: {
    paddingHorizontal: theme.spacing[16],
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[12],
  },
  recentItemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing[12],
  },
  recentText: {
    flex: 1,
  },
  removeBtn: {
    padding: theme.spacing[4],
  },
  horizontalList: {
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[12],
  },
  chipWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[12],
  },
  chip: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[20],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  bottomSpacer: {
    height: theme.spacing[40],
  },
});
