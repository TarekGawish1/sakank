import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from './types';
import { SearchScreen } from '../screens';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};
