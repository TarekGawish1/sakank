import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../../theme';
import { AppText, Button, Input, AppIcon } from '../../../../components';

interface LoginFormProps {
  isLoading?: boolean;
  onSubmit: (credentials: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) return;
    onSubmit({ email, password });
  };

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
          value={email}
          onChangeText={setEmail}
        />
        
        <Input 
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          isPassword
          leftSlot={<AppIcon name="Lock" size="sm" color="secondary" />}
          editable={!isLoading}
          value={password}
          onChangeText={setPassword}
        />
        
        <Pressable style={styles.forgotPassword} onPress={onForgotPassword}>
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
        disabled={isLoading || !email || !password}
        onPress={handleSubmit}
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
