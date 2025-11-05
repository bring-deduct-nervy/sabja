'use client'

import { useState } from 'react'
import { BookingForm } from './BookingForm'

export function BookingFormWrapper() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleBookingSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  return (
    <>
      {successMessage && (
        <div
          className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4"
          role="alert"
          data-testid="success-message"
        >
          {successMessage}
        </div>
      )}
      <BookingForm onSuccess={handleBookingSuccess} />
    </>
  )
}
