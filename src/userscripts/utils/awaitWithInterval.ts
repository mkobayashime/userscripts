function awaitWithInterval<T>(
  getter: () => { data: T } | false | undefined | null,
  options: {
    interval?: number;
    timeout?: number;
  } = { interval: 250, timeout: 3000 },
) {
  return new Promise<T | undefined>((resolve) => {
    // biome-ignore lint/style/useConst: <explanation>
    let intervalID: number | undefined;

    const intervalFunction = () => {
      const data = getter();

      if (data) {
        if (intervalID !== undefined) {
          window.clearTimeout(intervalID);
        }
        resolve(data.data);
      }
    };

    intervalFunction();
    intervalID = window.setInterval(intervalFunction, options.interval);

    window.setTimeout(() => {
      window.clearInterval(intervalID);
      resolve(undefined);
    }, options.timeout);
  });
}

export { awaitWithInterval };
