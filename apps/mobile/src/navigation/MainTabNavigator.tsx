import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './components/TabBar';
import { HomeScreen } from '../screens/Home';

const Tab = createBottomTabNavigator();

const DummyScreen = () => <View style={{ flex: 1, backgroundColor: '#F9FAFB' }} />;

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'الرئيسية' }} />
      <Tab.Screen name="Search" component={DummyScreen} options={{ tabBarLabel: 'بحث' }} />
      <Tab.Screen name="Favorites" component={DummyScreen} options={{ tabBarLabel: 'المفضلة' }} />
      <Tab.Screen name="Messages" component={DummyScreen} options={{ tabBarLabel: 'الرسائل' }} />
      <Tab.Screen name="Profile" component={DummyScreen} options={{ tabBarLabel: 'حسابي' }} />
    </Tab.Navigator>
  );
};
