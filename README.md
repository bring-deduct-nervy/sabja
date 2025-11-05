# Hotel Management System

A hotel management system built with Prisma ORM, TypeScript, and SQLite (with PostgreSQL support for production).

## Features

- **Room Management**: Track rooms with capacity, bed types, pricing, descriptions, and images
- **Amenity System**: Flexible amenity management with many-to-many relationships to rooms
- **Reservation System**: Complete booking system with guest information, dates, and status tracking
- **Gallery Management**: Hotel gallery with categorized images for marketing purposes

## Tech Stack

- **ORM**: Prisma 5.x
- **Database**: SQLite (development) / PostgreSQL (production)
- **Language**: TypeScript
- **Runtime**: Node.js

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma       # Prisma schema with all models
│   ├── seed.ts             # Database seed script
│   └── migrations/         # Database migrations (auto-generated)
├── src/
│   └── lib/
│       └── prisma.ts       # Prisma Client singleton
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

3. **Configure database connection:**

The project is configured to use SQLite by default for development. The `.env` file should contain:

```env
DATABASE_URL="file:./dev.db"
```

For production with PostgreSQL, update the `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/hotel_db?schema=public"
```

And update `prisma/schema.prisma` datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Database Setup

### Generate Prisma Client

Generate the Prisma Client to get TypeScript types:

```bash
npm run prisma:generate
```

### Run Migrations

Create the database schema:

```bash
npm run prisma:migrate
```

This will:
- Create a new migration based on your schema
- Apply the migration to your database
- Regenerate Prisma Client

### Seed the Database

Populate the database with sample data:

```bash
npm run prisma:seed
```

This will create:
- 10 amenities (WiFi, Air Conditioning, TV, etc.)
- 8 hotel rooms with varying capacities and pricing
- Room-amenity relationships
- 6 gallery images
- 4 sample reservations

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run prisma:migrate` | Create and apply database migrations |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:seed` | Seed database with sample data |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |
| `npm run prisma:reset` | Reset database (delete all data and re-run migrations and seed) |

## Database Schema

### Models

#### Room
Represents hotel rooms with all their details.

**Fields:**
- `id` (String): Unique identifier
- `roomNumber` (String): Room number (unique)
- `capacity` (Int): Maximum number of guests
- `bedType` (String): Type of bed (King, Queen, Twin, Double)
- `price` (Float): Price per night
- `description` (String): Room description
- `imageUrls` (String): JSON array of image URLs
- `isAvailable` (Boolean): Availability status
- `createdAt`, `updatedAt`: Timestamps

**Relations:**
- Has many `Reservation`
- Has many `Amenity` (through `RoomAmenity`)

#### Amenity
Represents hotel amenities and services.

**Fields:**
- `id` (String): Unique identifier
- `name` (String): Amenity name (unique)
- `description` (String): Description
- `icon` (String): Icon identifier
- `createdAt`, `updatedAt`: Timestamps

**Relations:**
- Has many `Room` (through `RoomAmenity`)

#### RoomAmenity
Junction table for Room-Amenity many-to-many relationship.

**Fields:**
- `id` (String): Unique identifier
- `roomId` (String): Foreign key to Room
- `amenityId` (String): Foreign key to Amenity
- `createdAt`: Timestamp

#### Reservation
Represents room bookings.

**Fields:**
- `id` (String): Unique identifier
- `roomId` (String): Foreign key to Room
- `guestName` (String): Guest name
- `guestEmail` (String): Guest email
- `guestPhone` (String): Guest phone
- `checkInDate` (DateTime): Check-in date
- `checkOutDate` (DateTime): Check-out date
- `numberOfGuests` (Int): Number of guests
- `status` (ReservationStatus): Booking status
- `totalPrice` (Float): Total price
- `specialRequests` (String): Special requests
- `createdAt`, `updatedAt`: Timestamps

**Status Values:**
- `PENDING`: Reservation is pending confirmation
- `CONFIRMED`: Reservation is confirmed
- `CHECKED_IN`: Guest has checked in
- `CHECKED_OUT`: Guest has checked out
- `CANCELLED`: Reservation was cancelled

#### GalleryImage
Represents hotel gallery images for marketing.

**Fields:**
- `id` (String): Unique identifier
- `title` (String): Image title
- `description` (String): Image description
- `imageUrl` (String): Image URL
- `category` (String): Image category (rooms, restaurant, pool, exterior, amenities)
- `displayOrder` (Int): Display order
- `isActive` (Boolean): Active status
- `createdAt`, `updatedAt`: Timestamps

## Usage Examples

### Using Prisma Client

Import the Prisma Client singleton:

```typescript
import prisma from './src/lib/prisma';

// Query all available rooms
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

// Create a new reservation
const reservation = await prisma.reservation.create({
  data: {
    roomId: 'room-id',
    guestName: 'Jane Doe',
    guestEmail: 'jane@example.com',
    guestPhone: '+1-555-0100',
    checkInDate: new Date('2024-03-01'),
    checkOutDate: new Date('2024-03-05'),
    numberOfGuests: 2,
    status: 'CONFIRMED',
    totalPrice: 600.0,
  },
});

// Query rooms with specific amenities
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

// Get gallery images by category
const poolImages = await prisma.galleryImage.findMany({
  where: {
    category: 'pool',
    isActive: true,
  },
  orderBy: {
    displayOrder: 'asc',
  },
});
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` (SQLite) or `postgresql://...` (PostgreSQL) |

## Development Tools

### Prisma Studio

Open Prisma Studio to view and edit your data in a GUI:

```bash
npm run prisma:studio
```

This will open a browser window at `http://localhost:5555` with a visual database editor.

### Database Reset

To reset your database (useful during development):

```bash
npm run prisma:reset
```

**Warning:** This will delete all data, drop the database, re-run migrations, and re-seed the database.

## Production Deployment

When deploying to production:

1. **Update database provider** in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Set production DATABASE_URL** environment variable

3. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

## Troubleshooting

### Migration Issues

If you encounter migration issues, you can reset the database:

```bash
npm run prisma:reset
```

### Type Generation

If TypeScript can't find Prisma types, regenerate the client:

```bash
npm run prisma:generate
```

### Connection Issues

Verify your `DATABASE_URL` in the `.env` file is correct and the database is accessible.

## License

ISC
