// Supabase API response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Google Maps API types
export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
}

export interface GooglePlacesResponse {
  results: GooglePlace[];
  status: string;
  next_page_token?: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
