export interface Booking {
  id: string
  guestName: string
  email: string
  checkIn: string
  checkOut: string
  roomId: string
  createdAt: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

// In-memory storage for demo purposes
const bookings: Map<string, Booking> = new Map()

export const createBooking = (data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
  const id = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const booking: Booking = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  }
  bookings.set(id, booking)
  return booking
}

export const getBooking = (id: string): Booking | undefined => {
  return bookings.get(id)
}

export const getAllBookings = (): Booking[] => {
  return Array.from(bookings.values())
}

export const validateBookingData = (data: any): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!data.guestName || typeof data.guestName !== 'string' || !data.guestName.trim()) {
    errors.guestName = 'Guest name is required'
  }

  if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format'
  }

  if (!data.checkIn || typeof data.checkIn !== 'string') {
    errors.checkIn = 'Check-in date is required'
  }

  if (!data.checkOut || typeof data.checkOut !== 'string') {
    errors.checkOut = 'Check-out date is required'
  }

  if (data.checkIn && data.checkOut && new Date(data.checkIn) >= new Date(data.checkOut)) {
    errors.checkOut = 'Check-out must be after check-in'
  }

  if (!data.roomId || typeof data.roomId !== 'string') {
    errors.roomId = 'Room selection is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
