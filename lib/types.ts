export type BedType = 'single' | 'double' | 'queen' | 'king' | 'twin';

export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  amenities: string[];
  bedType: BedType;
  capacity: number;
  nightlyRate: number;
  nightlyRateOriginal?: number;
  availability: {
    available: number;
    occupied: number;
  };
  features?: string[];
  viewType?: string;
  squareFeet?: number;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface RoomFilters {
  capacity?: number;
  priceRange?: [number, number];
  bedType?: BedType;
  search?: string;
}

export interface RoomSortOption {
  value: 'price-asc' | 'price-desc' | 'name' | 'rating';
  label: string;
}

export interface BookingRequest {
  roomId: string;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  numberOfGuests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingResponse {
  id: string;
  bookingNumber: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfNights: number;
  totalPrice: number;
  nightlyRate: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface AvailabilityCheck {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
}

export interface AvailabilityResult {
  available: boolean;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  totalPrice: number;
  nightlyRate: number;
  reason?: string; // If not available, explains why
}
