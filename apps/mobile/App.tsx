import "./global.css";
import React, { useState } from 'react';
import { View, Text, ScrollView, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold, Alexandria_700Bold } from '@expo-google-fonts/alexandria';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';

import { RootNavigator } from './src/navigation/RootNavigator';

// Force RTL Layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}
