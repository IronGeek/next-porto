import type { Fetcher, Arguments } from 'swr';

class FetchError extends Error {
  #code: number
  constructor(code: number, message?: string, options?: ErrorOptions) {
    super(message, options)

    this.#code = code;
  }

  get code(): number {
    return this.#code;
  }
}

const fetchStrategy = Object.freeze({
  default: {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Don't retry for 404 errors
      if (error.status === 404) { return }

      // Only retry up to 3 times
      if (retryCount >= 3) { return }

      // Retry after 5 seconds
      setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
    }
  }
});

const createFetcher = <T>(type: 'json' | 'blob' | 'text'): Fetcher<T, string> => {
  return async <T>(arg: string | [string, Record<string, string>]) => {
    const [url, params] = typeof arg === 'string' ? [arg, {}] : arg;
    const query = new URLSearchParams(params);
    const fetchURL = query.size > 0 ? `${url}?${query}` : url;
    const response = await fetch(fetchURL);

    if (!response.ok) {
      throw new FetchError(response.status, response.statusText);
    }

    return response[type]() as T
  }
};

const fetcher = Object.freeze({
  json: <T>(arg: string) => createFetcher<T>('json')(arg),
  text: <T>(arg: string) => createFetcher<T>('text')(arg),
  blob: <T>(arg: string) => createFetcher<T>('blob')(arg)
});

const dispatcher = <T>(method: string) => {
  return async (url: string, { arg }: { arg: T }): Promise<void> => {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    });
  }
};

const NotFoundResponse = Response.json(null, { status: 404 })

type RequestContext<T> = {
  params: Promise<T>
}

const revalidator = (test: RegExp | string) => (arg: string | [string, Record<string, string>]) => {
  const key = Array.isArray(arg) ? arg[0] : arg;
  return test instanceof RegExp ? test.test(key) : key.startsWith('/projects');
};

export { FetchError, revalidator, fetchStrategy, fetcher, dispatcher, NotFoundResponse};
export type { RequestContext }
