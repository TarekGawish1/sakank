import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { AppText, Button, Card, AppIcon } from '../../../components';

interface ErrorCardProps {
  onRetry: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Card variant="outlined" padding="lg" radius="lg" style={styles.errorCard}>
        <AppIcon name="AlertCircle" size="lg" color="error" style={styles.errorIcon} />
        <AppText variant="title2" color="textPrimary" weight="bold" align="center">
          حدث خطأ
        </AppText>
        <AppText variant="bodySm" color="textSecondary" align="center" style={styles.errorDesc}>
          تعذر تحميل طلباتك. يرجى التأكد من اتصالك بالإنترنت والمحاولة مرة أخرى.
        </AppText>
        <Button
          title="إعادة المحاولة"
          hierarchy="secondary"
          onPress={onRetry}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[24],
  },
  errorCard: {
    alignItems: 'center',
    gap: theme.spacing[16],
  },
  errorIcon: {
    marginBottom: theme.spacing[8],
  },
  errorDesc: {
    marginBottom: theme.spacing[8],
  },
});
