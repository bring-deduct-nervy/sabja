'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isBefore, differenceInDays } from 'date-fns';
import type { Room, AvailabilityResult } from '@/lib/types';
import { checkAvailability } from '@/lib/api';

export interface BookingFormProps {
  room: Room;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface BookingFormData {
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export function BookingForm({
  room,
  onSubmit,
  onCancel,
  isLoading = false,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<BookingFormData>({
    defaultValues: {
      numberOfGuests: 1,
    },
  });

  const [currentStep, setCurrentStep] = useState<'dates' | 'details'>('dates');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    addDays(new Date(), 1)
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    addDays(new Date(), 2)
  );
  const [availabilityResult, setAvailabilityResult] =
    useState<AvailabilityResult | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null
  );
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const watchedGuests = watch('numberOfGuests');

  const numberOfNights =
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 0;

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      setAvailabilityError('Please select both check-in and check-out dates');
      return;
    }

    if (checkInDate >= checkOutDate) {
      setAvailabilityError('Check-out date must be after check-in date');
      return;
    }

    if (watchedGuests > room.capacity) {
      setAvailabilityError(
        `Number of guests cannot exceed room capacity of ${room.capacity}`
      );
      return;
    }

    if (watchedGuests < 1) {
      setAvailabilityError('At least 1 guest is required');
      return;
    }

    if (numberOfNights < 1) {
      setAvailabilityError('Minimum stay is 1 night');
      return;
    }

    setCheckingAvailability(true);
    setAvailabilityError(null);

    try {
      const result = await checkAvailability({
        roomId: room.id,
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        numberOfGuests: watchedGuests,
      });

      if (result.available) {
        setAvailabilityResult(result);
        setCurrentStep('details');
      } else {
        setAvailabilityError(
          result.reason || 'This room is not available for the selected dates'
        );
      }
    } catch (error) {
      setAvailabilityError(
        error instanceof Error ? error.message : 'Failed to check availability'
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleFormSubmit = async (data: BookingFormData) => {
    if (!availabilityResult) {
      setError('root', { message: 'Please check availability first' });
      return;
    }

    try {
      clearErrors();
      await onSubmit({
        ...data,
        checkInDate,
        checkOutDate,
      } as BookingFormData);
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Booking failed',
      });
    }
  };

  const isDisabledDate = (date: Date) => {
    return isBefore(date, addDays(new Date(), 0));
  };

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-6 font-serif text-2xl font-bold text-gray-900 dark:text-white">
        {currentStep === 'dates' ? 'Select Dates' : 'Contact Information'}
      </h2>

      {currentStep === 'dates' ? (
        <div className="space-y-6">
          {/* Date Selection Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Check-in Date
              </label>
              <DayPicker
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={isDisabledDate}
                className="rounded-lg border border-gray-200 p-3 dark:border-gray-700 rdp-mobile"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Check-out Date
              </label>
              <DayPicker
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) =>
                  isDisabledDate(date) ||
                  (checkInDate ? isBefore(date, checkInDate) : false)
                }
                className="rounded-lg border border-gray-200 p-3 dark:border-gray-700 rdp-mobile"
              />
            </div>
          </div>

          {/* Number of Guests */}
          <div>
            <label
              htmlFor="guests"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Number of Guests
            </label>
            <input
              {...register('numberOfGuests', {
                required: 'Number of guests is required',
                min: {
                  value: 1,
                  message: 'At least 1 guest is required',
                },
                max: {
                  value: room.capacity,
                  message: `Maximum ${room.capacity} guests allowed`,
                },
                valueAsNumber: true,
              })}
              id="guests"
              type="number"
              min="1"
              max={room.capacity}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
              aria-label="Number of guests"
            />
            {errors.numberOfGuests && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.numberOfGuests.message}
              </p>
            )}
          </div>

          {/* Summary */}
          {checkInDate && checkOutDate && numberOfNights > 0 && (
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Stay Summary
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">
                    {format(checkInDate, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">
                    {format(checkOutDate, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Number of nights:</span>
                  <span className="font-medium">{numberOfNights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{watchedGuests}</span>
                </div>
              </div>
            </div>
          )}

          {/* Availability Error */}
          {availabilityError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
              {availabilityError}
            </div>
          )}

          {/* Availability Result */}
          {availabilityResult && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-900/20">
              <h4 className="mb-2 font-semibold text-green-800 dark:text-green-300">
                Available! ✓
              </h4>
              <div className="space-y-1 text-sm text-green-700 dark:text-green-400">
                <div className="flex justify-between">
                  <span>Nightly rate:</span>
                  <span>${availabilityResult.nightlyRate}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total price:</span>
                  <span>${availabilityResult.totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
              aria-label="Cancel booking"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCheckAvailability}
              disabled={!checkInDate || !checkOutDate || checkingAvailability}
              className="flex-1 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-gray-400 dark:focus:ring-offset-gray-800"
              aria-label="Check availability"
            >
              {checkingAvailability ? 'Checking...' : 'Check Availability'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Contact Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
                id="firstName"
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
                aria-label="First name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
                id="lastName"
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
                aria-label="Last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
              aria-label="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                  message: 'Invalid phone number',
                },
              })}
              id="phone"
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
              aria-label="Phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="specialRequests"
              className="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Special Requests
            </label>
            <textarea
              {...register('specialRequests')}
              id="specialRequests"
              rows={3}
              placeholder="Any special requests or requirements..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
              aria-label="Special requests"
            />
          </div>

          {/* Booking Summary */}
          {availabilityResult && (
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Booking Summary
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {format(availabilityResult.checkInDate, 'MMM dd')} -{' '}
                    {format(availabilityResult.checkOutDate, 'MMM dd, yyyy')}
                  </span>
                  <span className="font-medium">
                    {availabilityResult.numberOfNights} night
                    {availabilityResult.numberOfNights !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 dark:border-gray-600">
                  <div className="flex justify-between font-semibold">
                    <span>Total Price:</span>
                    <span className="text-lg text-amber-600 dark:text-amber-400">
                      ${availabilityResult.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errors.root && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
              {errors.root.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep('dates')}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
              aria-label="Back to dates"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex-1 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-gray-400 dark:focus:ring-offset-gray-800"
              aria-label="Complete booking"
            >
              {isSubmitting || isLoading ? 'Booking...' : 'Complete Booking'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
