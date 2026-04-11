import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import type { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const withAppProviders = (
  options: {
    initialEntries?: string[];
  } = {},
) => {
  const queryClient = createTestQueryClient();
  const entries = options.initialEntries ?? ['/'];

  const Wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={entries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  return {
    Wrapper,
    queryClient,
  };
};
