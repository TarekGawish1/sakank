import React, { useEffect } from 'react';
import { I18nManager, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import { Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold, Alexandria_700Bold } from '@expo-google-fonts/alexandria';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

import { RootNavigator } from './src/navigation/RootNavigator';
import { AppProviders } from './src/providers';
import { theme } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Alexandria_400Regular,
    Alexandria_500Medium,
    Alexandria_600SemiBold,
    Alexandria_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Force RTL for Arabic First
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      // In a real app we'd reload, but for Expo Go preview we'll skip forcing reload
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.surfaceDefault }}>
        <ActivityIndicator size="large" color={theme.colors.surfacePrimary} />
      </View>
    );
  }

  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="dark" />
    </AppProviders>
  );
}
