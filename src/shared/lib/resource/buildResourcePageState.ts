import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';

interface BuildResourcePageStateOptions<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: unknown;
  fallbackErrorMessage: string;
}

export function buildResourcePageState<T>(
  options: BuildResourcePageStateOptions<T>,
) {
  const errorMessage = getApiErrorMessage(
    options.error,
    options.fallbackErrorMessage,
  );

  return {
    data: options.data ?? null,
    isLoading: Boolean(options.isLoading),
    errorMessage,
    hasError: Boolean(errorMessage),
  };
}
