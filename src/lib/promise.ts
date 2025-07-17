const delay = (ms?: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => { resolve() }, 0);
  });
};

export { delay };
