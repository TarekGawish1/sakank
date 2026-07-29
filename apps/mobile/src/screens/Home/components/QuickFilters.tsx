import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Chip } from '../../../components';

const FILTERS = ['طلاب', 'شقق', 'غرف', 'قريب', 'الأعلى تقييماً', 'الأرخص'];

export const QuickFilters: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((filter, index) => (
        <Chip
          key={index}
          label={filter}
          selected={index === 0}
          onPress={() => {}}
          accessibilityLabel={`تصفية حسب ${filter}`}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[8],
    gap: theme.spacing[12],
  },
});
