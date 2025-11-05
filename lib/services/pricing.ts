export function calculateTotalPrice(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date
): number {
  const nights = calculateNights(checkIn, checkOut)
  return Number((pricePerNight * nights).toFixed(2))
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const timeDiff = checkOut.getTime() - checkIn.getTime()
  const nights = Math.ceil(timeDiff / millisecondsPerDay)
  return Math.max(1, nights)
}
