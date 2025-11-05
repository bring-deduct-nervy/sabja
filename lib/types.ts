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
