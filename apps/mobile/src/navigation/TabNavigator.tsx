import React from 'react';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Heart, User } from 'lucide-react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Simple TabBarButton to remove Android Ripple effect without using Reanimated (which caused the crash)
const TabBarButton = (props: any) => {
  return (
    <Pressable
      {...props}
      android_ripple={null} // Removes the ugly ripple
      style={[props.style, { flex: 1, backgroundColor: 'transparent' }]}
    />
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarActiveTintColor: '#155EEF', // primary-500
        tabBarInactiveTintColor: '#94A3B8', // neutrals-400
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F8FAFC', // neutrals-50
          height: 68,
          paddingBottom: 12,
          paddingTop: 12,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Alexandria_500Medium',
          fontSize: 11,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ color, size }) => <Home color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'البحث',
          tabBarIcon: ({ color, size }) => <Search color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesScreen} 
        options={{
          tabBarLabel: 'المفضلة',
          tabBarIcon: ({ color, size }) => <Heart color={color} size={22} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'حسابي',
          tabBarIcon: ({ color, size }) => <User color={color} size={22} />,
        }}
      />
    </Tab.Navigator>
  );
};
