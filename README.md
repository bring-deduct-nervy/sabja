# Hotel Booking Application

A modern hotel booking application built with Next.js, React, and TypeScript. The project includes a comprehensive testing suite with Jest, React Testing Library, and Playwright.

## Features

- **Next.js 14**: Modern React framework with API routes and file-based routing
- **React 18**: Latest React features and optimizations
- **TypeScript**: Full type safety across the application
- **Component Testing**: Jest and React Testing Library for unit and component tests
- **End-to-End Testing**: Playwright for comprehensive e2e tests
- **API Routes**: Next.js API routes for booking management
- **Form Validation**: Client and server-side validation for booking forms
- **CI/CD Integration**: GitHub Actions workflow for automated testing and builds

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Button.tsx
│   │   ├── RoomCard.tsx
│   │   ├── BookingForm.tsx
│   │   └── __tests__/    # Component tests
│   └── lib/              # Utility functions
│       ├── bookingHandler.ts
│       └── __tests__/    # Handler tests
├── e2e/                  # End-to-end tests
│   ├── homepage.spec.ts
│   └── booking-flow.spec.ts
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-booking
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

## Running the Application

### Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build and start the production server:

```bash
npm run build
npm start
```

## Testing

### Running Tests

#### Unit and Component Tests

Run the Jest test suite with coverage:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

Run specific test file:

```bash
npm test -- Button.test.tsx
```

#### End-to-End Tests

Run Playwright e2e tests:

```bash
npm run test:e2e
```

Run e2e tests in UI mode:

```bash
npm run test:e2e:ui
```

Run e2e tests for a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### All Tests (CI Mode)

Run all tests including unit, component, and e2e:

```bash
npm run test:ci
```

### Test Coverage

After running `npm test`, view coverage reports:

```bash
# Coverage directory
coverage/

# Open HTML report
open coverage/lcov-report/index.html
```

## Code Quality

### Linting

Run ESLint:

```bash
npm run lint
```

### Type Checking

Run TypeScript type check:

```bash
npm run type-check
```

## Testing Documentation

### Unit and Component Tests

Unit and component tests are located in `src/**/__tests__/` directories using the Jest and React Testing Library stack.

**Test Files:**
- `src/components/__tests__/Button.test.tsx` - Button component tests
- `src/components/__tests__/RoomCard.test.tsx` - Room card component tests
- `src/components/__tests__/BookingForm.test.tsx` - Booking form validation and interaction tests
- `src/lib/__tests__/bookingHandler.test.ts` - Booking handler logic and API tests

**What's Tested:**
- Component rendering and prop handling
- User interactions (clicks, form inputs)
- Form validation logic
- Error states and messages
- Event callbacks and handlers
- Booking business logic (validation, creation, retrieval)

**Running Component Tests:**

```bash
npm test                              # Run all tests
npm test -- Button.test               # Run specific test
npm test -- --watch                   # Watch mode
npm test -- --coverage                # With coverage report
```

### End-to-End Tests

E2E tests are located in `e2e/` directory using Playwright.

**Test Files:**
- `e2e/homepage.spec.ts` - Homepage rendering and room display
- `e2e/booking-flow.spec.ts` - Complete booking flow scenarios

**What's Tested:**
- Homepage renders with correct content
- Room information displays correctly
- Booking form is present and functional
- Complete booking flow works end-to-end
- Form validation shows appropriate errors
- Success message appears after booking

**Running E2E Tests:**

```bash
npm run test:e2e                      # Run all e2e tests
npm run test:e2e:ui                   # Run with Playwright UI
npx playwright test --debug           # Debug mode
npx playwright test --headed          # Run with headed browser
```

**E2E Test Details:**

The booking flow test performs:
1. Navigates to homepage
2. Fills booking form with:
   - Guest name: "John Doe"
   - Email: "john.doe@example.com"
   - Check-in: 5 days from today
   - Check-out: 3 days after check-in
   - Room: Deluxe Room (room-1)
3. Submits the form
4. Verifies success message appears

**Playwright Reports:**

After running e2e tests, view detailed reports:

```bash
npx playwright show-report            # Open HTML report
```

Reports include:
- Test execution timeline
- Screenshots and videos
- Browser console logs
- Network requests

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on:
- Pull requests to `main` and `develop` branches
- Pushes to `main` and `develop` branches

### CI Pipeline Steps

1. **Setup**: Checkout code and install Node.js
2. **Install Dependencies**: `npm ci`
3. **Lint**: `npm run lint` - Code quality checks
4. **Unit Tests**: `npm test -- --coverage` - Jest tests with coverage
5. **Type Check**: `npm run type-check` - TypeScript validation
6. **Build**: `npm run build` - Next.js build
7. **E2E Tests**: `npm run test:e2e` - Playwright tests
8. **Report Upload**: Upload Playwright report as artifact

### Running Locally

To simulate the CI pipeline locally:

```bash
npm run lint
npm test -- --coverage
npm run type-check
npm run build
npm run test:e2e
```

## API Documentation

### POST /api/bookings

Create a new booking.

**Request Body:**
```json
{
  "guestName": "John Doe",
  "email": "john@example.com",
  "checkIn": "2024-12-20",
  "checkOut": "2024-12-23",
  "roomId": "room-1"
}
```

**Response (201):**
```json
{
  "message": "Booking successful!",
  "booking": {
    "id": "booking-1734567890-abc123def",
    "guestName": "John Doe",
    "email": "john@example.com",
    "checkIn": "2024-12-20",
    "checkOut": "2024-12-23",
    "roomId": "room-1",
    "status": "confirmed",
    "createdAt": "2024-12-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format"
  }
}
```

### GET /api/bookings

Retrieve all bookings.

**Response (200):**
```json
{
  "bookings": [
    {
      "id": "booking-...",
      "guestName": "John Doe",
      "email": "john@example.com",
      "checkIn": "2024-12-20",
      "checkOut": "2024-12-23",
      "roomId": "room-1",
      "status": "confirmed",
      "createdAt": "2024-12-15T10:30:00.000Z"
    }
  ]
}
```

## Environment Variables

Currently, the application doesn't require environment variables for basic functionality. For production deployment, you may want to add:

```env
# Example (not required for development)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NODE_ENV=production
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari/WebKit (latest)
- Edge (latest)

## Contributing

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test && npm run test:e2e`
4. Run linter: `npm run lint`
5. Type check: `npm run type-check`
6. Commit and push
7. Create a pull request

### Before Committing

Always run the full test suite:

```bash
npm run lint
npm test -- --coverage
npm run type-check
npm run build
```

## Troubleshooting

### Jest Tests Failing

1. Clear cache: `npm test -- --clearCache`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version` (should be 18+)

### Playwright Tests Not Running

1. Install browsers: `npx playwright install`
2. Check if dev server is running on port 3000
3. Clear Playwright cache: `rm -rf .auth && rm -rf test-results`

### Build Failing

1. Check TypeScript: `npm run type-check`
2. Check linting: `npm run lint`
3. Clear Next.js cache: `rm -rf .next`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

### Port 3000 Already in Use

Change the dev port:

```bash
npm run dev -- -p 3001
```

Or kill the process using port 3000:

```bash
lsof -i :3000
kill -9 <PID>
```

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on the repository.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
