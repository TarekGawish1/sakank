import React from 'react';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

const FILTERS = ['طلاب', 'شقق', 'غرف', 'قريب', 'الأعلى تقييماً', 'الأرخص'];

export const QuickFilters: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((filter, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.chip,
            index === 0 && styles.activeChip,
            pressed && { opacity: 0.8 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`تصفية حسب ${filter}`}
        >
          <AppText
            variant="label"
            color={index === 0 ? 'textInverse' : 'textSecondary'}
          >
            {filter}
          </AppText>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[8],
    gap: theme.spacing[8],
  },
  chip: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[8],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  activeChip: {
    backgroundColor: theme.colors.surfacePrimary,
    borderColor: theme.colors.surfacePrimary,
  },
});
