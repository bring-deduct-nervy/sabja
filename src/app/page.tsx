export const dynamic = 'force-dynamic'

import { BookingFormWrapper } from '@/components/BookingFormWrapper'
import { RoomCard } from '@/components/RoomCard'

interface Room {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

const rooms: Room[] = [
  {
    id: 'room-1',
    name: 'Deluxe Room',
    description: 'Spacious room with a king bed and modern amenities',
    price: 150,
  },
  {
    id: 'room-2',
    name: 'Suite',
    description: 'Luxurious suite with separate living area and premium service',
    price: 250,
  },
  {
    id: 'room-3',
    name: 'Standard Room',
    description: 'Comfortable room perfect for a quick stay',
    price: 100,
  },
]

export default function Home() {
  const handleRoomSelect = (roomId: string) => {
    // Navigate to booking form with selected room
    console.log('Selected room:', roomId)
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Our Hotel
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover our collection of comfortable and luxurious rooms. Book your
          perfect stay today.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              {...room}
              onSelect={handleRoomSelect}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Book Your Room
        </h3>
        <BookingFormWrapper />
      </section>
    </div>
  )
}
