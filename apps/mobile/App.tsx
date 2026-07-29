import "./global.css";
import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold, Alexandria_700Bold } from '@expo-google-fonts/alexandria';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

export default function App() {
  const [fontsLoaded] = useFonts({
    Alexandria_400Regular,
    Alexandria_500Medium,
    Alexandria_600SemiBold,
    Alexandria_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-primary-50 items-center justify-center p-24">
      <Text className="font-alexandriaBold text-32 leading-40 text-primary-900 mb-12 text-center">
        NativeWind جاهز!
      </Text>
      <Text className="font-inter text-16 text-neutrals-600 text-center">
        Tailwind CSS + Expo Setup Complete
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
