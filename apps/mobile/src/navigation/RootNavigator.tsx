import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { TabNavigator } from './TabNavigator';
import { PropertyDetailsScreen } from '../screens/PropertyDetailsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeen = await SecureStore.getItemAsync('hasSeenOnboarding');
        if (hasSeen === 'true') {
          setInitialRoute('MainTabs');
        }
      } catch (e) {
        // ignore
      } finally {
        setIsReady(true);
      }
    };
    checkOnboarding();
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#155EEF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
