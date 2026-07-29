import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { theme } from '../../../theme';

export const SocialLoginSection = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={() => {}}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/512px-Google_%22G%22_logo.svg.png' }} 
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable style={styles.btn} onPress={() => {}}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png' }} 
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing[16],
    marginTop: theme.spacing[16],
  },
  btn: {
    flex: 1,
    height: 56,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceDefault,
  },
  icon: {
    width: 24,
    height: 24,
  }
});
