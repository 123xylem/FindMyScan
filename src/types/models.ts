export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ScanType {
  MRI = "MRI",
  CT = "CT",
  XRAY = "X-RAY",
  ULTRASOUND = "ULTRASOUND",
}

export interface ScanCenter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  operatingHours?: OperatingHours;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  scanTypes?: ScanType[];
}

export interface ScanTypes {
  id: string;
  name: string;
  description?: string;
  category: "MRI" | "CT" | "X-ray" | "Ultrasound";
  createdAt: string;
}

export interface ScanCenterPrice {
  id: string;
  scanCenterId: string;
  scanTypeId: string;
  price: number;
  insuranceAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserScan {
  id: string;
  userId: string;
  scanType: ScanType;
  fileUrl: string;
  filePath: string;
  notes?: string;
  scanDate: string; // Format: 'YYYY-MM-DD'
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  scanCenterId: string;
  scanTypeId: string;
  appointmentDate: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type SuggestedPlace = {
  name_1: string;
  county_unitary?: string;
  region?: string;
  latitude: number;
  longitude: number;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  createdAt: string;
  updatedAt: string;
};
