import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createReservationSchema } from '@/lib/validation/schemas'
import { checkAvailability } from '@/lib/services/availability'
import { calculateTotalPrice } from '@/lib/services/pricing'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createReservationSchema.parse(body)

    const room = await prisma.room.findUnique({
      where: { id: validatedData.roomId },
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

    const checkInDate = new Date(validatedData.checkIn)
    const checkOutDate = new Date(validatedData.checkOut)

    const isAvailable = await checkAvailability(
      validatedData.roomId,
      checkInDate,
      checkOutDate
    )

    if (!isAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: 'Room is not available for the selected dates',
        },
        { status: 409 }
      )
    }

    const totalPrice = calculateTotalPrice(
      room.pricePerNight,
      checkInDate,
      checkOutDate
    )

    const reservation = await prisma.$transaction(async (tx) => {
      const doubleCheckAvailability = await tx.reservation.findMany({
        where: {
          roomId: validatedData.roomId,
          status: 'confirmed',
          OR: [
            {
              AND: [
                { checkIn: { lte: checkInDate } },
                { checkOut: { gt: checkInDate } },
              ],
            },
            {
              AND: [
                { checkIn: { lt: checkOutDate } },
                { checkOut: { gte: checkOutDate } },
              ],
            },
            {
              AND: [
                { checkIn: { gte: checkInDate } },
                { checkOut: { lte: checkOutDate } },
              ],
            },
          ],
        },
      })

      if (doubleCheckAvailability.length > 0) {
        throw new Error('Room is no longer available for the selected dates')
      }

      return await tx.reservation.create({
        data: {
          roomId: validatedData.roomId,
          guestName: validatedData.guestName,
          guestEmail: validatedData.guestEmail,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          totalPrice,
          status: 'confirmed',
        },
        include: {
          room: true,
        },
      })
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          ...reservation,
          room: {
            ...reservation.room,
            amenities: JSON.parse(reservation.room.amenities),
          },
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('no longer available')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 409 }
      )
    }

    console.error('Error creating reservation:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
