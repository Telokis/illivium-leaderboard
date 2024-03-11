type Func = (...args: any[]) => any;

type BatchArgs<F extends Func> = Array<Parameters<F>>;
type BatchResult<F extends Func> = Array<Awaited<ReturnType<F>>>;

export async function promiseBatch<F extends Func>(
  batchSize: number,
  handler: F,
  args: BatchArgs<F>,
  waitBetweenBatches = 0,
): Promise<BatchResult<F>> {
  let index = 0;
  const results: BatchResult<F> = new Array(args.length);

  const next = async (): Promise<void> => {
    const i = index++;

    if (i < args.length) {
      const arg = args[i];
      const result = await handler(...arg);

      results[i] = result;

      if (waitBetweenBatches > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitBetweenBatches));
      }

      return await next();
    }
  };

  await Promise.all(new Array(batchSize).fill(0).map(() => next()));

  return results;
}
