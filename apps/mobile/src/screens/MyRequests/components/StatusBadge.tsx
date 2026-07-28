import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

interface StatusBadgeProps {
  status: RequestStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'قيد المراجعة',
          bg: theme.colors.surfaceWarning,
          color: theme.colors.textWarning,
        };
      case 'accepted':
        return {
          label: 'مقبول',
          bg: theme.colors.surfaceSuccess,
          color: theme.colors.textSuccess,
        };
      case 'rejected':
        return {
          label: 'مرفوض',
          bg: theme.colors.surfaceError,
          color: theme.colors.textError,
        };
      case 'cancelled':
        return {
          label: 'ملغي',
          bg: theme.colors.surfaceMuted,
          color: theme.colors.textSecondary,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <AppText variant="caption" weight="bold" color="textPrimary" style={{ color: config.color }}>
        {config.label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
  }
});
