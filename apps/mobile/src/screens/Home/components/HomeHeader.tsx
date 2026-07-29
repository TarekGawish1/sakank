import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppIcon, SearchBar } from '../../../components';

export interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="ابحث عن جامعة، حي، أو سكن..."
        />
      </View>

      <Pressable
        style={styles.notificationBtn}
        accessibilityRole="button"
        accessibilityLabel="الإشعارات"
      >
        <AppIcon name="Bell" size="md" color="primary" />
        <View style={styles.badge} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[16],
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[8],
    gap: theme.spacing[12],
    backgroundColor: theme.colors.surfaceDefault,
  },
  searchWrapper: {
    flex: 1,
  },
  notificationBtn: {
    padding: theme.spacing[12],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    position: 'relative',
    height: theme.spacing[48],
    width: theme.spacing[48],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: theme.spacing[12],
    right: theme.spacing[12],
    width: theme.spacing[8],
    height: theme.spacing[8],
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.error,
    borderWidth: 1.5,
    borderColor: theme.colors.surfaceDefault,
  },
});
