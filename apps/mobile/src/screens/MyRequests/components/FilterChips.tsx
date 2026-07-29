import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Chip } from '../../../components';

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
      {FILTERS.map(filter => (
        <Chip
          key={filter.id}
          label={filter.label}
          selected={selectedFilter === filter.id}
          onPress={() => {}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[24],
    gap: theme.spacing[8],
  },
});
