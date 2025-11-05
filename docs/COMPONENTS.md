# Component Library

This document provides detailed information about the reusable UI components available in the project.

## Button Component

### Props

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- All standard button HTML attributes

### Examples

```tsx
// Primary button (default)
<Button>Click Me</Button>

// Secondary button with large size
<Button variant="secondary" size="lg">
  Book Now
</Button>

// Outline button
<Button variant="outline" onClick={handleClick}>
  Learn More
</Button>

// Ghost button (subtle)
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

## Card Component

A flexible card component with several sub-components for structured content.

### Sub-components

- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Body content
- `CardFooter`: Footer section

### Props

- `variant`: 'default' | 'elevated' | 'bordered' (default: 'default')

### Examples

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      This is a description of the card content.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Container Component

A responsive container with predefined max-widths and horizontal padding.

### Props

- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'lg')

### Max-widths

- `sm`: 768px (3xl)
- `md`: 1024px (5xl)
- `lg`: 1280px (7xl)
- `xl`: 1408px (8xl)
- `full`: 100%

### Example

```tsx
<Container size="lg">
  <h1>Page Content</h1>
  <p>This content is centered and has appropriate max-width.</p>
</Container>
```

## Grid Component

A responsive grid layout that automatically adjusts columns based on screen size.

### Props

- `cols`: 1 | 2 | 3 | 4 (default: 3)
- `gap`: 'sm' | 'md' | 'lg' (default: 'md')

### Breakpoints

- `cols={1}`: Always single column
- `cols={2}`: 1 col mobile, 2 cols tablet+
- `cols={3}`: 1 col mobile, 2 cols tablet, 3 cols desktop
- `cols={4}`: 1 col mobile, 2 cols tablet, 4 cols desktop

### Example

```tsx
<Grid cols={3} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

## SectionHeader Component

A pre-styled section header with title and optional subtitle.

### Props

- `title`: string (required)
- `subtitle`: string (optional)
- `align`: 'left' | 'center' | 'right' (default: 'center')

### Example

```tsx
<SectionHeader
  title="Our Services"
  subtitle="Discover what makes us unique"
  align="center"
/>
```

## ResponsiveImage Component

A Next.js Image wrapper with built-in aspect ratio support.

### Props

- `src`: string (required)
- `alt`: string (required)
- `aspectRatio`: 'square' | 'video' | 'portrait' | 'landscape' (default: 'landscape')
- `objectFit`: 'cover' | 'contain' (default: 'cover')
- All Next.js Image props

### Aspect Ratios

- `square`: 1:1
- `video`: 16:9
- `portrait`: 3:4
- `landscape`: 4:3

### Example

```tsx
<ResponsiveImage
  src="/images/hotel-room.jpg"
  alt="Luxury hotel room"
  aspectRatio="landscape"
  priority
/>
```

## Utility Hooks

### useMediaQuery

Query viewport size with custom media queries.

```tsx
import { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from '@/hooks';

// Custom query
const isLargeScreen = useMediaQuery('(min-width: 1200px)');

// Pre-defined breakpoints
const isMobile = useIsMobile(); // < 768px
const isTablet = useIsTablet(); // 768px - 1024px
const isDesktop = useIsDesktop(); // > 1024px
```

### useScrollPosition

Track the current scroll position.

```tsx
import { useScrollPosition } from '@/hooks';

const scrollY = useScrollPosition();

// Example: Show element after scrolling 100px
{
  scrollY > 100 && <BackToTop />;
}
```

### useScrollDirection

Track scroll direction for dynamic UI behavior.

```tsx
import { useScrollDirection } from '@/hooks';

const direction = useScrollDirection(); // 'up' | 'down' | null

// Example: Hide header on scroll down
<header className={direction === 'down' ? 'hidden' : 'visible'}>...</header>;
```

## Utility Functions

### cn()

Merge Tailwind CSS classes with conditional logic.

```tsx
import { cn } from '@/lib/utils';

const className = cn(
  'base-class',
  isActive && 'active-class',
  isPrimary ? 'primary' : 'secondary',
  customClassName
);
```

### formatDate()

Format dates in a consistent way.

```tsx
import { formatDate } from '@/lib/utils';

formatDate(new Date()); // "November 5, 2024"
formatDate('2024-11-05'); // "November 5, 2024"
```

### truncate()

Truncate strings to a specified length.

```tsx
import { truncate } from '@/lib/utils';

truncate('This is a long text', 10); // "This is a..."
```

## Best Practices

1. **Always use TypeScript types** for props
2. **Use `cn()` utility** for conditional class names
3. **Keep components focused** on a single responsibility
4. **Use forwardRef** when components need ref access
5. **Follow the luxury brand colors** from the theme
6. **Maintain responsive design** (mobile-first approach)
7. **Add proper ARIA labels** for accessibility
