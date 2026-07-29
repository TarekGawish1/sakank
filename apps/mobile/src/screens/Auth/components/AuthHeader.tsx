import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../../theme';
import { AppText, AppIcon } from '../../../components';

interface AuthHeaderProps {
  icon?: string;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  onBack?: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ icon, title, subtitle, onClose, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={10} style={styles.iconButton}>
            <AppIcon name="ChevronLeft" size="md" color="primary" />
          </Pressable>
        ) : onClose ? (
          <Pressable onPress={onClose} hitSlop={10} style={styles.iconButton}>
            <AppIcon name="X" size="md" color="primary" />
          </Pressable>
        ) : <View style={styles.iconButtonPlaceholder} />}
      </View>
      
      {icon && (
        <View style={styles.logoContainer}>
          <AppIcon name="Building2" size="xl" color="primary" />
        </View>
      )}
      
      <AppText variant="headline" color="textPrimary" weight="bold" style={styles.title}>
        {title}
      </AppText>
      
      {subtitle && (
        <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.subtitle}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing[24],
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing[16],
  },
  iconButton: {
    padding: theme.spacing[8],
    marginLeft: -theme.spacing[8], // To align with the edge
  },
  iconButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  logoContainer: {
    marginBottom: theme.spacing[12],
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  },
  subtitle: {
    marginTop: theme.spacing[4],
  }
});
