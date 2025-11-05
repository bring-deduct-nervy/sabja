import { Room, Reservation } from '@prisma/client'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  details?: any
}

export interface RoomWithAmenities extends Omit<Room, 'amenities'> {
  amenities: string[]
}

export interface AvailabilityResponse {
  available: boolean
  roomId: string
  roomName: string
  checkIn: string
  checkOut: string
  nights: number
  pricePerNight: number
  totalPrice: number
}

export interface ReservationWithRoom extends Reservation {
  room: RoomWithAmenities
}

export interface RoomFilters {
  capacity?: number
  minPrice?: number
  maxPrice?: number
}

export async function fetchRooms(
  filters?: RoomFilters
): Promise<ApiResponse<RoomWithAmenities[]>> {
  const params = new URLSearchParams()
  
  if (filters?.capacity) {
    params.append('capacity', filters.capacity.toString())
  }
  if (filters?.minPrice) {
    params.append('minPrice', filters.minPrice.toString())
  }
  if (filters?.maxPrice) {
    params.append('maxPrice', filters.maxPrice.toString())
  }

  const url = `/api/rooms${params.toString() ? `?${params.toString()}` : ''}`
  const response = await fetch(url)
  return response.json()
}

export async function fetchRoom(id: string): Promise<ApiResponse<RoomWithAmenities>> {
  const response = await fetch(`/api/rooms/${id}`)
  return response.json()
}

export async function checkAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<ApiResponse<AvailabilityResponse>> {
  const params = new URLSearchParams({
    roomId,
    checkIn,
    checkOut,
  })

  const response = await fetch(`/api/availability?${params.toString()}`)
  return response.json()
}

export async function createReservation(data: {
  roomId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
}): Promise<ApiResponse<ReservationWithRoom>> {
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function cancelReservation(
  id: string
): Promise<ApiResponse<Reservation>> {
  const response = await fetch(`/api/reservations/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
