'use client';

import { ImageCarousel } from './image-carousel';
import { AmenityTag } from './amenity-tag';
import type { Room } from '@/lib/types';

export interface RoomDetailsProps {
  room: Room;
  className?: string;
}

export function RoomDetails({ room, className }: RoomDetailsProps) {
  const discount = room.nightlyRateOriginal
    ? Math.round(
        ((room.nightlyRateOriginal - room.nightlyRate) /
          room.nightlyRateOriginal) *
          100
      )
    : 0;

  return (
    <div className={className}>
      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Gallery */}
          <div className="mb-8">
            <ImageCarousel images={room.images} title={room.name} />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 dark:text-white">
              {room.name}
            </h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              {room.description}
            </p>

            {room.features && room.features.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900 dark:text-white">
                  Features
                </h2>
                <ul className="grid gap-2">
                  {room.features.map((feature: string) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="h-5 w-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-gray-900 dark:text-white">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity: string) => (
                  <AmenityTag
                    key={amenity}
                    amenity={amenity}
                    variant="default"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {/* Price section */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Nightly Rate
              </p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${room.nightlyRate}
                </span>
                {room.nightlyRateOriginal && (
                  <span className="ml-2 text-lg text-gray-400 line-through dark:text-gray-500">
                    ${room.nightlyRateOriginal}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Save {discount}%
                </p>
              )}
            </div>

            {/* Room info */}
            <div className="mb-6 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Capacity:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Bed Type:
                </span>
                <span className="font-semibold capitalize text-gray-900 dark:text-white">
                  {room.bedType}
                </span>
              </div>
              {room.squareFeet && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Size:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {room.squareFeet} sqft
                  </span>
                </div>
              )}
              {room.viewType && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    View:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {room.viewType}
                  </span>
                </div>
              )}
            </div>

            {/* Check-in/out times */}
            {(room.checkInTime || room.checkOutTime) && (
              <div className="mb-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Check-in & Check-out
                </h3>
                <div className="space-y-2 text-sm">
                  {room.checkInTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Check-in:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {room.checkInTime}
                      </span>
                    </div>
                  )}
                  {room.checkOutTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Check-out:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {room.checkOutTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="mb-6 border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Availability
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Available:
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {room.availability.available} rooms
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Occupied:
                  </span>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    {room.availability.occupied} rooms
                  </span>
                </div>
              </div>
            </div>

            {/* Book button */}
            <button
              className="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              disabled={room.availability.available === 0}
              onClick={() => {
                alert(
                  'Booking functionality would be implemented in a real application'
                );
              }}
            >
              {room.availability.available > 0
                ? 'Reserve Room'
                : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
