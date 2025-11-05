# Contributing Guidelines

Thank you for considering contributing to the Luxury Hotel & Resorts project!

## Development Workflow

1. **Clone the repository** and install dependencies:

   ```bash
   git clone <repository-url>
   cd project
   npm install
   ```

2. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following our coding standards (see below)

4. **Test your changes**:

   ```bash
   npm run lint        # Check for linting errors
   npm run type-check  # Check TypeScript types
   npm run build       # Ensure production build works
   ```

5. **Commit your changes** - Pre-commit hooks will automatically format and lint your code:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push your branch** and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Standards

### TypeScript

- Use strict TypeScript with proper type annotations
- Avoid `any` types unless absolutely necessary
- Export types alongside components

### Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Use `forwardRef` when components need ref access
- Add proper TypeScript interfaces for props

### Styling

- Use Tailwind CSS utility classes
- Follow the luxury brand color palette
- Use the `cn()` utility for conditional classes
- Maintain mobile-first responsive design

### File Organization

- Components in PascalCase: `Button.tsx`
- Utilities in kebab-case: `use-media-query.ts`
- Use index files for cleaner exports
- Group related functionality in directories

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and hooks
5. Types
6. Styles

### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Code Review Process

All contributions require:

1. Passing all automated checks (lint, type-check, build)
2. Review and approval from at least one maintainer
3. Clear description of changes in the PR
4. Updated documentation if needed

## Questions?

If you have questions about contributing, please open an issue or reach out to the maintainers.
