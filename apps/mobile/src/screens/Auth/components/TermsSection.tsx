import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

export const TermsSection = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Pressable 
      style={styles.container} 
      onPress={() => setIsChecked(!isChecked)}
    >
      <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
        {isChecked && <AppIcon name="Check" size="sm" color="inverse" />}
      </View>
      <View style={styles.textContainer}>
        <AppText variant="caption" color="textSecondary">
          بإنشاء الحساب فإنك توافق على{' '}
        </AppText>
        <AppText variant="caption" color="brandPrimary" weight="bold">
          الشروط وسياسة الخصوصية
        </AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[12],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    backgroundColor: theme.colors.surfaceDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: theme.colors.brandPrimary,
    borderColor: theme.colors.brandPrimary,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
