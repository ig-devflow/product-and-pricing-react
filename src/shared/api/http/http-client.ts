import { APP_CONFIG } from '@/shared/config/env';
import {
  ApiError,
  type ApiQueryPrimitive,
  type ApiRequestBody,
  type ApiRequestOptions,
  type ApiQueryValue,
} from './types';

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const normalizedBase = APP_CONFIG.apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const url = new URL(
    normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath,
    window.location.origin,
  );

  if (!query) {
    return url.toString();
  }

  for (const [key, rawValue] of Object.entries(query)) {
    appendQueryValue(url, key, rawValue);
  }

  return url.toString();
}

function isQueryValueArray(
  value: ApiQueryValue,
): value is readonly ApiQueryPrimitive[] {
  return Array.isArray(value);
}

function appendQueryValue(url: URL, key: string, rawValue: ApiQueryValue) {
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    return;
  }

  if (isQueryValueArray(rawValue)) {
    for (const item of rawValue) {
      appendQueryValue(url, key, item);
    }

    return;
  }

  url.searchParams.append(key, stringifyQueryValue(rawValue));
}

function stringifyQueryValue(value: ApiQueryPrimitive) {
  return value instanceof Date ? value.toISOString() : String(value);
}

function isResponseWithoutBody(response: Response): boolean {
  return response.status === 204 || response.status === 205 || response.status === 304;
}

async function parseResponse(response: Response): Promise<unknown> {
  if (isResponseWithoutBody(response)) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const text = await response.text();

  if (!text) {
    return null;
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(text);
  }

  return text;
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  if ('message' in payload && typeof payload.message === 'string') {
    return payload.message;
  }

  if ('detail' in payload && typeof payload.detail === 'string') {
    return payload.detail;
  }

  if ('title' in payload && typeof payload.title === 'string') {
    return payload.title;
  }

  if ('error' in payload && typeof payload.error === 'string') {
    return payload.error;
  }

  if ('errors' in payload && payload.errors && typeof payload.errors === 'object') {
    const values = Object.values(payload.errors as Record<string, unknown>)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter(
        (value): value is string =>
          typeof value === 'string' && value.trim().length > 0,
      );

    if (values.length > 0) {
      return values.join('\n');
    }
  }

  return fallback;
}

function isBodyInit(value: ApiRequestBody): value is BodyInit {
  return (
    typeof value === 'string' ||
    value instanceof FormData ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value) ||
    value instanceof URLSearchParams ||
    value instanceof ReadableStream
  );
}

function prepareRequestBody(body: ApiRequestBody): {
  body: BodyInit | undefined;
  contentType?: string;
} {
  if (body === undefined || body === null) {
    return { body: undefined };
  }

  if (isBodyInit(body)) {
    return { body };
  }

  return {
    body: JSON.stringify(body),
    contentType: 'application/json',
  };
}

async function request<TResponse, TBody = ApiRequestBody>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const { query, headers, body, ...rest } = options;
  const preparedBody = prepareRequestBody(body as ApiRequestBody);

  const response = await fetch(buildUrl(path, query), {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(preparedBody.contentType
        ? { 'Content-Type': preparedBody.contentType }
        : {}),
      ...headers,
    },
    body: preparedBody.body,
    ...rest,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(payload, `Request failed with status ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}

export const httpClient = {
  get<TResponse>(path: string, query?: ApiRequestOptions['query']) {
    return request<TResponse>(path, { method: 'GET', query });
  },

  post<TResponse, TBody = ApiRequestBody>(
    path: string,
    body?: TBody,
    options: ApiRequestOptions = {},
  ) {
    return request<TResponse, TBody>(path, {
      ...options,
      method: 'POST',
      body,
    });
  },

  put<TResponse, TBody = ApiRequestBody>(
    path: string,
    body?: TBody,
    options: ApiRequestOptions = {},
  ) {
    return request<TResponse, TBody>(path, {
      ...options,
      method: 'PUT',
      body,
    });
  },

  patch<TResponse, TBody = ApiRequestBody>(
    path: string,
    body?: TBody,
    options: ApiRequestOptions = {},
  ) {
    return request<TResponse, TBody>(path, {
      ...options,
      method: 'PATCH',
      body,
    });
  },

  delete<TResponse>(path: string, options: ApiRequestOptions = {}) {
    return request<TResponse>(path, {
      ...options,
      method: 'DELETE',
    });
  },
};
