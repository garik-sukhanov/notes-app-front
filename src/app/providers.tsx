import { App as AntdApp } from 'antd';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/api/query-client';
import { ThemeContextProvider } from '@/shared/providers';
import { AntThemeProvider } from '@/shared/providers/ant-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdApp>
      <ThemeContextProvider>
        <AntThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AntThemeProvider>
      </ThemeContextProvider>
    </AntdApp>
  );
}
