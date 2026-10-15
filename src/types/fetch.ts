export type FetchStatus = 'pending' | 'success' | 'error';

export interface FetchResource<T> {
  promise: Promise<T>;
  status: FetchStatus;
  data?: T;
  error?: unknown;
}
