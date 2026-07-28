import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { HomeScreen, PropertyDetailsScreen, StayRequestScreen } from '../screens';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="StayRequest" component={StayRequestScreen} />
    </Stack.Navigator>
  );
};
