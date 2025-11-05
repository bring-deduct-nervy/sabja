import { z } from 'zod'

const numberOrUndefined = z.union([z.string(), z.null(), z.undefined()]).transform((val, ctx) => {
  if (!val) return undefined
  const num = parseFloat(val)
  if (isNaN(num)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Expected a valid number',
    })
    return z.NEVER
  }
  return num
})

export const roomQuerySchema = z.object({
  capacity: numberOrUndefined.pipe(z.number().int().positive().optional()),
  minPrice: numberOrUndefined.pipe(z.number().positive().optional()),
  maxPrice: numberOrUndefined.pipe(z.number().positive().optional()),
})

export const availabilityQuerySchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}).refine(
  (data) => {
    const checkIn = new Date(data.checkIn)
    const checkOut = new Date(data.checkOut)
    return checkOut > checkIn
  },
  {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  }
).refine(
  (data) => {
    const checkIn = new Date(data.checkIn)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return checkIn >= today
  },
  {
    message: 'Check-in date must be today or in the future',
    path: ['checkIn'],
  }
)

export const createReservationSchema = z.object({
  roomId: z.string().min(1),
  guestName: z.string().min(2).max(100),
  guestEmail: z.string().email(),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}).refine(
  (data) => {
    const checkIn = new Date(data.checkIn)
    const checkOut = new Date(data.checkOut)
    return checkOut > checkIn
  },
  {
    message: 'Check-out date must be after check-in date',
    path: ['checkOut'],
  }
).refine(
  (data) => {
    const checkIn = new Date(data.checkIn)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return checkIn >= today
  },
  {
    message: 'Check-in date must be today or in the future',
    path: ['checkIn'],
  }
)

export type RoomQuery = z.infer<typeof roomQuerySchema>
export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>
export type CreateReservation = z.infer<typeof createReservationSchema>
