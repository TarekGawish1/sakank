import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../../theme';

export const RequestsSkeleton = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.chipsRow}>
          {[1,2,3,4].map(i => <View key={i} style={styles.chip} />)}
        </View>
        
        <View style={styles.list}>
          {[1, 2, 3].map((key) => (
            <View key={key} style={styles.card}>
              <View style={styles.header}>
                <View style={styles.image} />
                <View style={styles.info}>
                  <View style={styles.titleRow}>
                    <View style={styles.title} />
                    <View style={styles.badge} />
                  </View>
                  <View style={styles.subtitle} />
                  <View style={styles.price} />
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.dates}>
                <View style={styles.dateItem} />
                <View style={styles.dateItem} />
              </View>
              <View style={styles.actions}>
                <View style={styles.actionBtn} />
                <View style={styles.actionBtn} />
              </View>
            </View>
          ))}
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
  chipsRow: {
    flexDirection: 'row',
    padding: theme.spacing[24],
    gap: theme.spacing[8],
  },
  chip: {
    width: 80,
    height: 36,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceMuted,
  },
  list: {
    paddingHorizontal: theme.spacing[24],
    gap: theme.spacing[16],
  },
  card: {
    width: '100%',
    padding: theme.spacing[16],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    gap: theme.spacing[16],
  },
  header: {
    flexDirection: 'row',
    gap: theme.spacing[12],
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing[8],
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '50%',
    height: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceMuted,
  },
  badge: {
    width: '25%',
    height: 20,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceMuted,
  },
  subtitle: {
    width: '70%',
    height: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceMuted,
  },
  price: {
    width: '40%',
    height: 16,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceMuted,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surfaceMuted,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    width: '30%',
    height: 24,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing[12],
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  }
});
