import { calculateTotalPrice, calculateNights } from '@/lib/services/pricing'

describe('Pricing Service', () => {
  describe('calculateNights', () => {
    it('should calculate correct number of nights', () => {
      const checkIn = new Date('2024-12-01')
      const checkOut = new Date('2024-12-05')
      expect(calculateNights(checkIn, checkOut)).toBe(4)
    })

    it('should return at least 1 night', () => {
      const checkIn = new Date('2024-12-01T14:00:00')
      const checkOut = new Date('2024-12-01T16:00:00')
      expect(calculateNights(checkIn, checkOut)).toBe(1)
    })
  })

  describe('calculateTotalPrice', () => {
    it('should calculate correct total price', () => {
      const pricePerNight = 100
      const checkIn = new Date('2024-12-01')
      const checkOut = new Date('2024-12-05')
      expect(calculateTotalPrice(pricePerNight, checkIn, checkOut)).toBe(400)
    })

    it('should round to 2 decimal places', () => {
      const pricePerNight = 99.99
      const checkIn = new Date('2024-12-01')
      const checkOut = new Date('2024-12-04')
      expect(calculateTotalPrice(pricePerNight, checkIn, checkOut)).toBe(299.97)
    })

    it('should handle single night stay', () => {
      const pricePerNight = 150
      const checkIn = new Date('2024-12-01')
      const checkOut = new Date('2024-12-02')
      expect(calculateTotalPrice(pricePerNight, checkIn, checkOut)).toBe(150)
    })
  })
})
