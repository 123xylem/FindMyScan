type Coordinates = {
  latitude: number;
  longitude: number;
};

// Simple box check first for performance
export const isWithinBounds = (
  point: Coordinates,
  center: Coordinates,
  radiusKm: number
): boolean => {
  // Convert km to rough lat/lon degrees (1 degree ≈ 111km)
  const latDegrees = radiusKm / 111;
  const lonDegrees =
    radiusKm / (111 * Math.cos((center.latitude * Math.PI) / 180));

  return (
    point.latitude >= center.latitude - latDegrees &&
    point.latitude <= center.latitude + latDegrees &&
    point.longitude >= center.longitude - lonDegrees &&
    point.longitude <= center.longitude + lonDegrees
  );
};
