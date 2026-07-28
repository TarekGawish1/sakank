import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Button, Input, AppIcon } from '../../../components';
import { PasswordRequirements } from './PasswordRequirements';
import { TermsSection } from './TermsSection';

interface RegisterFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ isLoading, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Input 
          label="الاسم الكامل"
          placeholder="أدخل اسمك الكامل"
          leftSlot={<AppIcon name="User" size="sm" color="secondary" />}
          editable={!isLoading}
        />

        <Input 
          label="البريد الإلكتروني"
          placeholder="أدخل بريدك الإلكتروني"
          leftSlot={<AppIcon name="Mail" size="sm" color="secondary" />}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        
        <Input 
          label="رقم الهاتف"
          placeholder="أدخل رقم هاتفك"
          leftSlot={<AppIcon name="Phone" size="sm" color="secondary" />}
          keyboardType="phone-pad"
          editable={!isLoading}
        />
        
        <Input 
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
        />

        <PasswordRequirements />

        <Input 
          label="تأكيد كلمة المرور"
          placeholder="أعد إدخال كلمة المرور"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
        />
      </View>

      <TermsSection />
      
      <Button 
        title="إنشاء الحساب" 
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
