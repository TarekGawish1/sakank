import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon, Button } from '../../../components';

interface SuccessStateProps {
  onBackToHome: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ onBackToHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon name="CheckCircle" size="xl" color="success" />
      </View>
      <AppText variant="title1" weight="bold" color="textPrimary" style={styles.title}>
        تم إرسال الطلب
      </AppText>
      <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.desc}>
        سيتم إشعارك بمجرد رد المالك.
      </AppText>
      
      <Button 
        title="العودة للرئيسية" 
        hierarchy="primary" 
        size="large"
        onPress={onBackToHome}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[32],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSuccess,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[24],
  },
  title: {
    marginBottom: theme.spacing[12],
  },
  desc: {
    marginBottom: theme.spacing[40],
  },
  btn: {
    width: '100%',
  }
});
