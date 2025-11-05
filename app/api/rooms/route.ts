import { mockRooms } from '@/lib/mock-rooms';
import type { Room } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const capacity = searchParams.get('capacity');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedType = searchParams.get('bedType');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    let filteredRooms: Room[] = [...mockRooms];

    // Apply filters
    if (capacity) {
      const capacityNum = parseInt(capacity, 10);
      filteredRooms = filteredRooms.filter(
        (room) => room.capacity >= capacityNum
      );
    }

    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice, 10) : 0;
      const max = maxPrice ? parseInt(maxPrice, 10) : Infinity;
      filteredRooms = filteredRooms.filter(
        (room) => room.nightlyRate >= min && room.nightlyRate <= max
      );
    }

    if (bedType) {
      filteredRooms = filteredRooms.filter((room) => room.bedType === bedType);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredRooms = filteredRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchLower) ||
          room.description.toLowerCase().includes(searchLower) ||
          room.amenities.some((amenity: string) =>
            amenity.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply sorting
    if (sort === 'price-asc') {
      filteredRooms.sort((a, b) => a.nightlyRate - b.nightlyRate);
    } else if (sort === 'price-desc') {
      filteredRooms.sort((a, b) => b.nightlyRate - a.nightlyRate);
    } else if (sort === 'name') {
      filteredRooms.sort((a, b) => a.name.localeCompare(b.name));
    }

    return Response.json(
      {
        success: true,
        data: filteredRooms,
        count: filteredRooms.length,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
