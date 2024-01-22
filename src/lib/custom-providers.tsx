'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { QueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

export function CustomProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryPvorider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReactQueryPvorider>
  );
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
};

const ReactQueryPvorider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClientStore] = useState(
    () => new QueryClient(queryClientOptions),
  );

  return (
    <QueryClientProvider client={queryClientStore}>
      {children}
    </QueryClientProvider>
  );
};
