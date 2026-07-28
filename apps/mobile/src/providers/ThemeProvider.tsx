import React, { createContext, useContext, ReactNode } from 'react';
import { theme } from '../theme';

// Expose our existing theme as a context
const ThemeContext = createContext<typeof theme>(theme);

export const useAppTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
