export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function flatten<T>(arr: unknown[]): T[] {
  const result: T[] = [];

  const walk = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const item of value) walk(item);
    } else {
      result.push(value as T);
    }
  };

  walk(arr);
  return result;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("Chunk size must be a positive integer");
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
