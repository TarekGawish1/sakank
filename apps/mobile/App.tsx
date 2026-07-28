import React, { useEffect } from 'react';
import { I18nManager, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold, Alexandria_700Bold } from '@expo-google-fonts/alexandria';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

import { MainTabNavigator } from './src/navigation/MainTabNavigator';
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
      if (__DEV__) {
        // Only works in production bundle for OTA updates normally, 
        // but let's reload to apply RTL if needed.
        // We'll avoid calling reload in dev to avoid loops, just force it.
      } else {
        Updates.reloadAsync();
      }
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
    <SafeAreaProvider>
      <NavigationContainer>
        <MainTabNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
