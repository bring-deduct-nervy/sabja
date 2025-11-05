import { GET } from '@/app/api/availability/route'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    room: {
      findUnique: jest.fn(),
    },
    reservation: {
      findMany: jest.fn(),
    },
  },
}))

function getFutureDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

describe('GET /api/availability', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return availability information', async () => {
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      pricePerNight: 100,
    }

    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom)
    ;(prisma.reservation.findMany as jest.Mock).mockResolvedValue([])

    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)

    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=room-1&checkIn=${checkIn}&checkOut=${checkOut}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.available).toBe(true)
    expect(data.data.roomId).toBe('room-1')
    expect(data.data.nights).toBe(4)
    expect(data.data.totalPrice).toBe(400)
  })

  it('should return unavailable when room is booked', async () => {
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      pricePerNight: 100,
    }

    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)
    
    const mockReservation = {
      id: 'res-1',
      roomId: 'room-1',
      checkIn: new Date(getFutureDate(2)),
      checkOut: new Date(getFutureDate(4)),
      status: 'confirmed',
    }

    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom)
    ;(prisma.reservation.findMany as jest.Mock).mockResolvedValue([
      mockReservation,
    ])

    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=room-1&checkIn=${checkIn}&checkOut=${checkOut}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.available).toBe(false)
  })

  it('should return 404 for non-existent room', async () => {
    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(null)

    const checkIn = getFutureDate(1)
    const checkOut = getFutureDate(5)

    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=invalid&checkIn=${checkIn}&checkOut=${checkOut}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Room not found')
  })

  it('should return 400 for invalid dates', async () => {
    const checkOut = getFutureDate(5)
    
    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=room-1&checkIn=invalid&checkOut=${checkOut}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid query parameters')
  })

  it('should return 400 when checkOut is before checkIn', async () => {
    const checkIn = getFutureDate(5)
    const checkOut = getFutureDate(1)
    
    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=room-1&checkIn=${checkIn}&checkOut=${checkOut}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid query parameters')
  })

  it('should return 400 when checkIn is in the past', async () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    const request = new NextRequest(
      new URL(
        `http://localhost:3000/api/availability?roomId=room-1&checkIn=${yesterdayStr}&checkOut=${tomorrowStr}`
      )
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid query parameters')
  })
})
