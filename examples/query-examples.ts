import prisma from '../src/lib/prisma';

async function main() {
  console.log('📚 Prisma Query Examples\n');

  // Example 1: Query all available rooms
  console.log('1. Querying all available rooms...');
  const availableRooms = await prisma.room.findMany({
    where: {
      isAvailable: true,
    },
    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
  console.log(`Found ${availableRooms.length} available rooms\n`);

  // Example 2: Query rooms with specific amenities
  console.log('2. Querying rooms with WiFi...');
  const roomsWithWifi = await prisma.room.findMany({
    where: {
      amenities: {
        some: {
          amenity: {
            name: 'WiFi',
          },
        },
      },
    },
    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
  console.log(`Found ${roomsWithWifi.length} rooms with WiFi\n`);

  // Example 3: Query rooms by price range
  console.log('3. Querying rooms under $200/night...');
  const affordableRooms = await prisma.room.findMany({
    where: {
      price: {
        lt: 200,
      },
    },
    orderBy: {
      price: 'asc',
    },
  });
  console.log(`Found ${affordableRooms.length} rooms under $200\n`);

  // Example 4: Query reservations with room details
  console.log('4. Querying confirmed reservations...');
  const confirmedReservations = await prisma.reservation.findMany({
    where: {
      status: 'CONFIRMED',
    },
    include: {
      room: true,
    },
  });
  console.log(`Found ${confirmedReservations.length} confirmed reservations\n`);

  // Example 5: Create a new reservation
  console.log('5. Creating a new reservation...');
  const room = await prisma.room.findFirst({
    where: {
      isAvailable: true,
    },
  });

  if (room) {
    const newReservation = await prisma.reservation.create({
      data: {
        roomId: room.id,
        guestName: 'Test Guest',
        guestEmail: 'test@example.com',
        guestPhone: '+1-555-9999',
        checkInDate: new Date('2024-03-01'),
        checkOutDate: new Date('2024-03-05'),
        numberOfGuests: 2,
        status: 'PENDING',
        totalPrice: room.price * 4,
      },
    });
    console.log(`Created reservation ${newReservation.id}\n`);

    // Clean up the test reservation
    await prisma.reservation.delete({
      where: { id: newReservation.id },
    });
    console.log('Test reservation cleaned up\n');
  }

  // Example 6: Query gallery images by category
  console.log('6. Querying pool images...');
  const poolImages = await prisma.galleryImage.findMany({
    where: {
      category: 'pool',
      isActive: true,
    },
    orderBy: {
      displayOrder: 'asc',
    },
  });
  console.log(`Found ${poolImages.length} pool images\n`);

  // Example 7: Get room with full details
  console.log('7. Getting room details...');
  const roomDetails = await prisma.room.findFirst({
    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
      reservations: {
        where: {
          status: {
            in: ['CONFIRMED', 'CHECKED_IN'],
          },
        },
        orderBy: {
          checkInDate: 'asc',
        },
      },
    },
  });
  
  if (roomDetails) {
    console.log(`Room ${roomDetails.roomNumber}:`);
    console.log(`  - Bed Type: ${roomDetails.bedType}`);
    console.log(`  - Capacity: ${roomDetails.capacity} guests`);
    console.log(`  - Price: $${roomDetails.price}/night`);
    console.log(`  - Amenities: ${roomDetails.amenities.length}`);
    console.log(`  - Active Reservations: ${roomDetails.reservations.length}`);
  }

  console.log('\n✅ Examples completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error running examples:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
