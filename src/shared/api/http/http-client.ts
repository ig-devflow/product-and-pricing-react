import { APP_CONFIG } from '@/shared/config/env';
import { HttpError } from './http-error';

export interface HttpClient {
  get<TResponse>(path: string, init?: RequestInit): Promise<TResponse>;
  put<TBody, TResponse>(path: string, body: TBody, init?: RequestInit): Promise<TResponse>;
}

const buildUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${APP_CONFIG.apiBaseUrl}${path}`;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';

  if (response.status === 204 || contentType.length === 0) {
    return null;
  }

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

const request = async <TResponse>(path: string, init: RequestInit): Promise<TResponse> => {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    throw new HttpError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
      body,
    );
  }

  return body as TResponse;
};

export const httpClient: HttpClient = {
  get: <TResponse>(path: string, init?: RequestInit) =>
    request<TResponse>(path, { ...init, method: 'GET' }),

  put: <TBody, TResponse>(path: string, body: TBody, init?: RequestInit) =>
    request<TResponse>(path, {
      ...init,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
};
