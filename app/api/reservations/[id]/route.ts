import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation ID is required',
        },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation not found',
        },
        { status: 404 }
      )
    }

    if (reservation.status === 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          error: 'Reservation is already cancelled',
        },
        { status: 400 }
      )
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status: 'cancelled' },
    })

    return NextResponse.json({
      success: true,
      data: updatedReservation,
    })
  } catch (error) {
    console.error('Error cancelling reservation:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
