export type GeoCoordinates = {
  latitude: number;
  longitude: number;
  type: 'GeoCoordinates';
};

export function isGeoCoordinates(obj: unknown): obj is GeoCoordinates {
  if (!obj || typeof obj !== 'object') return false;
  const candidate = obj as Record<string, unknown>;
  return (
    candidate['type'] === 'GeoCoordinates' &&
    typeof candidate['latitude'] === 'number' &&
    typeof candidate['longitude'] === 'number'
  );
}
