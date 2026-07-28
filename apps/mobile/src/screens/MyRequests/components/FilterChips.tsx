import React from 'react';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export type FilterType = 'all' | 'pending' | 'accepted' | 'rejected' | 'cancelled';

interface FilterOption {
  id: FilterType;
  label: string;
}

const FILTERS: FilterOption[] = [
  { id: 'all', label: 'الكل' },
  { id: 'pending', label: 'قيد المراجعة' },
  { id: 'accepted', label: 'مقبول' },
  { id: 'rejected', label: 'مرفوض' },
  { id: 'cancelled', label: 'ملغي' },
];

export const FilterChips = () => {
  const selectedFilter = 'all'; // UI mock, always "all" selected

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map(filter => {
        const isSelected = selectedFilter === filter.id;
        return (
          <Pressable 
            key={filter.id} 
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => {}}
          >
            <AppText 
              variant="label" 
              weight={isSelected ? 'bold' : 'medium'}
              color={isSelected ? 'inverse' : 'textSecondary'}
            >
              {filter.label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[24],
    gap: theme.spacing[8],
  },
  chip: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[8],
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceDefault,
  },
  chipSelected: {
    backgroundColor: theme.colors.brandPrimary,
    borderColor: theme.colors.brandPrimary,
  }
});
