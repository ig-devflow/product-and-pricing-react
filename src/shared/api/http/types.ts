export type ApiQueryPrimitive = string | number | boolean | Date;
export type ApiQueryValue =
  | ApiQueryPrimitive
  | readonly ApiQueryPrimitive[]
  | null
  | undefined;

export type ApiRequestBody =
  | BodyInit
  | Record<string, unknown>
  | unknown[]
  | null
  | undefined;

export interface ApiRequestOptions<TBody = ApiRequestBody>
  extends Omit<RequestInit, 'body'> {
  query?: Record<string, ApiQueryValue>;
  body?: TBody;
}

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}
