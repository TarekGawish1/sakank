import React from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { theme } from '../../../theme';
import { AppText } from '../../../components';
import { LoginForm } from './components';
import { AuthHeader, SocialLoginSection, Divider, ErrorBanner } from '../components';
import { useLogin } from '../../../hooks/auth';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = (credentials: { email: string; password: string }) => {
    login(credentials);
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
          
          {error && (
            <ErrorBanner message={error.message} />
          )}

          <LoginForm 
            isLoading={isPending} 
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
