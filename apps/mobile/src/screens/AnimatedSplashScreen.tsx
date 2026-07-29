import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Typography } from '../components/ui/Typography';

export const AnimatedSplashScreen = () => {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Start Animation (Fade In & Scale Up)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    // Check onboarding status while animation is playing, and navigate
    const navigateNext = async () => {
      try {
        const hasSeen = await SecureStore.getItemAsync('hasSeenOnboarding');
        
        // Wait at least 2 seconds so the user can enjoy the splash animation
        setTimeout(() => {
          if (hasSeen === 'true') {
            navigation.replace('MainTabs');
          } else {
            navigation.replace('Onboarding');
          }
        }, 2000);
      } catch (e) {
        setTimeout(() => navigation.replace('Onboarding'), 2000);
      }
    };

    navigateNext();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        <Typography variant="display-xl" color="brand">
          سكنك
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
