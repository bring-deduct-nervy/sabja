import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.galleryImage.deleteMany({});

  // Seed gallery images
  const galleryImages = [
    {
      title: 'Premium Suite',
      src: 'https://images.unsplash.com/photo-1631049307261-da0ec440d385?w=800&h=600&fit=crop',
      alt: 'Luxury hotel bedroom',
      category: 'Rooms',
    },
    {
      title: 'Fine Dining Restaurant',
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
      alt: 'Elegant dining room',
      category: 'Dining',
    },
    {
      title: 'Luxury Spa',
      src: 'https://images.unsplash.com/photo-1604452881944-e0b63c5a9c43?w=800&h=600&fit=crop',
      alt: 'Spa and wellness center',
      category: 'Wellness',
    },
    {
      title: 'Olympic Pool',
      src: 'https://images.unsplash.com/photo-1562438905-4263f1b912ff?w=800&h=600&fit=crop',
      alt: 'Swimming pool area',
      category: 'Recreation',
    },
    {
      title: 'Grand Lobby',
      src: 'https://images.unsplash.com/photo-1578149102327-63a6003e3381?w=800&h=600&fit=crop',
      alt: 'Hotel lobby',
      category: 'Common Areas',
    },
    {
      title: 'Meeting Room',
      src: 'https://images.unsplash.com/photo-1566612394529-994f2842efba?w=800&h=600&fit=crop',
      alt: 'Conference room',
      category: 'Events',
    },
    {
      title: 'Rooftop Terrace',
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      alt: 'Hotel terrace with city view',
      category: 'Common Areas',
    },
    {
      title: 'Elegant Corridor',
      src: 'https://images.unsplash.com/photo-1445523677193-36421c949f61?w=800&h=600&fit=crop',
      alt: 'Luxury hotel hallway',
      category: 'Common Areas',
    },
  ];

  for (const image of galleryImages) {
    await prisma.galleryImage.create({
      data: image,
    });
  }

  console.log('✓ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
