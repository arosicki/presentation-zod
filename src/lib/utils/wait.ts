export const wait = async (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
