import prisma from '../src/lib/prisma';

async function testPrismaClient() {
  console.log('🧪 Testing Prisma Client singleton...\n');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Successfully connected to database');

    // Test simple query
    const roomCount = await prisma.room.count();
    console.log(`✅ Database has ${roomCount} rooms`);

    const amenityCount = await prisma.amenity.count();
    console.log(`✅ Database has ${amenityCount} amenities`);

    const reservationCount = await prisma.reservation.count();
    console.log(`✅ Database has ${reservationCount} reservations`);

    const galleryCount = await prisma.galleryImage.count();
    console.log(`✅ Database has ${galleryCount} gallery images`);

    console.log('\n✅ Prisma Client is working correctly!');
  } catch (error) {
    console.error('❌ Error testing Prisma Client:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaClient();
