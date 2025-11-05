import { POST } from '@/app/api/reservations/route'
import { DELETE } from '@/app/api/reservations/[id]/route'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    room: {
      findUnique: jest.fn(),
    },
    reservation: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

function getFutureDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

describe('POST /api/reservations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a reservation when room is available', async () => {
    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)
    
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      pricePerNight: 100,
      amenities: JSON.stringify(['WiFi']),
    }

    const mockReservation = {
      id: 'res-1',
      roomId: 'room-1',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice: 400,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
      room: mockRoom,
    }

    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom)
    ;(prisma.reservation.findMany as jest.Mock).mockResolvedValue([])
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        reservation: {
          findMany: jest.fn().mockResolvedValue([]),
          create: jest.fn().mockResolvedValue(mockReservation),
        },
      })
    })

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'room-1',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.id).toBe('res-1')
    expect(data.data.totalPrice).toBe(400)
  })

  it('should return 404 for non-existent room', async () => {
    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(null)

    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'invalid',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Room not found')
  })

  it('should return 409 when room is not available', async () => {
    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)
    
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      pricePerNight: 100,
    }

    const mockExistingReservation = {
      id: 'res-1',
      roomId: 'room-1',
      checkIn: new Date(getFutureDate(2)),
      checkOut: new Date(getFutureDate(4)),
      status: 'confirmed',
    }

    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom)
    ;(prisma.reservation.findMany as jest.Mock).mockResolvedValue([
      mockExistingReservation,
    ])

    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'room-1',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.success).toBe(false)
    expect(data.error).toContain('not available')
  })

  it('should return 400 for invalid guest name', async () => {
    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)
    
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'room-1',
        guestName: 'J',
        guestEmail: 'john@example.com',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid request data')
  })

  it('should return 400 for invalid email', async () => {
    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)
    
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'room-1',
        guestName: 'John Doe',
        guestEmail: 'invalid-email',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid request data')
  })

  it('should return 400 when checkOut is before checkIn', async () => {
    const checkIn = getFutureDate(5)
    const checkOut = getFutureDate(1)
    
    const request = new NextRequest('http://localhost:3000/api/reservations', {
      method: 'POST',
      body: JSON.stringify({
        roomId: 'room-1',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        checkIn,
        checkOut,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid request data')
  })
})

describe('DELETE /api/reservations/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should cancel a reservation', async () => {
    const mockReservation = {
      id: 'res-1',
      roomId: 'room-1',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      checkIn: new Date('2024-12-01'),
      checkOut: new Date('2024-12-05'),
      totalPrice: 400,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const cancelledReservation = {
      ...mockReservation,
      status: 'cancelled',
    }

    ;(prisma.reservation.findUnique as jest.Mock).mockResolvedValue(
      mockReservation
    )
    ;(prisma.reservation.update as jest.Mock).mockResolvedValue(
      cancelledReservation
    )

    const request = new NextRequest(
      'http://localhost:3000/api/reservations/res-1',
      {
        method: 'DELETE',
      }
    )

    const response = await DELETE(request, { params: { id: 'res-1' } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('cancelled')
  })

  it('should return 404 for non-existent reservation', async () => {
    ;(prisma.reservation.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest(
      'http://localhost:3000/api/reservations/invalid',
      {
        method: 'DELETE',
      }
    )

    const response = await DELETE(request, { params: { id: 'invalid' } })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Reservation not found')
  })

  it('should return 400 when trying to cancel already cancelled reservation', async () => {
    const mockReservation = {
      id: 'res-1',
      roomId: 'room-1',
      status: 'cancelled',
    }

    ;(prisma.reservation.findUnique as jest.Mock).mockResolvedValue(
      mockReservation
    )

    const request = new NextRequest(
      'http://localhost:3000/api/reservations/res-1',
      {
        method: 'DELETE',
      }
    )

    const response = await DELETE(request, { params: { id: 'res-1' } })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Reservation is already cancelled')
  })
})
