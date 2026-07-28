import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { theme } from '../../../../theme';

interface OtpInputProps {
  isLoading?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ isLoading }) => {
  // Creating an array of 6 boxes to mockup the OTP input
  const boxes = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      {boxes.map((box, index) => (
        <View key={box} style={styles.boxContainer}>
          <TextInput
            style={[
              styles.input,
              index === 0 && styles.activeInput, // Mock first input as active
            ]}
            maxLength={1}
            keyboardType="number-pad"
            editable={!isLoading}
            placeholder={index === 0 ? '' : ' '} // visually show empty
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    direction: 'ltr', // Standard for OTP inputs even in RTL
  },
  boxContainer: {
    width: 48,
    height: 56,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceDefault,
    textAlign: 'center',
    fontSize: 24,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.primary,
  },
  activeInput: {
    borderColor: theme.colors.brandPrimary,
    borderWidth: 1.5,
  }
});
