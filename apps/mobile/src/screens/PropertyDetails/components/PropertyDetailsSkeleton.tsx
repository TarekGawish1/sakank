import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../../theme';

export const PropertyDetailsSkeleton = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageSkeleton} />
        
        <View style={styles.content}>
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
          
          <View style={styles.priceSkeleton} />
          
          <View style={styles.cardSkeleton} />
          
          <View style={styles.titleSkeleton2} />
          <View style={styles.grid}>
            {[1,2,3,4].map(i => <View key={i} style={styles.gridItemSkeleton} />)}
          </View>
        </View>
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
  imageSkeleton: {
    width: '100%',
    height: 320,
    backgroundColor: theme.colors.surfaceMuted,
  },
  content: {
    padding: theme.spacing[24],
    gap: theme.spacing[16],
  },
  titleSkeleton: {
    width: '80%',
    height: 24,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
  },
  titleSkeleton2: {
    width: '40%',
    height: 20,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing[16],
  },
  subtitleSkeleton: {
    width: '50%',
    height: 16,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
  },
  priceSkeleton: {
    width: '30%',
    height: 28,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing[8],
  },
  cardSkeleton: {
    width: '100%',
    height: 80,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.lg,
    marginTop: theme.spacing[16],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[16],
    marginTop: theme.spacing[16],
  },
  gridItemSkeleton: {
    width: '20%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
  }
});
