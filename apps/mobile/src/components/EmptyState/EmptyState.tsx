import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import { AppText } from '../AppText';
import { AppIcon, IconName } from '../AppIcon';
import { Button } from '../Button';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  primaryButtonTitle?: string;
  primaryButtonOnPress?: () => void;
  secondaryButtonTitle?: string;
  secondaryButtonOnPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryButtonTitle,
  primaryButtonOnPress,
  secondaryButtonTitle,
  secondaryButtonOnPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={styles.iconContainer}>
          <AppIcon name={icon} size="xl" color="tertiary" />
        </View>
      )}
      <AppText variant="title2" color="textPrimary" weight="bold" style={styles.title}>
        {title}
      </AppText>
      {description && (
        <AppText variant="bodyBase" color="textSecondary" align="center" style={styles.description}>
          {description}
        </AppText>
      )}
      {primaryButtonTitle && primaryButtonOnPress && (
        <Button
          title={primaryButtonTitle}
          onPress={primaryButtonOnPress}
          hierarchy="primary"
          size="large"
          style={styles.primaryButton}
        />
      )}
      {secondaryButtonTitle && secondaryButtonOnPress && (
        <Button
          title={secondaryButtonTitle}
          onPress={secondaryButtonOnPress}
          hierarchy="secondary"
          size="medium"
          style={styles.secondaryButton}
        />
      )}
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
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubdued,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[24],
  },
  title: {
    marginBottom: theme.spacing[8],
    textAlign: 'center',
  },
  description: {
    marginBottom: theme.spacing[32],
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    marginTop: theme.spacing[12],
    width: '100%',
  },
});
