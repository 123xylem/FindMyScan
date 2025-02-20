import { useState, useEffect } from "react";
import type { ScanCenter, Coordinates } from "../types";
import { isWithinBounds } from "../utils/distance";
import type { FilterOptions } from "../screens/centers/CenterFilters";

export const useFilteredCenters = (centers: ScanCenter[] = []) => {
  const [filters, setFilters] = useState<FilterOptions>({
    minRating: 0,
    maxDistance: 10,
    scanTypes: [],
    userLocation: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
  });

  const filteredCenters = centers.filter((center) => {
    if (center.rating && center.rating < filters.minRating) return false;
    if (
      !isWithinBounds(
        { latitude: center.latitude, longitude: center.longitude },
        filters.userLocation,
        filters.maxDistance
      )
    )
      return false;
    if (
      filters.scanTypes.length > 0 &&
      !filters.scanTypes.every((scan) => center.scanTypes?.includes(scan))
    )
      return false;
    return true;
  });

  return {
    filters,
    setFilters,
    filteredCenters,
    filteredCount: filteredCenters.length,
  };
};
