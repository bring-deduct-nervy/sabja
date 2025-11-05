'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Navigation } from '@/components/navigation';
import { RoomDetails } from '@/components/room-details';
import { Alert } from '@/components/alert';
import { fetchRoomBySlug } from '@/lib/api';
import type { Room } from '@/lib/types';

interface RoomDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const { slug: paramSlug } = await params;
        setIsLoading(true);
        setError(null);
        const data = await fetchRoomBySlug(paramSlug);
        setRoom(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load room details';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoom();
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main>
          <Container className="py-12">
            <div className="animate-pulse space-y-8">
              <div className="mb-4 h-8 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="aspect-video rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main>
          <Container className="py-12">
            <div className="mb-6">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Rooms
              </Link>
            </div>
            <Alert
              type="error"
              title="Error Loading Room"
              message={error}
              className="text-center"
            />
          </Container>
        </main>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main>
          <Container className="py-12">
            <div className="mb-6">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Rooms
              </Link>
            </div>
            <Alert
              type="error"
              title="Room Not Found"
              message="The room you are looking for does not exist."
              className="text-center"
            />
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>
        <Container className="py-12">
          <div className="mb-6">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Rooms
            </Link>
          </div>

          <RoomDetails room={room} />
        </Container>
      </main>
    </div>
  );
}
