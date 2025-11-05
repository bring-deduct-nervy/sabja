import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { availabilityQuerySchema } from '@/lib/validation/schemas'
import { checkAvailability } from '@/lib/services/availability'
import { calculateTotalPrice, calculateNights } from '@/lib/services/pricing'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryParams = {
      roomId: searchParams.get('roomId'),
      checkIn: searchParams.get('checkIn'),
      checkOut: searchParams.get('checkOut'),
    }

    const validatedParams = availabilityQuerySchema.parse(queryParams)

    const room = await prisma.room.findUnique({
      where: { id: validatedParams.roomId },
    })

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          error: 'Room not found',
        },
        { status: 404 }
      )
    }

    const checkInDate = new Date(validatedParams.checkIn)
    const checkOutDate = new Date(validatedParams.checkOut)

    const isAvailable = await checkAvailability(
      validatedParams.roomId,
      checkInDate,
      checkOutDate
    )

    const nights = calculateNights(checkInDate, checkOutDate)
    const totalPrice = calculateTotalPrice(
      room.pricePerNight,
      checkInDate,
      checkOutDate
    )

    return NextResponse.json({
      success: true,
      data: {
        available: isAvailable,
        roomId: room.id,
        roomName: room.name,
        checkIn: validatedParams.checkIn,
        checkOut: validatedParams.checkOut,
        nights,
        pricePerNight: room.pricePerNight,
        totalPrice,
      },
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

    console.error('Error checking availability:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
