import { prisma } from '@/lib/prisma'

export async function checkAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): Promise<boolean> {
  const conflictingReservations = await prisma.reservation.findMany({
    where: {
      roomId,
      status: 'confirmed',
      OR: [
        {
          AND: [
            { checkIn: { lte: checkIn } },
            { checkOut: { gt: checkIn } },
          ],
        },
        {
          AND: [
            { checkIn: { lt: checkOut } },
            { checkOut: { gte: checkOut } },
          ],
        },
        {
          AND: [
            { checkIn: { gte: checkIn } },
            { checkOut: { lte: checkOut } },
          ],
        },
      ],
    },
  })

  return conflictingReservations.length === 0
}

export async function findAvailableRooms(
  checkIn: Date,
  checkOut: Date,
  capacity?: number
): Promise<string[]> {
  let whereClause: any = {}
  
  if (capacity) {
    whereClause.capacity = { gte: capacity }
  }

  const allRooms = await prisma.room.findMany({
    where: whereClause,
    select: { id: true },
  })

  const availableRoomIds: string[] = []

  for (const room of allRooms) {
    const isAvailable = await checkAvailability(room.id, checkIn, checkOut)
    if (isAvailable) {
      availableRoomIds.push(room.id)
    }
  }

  return availableRoomIds
}
