import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../../theme';

export const StayRequestSkeleton = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle} />
          <View style={styles.headerSubtitle} />
        </View>

        <View style={styles.card} />
        
        <View style={styles.formContainer}>
          <View style={styles.formTitle} />
          <View style={styles.input} />
          <View style={styles.input} />
          <View style={styles.textArea} />
        </View>
        
        <View style={styles.cardLarge} />
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
    padding: theme.spacing[24],
    gap: theme.spacing[24],
  },
  header: {
    gap: theme.spacing[8],
  },
  headerTitle: {
    width: '40%',
    height: 24,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
  },
  headerSubtitle: {
    width: '60%',
    height: 16,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
  },
  card: {
    width: '100%',
    height: 112,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.lg,
  },
  cardLarge: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.xl,
  },
  formContainer: {
    gap: theme.spacing[16],
  },
  formTitle: {
    width: '30%',
    height: 20,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing[8],
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.lg,
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.lg,
  }
});
