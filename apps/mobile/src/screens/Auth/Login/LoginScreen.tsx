import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { theme } from '../../../theme';
import { AppText } from '../../../components';
import { LoginForm } from './components';
import { AuthHeader, SocialLoginSection, Divider, ErrorBanner } from '../components';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLogin = () => {
    // UI Mock
    setHasError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 1500);
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
            icon="Home"
            title="مرحباً بعودتك"
            subtitle="سجل دخولك للوصول إلى حسابك."
          />
          
          {hasError && (
            <ErrorBanner message="البريد الإلكتروني أو كلمة المرور غير صحيحة." />
          )}

          <LoginForm 
            isLoading={isLoading} 
            onSubmit={handleLogin} 
            onForgotPassword={() => navigation.navigate('ForgotPassword')}
          />
          
          <Divider />
          
          <SocialLoginSection />
          
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
    paddingTop: theme.spacing[40],
    paddingBottom: theme.spacing[48],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing[40],
  }
});
