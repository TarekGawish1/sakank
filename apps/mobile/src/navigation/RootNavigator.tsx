import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { PropertyDetailsScreen } from '../screens/PropertyDetailsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { AnimatedSplashScreen } from '../screens/AnimatedSplashScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={AnimatedSplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
