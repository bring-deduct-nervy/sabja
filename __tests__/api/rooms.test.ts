import { GET as getRooms } from '@/app/api/rooms/route'
import { GET as getRoom } from '@/app/api/rooms/[id]/route'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    room: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}))

describe('GET /api/rooms', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return all rooms', async () => {
    const mockRooms = [
      {
        id: '1',
        name: 'Test Room',
        description: 'A test room',
        pricePerNight: 100,
        capacity: 2,
        amenities: JSON.stringify(['WiFi', 'TV']),
        imageUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    ;(prisma.room.findMany as jest.Mock).mockResolvedValue(mockRooms)

    const request = new NextRequest(new URL('http://localhost:3000/api/rooms'))
    const response = await getRooms(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toHaveLength(1)
    expect(data.data[0].amenities).toEqual(['WiFi', 'TV'])
  })

  it('should filter rooms by capacity', async () => {
    const mockRooms = [
      {
        id: '1',
        name: 'Test Room',
        description: 'A test room',
        pricePerNight: 100,
        capacity: 4,
        amenities: JSON.stringify(['WiFi']),
        imageUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    ;(prisma.room.findMany as jest.Mock).mockResolvedValue(mockRooms)

    const request = new NextRequest(
      new URL('http://localhost:3000/api/rooms?capacity=4')
    )
    const response = await getRooms(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(prisma.room.findMany).toHaveBeenCalledWith({
      where: { capacity: { gte: 4 } },
      orderBy: { pricePerNight: 'asc' },
    })
  })

  it('should filter rooms by price range', async () => {
    ;(prisma.room.findMany as jest.Mock).mockResolvedValue([])

    const request = new NextRequest(
      new URL('http://localhost:3000/api/rooms?minPrice=100&maxPrice=200')
    )
    const response = await getRooms(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(prisma.room.findMany).toHaveBeenCalledWith({
      where: { pricePerNight: { gte: 100, lte: 200 } },
      orderBy: { pricePerNight: 'asc' },
    })
  })

  it('should return 400 for invalid capacity', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/rooms?capacity=invalid')
    )
    const response = await getRooms(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid query parameters')
  })
})

describe('GET /api/rooms/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a single room', async () => {
    const mockRoom = {
      id: '1',
      name: 'Test Room',
      description: 'A test room',
      pricePerNight: 100,
      capacity: 2,
      amenities: JSON.stringify(['WiFi', 'TV']),
      imageUrl: 'https://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom)

    const request = new NextRequest(new URL('http://localhost:3000/api/rooms/1'))
    const response = await getRoom(request, { params: { id: '1' } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.id).toBe('1')
    expect(data.data.amenities).toEqual(['WiFi', 'TV'])
  })

  it('should return 404 for non-existent room', async () => {
    ;(prisma.room.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest(
      new URL('http://localhost:3000/api/rooms/999')
    )
    const response = await getRoom(request, { params: { id: '999' } })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Room not found')
  })
})
