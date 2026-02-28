import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/api/query-client';
import { ThemeContextProvider } from '@/shared/providers';
import { NotificationProvider } from '@/shared/context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  );
}
