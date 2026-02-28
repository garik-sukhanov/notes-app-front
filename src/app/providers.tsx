import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/api/query-client';
import { ThemeContextProvider } from '@/shared/providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}
