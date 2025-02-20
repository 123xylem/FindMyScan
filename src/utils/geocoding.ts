import { Coordinates } from "../types";
import { SuggestedPlace } from "../types";

export type PlaceSuggestion = {
  name: string;
  area?: string;
  latitude: number;
  longitude: number;
};

type PlaceResponse = {
  result: Array<SuggestedPlace>;
};

export const getPlaceSuggestions = async (
  input: string
): Promise<PlaceSuggestion[]> => {
  try {
    const url = `https://api.postcodes.io/places?q=${encodeURIComponent(
      input
    )}`;
    const response = await fetch(url);
    const data: PlaceResponse = await response.json();
    if (data.result?.length > 0) {
      return data.result.map((place) => ({
        name: place.name_1,
        area: place.county_unitary || place.region,
        latitude: place.latitude,
        longitude: place.longitude,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return [];
  }
};
