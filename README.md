# Luxury Haven Hotel & Spa

A modern, responsive luxury hotel website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Homepage Components

- **Hero Section**: Full-screen hero with background image, animated headline, and call-to-action buttons
- **Highlight Cards**: Feature cards showcasing Rooms, Dining, and Spa with hover effects
- **Amenities Preview**: Grid display of hotel amenities with icons
- **Booking Teaser**: Call-to-action section for booking with key benefits
- **Gallery Teaser**: 6-image grid preview linking to full gallery
- **Testimonials**: Guest reviews with ratings and avatars
- **Footer**: Comprehensive footer with navigation, contact info, and social links

### Technical Features

- ✅ Responsive design (mobile, tablet, desktop) using Tailwind breakpoints
- ✅ Accessibility-focused with ARIA labels and semantic HTML
- ✅ SEO optimized with metadata, structured headings, and Open Graph tags
- ✅ Image optimization using Next.js Image component
- ✅ Smooth animations with Framer Motion
- ✅ Modern luxury hotel aesthetic
- ✅ Performance optimized for high Lighthouse scores

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Fonts**: Playfair Display (serif), Inter (sans-serif)
- **Image Sources**: Unsplash

## Design System

### Colors

- **Gold**: `#c9a962` - Primary accent color
- **Gold Dark**: `#a88941` - Hover states
- **Navy**: `#0f1e2e` - Dark text and backgrounds
- **Cream**: `#f5f1ea` - Light backgrounds

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles and theme
│   ├── rooms/              # Rooms page
│   ├── dining/             # Dining page
│   ├── spa/                # Spa page
│   ├── gallery/            # Gallery page
│   ├── booking/            # Booking page
│   ├── contact/            # Contact page
│   └── ...                 # Other pages
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── HighlightCards.tsx  # Feature cards
│   ├── AmenitiesPreview.tsx # Amenities grid
│   ├── BookingTeaser.tsx   # Booking CTA
│   ├── GalleryTeaser.tsx   # Gallery preview
│   ├── Testimonials.tsx    # Guest reviews
│   └── Footer.tsx          # Site footer
└── public/                 # Static assets
```

## Pages

- **Homepage** (`/`) - Main landing page with all components
- **Rooms** (`/rooms`) - Luxury accommodations (placeholder)
- **Dining** (`/dining`) - Restaurant information (placeholder)
- **Spa** (`/spa`) - Spa & wellness services (placeholder)
- **Gallery** (`/gallery`) - Photo gallery (placeholder)
- **Booking** (`/booking`) - Reservation system (placeholder)
- **Contact** (`/contact`) - Contact information (placeholder)

## Performance

The site is optimized for:
- ✅ Performance (>90 Lighthouse score target)
- ✅ Accessibility (>90 Lighthouse score target)
- ✅ Best Practices (>90 Lighthouse score target)
- ✅ SEO optimization

### Optimization Techniques

- Next.js Image component with proper sizing
- Remote image patterns configured for Unsplash
- Static page generation where possible
- Efficient CSS with Tailwind v4
- Lazy loading with viewport detection
- Optimized fonts with display swap

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Proper heading hierarchy (h1-h6)
- Focus states on all interactive elements
- Alt text on all images
- Keyboard navigation support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

This is a demonstration project for a luxury hotel website. Feel free to use it as a template for your own projects.
