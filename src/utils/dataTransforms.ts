import type { ScanCenter } from "../types";

export function transformDatabaseToModel(dbObject: any): ScanCenter {
  return {
    id: dbObject.id,
    name: dbObject.name,
    address: dbObject.address,
    latitude: dbObject.latitude,
    longitude: dbObject.longitude,
    phone: dbObject.phone,
    email: dbObject.email,
    website: dbObject.website,
    operatingHours: dbObject.operating_hours,
    rating: dbObject.rating,
    createdAt: dbObject.created_at,
    updatedAt: dbObject.updated_at,
    imageUrl: dbObject.image_url,
    bookingUrl: dbObject.booking_url,
    scanTypes: dbObject.scan_types,
  };
}
