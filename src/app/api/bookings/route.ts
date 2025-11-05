import { NextRequest, NextResponse } from 'next/server'
import { createBooking, validateBookingData, getAllBookings } from '@/lib/bookingHandler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = validateBookingData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const booking = createBooking({
      guestName: body.guestName,
      email: body.email,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      roomId: body.roomId,
    })

    return NextResponse.json(
      {
        message: 'Booking successful!',
        booking,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = getAllBookings()
    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
