import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../../theme';
import { Button, Input, AppIcon } from '../../../../components';
import { PasswordRequirements } from '../../components';

interface ResetPasswordFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ isLoading, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Input 
          label="كلمة المرور الجديدة"
          placeholder="أدخل كلمة المرور الجديدة"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
        />
        
        <PasswordRequirements />
        
        <Input 
          label="تأكيد كلمة المرور"
          placeholder="أعد إدخال كلمة المرور الجديدة"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
        />
      </View>
      
      <Button 
        title="تحديث كلمة المرور" 
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
    gap: theme.spacing[32],
  },
  inputs: {
    gap: theme.spacing[16],
  },
  submitBtn: {
    width: '100%',
  }
});
