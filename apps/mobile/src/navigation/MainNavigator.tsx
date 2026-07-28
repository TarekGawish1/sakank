import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { theme } from '../theme';
import { AppIcon } from '../components';

// Stacks
import { HomeStackNavigator } from './HomeStackNavigator';
import { SearchStackNavigator } from './SearchStackNavigator';
import { FavoritesStackNavigator } from './FavoritesStackNavigator';
import { RequestsStackNavigator } from './RequestsStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brandPrimary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceDefault,
          borderTopColor: theme.colors.borderSubtle,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.arabic,
          fontSize: 12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'Home';
          
          if (route.name === 'HomeStack') {
            iconName = 'Home';
          } else if (route.name === 'SearchStack') {
            iconName = 'Search';
          } else if (route.name === 'FavoritesStack') {
            iconName = 'Heart';
          } else if (route.name === 'RequestsStack') {
            iconName = 'FileText';
          } else if (route.name === 'ProfileStack') {
            iconName = 'User';
          }

          return <AppIcon name={iconName} size="md" color={focused ? 'brandPrimary' : 'tertiary'} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator} 
        options={{ tabBarLabel: 'الرئيسية' }}
      />
      <Tab.Screen 
        name="SearchStack" 
        component={SearchStackNavigator} 
        options={{ tabBarLabel: 'بحث' }}
      />
      <Tab.Screen 
        name="RequestsStack" 
        component={RequestsStackNavigator} 
        options={{ tabBarLabel: 'طلباتي' }}
      />
      <Tab.Screen 
        name="FavoritesStack" 
        component={FavoritesStackNavigator} 
        options={{ tabBarLabel: 'المفضلة' }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStackNavigator} 
        options={{ tabBarLabel: 'حسابي' }}
      />
    </Tab.Navigator>
  );
};
