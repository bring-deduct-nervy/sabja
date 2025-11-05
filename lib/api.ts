import type { Room, RoomFilters } from './types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      };
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: message,
    };
  }
}

export async function fetchRooms(filters?: RoomFilters): Promise<Room[]> {
  const params = new URLSearchParams();

  if (filters?.capacity) {
    params.append('capacity', filters.capacity.toString());
  }
  if (filters?.priceRange) {
    params.append('minPrice', filters.priceRange[0].toString());
    params.append('maxPrice', filters.priceRange[1].toString());
  }
  if (filters?.bedType) {
    params.append('bedType', filters.bedType);
  }
  if (filters?.search) {
    params.append('search', filters.search);
  }

  const response = await fetchApi<Room[]>(`/api/rooms?${params.toString()}`);

  if (!response.success || !response.data) {
    throw new Error(response.error || 'Failed to fetch rooms');
  }

  return response.data;
}

export async function fetchRoomBySlug(slug: string): Promise<Room> {
  const response = await fetchApi<Room>(`/api/rooms/${slug}`);

  if (!response.success || !response.data) {
    throw new Error(response.error || 'Failed to fetch room');
  }

  return response.data;
}
