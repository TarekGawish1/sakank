import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Button, Input, AppIcon } from '../../../components';

interface LoginFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Input 
          label="البريد الإلكتروني"
          placeholder="أدخل بريدك الإلكتروني"
          leftSlot={<AppIcon name="Mail" size="sm" color="secondary" />}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        
        <Input 
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
        />
        
        <Pressable style={styles.forgotPassword}>
          <AppText variant="label" weight="medium" color="brandPrimary">
            نسيت كلمة المرور؟
          </AppText>
        </Pressable>
      </View>
      
      <Button 
        title="تسجيل الدخول" 
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
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: -theme.spacing[8],
  },
  submitBtn: {
    width: '100%',
  }
});
