# Quick Reference Guide

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm start              # Start production server

# Code Quality
npm run lint           # Check for errors
npm run lint:fix       # Auto-fix errors
npm run format         # Format all files
npm run type-check     # TypeScript validation
```

## 📦 Import Patterns

```tsx
// Components
import { Button, Card, Container } from '@/components/ui';
import { Navigation } from '@/components/navigation';

// Hooks
import { useIsMobile, useScrollPosition } from '@/hooks';

// Utils
import { cn, formatDate, truncate } from '@/lib/utils';

// Next.js
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
```

## 🎨 Color Classes

```tsx
// Brand Colors
bg - luxury - navy - 900; // Primary dark navy
bg - luxury - gold - 500; // Primary gold
bg - luxury - cream - 50; // Light cream background

text - luxury - navy - 900; // Dark text
text - luxury - gold - 500; // Gold accent text
text - luxury - cream - 100; // Light text

// Semantic
bg - brand - primary; // #102a43
bg - brand - secondary; // #d4a017
bg - brand - accent; // #b8860b
```

## 🔤 Typography Classes

```tsx
// Display Sizes (Large headings)
text - display - xl; // 72px - Hero titles
text - display - lg; // 60px - Large headings
text - display - md; // 48px - Section headings
text - display - sm; // 36px - Subsection headings

// Font Families
font - display; // Playfair Display (headings)
font - serif; // Lora (elegant body)
font - sans; // Inter (UI elements)
```

## 📐 Spacing

```tsx
// Custom Spacing
space-y-18            // 4.5rem (72px)
space-x-112           // 28rem (448px)
space-y-128           // 32rem (512px)

// Max Widths
max-w-8xl            // 88rem (1408px)
max-w-9xl            // 96rem (1536px)
```

## 🧩 Component Examples

### Button

```tsx
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="secondary">Gold Button</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Subtle</Button>
```

### Card

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Layout

```tsx
<Container size="lg">
  <Grid cols={3} gap="lg">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Grid>
</Container>
```

### Section Header

```tsx
<SectionHeader
  title="Section Title"
  subtitle="Optional subtitle"
  align="center"
/>
```

## 🪝 Hook Examples

### Media Queries

```tsx
const isMobile = useIsMobile();
const isDesktop = useIsDesktop();

return (
  <>
    {isMobile && <MobileView />}
    {isDesktop && <DesktopView />}
  </>
);
```

### Scroll Position

```tsx
const scrollY = useScrollPosition();
const direction = useScrollDirection();

const isScrolled = scrollY > 100;
const hideHeader = direction === 'down';
```

## 🎯 Common Patterns

### Conditional Classes

```tsx
import { cn } from '@/lib/utils';

<div
  className={cn(
    'base-class',
    isActive && 'active-class',
    error ? 'error-class' : 'normal-class'
  )}
/>;
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>...</Card>
  ))}
</div>
```

### Gradient Background

```tsx
<div className="bg-gradient-to-br from-luxury-navy-900 via-luxury-navy-800 to-luxury-navy-700">
  ...
</div>
```

### Hero Section

```tsx
<section className="py-32 bg-luxury-navy-900 text-white">
  <Container>
    <h1 className="text-display-xl font-display font-bold mb-6">Hero Title</h1>
    <p className="text-2xl text-luxury-cream-100 mb-8">Hero description</p>
    <Button variant="secondary" size="lg">
      Call to Action
    </Button>
  </Container>
</section>
```

## 🔍 Debugging

```bash
# Check TypeScript errors
npm run type-check

# Check linting issues
npm run lint

# Check formatting
npm run format:check

# Build and check for errors
npm run build
```

## 📱 Breakpoints

```css
/* Mobile First */
sm: 640px    /* @media (min-width: 640px) */
md: 768px    /* @media (min-width: 768px) */
lg: 1024px   /* @media (min-width: 1024px) */
xl: 1280px   /* @media (min-width: 1280px) */
2xl: 1536px  /* @media (min-width: 1536px) */
```

## 🎨 Animation Classes

```tsx
// Fade in
animate-fade-in

// Slide up
animate-slide-up

// Hover transitions
transition-all duration-200
transition-colors duration-300
```

## 📝 Metadata Pattern

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

## 🔗 Navigation Links

```tsx
import Link from 'next/link';

<Link
  href="/about"
  className="text-luxury-navy-700 hover:text-luxury-gold-500 transition-colors"
>
  About
</Link>;
```

## 📄 File Structure

```
app/page.tsx           → Pages
components/ui/*.tsx    → Reusable components
hooks/*.ts            → Custom hooks
lib/utils.ts          → Utilities
```
