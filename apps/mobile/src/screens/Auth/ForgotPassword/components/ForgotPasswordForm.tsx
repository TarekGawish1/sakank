import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../../theme';
import { Button, Input, AppIcon } from '../../../../components';

interface ForgotPasswordFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ isLoading, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Input 
        label="البريد الإلكتروني"
        placeholder="أدخل بريدك الإلكتروني"
        leftSlot={<AppIcon name="Mail" size="sm" color="secondary" />}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      
      <Button 
        title="إرسال الرابط" 
        hierarchy="primary" 
        size="large"
        loading={isLoading}
        disabled={isLoading}
        onPress={onSubmit}
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[24],
  },
  submitBtn: {
    width: '100%',
  }
});
