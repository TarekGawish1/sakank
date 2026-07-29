import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useSession } from '../hooks/auth';
import { theme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SplashLoading = () => (
  <View style={styles.splash}>
    <ActivityIndicator size="large" color={theme.colors.brandPrimary} />
  </View>
);

export const RootNavigator = () => {
  const { isAuthenticated, isLoadingSession, isGuest } = useSession();

  if (isLoadingSession) {
    return <SplashLoading />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {(!isAuthenticated && !isGuest) ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceDefault,
  }
});
