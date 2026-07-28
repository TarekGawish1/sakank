import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import { AppText, Button, AppIcon, Card } from '../components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Card variant="outlined" padding="lg" radius="lg" style={styles.card}>
              <AppIcon name="AlertTriangle" size="xl" color="error" style={styles.icon} />
              
              <AppText variant="title2" color="textPrimary" weight="bold" align="center">
                عذراً، حدث خطأ غير متوقع
              </AppText>
              
              <AppText variant="bodySm" color="textSecondary" align="center" style={styles.description}>
                نأسف لهذا الخلل. يرجى إعادة المحاولة أو إغلاق التطبيق وفتحه من جديد.
              </AppText>
              
              <Button 
                title="إعادة المحاولة" 
                onPress={this.handleReset} 
                hierarchy="primary" 
                style={styles.button}
              />
            </Card>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDefault,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[24],
  },
  card: {
    alignItems: 'center',
    gap: theme.spacing[16],
  },
  icon: {
    marginBottom: theme.spacing[8],
  },
  description: {
    marginBottom: theme.spacing[16],
  },
  button: {
    width: '100%',
  }
});
