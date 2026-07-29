import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { theme } from '../../../theme';
import { AppText, Button, Input, AppIcon } from '../../../components';
import { AuthHeader, SocialLoginSection, Divider, ErrorBanner } from '../components';
import { useLogin, useSession } from '../../../hooks/auth';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { mutate: login, isPending, error } = useLogin();
  const { setGuest } = useSession();
  
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    if (!email) return;
    setStep('password');
  };

  const handleLogin = () => {
    if (!email || !password) return;
    login({ email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader 
            icon={step === 'email' ? "Home" : undefined}
            title={step === 'email' ? "تسجيل الدخول أو إنشاء حساب" : "تسجيل الدخول"}
            onClose={step === 'email' ? setGuest : undefined}
            onBack={step === 'password' ? () => setStep('email') : undefined}
          />
          
          {error && (
            <ErrorBanner message={error.message} />
          )}

          {step === 'email' ? (
            <View style={styles.formContainer}>
              <Input 
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              
              <Button 
                title="متابعة" 
                hierarchy="primary" 
                size="large"
                disabled={!email}
                onPress={handleContinue}
                style={styles.submitBtn}
              />
              
              <Divider />
              
              <SocialLoginSection />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <View style={styles.userBadge}>
                <AppText variant="bodyBase" color="textPrimary">{email}</AppText>
              </View>

              <Input 
                placeholder="كلمة المرور"
                isPassword
                editable={!isPending}
                value={password}
                onChangeText={setPassword}
              />
              
              <Pressable style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
                <AppText variant="label" weight="medium" color="textPrimary" style={styles.underline}>
                  نسيت كلمة المرور؟
                </AppText>
              </Pressable>
              
              <Button 
                title="تسجيل الدخول" 
                hierarchy="primary" 
                size="large"
                loading={isPending}
                disabled={isPending || !password}
                onPress={handleLogin}
                style={styles.submitBtn}
              />

              <View style={styles.footer}>
                <AppText variant="bodySm" color="textSecondary">
                  ليس لديك حساب؟
                </AppText>
                <Pressable onPress={() => navigation.navigate('Register')}>
                  <AppText variant="bodySm" color="brandPrimary" weight="bold">
                    {' '}إنشاء حساب
                  </AppText>
                </Pressable>
              </View>
            </View>
          )}
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing[24],
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[48],
  },
  formContainer: {
    gap: theme.spacing[16],
  },
  userBadge: {
    padding: theme.spacing[12],
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing[8],
  },
  forgotPassword: {
    alignSelf: 'flex-start',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  submitBtn: {
    width: '100%',
    marginTop: theme.spacing[8],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing[32],
  }
});
