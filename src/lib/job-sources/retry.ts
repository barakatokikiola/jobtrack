export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === attempts) {
        throw lastError;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delayMs * attempt)
      );
    }
  }

  throw lastError;
}