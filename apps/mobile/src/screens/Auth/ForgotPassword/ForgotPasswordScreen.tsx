import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText } from '../../../components';
import { ForgotPasswordForm, SuccessCard } from './components';
import { AuthHeader, Divider, ErrorBanner } from '../components';

type ViewState = 'form' | 'loading' | 'success' | 'error';

export const ForgotPasswordScreen = () => {
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
      return <SuccessCard onBackToLogin={() => setViewState('form')} />;
    }

    return (
      <View>
        <AuthHeader 
          icon="Lock"
          title="نسيت كلمة المرور؟"
          subtitle="أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور."
        />
        
        {viewState === 'error' && (
          <ErrorBanner message="تعذر إرسال الرابط. يرجى المحاولة مرة أخرى." />
        )}

        <ForgotPasswordForm 
          isLoading={viewState === 'loading'} 
          onSubmit={handleSubmit} 
        />
        
        <Divider text="" />
        
        <View style={styles.footer}>
          <AppText variant="bodySm" color="textSecondary">
            تذكرت كلمة المرور؟
          </AppText>
          <Pressable onPress={() => {}}>
            <AppText variant="bodySm" color="brandPrimary" weight="bold">
              {' '}تسجيل الدخول
            </AppText>
          </Pressable>
        </View>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing[8], // slightly smaller margin since Divider gives space
  }
});
