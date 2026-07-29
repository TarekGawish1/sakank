import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as RQProvider } from '@tanstack/react-query';

import { queryClient } from '../lib/react-query/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <RQProvider client={queryClient}>
      {children}
    </RQProvider>
  );
};
