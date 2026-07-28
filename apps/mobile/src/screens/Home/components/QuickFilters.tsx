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
            variant="bodyBase"
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
    gap: theme.spacing[12], // better spacing between chips
  },
  chip: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[20], // better horizontal padding
    borderRadius: theme.radius.lg, // balanced corner radius
    backgroundColor: theme.colors.surfaceSubdued,
    borderWidth: 1.5, // stronger selected state support via thicker border? (wait, active has no border if surfacePrimary, but let's make the base border softer)
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  activeChip: {
    backgroundColor: theme.colors.surfacePrimary,
    borderColor: theme.colors.surfacePrimary,
    shadowColor: theme.colors.surfacePrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4, // stronger selected state
  },
});
