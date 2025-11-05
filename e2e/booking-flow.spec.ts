import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('should complete a successful booking', async ({ page }) => {
    await page.goto('/')

    // Fill in the booking form
    const guestNameInput = page.getByTestId('guestName-input')
    const emailInput = page.getByTestId('email-input')
    const checkInInput = page.getByTestId('checkIn-input')
    const checkOutInput = page.getByTestId('checkOut-input')
    const roomSelect = page.getByTestId('roomId-select')
    const submitButton = page.getByTestId('submit-button')

    // Enter guest details
    await guestNameInput.fill('John Doe')
    await emailInput.fill('john.doe@example.com')

    // Calculate dates
    const today = new Date()
    const checkInDate = new Date(today)
    checkInDate.setDate(checkInDate.getDate() + 5)
    const checkOutDate = new Date(checkInDate)
    checkOutDate.setDate(checkOutDate.getDate() + 3)

    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    await checkInInput.fill(formatDate(checkInDate))
    await checkOutInput.fill(formatDate(checkOutDate))

    // Select a room
    await roomSelect.selectOption('room-1')

    // Verify form is filled correctly
    await expect(guestNameInput).toHaveValue('John Doe')
    await expect(emailInput).toHaveValue('john.doe@example.com')
    await expect(checkInInput).toHaveValue(formatDate(checkInDate))
    await expect(checkOutInput).toHaveValue(formatDate(checkOutDate))
    await expect(roomSelect).toHaveValue('room-1')

    // Submit the form
    await submitButton.click()

    // Wait for success message and verify it appears
    const successMessage = page.getByTestId('success-message')
    await expect(successMessage).toBeVisible({ timeout: 5000 })
    await expect(successMessage).toContainText(/Booking successful/i)
  })

  test('should show validation errors for incomplete form', async ({ page }) => {
    await page.goto('/')

    const submitButton = page.getByTestId('submit-button')

    // Submit without filling the form
    await submitButton.click()

    // Check for validation errors
    await expect(page.getByTestId('guestName-error')).toBeVisible()
    await expect(page.getByTestId('email-error')).toBeVisible()
    await expect(page.getByTestId('checkIn-error')).toBeVisible()
    await expect(page.getByTestId('checkOut-error')).toBeVisible()
    await expect(page.getByTestId('roomId-error')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/')

    const guestNameInput = page.getByTestId('guestName-input')
    const emailInput = page.getByTestId('email-input')
    const submitButton = page.getByTestId('submit-button')

    // Fill with invalid email
    await guestNameInput.fill('John Doe')
    await emailInput.fill('invalid-email')

    await submitButton.click()

    // Check for email validation error
    const emailError = page.getByTestId('email-error')
    await expect(emailError).toBeVisible()
    await expect(emailError).toContainText(/valid email/i)
  })

  test('should validate checkout date is after checkin date', async ({ page }) => {
    await page.goto('/')

    const guestNameInput = page.getByTestId('guestName-input')
    const emailInput = page.getByTestId('email-input')
    const checkInInput = page.getByTestId('checkIn-input')
    const checkOutInput = page.getByTestId('checkOut-input')
    const roomSelect = page.getByTestId('roomId-select')
    const submitButton = page.getByTestId('submit-button')

    // Fill form with invalid dates
    await guestNameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await checkInInput.fill('2024-12-20')
    await checkOutInput.fill('2024-12-20')
    await roomSelect.selectOption('room-1')

    await submitButton.click()

    // Check for date validation error
    const checkOutError = page.getByTestId('checkOut-error')
    await expect(checkOutError).toBeVisible()
    await expect(checkOutError).toContainText(/after check-in/i)
  })

  test('should clear validation errors when filling form', async ({ page }) => {
    await page.goto('/')

    const guestNameInput = page.getByTestId('guestName-input')
    const submitButton = page.getByTestId('submit-button')

    // Trigger validation error
    await submitButton.click()
    await expect(page.getByTestId('guestName-error')).toBeVisible()

    // Start filling the form
    await guestNameInput.fill('John Doe')

    // Error should disappear
    await expect(page.getByTestId('guestName-error')).not.toBeVisible()
  })

  test('should handle room selection from card', async ({ page }) => {
    await page.goto('/')

    // Click on room select button
    const roomSelectButton = page.getByTestId('room-select-button-room-2')
    await expect(roomSelectButton).toContainText('Select Room')

    // Button should be clickable
    await expect(roomSelectButton).toBeEnabled()
  })
})
