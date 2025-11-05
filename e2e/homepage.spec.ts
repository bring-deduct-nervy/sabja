import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should render homepage with title and rooms', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle('Hotel Booking')

    // Check main heading
    const mainHeading = page.getByRole('heading', { level: 2, name: /Welcome to Our Hotel/i })
    await expect(mainHeading).toBeVisible()

    // Check available rooms section
    const roomsHeading = page.getByRole('heading', { level: 3, name: /Available Rooms/i })
    await expect(roomsHeading).toBeVisible()

    // Check that rooms are rendered
    const deluxeRoom = page.getByTestId('room-card-room-1')
    await expect(deluxeRoom).toBeVisible()

    const suite = page.getByTestId('room-card-room-2')
    await expect(suite).toBeVisible()

    const standardRoom = page.getByTestId('room-card-room-3')
    await expect(standardRoom).toBeVisible()
  })

  test('should display room information correctly', async ({ page }) => {
    await page.goto('/')

    // Check room names
    await expect(page.getByTestId('room-name-room-1')).toContainText('Deluxe Room')
    await expect(page.getByTestId('room-name-room-2')).toContainText('Suite')
    await expect(page.getByTestId('room-name-room-3')).toContainText('Standard Room')

    // Check prices
    await expect(page.getByTestId('room-price-room-1')).toContainText('$150')
    await expect(page.getByTestId('room-price-room-2')).toContainText('$250')
    await expect(page.getByTestId('room-price-room-3')).toContainText('$100')
  })

  test('should display booking form', async ({ page }) => {
    await page.goto('/')

    // Check booking form section
    const bookingHeading = page.getByRole('heading', { level: 3, name: /Book Your Room/i })
    await expect(bookingHeading).toBeVisible()

    // Check form inputs exist
    await expect(page.getByTestId('guestName-input')).toBeVisible()
    await expect(page.getByTestId('email-input')).toBeVisible()
    await expect(page.getByTestId('checkIn-input')).toBeVisible()
    await expect(page.getByTestId('checkOut-input')).toBeVisible()
    await expect(page.getByTestId('roomId-select')).toBeVisible()
    await expect(page.getByTestId('submit-button')).toBeVisible()
  })
})
