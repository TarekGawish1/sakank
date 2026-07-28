import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon, IconName } from '../../../components';

export interface TabBarItemProps {
  label: string;
  iconName: IconName;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  badgeCount?: number;
  hasNotification?: boolean;
}

export const TabBarItem: React.FC<TabBarItemProps> = ({
  label,
  iconName,
  isFocused,
  onPress,
  onLongPress,
  badgeCount,
  hasNotification,
}) => {
  const color = isFocused ? 'primary' : 'tertiary';
  
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      <View style={styles.iconContainer}>
        <AppIcon name={iconName} size="md" color={color} />
        
        {badgeCount !== undefined && badgeCount > 0 && (
          <View style={styles.badge}>
            <AppText variant="caption" color="textInverse" style={styles.badgeText}>
              {badgeCount > 99 ? '99+' : badgeCount}
            </AppText>
          </View>
        )}
        
        {hasNotification && !badgeCount && (
          <View style={styles.dot} />
        )}
      </View>
      
      <AppText
        variant="caption"
        color={isFocused ? 'textPrimary' : 'textTertiary'}
        style={styles.label}
      >
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[8],
  },
  iconContainer: {
    position: 'relative',
    marginBottom: theme.spacing[4],
  },
  label: {
    fontSize: 10,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: theme.radius.full,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.surfaceDefault,
  },
  badgeText: {
    fontSize: 9,
    lineHeight: 12,
  },
  dot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    borderWidth: 1.5,
    borderColor: theme.colors.surfaceDefault,
  },
});
