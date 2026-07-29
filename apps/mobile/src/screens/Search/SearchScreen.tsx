import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { AppText, AppIcon, SearchBar } from '../../components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import { SearchFiltersModal } from './components/SearchFiltersModal';
import { useSearch } from '../../hooks/listings';
import { useDebounce } from '../../hooks/useDebounce';

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

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 400);

  const [filtersVisible, setFiltersVisible] = useState(false);

  // Filters State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedFurnish, setSelectedFurnish] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const mapUnitType = (type: string | null) => {
    if (type === 'شقق') return 'APARTMENT';
    if (type === 'غرف') return 'ROOM';
    if (type === 'استوديو') return 'STUDIO';
    return undefined;
  };

  const mapGender = (gender: string | null) => {
    if (gender === 'طالبات') return 'FEMALE';
    if (gender === 'طلاب') return 'MALE';
    return undefined;
  };

  const hasFilters = selectedType || selectedGender || selectedAmenities.length > 0 || selectedFurnish || selectedDistance;

  const { data, isLoading, isError } = useSearch(debouncedQuery, {
    unitType: mapUnitType(selectedType),
    gender: mapGender(selectedGender),
  });

  const searchResults = data?.items || [];
  const showResults = debouncedQuery.length > 0 || hasFilters;

  const mapCategory = (type: string) => {
    switch(type) {
      case 'APARTMENT': return 'شقة';
      case 'ROOM': return 'غرفة';
      case 'STUDIO': return 'استوديو';
      default: return 'سكن';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} accessible accessibilityLabel="شاشة البحث">
      <View style={styles.header}>
        <Pressable
          style={styles.filterBtn}
          accessibilityRole="button"
          accessibilityLabel="الفلاتر"
          onPress={() => setFiltersVisible(true)}
        >
          <AppIcon name="Sliders" size="md" color={hasFilters ? 'primary' : 'secondary'} />
        </Pressable>
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

      <SearchFiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedFurnish={selectedFurnish}
        setSelectedFurnish={setSelectedFurnish}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        selectedDistance={selectedDistance}
        setSelectedDistance={setSelectedDistance}
        onApply={() => {}}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {showResults ? (
          <View style={styles.suggestionsList}>
            {isLoading ? (
              <View style={styles.centerState}>
                <ActivityIndicator size="small" color={theme.colors.surfacePrimary} />
                <AppText variant="bodyBase" color="textSecondary" style={styles.stateText}>جاري البحث...</AppText>
              </View>
            ) : isError ? (
              <View style={styles.centerState}>
                <AppIcon name="AlertCircle" size="lg" color="error" />
                <AppText variant="bodyBase" color="error" style={styles.stateText}>حدث خطأ أثناء البحث</AppText>
              </View>
            ) : searchResults.length === 0 ? (
              <View style={styles.centerState}>
                <AppIcon name="Search" size="lg" color="tertiary" />
                <AppText variant="bodyBase" color="textSecondary" style={styles.stateText}>لا توجد نتائج مطابقة</AppText>
              </View>
            ) : (
              searchResults.map((item) => (
                <Pressable 
                  key={item.id} 
                  style={styles.suggestionRow}
                  onPress={() => navigation.navigate('PropertyDetails', { listingId: item.id })}
                >
                  <View style={styles.suggestionMain}>
                    <AppIcon name="Search" size="md" color="tertiary" />
                    <AppText variant="bodyBase" color="textPrimary" style={styles.suggestionText} numberOfLines={1}>
                      {item.title}
                    </AppText>
                  </View>
                  <View style={styles.categoryBadge}>
                    <AppText variant="caption" color="textSecondary">
                      {mapCategory(item.unitType)}
                    </AppText>
                  </View>
                </Pressable>
              ))
            )}
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
                  <Pressable key={index} style={styles.chip} onPress={() => setSearchQuery(item)}>
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
                  <Pressable key={index} style={styles.chip} onPress={() => setSearchQuery(item)}>
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
  filterBtn: {
    padding: theme.spacing[8],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
    justifyContent: 'center',
    alignItems: 'center',
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
  centerState: {
    padding: theme.spacing[40],
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[12],
  },
  stateText: {
    marginTop: theme.spacing[4],
  }
});
