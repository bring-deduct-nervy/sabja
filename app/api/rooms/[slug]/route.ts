import { mockRooms } from '@/lib/mock-rooms';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const room = mockRooms.find((r) => r.slug === slug);

    if (!room) {
      return Response.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: room,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
