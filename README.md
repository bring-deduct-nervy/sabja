# Luxury Hotel Website

A modern, elegant hotel website built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS. This project showcases a luxury hotel brand with custom theme tokens, reusable UI components, and best practices for performance and maintainability.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts:** Google Fonts (Playfair Display & Inter)
- **Code Quality:** ESLint, Prettier
- **Git Hooks:** Husky & lint-staged

## ✨ Features

- **Luxury Brand Theme:** Custom color palette, typography, and spacing system designed for high-end hospitality
- **Responsive Design:** Mobile-first approach with responsive layouts and utilities
- **Dark Mode Support:** Automatic light/dark theme switching based on system preferences
- **SEO Optimized:** Meta tags, Open Graph, Twitter Cards, and structured data
- **Reusable Components:** Button, Card, SectionHeader, ResponsiveImage, Container
- **Custom Hooks:** useMediaQuery, useScrollPosition, useLocalStorage
- **Type-Safe:** Full TypeScript support with strict mode enabled
- **Code Standards:** Automated formatting and linting with pre-commit hooks

## 📁 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with fonts and metadata
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles and theme variables
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── ResponsiveImage.tsx
│   │   │   └── index.ts
│   │   └── layout/            # Layout components
│   │       ├── Container.tsx
│   │       ├── Navigation.tsx
│   │       ├── Footer.tsx
│   │       └── index.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   └── lib/                   # Utility functions
│       └── utils.ts
├── public/                    # Static assets
├── .husky/                    # Git hooks
├── eslint.config.mjs         # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 20+ and npm

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Script                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start development server with Turbopack       |
| `npm run build`        | Build production application                  |
| `npm start`            | Start production server                       |
| `npm run lint`         | Run ESLint to check code quality              |
| `npm run lint:fix`     | Run ESLint and auto-fix issues                |
| `npm run format`       | Format code with Prettier                     |
| `npm run format:check` | Check code formatting without modifying files |
| `npm run type-check`   | Run TypeScript type checking                  |

## 🎨 Theme Customization

The luxury hotel theme is defined in `src/app/globals.css` using CSS custom properties. You can customize:

### Colors

```css
:root {
  --primary: #92400e; /* Deep amber for primary actions */
  --secondary: #78716c; /* Warm stone for secondary elements */
  --accent: #d97706; /* Bright amber for highlights */
  --background: #fafaf9; /* Off-white background */
  --foreground: #1c1917; /* Dark stone for text */
  /* ... more colors */
}
```

### Typography

- **Headings:** Playfair Display (serif, elegant)
- **Body Text:** Inter (sans-serif, readable)

### Spacing & Layout

Custom spacing scale using CSS variables for consistent spacing throughout the application.

## 🧩 Component Usage

### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg">
  Book Now
</Button>;
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`  
**Sizes:** `sm`, `md`, `lg`

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Suite Name</CardTitle>
  </CardHeader>
  <CardContent>Card content here</CardContent>
</Card>;
```

### SectionHeader

```tsx
import { SectionHeader } from "@/components/ui";

<SectionHeader
  subtitle="Welcome"
  title="Our Services"
  description="Discover what we offer"
  align="center"
/>;
```

### Container

```tsx
import { Container } from "@/components/layout";

<Container size="xl">{/* Your content */}</Container>;
```

**Sizes:** `sm`, `md`, `lg`, `xl`, `full`

## 🪝 Custom Hooks

### useMediaQuery

```tsx
import { useMediaQuery } from "@/hooks";

const isMobile = useMediaQuery("(max-width: 768px)");
```

### useScrollPosition

```tsx
import { useScrollPosition } from "@/hooks";

const scrollY = useScrollPosition();
```

### useLocalStorage

```tsx
import { useLocalStorage } from "@/hooks";

const [value, setValue] = useLocalStorage("key", defaultValue);
```

## 🔧 Development Workflow

### Code Quality

This project enforces code quality through:

1. **ESLint:** Catches potential bugs and enforces best practices
2. **Prettier:** Ensures consistent code formatting
3. **TypeScript:** Provides type safety and better IDE support
4. **Husky:** Runs pre-commit hooks to validate code before commits
5. **lint-staged:** Only lints and formats staged files for faster commits

### Pre-commit Hooks

Automatically runs on `git commit`:

- ESLint with auto-fix
- Prettier formatting
- TypeScript type checking (via CI)

### Path Aliases

TypeScript is configured with path aliases for cleaner imports:

```tsx
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks";
```

## 🚢 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The build process:

- Type checks all TypeScript files
- Lints all code
- Optimizes and minifies assets
- Generates static pages where possible
- Creates optimized production bundle

## 📝 Coding Standards

### TypeScript

- Use explicit types for function parameters and return values
- Avoid `any` type; use `unknown` or proper types
- Use interfaces for object shapes
- Export types alongside components

### React/Next.js

- Use functional components with hooks
- Mark client-side components with `"use client"`
- Use Server Components by default
- Implement proper error boundaries
- Use Next.js Image component for images

### Styling

- Use Tailwind utility classes for styling
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Use CSS variables for theme consistency

### File Naming

- Components: PascalCase (e.g., `Button.tsx`)
- Utilities/Hooks: camelCase (e.g., `useMediaQuery.ts`)
- Pages: lowercase (e.g., `page.tsx`)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting: `npm run lint && npm run type-check`
4. Commit your changes (pre-commit hooks will run automatically)
5. Push and create a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for luxury hospitality**
