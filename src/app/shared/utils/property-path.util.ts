export function getNestedValue(value: unknown, path: string): unknown {
  return path.split('.').reduce((obj: unknown, key: string) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, value);
}

export function normalizeToArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export function applyPropertyPath(values: unknown[], path: string): unknown[] {
  return values
    .map((v) => getNestedValue(v, path))
    .filter((v) => v !== null && v !== undefined)
    .flatMap((v) => normalizeToArray(v));
}
