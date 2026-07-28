import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequestsStackParamList } from './types';
import { MyRequestsScreen } from '../screens';

const Stack = createNativeStackNavigator<RequestsStackParamList>();

export const RequestsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
    </Stack.Navigator>
  );
};
