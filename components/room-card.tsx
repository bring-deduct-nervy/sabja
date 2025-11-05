'use client';

import Link from 'next/link';
import { ImageCarousel } from './image-carousel';
import { AmenityTag } from './amenity-tag';
import type { Room } from '@/lib/types';

export interface RoomCardProps {
  room: Room;
  className?: string;
}

export function RoomCard({ room, className }: RoomCardProps) {
  const discount = room.nightlyRateOriginal
    ? Math.round(
        ((room.nightlyRateOriginal - room.nightlyRate) /
          room.nightlyRateOriginal) *
          100
      )
    : 0;

  const displayAmenities = room.amenities.slice(0, 4);
  const remainingAmenities = room.amenities.length - displayAmenities.length;

  return (
    <article
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 ${className || ''}`}
    >
      <div className="relative">
        <ImageCarousel images={room.images} title={room.name} />
        {discount > 0 && (
          <div
            className="absolute right-4 top-4 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white"
            aria-label={`${discount}% discount`}
          >
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-semibold text-gray-900 dark:text-white">
              {room.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {room.viewType ? `${room.viewType} View` : 'Room'}
            </p>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {room.shortDescription}
        </p>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">
              {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">
              {room.squareFeet ? `${room.squareFeet} sqft` : `${room.bedType}`}
            </span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {displayAmenities.map((amenity: string) => (
            <AmenityTag key={amenity} amenity={amenity} />
          ))}
          {remainingAmenities > 0 && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              +{remainingAmenities} more
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Per Night
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${room.nightlyRate}
            </p>
            {room.nightlyRateOriginal && (
              <p className="text-sm text-gray-400 line-through dark:text-gray-500">
                ${room.nightlyRateOriginal}
              </p>
            )}
          </div>
        </div>

        <Link
          href={`/rooms/${room.slug}`}
          className="block w-full rounded-lg bg-amber-600 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
