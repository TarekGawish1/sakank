import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';

export const RequestForm = () => {
  return (
    <View style={styles.container}>
      <AppText variant="title2" weight="bold" color="textPrimary" style={styles.title}>
        تفاصيل الطلب
      </AppText>

      <View style={styles.inputGroup}>
        <AppText variant="label" color="textSecondary" style={styles.label}>
          تاريخ السكن المتوقع
        </AppText>
        <View style={styles.inputWrapper}>
          <TextInput 
            placeholder="حدد التاريخ"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText variant="label" color="textSecondary" style={styles.label}>
          المدة
        </AppText>
        <View style={styles.inputWrapper}>
          <TextInput 
            placeholder="اختر مدة العقد"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText variant="label" color="textSecondary" style={styles.label}>
          رسالة للمالك (اختياري)
        </AppText>
        <View style={styles.inputWrapper}>
          <TextInput 
            placeholder="أضف أي تفاصيل أخرى ترغب بإخبار المالك بها..."
            placeholderTextColor={theme.colors.textMuted}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[16],
  },
  title: {
    marginBottom: theme.spacing[8],
  },
  inputGroup: {
    gap: theme.spacing[8],
  },
  label: {
    paddingHorizontal: theme.spacing[4],
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceDefault,
  },
  input: {
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[12],
    color: theme.colors.textPrimary,
    fontFamily: 'Inter-Regular', // Assuming standard font fallback
    textAlign: 'right', // RTL
  },
  textArea: {
    minHeight: 100,
  }
});
