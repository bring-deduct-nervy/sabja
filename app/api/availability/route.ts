import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { mockRooms } from '@/lib/mock-rooms';
import type { AvailabilityCheck, AvailabilityResult } from '@/lib/types';

const MIN_NIGHTS = 1;
const MAX_NIGHTS = 90;

export async function POST(request: NextRequest) {
  try {
    const body: AvailabilityCheck = await request.json();
    const { roomId, checkInDate, checkOutDate, numberOfGuests } = body;

    if (
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      numberOfGuests === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the room from mock data
    const room = mockRooms.find((r) => r.id === roomId);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
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
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights: 0,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: 'Check-in date cannot be in the past',
          },
        },
        { status: 200 }
      );
    }

    // Validation: check-out must be after check-in
    if (checkOut <= checkIn) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights: 0,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: 'Check-out date must be after check-in date',
          },
        },
        { status: 200 }
      );
    }

    // Calculate number of nights
    const numberOfNights = differenceInDays(checkOut, checkIn);

    // Validation: minimum nights
    if (numberOfNights < MIN_NIGHTS) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: `Minimum stay is ${MIN_NIGHTS} night${MIN_NIGHTS !== 1 ? 's' : ''}`,
          },
        },
        { status: 200 }
      );
    }

    // Validation: maximum nights
    if (numberOfNights > MAX_NIGHTS) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: `Maximum stay is ${MAX_NIGHTS} nights`,
          },
        },
        { status: 200 }
      );
    }

    // Validation: guest capacity
    if (numberOfGuests > room.capacity) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: `Room capacity is ${room.capacity} guests`,
          },
        },
        { status: 200 }
      );
    }

    if (numberOfGuests < 1) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: 'At least 1 guest is required',
          },
        },
        { status: 200 }
      );
    }

    // Check if room is available (in real app, check database)
    // For mock, we'll say it's available if there are available rooms
    if (room.availability.available === 0) {
      return NextResponse.json(
        {
          success: false,
          data: {
            available: false,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfNights,
            totalPrice: 0,
            nightlyRate: room.nightlyRate,
            reason: 'No rooms available for the selected dates',
          },
        },
        { status: 200 }
      );
    }

    // Calculate total price
    const totalPrice = room.nightlyRate * numberOfNights;

    const result: AvailabilityResult = {
      available: true,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfNights,
      totalPrice,
      nightlyRate: room.nightlyRate,
    };

    return NextResponse.json(
      {
        success: true,
        data: result,
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
