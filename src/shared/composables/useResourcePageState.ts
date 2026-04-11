import { useMemo } from 'react';
import { useApiErrorMessage } from './useApiErrorMessage';

interface UseResourcePageStateOptions<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: unknown;
  fallbackErrorMessage: string;
}

export function useResourcePageState<T>(
  options: UseResourcePageStateOptions<T>,
) {
  const errorMessage = useApiErrorMessage(
    options.error,
    options.fallbackErrorMessage,
  );

  return useMemo(
    () => ({
      data: options.data ?? null,
      isLoading: Boolean(options.isLoading),
      errorMessage,
      hasError: Boolean(errorMessage),
    }),
    [errorMessage, options.data, options.isLoading],
  );
}
