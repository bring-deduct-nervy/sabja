import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { roomQuerySchema } from '@/lib/validation/schemas'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryParams = {
      capacity: searchParams.get('capacity'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
    }

    const validatedParams = roomQuerySchema.parse(queryParams)

    const whereClause: any = {}

    if (validatedParams.capacity) {
      whereClause.capacity = { gte: validatedParams.capacity }
    }

    if (validatedParams.minPrice || validatedParams.maxPrice) {
      whereClause.pricePerNight = {}
      if (validatedParams.minPrice) {
        whereClause.pricePerNight.gte = validatedParams.minPrice
      }
      if (validatedParams.maxPrice) {
        whereClause.pricePerNight.lte = validatedParams.maxPrice
      }
    }

    const rooms = await prisma.room.findMany({
      where: whereClause,
      orderBy: { pricePerNight: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: rooms.map((room) => ({
        ...room,
        amenities: JSON.parse(room.amenities),
      })),
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error fetching rooms:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
