import { ApiError } from '@/shared/api/http/types';

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = 'Something went wrong.',
): string {
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
}
