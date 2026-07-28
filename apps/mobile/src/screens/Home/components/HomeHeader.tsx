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
          inputContainerStyle={{
            height: 52,
            borderRadius: theme.radius.full,
            paddingHorizontal: theme.spacing[20],
            backgroundColor: theme.colors.surfaceDefault,
            borderColor: theme.colors.borderSubtle,
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
          }}
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
    paddingTop: theme.spacing[8], // Reduced vertical spacing
    paddingBottom: theme.spacing[8],
    gap: theme.spacing[12],
    backgroundColor: theme.colors.surfaceDefault,
  },
  searchWrapper: {
    flex: 1, // Take up remaining space
  },
  notificationBtn: {
    padding: theme.spacing[12],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    position: 'relative',
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    borderWidth: 1.5,
    borderColor: theme.colors.surfaceDefault,
  },
});
