import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../../components';
import {
  RegisterHeader,
  RegisterForm,
} from './components';

// Reusing these from Login as requested
import { SocialLoginSection, Divider, ErrorBanner } from '../Login/components';

export const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleRegister = () => {
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
          <RegisterHeader />
          
          {hasError && (
            <ErrorBanner message="تعذر إنشاء الحساب. يرجى المحاولة مرة أخرى." />
          )}

          <RegisterForm isLoading={isLoading} onSubmit={handleRegister} />
          
          <Divider />
          
          <SocialLoginSection />
          
          <View style={styles.footer}>
            <AppText variant="bodySm" color="textSecondary">
              لديك حساب بالفعل؟
            </AppText>
            <Pressable onPress={() => {}}>
              <AppText variant="bodySm" color="brandPrimary" weight="bold">
                {' '}تسجيل الدخول
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
