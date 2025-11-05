'use client';

import { useState, useEffect } from 'react';
import { Container, SectionHeader } from '@/components/ui';
import { Navigation } from '@/components/navigation';
import { RoomCard } from '@/components/room-card';
import { RoomCardSkeleton } from '@/components/room-card-skeleton';
import { RoomFilters } from '@/components/room-filters';
import { Alert } from '@/components/alert';
import { fetchRooms } from '@/lib/api';
import type { Room, RoomFilters as RoomFiltersType } from '@/lib/types';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RoomFiltersType>({});
  const [sortBy, setSortBy] = useState<string>('price-asc');

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchRooms(filters);

        // Apply sorting
        const sortedData = [...data];
        if (sortBy === 'price-asc') {
          sortedData.sort((a, b) => a.nightlyRate - b.nightlyRate);
        } else if (sortBy === 'price-desc') {
          sortedData.sort((a, b) => b.nightlyRate - a.nightlyRate);
        } else if (sortBy === 'name') {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        }

        setRooms(sortedData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load rooms';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters: RoomFiltersType) => {
    setFilters(newFilters);
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>
        <Container className="py-12">
          <SectionHeader
            title="Discover Our Rooms"
            subtitle="Explore our collection of luxurious accommodations"
          />

          {error && (
            <Alert
              type="error"
              title="Error Loading Rooms"
              message={error}
              onDismiss={handleDismissError}
              className="mb-8"
            />
          )}

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <RoomFilters
                onFiltersChange={handleFiltersChange}
                isLoading={isLoading}
              />
            </aside>

            {/* Main content */}
            <section className="lg:col-span-3">
              {/* Sort controls */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLoading
                    ? 'Loading...'
                    : `${rooms.length} room${rooms.length !== 1 ? 's' : ''} available`}
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  disabled={isLoading}
                  aria-label="Sort rooms by"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Rooms grid */}
              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <RoomCardSkeleton key={i} />
                  ))}
                </div>
              ) : rooms.length === 0 ? (
                <Alert
                  type="info"
                  title="No Rooms Found"
                  message="Try adjusting your filters to find available rooms."
                  className="text-center"
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}
