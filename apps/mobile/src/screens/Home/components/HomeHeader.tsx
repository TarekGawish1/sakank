import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Avatar, AppIcon } from '../../../components';

export const HomeHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Avatar initials="TO" size="sm" status="online" />
        <View style={styles.greeting}>
          <AppText variant="caption" color="textSecondary">أهلاً بك،</AppText>
          <AppText variant="title2" color="textPrimary">طارق جاويش</AppText>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[12],
    backgroundColor: theme.colors.surfaceDefault,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[12],
  },
  greeting: {
    justifyContent: 'center',
  },
  notificationBtn: {
    padding: theme.spacing[8],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    borderWidth: 1.5,
    borderColor: theme.colors.surfaceSubdued,
  },
});
