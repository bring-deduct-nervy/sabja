'use client'

import React, { useState } from 'react'
import { Button } from './Button'

interface BookingFormProps {
  onSubmit?: (data: BookingData) => void
  onSuccess?: (message: string) => void
}

export interface BookingData {
  guestName: string
  email: string
  checkIn: string
  checkOut: string
  roomId: string
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<BookingData>({
    guestName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomId: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required'
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required'
    }

    if (formData.checkIn && formData.checkOut) {
      if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        newErrors.checkOut = 'Check-out date must be after check-in date'
      }
    }

    if (!formData.roomId) {
      newErrors.roomId = 'Please select a room'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      if (onSubmit) {
        await Promise.resolve(onSubmit(formData))
      } else {
        // Default API call
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Booking failed')
        }

        const result = await response.json()
        onSuccess?.(result.message || 'Booking successful!')
        setFormData({
          guestName: '',
          email: '',
          checkIn: '',
          checkOut: '',
          roomId: '',
        })
      }
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="guestName" className="block text-sm font-medium mb-1">
          Guest Name *
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.guestName ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid="guestName-input"
        />
        {errors.guestName && (
          <p className="text-red-500 text-sm mt-1" data-testid="guestName-error">
            {errors.guestName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid="email-input"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1" data-testid="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="checkIn" className="block text-sm font-medium mb-1">
          Check-in Date *
        </label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.checkIn ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid="checkIn-input"
        />
        {errors.checkIn && (
          <p className="text-red-500 text-sm mt-1" data-testid="checkIn-error">
            {errors.checkIn}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="checkOut" className="block text-sm font-medium mb-1">
          Check-out Date *
        </label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.checkOut ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid="checkOut-input"
        />
        {errors.checkOut && (
          <p className="text-red-500 text-sm mt-1" data-testid="checkOut-error">
            {errors.checkOut}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="roomId" className="block text-sm font-medium mb-1">
          Select Room *
        </label>
        <select
          id="roomId"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.roomId ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid="roomId-select"
        >
          <option value="">Choose a room...</option>
          <option value="room-1">Deluxe Room - $150</option>
          <option value="room-2">Suite - $250</option>
          <option value="room-3">Standard Room - $100</option>
        </select>
        {errors.roomId && (
          <p className="text-red-500 text-sm mt-1" data-testid="roomId-error">
            {errors.roomId}
          </p>
        )}
      </div>

      {errors.submit && (
        <p
          className="text-red-500 text-sm p-2 bg-red-50 rounded"
          data-testid="submit-error"
        >
          {errors.submit}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        data-testid="submit-button"
      >
        {loading ? 'Booking...' : 'Complete Booking'}
      </Button>
    </form>
  )
}
