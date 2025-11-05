'use client';

import React, { useEffect } from 'react';
import type { Room, BookingResponse } from '@/lib/types';
import { BookingForm, type BookingFormData } from './booking-form';
import { BookingConfirmation } from './booking-confirmation';

export interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: (booking: BookingResponse) => void;
}

export function BookingModal({
  room,
  isOpen,
  onClose,
  onBookingComplete,
}: BookingModalProps) {
  const [confirmation, setConfirmation] =
    React.useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (data: BookingFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room.id,
          checkInDate: data.checkInDate.toISOString().split('T')[0],
          checkOutDate: data.checkOutDate.toISOString().split('T')[0],
          numberOfGuests: data.numberOfGuests,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          specialRequests: data.specialRequests,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Booking failed');
      }

      setConfirmation(result.data);
      onBookingComplete?.(result.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmation(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="w-full max-w-2xl">
          {confirmation ? (
            <BookingConfirmation booking={confirmation} onClose={handleClose} />
          ) : (
            <div className="rounded-lg bg-white shadow-xl dark:bg-gray-800">
              <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                <h2
                  id="booking-modal-title"
                  className="font-serif text-2xl font-bold text-gray-900 dark:text-white"
                >
                  Book {room.name}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800"
                  aria-label="Close booking modal"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <BookingForm
                  room={room}
                  onSubmit={handleSubmit}
                  onCancel={handleClose}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
