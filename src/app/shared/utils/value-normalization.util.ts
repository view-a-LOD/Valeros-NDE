export function normalizeToArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export function normalizeToString(
  value: string | string[] | undefined | null
): string | undefined {
  if (value === undefined || value === null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}
