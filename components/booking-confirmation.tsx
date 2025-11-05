'use client';

import React from 'react';
import { format } from 'date-fns';
import type { BookingResponse } from '@/lib/types';

export interface BookingConfirmationProps {
  booking: BookingResponse;
  onClose: () => void;
}

export function BookingConfirmation({
  booking,
  onClose,
}: BookingConfirmationProps) {
  return (
    <div className="rounded-lg bg-white shadow-xl dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
        <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
          Booking Confirmed!
        </h2>
      </div>

      <div className="p-6">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="mb-6 text-center">
          <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
            Your booking is confirmed
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            A confirmation email has been sent to{' '}
            <span className="font-semibold">{booking.email}</span>
          </p>
        </div>

        {/* Booking Details */}
        <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
          <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Booking Details
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Booking Number:
              </span>
              <span className="font-mono font-semibold text-gray-900 dark:text-white">
                {booking.bookingNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Room:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {booking.roomName}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Check-in:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {format(new Date(booking.checkInDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Check-out:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {format(new Date(booking.checkOutDate), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Number of nights:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {booking.numberOfNights}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Guests:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {booking.numberOfGuests}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Nightly rate:
                </span>
                <span className="text-gray-900 dark:text-white">
                  ${booking.nightlyRate}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-900 dark:text-white">
                  Total price:
                </span>
                <span className="text-amber-600 dark:text-amber-400">
                  ${booking.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
          <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Guest Information
          </h4>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              <p className="font-semibold text-gray-900 dark:text-white">
                {booking.firstName} {booking.lastName}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <p className="font-semibold text-gray-900 dark:text-white">
                {booking.email}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <p className="font-semibold text-gray-900 dark:text-white">
                {booking.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6 rounded-lg border-l-4 border-amber-600 bg-amber-50 p-4 dark:border-amber-500 dark:bg-amber-900/20">
          <h4 className="mb-2 font-semibold text-amber-900 dark:text-amber-200">
            What&apos;s Next?
          </h4>
          <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
            <li>
              • A confirmation email with your booking details is on the way
            </li>
            <li>• Check-in is at 3:00 PM, check-out is at 11:00 AM</li>
            <li>
              • Contact us if you need to make any changes to your booking
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Close confirmation and return to booking"
        >
          Done
        </button>
      </div>
    </div>
  );
}
