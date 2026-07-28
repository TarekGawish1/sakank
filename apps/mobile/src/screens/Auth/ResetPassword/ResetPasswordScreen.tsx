import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { ResetPasswordForm } from './components';
import { AuthHeader, ErrorBanner, SuccessCard } from '../components';

type ViewState = 'form' | 'loading' | 'success' | 'error';

export const ResetPasswordScreen = () => {
  const [viewState, setViewState] = useState<ViewState>('form');

  const handleSubmit = () => {
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
          title="تم تحديث كلمة المرور"
          description="يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة."
          buttonTitle="تسجيل الدخول"
          onAction={() => {}} 
        />
      );
    }

    return (
      <View>
        <AuthHeader 
          icon="Lock"
          title="إنشاء كلمة مرور جديدة"
          subtitle="أدخل كلمة مرور جديدة لتأمين حسابك."
        />
        
        {viewState === 'error' && (
          <ErrorBanner message="تعذر تحديث كلمة المرور. يرجى المحاولة مرة أخرى." />
        )}

        <ResetPasswordForm isLoading={viewState === 'loading'} onSubmit={handleSubmit} />
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
  }
});
