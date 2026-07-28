import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppErrorBoundary } from './AppErrorBoundary';
import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { ToastProvider } from './ToastProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryProvider>
            <ToastProvider>
              <NavigationContainer>
                {children}
              </NavigationContainer>
            </ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
};
