import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Button, AppIcon } from '../../../components';

export const SocialLoginSection = () => {
  return (
    <View style={styles.container}>
      <Button 
        title="الاستمرار باستخدام Google" 
        hierarchy="secondary" 
        size="large"
        leadingIcon={<AppIcon name="Chrome" size="md" color="secondary" />}
        onPress={() => {}} 
        style={styles.btn}
      />
      <Button 
        title="الاستمرار باستخدام Apple" 
        hierarchy="secondary" 
        size="large"
        leadingIcon={<AppIcon name="Apple" size="md" color="primary" />}
        onPress={() => {}} 
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[12],
    marginTop: theme.spacing[24],
  },
  btn: {
    width: '100%',
  }
});
