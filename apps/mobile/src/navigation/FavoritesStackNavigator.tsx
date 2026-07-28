import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesStackParamList } from './types';
import { FavoritesScreen } from '../screens';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
