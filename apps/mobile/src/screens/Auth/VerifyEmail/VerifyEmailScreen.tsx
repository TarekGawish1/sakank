import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { Button } from '../../../components';
import { OtpInput, ResendSection } from './components';
import { AuthHeader, ErrorBanner, SuccessCard } from '../components';

type ViewState = 'form' | 'loading' | 'success' | 'error';

export const VerifyEmailScreen = () => {
  const [viewState, setViewState] = useState<ViewState>('form');

  const handleVerify = () => {
    // UI Mock
    setViewState('loading');
    
    // Toggle success after 1.5s
    setTimeout(() => {
      setViewState('success');
    }, 1500);
  };

  const renderContent = () => {
    if (viewState === 'success') {
      return (
        <SuccessCard 
          icon="CheckCircle"
          title="تم التحقق بنجاح"
          description="يمكنك الآن تسجيل الدخول."
          buttonTitle="تسجيل الدخول"
          onAction={() => {}} 
        />
      );
    }

    return (
      <View>
        <AuthHeader 
          icon="MailCheck"
          title="تحقق من بريدك الإلكتروني"
          subtitle="أدخل رمز التحقق المرسل إلى بريدك الإلكتروني."
        />
        
        {viewState === 'error' && (
          <ErrorBanner message="رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى." />
        )}

        <View style={styles.formContainer}>
          <OtpInput isLoading={viewState === 'loading'} />
          
          <Button 
            title="تأكيد" 
            hierarchy="primary" 
            size="large"
            loading={viewState === 'loading'}
            disabled={viewState === 'loading'}
            onPress={handleVerify}
            style={styles.submitBtn}
          />
        </View>
        
        <ResendSection isLoading={viewState === 'loading'} />
      </View>
    );
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
          {renderContent()}
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
  formContainer: {
    gap: theme.spacing[32],
  },
  submitBtn: {
    width: '100%',
  }
});
