import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../../theme';
import { AppText } from '../../../../components';

interface ResendSectionProps {
  isLoading?: boolean;
}

export const ResendSection: React.FC<ResendSectionProps> = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      <AppText variant="bodySm" color="textSecondary">
        لم تستلم الرمز؟
      </AppText>
      <View style={styles.actionRow}>
        <Pressable disabled={isLoading}>
          <AppText 
            variant="bodySm" 
            color={isLoading ? 'textMuted' : 'brandPrimary'} 
            weight="bold"
          >
            إعادة الإرسال
          </AppText>
        </Pressable>
        <AppText variant="caption" color="textMuted">
          {' '}01:30
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing[8],
    marginTop: theme.spacing[16],
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
