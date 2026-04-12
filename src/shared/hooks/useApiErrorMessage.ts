import { useMemo } from 'react';
import { ApiError } from '@/shared/api/http/types';

export const useApiErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong.',
) =>
  useMemo(() => {
    if (!error) {
      return '';
    }

    if (error instanceof ApiError) {
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallbackMessage;
  }, [error, fallbackMessage]);
