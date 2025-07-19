type ServiceFactory<T> = (...args: unknown[]) => T;

const registerService =<T>(name: symbol | string, init: ServiceFactory<T>): T => {
  if (process.env.NODE_ENV === 'development') {
    if (!(name in globalThis)) {
      globalThis[name] = init();
    }

    return globalThis[name];
  }

  return init();
};

export { registerService };
