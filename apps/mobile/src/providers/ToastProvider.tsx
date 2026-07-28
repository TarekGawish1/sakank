import React, { createContext, useContext, ReactNode } from 'react';

// Placeholder Toast Context
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // UI logic for showing toast will be implemented here
    console.log(`[Toast] ${type}: ${message}`);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast rendering component will be placed here */}
    </ToastContext.Provider>
  );
};
