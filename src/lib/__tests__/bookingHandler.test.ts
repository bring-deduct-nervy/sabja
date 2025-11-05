import {
  createBooking,
  getBooking,
  getAllBookings,
  validateBookingData,
} from '../bookingHandler'

describe('bookingHandler', () => {
  describe('validateBookingData', () => {
    const validData = {
      guestName: 'John Doe',
      email: 'john@example.com',
      checkIn: '2024-12-20',
      checkOut: '2024-12-23',
      roomId: 'room-1',
    }

    it('validates correct booking data', () => {
      const result = validateBookingData(validData)
      expect(result.valid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('returns error when guestName is missing', () => {
      const result = validateBookingData({ ...validData, guestName: '' })
      expect(result.valid).toBe(false)
      expect(result.errors.guestName).toBeDefined()
    })

    it('returns error when email is invalid', () => {
      const result = validateBookingData({ ...validData, email: 'invalid-email' })
      expect(result.valid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it('returns error when checkIn is missing', () => {
      const result = validateBookingData({ ...validData, checkIn: '' })
      expect(result.valid).toBe(false)
      expect(result.errors.checkIn).toBeDefined()
    })

    it('returns error when checkOut is missing', () => {
      const result = validateBookingData({ ...validData, checkOut: '' })
      expect(result.valid).toBe(false)
      expect(result.errors.checkOut).toBeDefined()
    })

    it('returns error when checkOut is before or equal to checkIn', () => {
      const result = validateBookingData({
        ...validData,
        checkIn: '2024-12-23',
        checkOut: '2024-12-23',
      })
      expect(result.valid).toBe(false)
      expect(result.errors.checkOut).toBeDefined()
    })

    it('returns error when roomId is missing', () => {
      const result = validateBookingData({ ...validData, roomId: '' })
      expect(result.valid).toBe(false)
      expect(result.errors.roomId).toBeDefined()
    })
  })

  describe('createBooking', () => {
    it('creates a booking with generated id', () => {
      const bookingData = {
        guestName: 'Jane Doe',
        email: 'jane@example.com',
        checkIn: '2024-12-20',
        checkOut: '2024-12-23',
        roomId: 'room-2',
      }

      const booking = createBooking(bookingData)

      expect(booking.id).toBeDefined()
      expect(booking.guestName).toBe('Jane Doe')
      expect(booking.email).toBe('jane@example.com')
      expect(booking.status).toBe('confirmed')
      expect(booking.createdAt).toBeDefined()
    })

    it('generates unique booking ids', () => {
      const bookingData = {
        guestName: 'Test User',
        email: 'test@example.com',
        checkIn: '2024-12-20',
        checkOut: '2024-12-23',
        roomId: 'room-1',
      }

      const booking1 = createBooking(bookingData)
      const booking2 = createBooking(bookingData)

      expect(booking1.id).not.toBe(booking2.id)
    })
  })

  describe('getBooking', () => {
    it('retrieves a booking by id', () => {
      const bookingData = {
        guestName: 'John Smith',
        email: 'john.smith@example.com',
        checkIn: '2024-12-20',
        checkOut: '2024-12-23',
        roomId: 'room-3',
      }

      const createdBooking = createBooking(bookingData)
      const retrievedBooking = getBooking(createdBooking.id)

      expect(retrievedBooking).toEqual(createdBooking)
    })

    it('returns undefined for non-existent booking', () => {
      const booking = getBooking('non-existent-id')
      expect(booking).toBeUndefined()
    })
  })

  describe('getAllBookings', () => {
    it('returns all created bookings', () => {
      const bookingData1 = {
        guestName: 'User 1',
        email: 'user1@example.com',
        checkIn: '2024-12-20',
        checkOut: '2024-12-23',
        roomId: 'room-1',
      }

      const bookingData2 = {
        guestName: 'User 2',
        email: 'user2@example.com',
        checkIn: '2024-12-25',
        checkOut: '2024-12-27',
        roomId: 'room-2',
      }

      createBooking(bookingData1)
      createBooking(bookingData2)

      const allBookings = getAllBookings()
      expect(allBookings.length).toBeGreaterThanOrEqual(2)
    })
  })
})
