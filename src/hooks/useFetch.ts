import type { FetchResource } from '../types/fetch';

const cache = new Map<string, FetchResource<unknown>>();

function getResource<T>(urls: string[]): FetchResource<T[]> {
  const key = JSON.stringify(urls);
  const cached = cache.get(key);

  if (cached) {
    return cached as FetchResource<T[]>;
  }

  const resource: FetchResource<T[]> = {
    status: 'pending',
    promise: Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status} (${url})`);
        }

        return (await response.json()) as T;
      }),
    ),
  };

  cache.set(key, resource);

  resource.promise.then(
    (data) => {
      resource.status = 'success';
      resource.data = data;
    },
    (error: unknown) => {
      resource.status = 'error';
      resource.error = error;
    },
  );

  return resource;
}

export function useFetch<T>(urls: string[]): T[] {
  const resource = getResource<T>(urls);

  if (resource.status === 'pending') {
    throw resource.promise;
  }

  if (resource.status === 'error') {
    throw resource.error;
  }

  return resource.data!;
}
