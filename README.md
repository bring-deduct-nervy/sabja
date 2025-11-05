# Booking API

A complete room booking system built with Next.js, Prisma, and Zod validation. This API provides endpoints for browsing rooms, checking availability, and managing reservations with automatic double-booking prevention.

## Features

- 🏨 Room listing and details with filtering capabilities
- 📅 Real-time availability checking with date overlap detection
- 💰 Automatic pricing calculations (per-night rates)
- ✅ Input validation using Zod schemas
- 🔒 Transaction-based reservation creation to prevent double bookings
- 🧪 Comprehensive test coverage with Jest
- 📘 Type-safe fetchers for frontend integration

## Tech Stack

- **Next.js 14** - App Router with API Routes
- **Prisma** - Database ORM with SQLite
- **Zod** - Schema validation
- **TypeScript** - Type safety
- **Jest** - Testing framework

## Getting Started

### Installation

```bash
npm install
```

### Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with sample rooms
npm run prisma:seed
```

### Development

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

### Testing

```bash
npm test
```

## API Endpoints

### 1. List Rooms

Get a list of all available rooms with optional filters.

**Endpoint:** `GET /api/rooms`

**Query Parameters:**
- `capacity` (optional): Minimum room capacity (integer)
- `minPrice` (optional): Minimum price per night (number)
- `maxPrice` (optional): Maximum price per night (number)

**Example Request:**
```bash
curl "http://localhost:3000/api/rooms?capacity=2&maxPrice=200"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1a2b3c4d5e6f7g8h9i0",
      "name": "Deluxe Ocean View",
      "description": "Spacious room with stunning ocean views",
      "pricePerNight": 299.99,
      "capacity": 2,
      "amenities": ["WiFi", "TV", "Mini Bar", "Ocean View", "Balcony"],
      "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Room

Get detailed information about a specific room.

**Endpoint:** `GET /api/rooms/[id]`

**Example Request:**
```bash
curl "http://localhost:3000/api/rooms/clx1a2b3c4d5e6f7g8h9i0"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx1a2b3c4d5e6f7g8h9i0",
    "name": "Deluxe Ocean View",
    "description": "Spacious room with stunning ocean views",
    "pricePerNight": 299.99,
    "capacity": 2,
    "amenities": ["WiFi", "TV", "Mini Bar", "Ocean View", "Balcony"],
    "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Room not found"
}
```

### 3. Check Availability

Check if a room is available for specific dates and get pricing information.

**Endpoint:** `GET /api/availability`

**Query Parameters:**
- `roomId` (required): Room ID
- `checkIn` (required): Check-in date (YYYY-MM-DD)
- `checkOut` (required): Check-out date (YYYY-MM-DD)

**Validation Rules:**
- Check-out date must be after check-in date
- Check-in date must be today or in the future
- Dates must be in YYYY-MM-DD format

**Example Request:**
```bash
curl "http://localhost:3000/api/availability?roomId=clx1a2b3c4d5e6f7g8h9i0&checkIn=2024-12-01&checkOut=2024-12-05"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "available": true,
    "roomId": "clx1a2b3c4d5e6f7g8h9i0",
    "roomName": "Deluxe Ocean View",
    "checkIn": "2024-12-01",
    "checkOut": "2024-12-05",
    "nights": 4,
    "pricePerNight": 299.99,
    "totalPrice": 1199.96
  }
}
```

**Error Response (400 - Invalid dates):**
```json
{
  "success": false,
  "error": "Invalid query parameters",
  "details": [
    {
      "code": "custom",
      "message": "Check-out date must be after check-in date",
      "path": ["checkOut"]
    }
  ]
}
```

### 4. Create Reservation

Create a new reservation for a room.

**Endpoint:** `POST /api/reservations`

**Request Body:**
```json
{
  "roomId": "clx1a2b3c4d5e6f7g8h9i0",
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "checkIn": "2024-12-01",
  "checkOut": "2024-12-05"
}
```

**Validation Rules:**
- `guestName`: 2-100 characters
- `guestEmail`: Valid email format
- Check-out date must be after check-in date
- Check-in date must be today or in the future
- Dates must be in YYYY-MM-DD format

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "clx1a2b3c4d5e6f7g8h9i0",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "checkIn": "2024-12-01",
    "checkOut": "2024-12-05"
  }'
```

**Example Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "res123456789",
    "roomId": "clx1a2b3c4d5e6f7g8h9i0",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "checkIn": "2024-12-01T00:00:00.000Z",
    "checkOut": "2024-12-05T00:00:00.000Z",
    "totalPrice": 1199.96,
    "status": "confirmed",
    "createdAt": "2024-11-01T12:00:00.000Z",
    "updatedAt": "2024-11-01T12:00:00.000Z",
    "room": {
      "id": "clx1a2b3c4d5e6f7g8h9i0",
      "name": "Deluxe Ocean View",
      "description": "Spacious room with stunning ocean views",
      "pricePerNight": 299.99,
      "capacity": 2,
      "amenities": ["WiFi", "TV", "Mini Bar", "Ocean View", "Balcony"],
      "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (409 - Room unavailable):**
```json
{
  "success": false,
  "error": "Room is not available for the selected dates"
}
```

**Error Response (400 - Validation error):**
```json
{
  "success": false,
  "error": "Invalid request data",
  "details": [
    {
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["guestEmail"]
    }
  ]
}
```

### 5. Cancel Reservation

Cancel an existing reservation by marking it as cancelled.

**Endpoint:** `DELETE /api/reservations/[id]`

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/reservations/res123456789"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "res123456789",
    "roomId": "clx1a2b3c4d5e6f7g8h9i0",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "checkIn": "2024-12-01T00:00:00.000Z",
    "checkOut": "2024-12-05T00:00:00.000Z",
    "totalPrice": 1199.96,
    "status": "cancelled",
    "createdAt": "2024-11-01T12:00:00.000Z",
    "updatedAt": "2024-11-01T12:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Reservation not found"
}
```

**Error Response (400 - Already cancelled):**
```json
{
  "success": false,
  "error": "Reservation is already cancelled"
}
```

## Frontend Integration

### Type-Safe Fetchers

The API includes pre-built type-safe fetcher functions for easy frontend integration:

```typescript
import {
  fetchRooms,
  fetchRoom,
  checkAvailability,
  createReservation,
  cancelReservation,
} from '@/lib/fetchers'

// List rooms with filters
const roomsResponse = await fetchRooms({
  capacity: 2,
  maxPrice: 200,
})

if (roomsResponse.success) {
  const rooms = roomsResponse.data
  // rooms is typed as RoomWithAmenities[]
}

// Get single room
const roomResponse = await fetchRoom('room-id')

// Check availability
const availabilityResponse = await checkAvailability(
  'room-id',
  '2024-12-01',
  '2024-12-05'
)

// Create reservation
const reservationResponse = await createReservation({
  roomId: 'room-id',
  guestName: 'John Doe',
  guestEmail: 'john@example.com',
  checkIn: '2024-12-01',
  checkOut: '2024-12-05',
})

// Cancel reservation
const cancelResponse = await cancelReservation('reservation-id')
```

### TypeScript Types

All fetchers return properly typed responses:

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  details?: any
}

interface RoomWithAmenities {
  id: string
  name: string
  description: string
  pricePerNight: number
  capacity: number
  amenities: string[] // Parsed from JSON
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

interface AvailabilityResponse {
  available: boolean
  roomId: string
  roomName: string
  checkIn: string
  checkOut: string
  nights: number
  pricePerNight: number
  totalPrice: number
}
```

## Business Logic

### Double Booking Prevention

The API implements multiple layers of protection against double bookings:

1. **Initial Availability Check**: Before creating a reservation, the system checks for conflicting bookings
2. **Transaction-Based Creation**: Reservations are created within a database transaction
3. **Double-Check Within Transaction**: A second availability check is performed within the transaction to catch race conditions
4. **Date Overlap Detection**: The system checks for any date range overlaps:
   - Booking starts before existing reservation ends
   - Booking ends after existing reservation starts
   - Booking completely contains existing reservation

### Date Overlap Logic

The availability check finds conflicts using these conditions:

```typescript
// Conflict exists if:
// 1. New booking starts during existing reservation
(checkIn <= existing.checkIn AND checkOut > existing.checkIn)

// 2. New booking ends during existing reservation  
(checkIn < existing.checkOut AND checkOut >= existing.checkOut)

// 3. New booking completely contains existing reservation
(checkIn >= existing.checkIn AND checkOut <= existing.checkOut)
```

### Pricing Calculation

- Prices are calculated per night
- Minimum stay is 1 night
- Total price is rounded to 2 decimal places
- Calculation: `nights × pricePerNight`

## Database Schema

### Room Model
```prisma
model Room {
  id           String        @id @default(cuid())
  name         String
  description  String
  pricePerNight Float
  capacity     Int
  amenities    String        // JSON string array
  imageUrl     String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  reservations Reservation[]
}
```

### Reservation Model
```prisma
model Reservation {
  id          String   @id @default(cuid())
  roomId      String
  room        Room     @relation(fields: [roomId], references: [id])
  guestName   String
  guestEmail  String
  checkIn     DateTime
  checkOut    DateTime
  totalPrice  Float
  status      String   @default("confirmed") // confirmed, cancelled
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([roomId])
  @@index([checkIn, checkOut])
}
```

## Testing

The project includes comprehensive test coverage:

- ✅ API route handlers (rooms, availability, reservations)
- ✅ Service layer (pricing calculations, availability logic)
- ✅ Validation (input schemas, date validation)
- ✅ Error handling (404, 400, 409, 500 responses)
- ✅ Edge cases (double bookings, date overlaps, invalid inputs)

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Error Handling

All endpoints follow a consistent error response format:

```typescript
{
  success: false,
  error: "Human-readable error message",
  details?: [...] // Optional validation details
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created (new reservation)
- `400` - Bad Request (validation errors)
- `404` - Not Found (room or reservation doesn't exist)
- `409` - Conflict (room not available, double booking attempt)
- `500` - Internal Server Error

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── rooms/
│   │   │   ├── route.ts           # GET /api/rooms
│   │   │   └── [id]/route.ts      # GET /api/rooms/[id]
│   │   ├── availability/
│   │   │   └── route.ts           # GET /api/availability
│   │   └── reservations/
│   │       ├── route.ts           # POST /api/reservations
│   │       └── [id]/route.ts      # DELETE /api/reservations/[id]
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── fetchers.ts                # Type-safe API fetchers
│   ├── services/
│   │   ├── availability.ts        # Availability checking logic
│   │   └── pricing.ts             # Pricing calculations
│   └── validation/
│       └── schemas.ts             # Zod validation schemas
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding
├── __tests__/
│   ├── api/
│   │   ├── rooms.test.ts
│   │   ├── availability.test.ts
│   │   └── reservations.test.ts
│   └── services/
│       └── pricing.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## License

MIT
