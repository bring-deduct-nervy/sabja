import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.reservation.deleteMany();
  await prisma.roomAmenity.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.room.deleteMany();
  await prisma.amenity.deleteMany();

  // Seed Amenities
  console.log('✨ Seeding amenities...');
  const amenities = await Promise.all([
    prisma.amenity.create({
      data: {
        name: 'WiFi',
        description: 'High-speed wireless internet',
        icon: 'wifi',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Air Conditioning',
        description: 'Climate control system',
        icon: 'ac',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'TV',
        description: 'Flat-screen TV with cable channels',
        icon: 'tv',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Mini Bar',
        description: 'Fully stocked mini bar',
        icon: 'minibar',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Safe',
        description: 'In-room safe for valuables',
        icon: 'safe',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Balcony',
        description: 'Private balcony with view',
        icon: 'balcony',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Ocean View',
        description: 'Stunning ocean views',
        icon: 'ocean',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Room Service',
        description: '24/7 room service available',
        icon: 'room-service',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Coffee Maker',
        description: 'In-room coffee and tea facilities',
        icon: 'coffee',
      },
    }),
    prisma.amenity.create({
      data: {
        name: 'Bathtub',
        description: 'Luxurious bathtub',
        icon: 'bathtub',
      },
    }),
  ]);

  console.log(`✅ Created ${amenities.length} amenities`);

  // Seed Rooms
  console.log('🏨 Seeding rooms...');
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        roomNumber: '101',
        capacity: 2,
        bedType: 'Queen',
        price: 120.0,
        description: 'Cozy standard room with queen bed, perfect for couples. Features modern amenities and comfortable furnishings.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '102',
        capacity: 2,
        bedType: 'King',
        price: 150.0,
        description: 'Spacious deluxe room with king-size bed and modern bathroom. Ideal for a comfortable stay.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '201',
        capacity: 4,
        bedType: 'Double',
        price: 180.0,
        description: 'Family-friendly room with two double beds. Perfect for families with children or groups of friends.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '202',
        capacity: 2,
        bedType: 'King',
        price: 220.0,
        description: 'Premium suite with king bed, separate living area, and stunning city views. Luxury at its finest.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
          'https://images.unsplash.com/photo-1615874959474-d609969a20ed',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '301',
        capacity: 3,
        bedType: 'King',
        price: 200.0,
        description: 'Executive room with king bed and sofa bed. Includes workspace and premium amenities.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '302',
        capacity: 2,
        bedType: 'Twin',
        price: 110.0,
        description: 'Comfortable room with two twin beds. Great for friends or business travelers.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1595576508898-0ad5c879a061',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '401',
        capacity: 2,
        bedType: 'King',
        price: 280.0,
        description: 'Luxury penthouse suite with panoramic views, private balcony, and premium fixtures throughout.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1566195992011-5f6b21e539ce',
        ]),
        isAvailable: true,
      },
    }),
    prisma.room.create({
      data: {
        roomNumber: '402',
        capacity: 4,
        bedType: 'Queen',
        price: 190.0,
        description: 'Spacious family suite with two queen beds and a kitchenette. Perfect for extended stays.',
        imageUrls: JSON.stringify([
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843',
        ]),
        isAvailable: false,
      },
    }),
  ]);

  console.log(`✅ Created ${rooms.length} rooms`);

  // Assign amenities to rooms
  console.log('🔗 Linking amenities to rooms...');
  
  // Standard amenities for all rooms
  const standardAmenities = amenities.filter(a => 
    ['WiFi', 'Air Conditioning', 'TV', 'Coffee Maker'].includes(a.name)
  );

  // Premium amenities
  const premiumAmenities = amenities.filter(a =>
    ['Mini Bar', 'Safe', 'Room Service'].includes(a.name)
  );

  // Luxury amenities
  const luxuryAmenities = amenities.filter(a =>
    ['Balcony', 'Ocean View', 'Bathtub'].includes(a.name)
  );

  // Room 101, 102, 302 - Standard rooms with basic amenities
  for (const room of rooms.filter(r => ['101', '102', '302'].includes(r.roomNumber))) {
    for (const amenity of standardAmenities) {
      await prisma.roomAmenity.create({
        data: {
          roomId: room.id,
          amenityId: amenity.id,
        },
      });
    }
  }

  // Room 201, 301, 402 - Mid-range rooms with standard + some premium amenities
  for (const room of rooms.filter(r => ['201', '301', '402'].includes(r.roomNumber))) {
    for (const amenity of [...standardAmenities, ...premiumAmenities.slice(0, 2)]) {
      await prisma.roomAmenity.create({
        data: {
          roomId: room.id,
          amenityId: amenity.id,
        },
      });
    }
  }

  // Room 202, 401 - Luxury rooms with all amenities
  for (const room of rooms.filter(r => ['202', '401'].includes(r.roomNumber))) {
    for (const amenity of [...standardAmenities, ...premiumAmenities, ...luxuryAmenities]) {
      await prisma.roomAmenity.create({
        data: {
          roomId: room.id,
          amenityId: amenity.id,
        },
      });
    }
  }

  console.log('✅ Room-amenity relationships created');

  // Seed Gallery Images
  console.log('🖼️  Seeding gallery images...');
  const galleryImages = await Promise.all([
    prisma.galleryImage.create({
      data: {
        title: 'Hotel Exterior',
        description: 'Beautiful exterior view of our luxury hotel',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        category: 'exterior',
        displayOrder: 1,
        isActive: true,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Luxury Suite',
        description: 'Our premium luxury suite with king bed',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        category: 'rooms',
        displayOrder: 2,
        isActive: true,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Infinity Pool',
        description: 'Rooftop infinity pool with stunning views',
        imageUrl: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd',
        category: 'pool',
        displayOrder: 3,
        isActive: true,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Fine Dining Restaurant',
        description: 'Our award-winning restaurant serving gourmet cuisine',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        category: 'restaurant',
        displayOrder: 4,
        isActive: true,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Spa & Wellness',
        description: 'Relax and rejuvenate at our luxury spa',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        category: 'amenities',
        displayOrder: 5,
        isActive: true,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: 'Hotel Lobby',
        description: 'Grand lobby with elegant decor',
        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
        category: 'interior',
        displayOrder: 6,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${galleryImages.length} gallery images`);

  // Seed Sample Reservations
  console.log('📅 Seeding sample reservations...');
  const reservations = await Promise.all([
    prisma.reservation.create({
      data: {
        roomId: rooms[1].id, // Room 102
        guestName: 'John Smith',
        guestEmail: 'john.smith@example.com',
        guestPhone: '+1-555-0101',
        checkInDate: new Date('2024-01-15'),
        checkOutDate: new Date('2024-01-18'),
        numberOfGuests: 2,
        status: 'CONFIRMED',
        totalPrice: 450.0,
        specialRequests: 'Late check-in requested',
      },
    }),
    prisma.reservation.create({
      data: {
        roomId: rooms[2].id, // Room 201
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah.johnson@example.com',
        guestPhone: '+1-555-0102',
        checkInDate: new Date('2024-01-20'),
        checkOutDate: new Date('2024-01-25'),
        numberOfGuests: 4,
        status: 'CONFIRMED',
        totalPrice: 900.0,
        specialRequests: 'Need extra towels and pillows',
      },
    }),
    prisma.reservation.create({
      data: {
        roomId: rooms[6].id, // Room 401
        guestName: 'Michael Chen',
        guestEmail: 'michael.chen@example.com',
        guestPhone: '+1-555-0103',
        checkInDate: new Date('2024-02-01'),
        checkOutDate: new Date('2024-02-05'),
        numberOfGuests: 2,
        status: 'PENDING',
        totalPrice: 1120.0,
        specialRequests: 'Anniversary celebration - requesting champagne',
      },
    }),
    prisma.reservation.create({
      data: {
        roomId: rooms[7].id, // Room 402
        guestName: 'Emily Davis',
        guestEmail: 'emily.davis@example.com',
        guestPhone: '+1-555-0104',
        checkInDate: new Date('2024-01-10'),
        checkOutDate: new Date('2024-01-14'),
        numberOfGuests: 3,
        status: 'CHECKED_IN',
        totalPrice: 760.0,
      },
    }),
  ]);

  console.log(`✅ Created ${reservations.length} reservations`);

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${amenities.length} amenities`);
  console.log(`   - ${rooms.length} rooms`);
  console.log(`   - ${galleryImages.length} gallery images`);
  console.log(`   - ${reservations.length} reservations`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
