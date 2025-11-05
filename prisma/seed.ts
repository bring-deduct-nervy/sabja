import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.room.deleteMany()
  await prisma.reservation.deleteMany()

  const room1 = await prisma.room.create({
    data: {
      name: 'Deluxe Ocean View',
      description: 'Spacious room with stunning ocean views and premium amenities',
      pricePerNight: 299.99,
      capacity: 2,
      amenities: JSON.stringify(['WiFi', 'TV', 'Mini Bar', 'Ocean View', 'Balcony']),
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
    },
  })

  const room2 = await prisma.room.create({
    data: {
      name: 'Standard Suite',
      description: 'Comfortable suite perfect for business travelers',
      pricePerNight: 149.99,
      capacity: 2,
      amenities: JSON.stringify(['WiFi', 'TV', 'Desk', 'Coffee Maker']),
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
    },
  })

  const room3 = await prisma.room.create({
    data: {
      name: 'Family Room',
      description: 'Large room with two queen beds, ideal for families',
      pricePerNight: 199.99,
      capacity: 4,
      amenities: JSON.stringify(['WiFi', 'TV', 'Mini Fridge', 'Two Queen Beds']),
      imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    },
  })

  console.log('Seeded rooms:', { room1, room2, room3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
