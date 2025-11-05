'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { BookingResponse } from '@/lib/types';

export interface BookingState {
  roomId?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  numberOfGuests?: number;
  confirmation?: BookingResponse;
}

interface BookingContextType {
  bookingState: BookingState;
  setBookingState: (state: BookingState) => void;
  clearBooking: () => void;
  setConfirmation: (confirmation: BookingResponse) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({});

  const handleSetBookingState = useCallback((state: BookingState) => {
    setBookingState(state);
  }, []);

  const handleClearBooking = useCallback(() => {
    setBookingState({});
  }, []);

  const handleSetConfirmation = useCallback((confirmation: BookingResponse) => {
    setBookingState((prev) => ({ ...prev, confirmation }));
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setBookingState: handleSetBookingState,
        clearBooking: handleClearBooking,
        setConfirmation: handleSetConfirmation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
