import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Button, AppIcon } from '../../../components';

interface SuccessCardProps {
  icon: string;
  title: string;
  description: string;
  buttonTitle: string;
  onAction: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ 
  icon, 
  title, 
  description, 
  buttonTitle, 
  onAction 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon name={icon as any} size="xl" color="success" />
      </View>
      
      <AppText variant="title1" weight="bold" color="textPrimary" style={styles.title}>
        {title}
      </AppText>
      
      <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.desc}>
        {description}
      </AppText>
      
      <Button 
        title={buttonTitle} 
        hierarchy="primary" 
        size="large"
        onPress={onAction}
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
    marginTop: theme.spacing[40],
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
    textAlign: 'center',
  },
  desc: {
    marginBottom: theme.spacing[40],
  },
  btn: {
    width: '100%',
  }
});
