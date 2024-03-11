type Func = (...args: any[]) => any;

type BatchArgs<F extends Func> = Array<Parameters<F>>;
type BatchResult<F extends Func> = Array<Awaited<ReturnType<F>>>;

export async function promiseBatch<F extends Func>(
  batchSize: number,
  handler: F,
  args: BatchArgs<F>,
): Promise<BatchResult<F>> {
  let index = 0;
  const results: BatchResult<F> = new Array(args.length);

  const next = async (): Promise<void> => {
    const i = index++;

    if (i < args.length) {
      const arg = args[i];
      const result = await handler(...arg);

      results[i] = result;

      return await next();
    }
  };

  await Promise.all(new Array(batchSize).fill(0).map(() => next()));

  return results;
}

type SettledReturnType<F extends Func> =
  | {
      status: "fulfilled";
      value: Awaited<ReturnType<F>>;
    }
  | { status: "rejected"; reason: unknown };

export async function promiseBatchSettled<F extends Func>(
  batchSize: number,
  handler: F,
  args: BatchArgs<F>,
) {
  const wrapper: (...args2: Parameters<F>) => SettledReturnType<F> = (...subArgs: Parameters<F>) =>
    handler(...subArgs)
      .then((res: unknown) => ({ status: "fulfilled", value: res }))
      .catch((err: unknown) => ({ status: "rejected", reason: err }));

  return await promiseBatch(batchSize, wrapper, args);
}
