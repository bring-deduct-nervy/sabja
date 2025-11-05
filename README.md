# Luxury Hotel & Resorts Website

A modern, elegantly designed Next.js 13+ application built for a luxury hotel brand, featuring a sophisticated design system with custom Tailwind CSS theming, reusable components, and responsive layouts.

## 🏗️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Google Fonts (Playfair Display, Lora, Inter)
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are formatted correctly
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

### Color Palette

The application uses a luxury-themed color palette:

- **Luxury Navy**: Deep blue shades for sophistication
  - Primary: `#102a43`
  - Range: 50-900

- **Luxury Gold**: Elegant gold accents
  - Primary: `#d4a017`
  - Range: 50-900

- **Luxury Cream**: Warm neutral backgrounds
  - Primary: `#fdfcfb`
  - Range: 50-900

### Typography

- **Display Font**: Playfair Display - For headings and hero text
- **Serif Font**: Lora - For elegant body copy
- **Sans Font**: Inter - For UI elements

### Custom Font Sizes

- `text-display-xl`: 4.5rem (72px)
- `text-display-lg`: 3.75rem (60px)
- `text-display-md`: 3rem (48px)
- `text-display-sm`: 2.25rem (36px)

## 📁 Project Structure

```
project/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles with custom CSS variables
├── components/
│   ├── navigation.tsx     # Main navigation component
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── container.tsx
│       ├── grid.tsx
│       ├── responsive-image.tsx
│       ├── section-header.tsx
│       └── index.ts
├── hooks/                 # Custom React hooks
│   ├── use-media-query.ts
│   ├── use-scroll.ts
│   └── index.ts
├── lib/
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── .husky/              # Git hooks configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.mjs    # ESLint configuration
├── .prettierrc          # Prettier configuration
└── package.json
```

## 🧩 Components

### UI Primitives

#### Button

Versatile button component with multiple variants:

- **Variants**: `primary`, `secondary`, `outline`, `ghost`
- **Sizes**: `sm`, `md`, `lg`

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">
  Book Now
</Button>;
```

#### Card

Flexible card component with sub-components:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>;
```

#### Container

Responsive container with predefined max-widths:

```tsx
import { Container } from '@/components/ui';

<Container size="lg">Your content</Container>;
```

#### Grid

Responsive grid layout:

```tsx
import { Grid } from '@/components/ui';

<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>;
```

#### SectionHeader

Pre-styled section headers:

```tsx
import { SectionHeader } from '@/components/ui';

<SectionHeader
  title="Our Services"
  subtitle="Discover what we offer"
  align="center"
/>;
```

#### ResponsiveImage

Next.js Image wrapper with aspect ratios:

```tsx
import { ResponsiveImage } from '@/components/ui';

<ResponsiveImage
  src="/image.jpg"
  alt="Description"
  aspectRatio="landscape"
  objectFit="cover"
/>;
```

## 🪝 Custom Hooks

### useMediaQuery

Query viewport size:

```tsx
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks';

const isMobile = useIsMobile();
```

### useScrollPosition & useScrollDirection

Track scroll behavior:

```tsx
import { useScrollPosition, useScrollDirection } from '@/hooks';

const scrollY = useScrollPosition();
const direction = useScrollDirection(); // 'up' | 'down' | null
```

## 🔧 Configuration

### TypeScript Path Aliases

The project uses `@/*` path alias for cleaner imports:

```tsx
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
```

### ESLint & Prettier

Code quality is enforced through:

- ESLint with Next.js and TypeScript rules
- Prettier for consistent code formatting
- Pre-commit hooks via Husky and lint-staged

All code is automatically formatted and linted before commits.

## 🎯 Coding Standards

### Component Structure

- Use functional components with TypeScript
- Export named components for better tree-shaking
- Use `forwardRef` for components that need ref access
- Keep components focused and single-purpose

### Styling

- Use Tailwind CSS utility classes
- Use `cn()` utility for conditional class merging
- Follow the established color palette and typography
- Maintain responsive design (mobile-first approach)

### File Naming

- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: kebab-case (e.g., `use-media-query.ts`)
- Use index files for cleaner exports

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and hooks
5. Types
6. Styles

## 🌐 SEO & Metadata

The application includes comprehensive SEO configuration:

- Structured metadata in root layout
- OpenGraph tags for social sharing
- Twitter card support
- Semantic HTML structure
- Proper heading hierarchy

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components adapt gracefully across screen sizes.

## 🔐 Environment Variables

Currently, no environment variables are required. For future additions:

1. Create a `.env.local` file in the root directory
2. Add variables with `NEXT_PUBLIC_` prefix for client-side access
3. Access via `process.env.NEXT_PUBLIC_VARIABLE_NAME`

## 🚢 Deployment

The application is ready to be deployed on any Next.js-compatible platform:

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `npm run lint && npm run type-check && npm run build`
4. Submit a pull request

Pre-commit hooks will automatically format and lint your code.

## 📄 License

All rights reserved.

## 👥 Support

For issues or questions, please contact the development team.
