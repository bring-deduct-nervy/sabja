import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { mockRooms } from '@/lib/mock-rooms';
import type { BookingRequest, BookingResponse } from '@/lib/types';

// In-memory storage for bookings (in real app, use database)
const bookings: BookingResponse[] = [];

function generateBookingNumber(): string {
  return `BK-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

function generateBookingId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    const {
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    // Validation
    if (!roomId || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing guest information' },
        { status: 400 }
      );
    }

    // Find the room
    const room = mockRooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    // Parse dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validation: check-in cannot be in the past
    if (checkIn < today) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-in date cannot be in the past',
        },
        { status: 400 }
      );
    }

    // Validation: check-out must be after check-in
    if (checkOut <= checkIn) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-out date must be after check-in date',
        },
        { status: 400 }
      );
    }

    // Calculate number of nights
    const numberOfNights = differenceInDays(checkOut, checkIn);

    // Validation: minimum nights
    if (numberOfNights < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Minimum stay is 1 night',
        },
        { status: 400 }
      );
    }

    // Validation: maximum nights
    if (numberOfNights > 90) {
      return NextResponse.json(
        {
          success: false,
          error: 'Maximum stay is 90 nights',
        },
        { status: 400 }
      );
    }

    // Validation: guest capacity
    if (numberOfGuests > room.capacity) {
      return NextResponse.json(
        {
          success: false,
          error: `Room capacity is ${room.capacity} guests`,
        },
        { status: 400 }
      );
    }

    if (numberOfGuests < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least 1 guest is required',
        },
        { status: 400 }
      );
    }

    // Check availability
    if (room.availability.available === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Room is not available for the selected dates',
        },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = room.nightlyRate * numberOfNights;

    // Create booking
    const booking: BookingResponse = {
      id: generateBookingId(),
      bookingNumber: generateBookingNumber(),
      roomId,
      roomName: room.name,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfNights,
      totalPrice,
      nightlyRate: room.nightlyRate,
      firstName,
      lastName,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    // Store booking (in real app, save to database)
    bookings.push(booking);

    // In real app, send confirmation email here
    console.log('Booking created:', booking);

    return NextResponse.json(
      {
        success: true,
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
