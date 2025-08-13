# FoodyLog Design System Documentation

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Complete (MVP)

## Overview

The FoodyLog Design System is a comprehensive, accessible, and maintainable UI foundation built on shadcn/ui with Tailwind CSS. It provides consistent visual design, interaction patterns, and component architecture optimized for food logging experiences across web and mobile platforms.

**Mission:** _"Create the most intuitive and visually appealing way to capture and relive food memories"_

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run component tests
bun run test
```

## Documentation Structure

- **[Getting Started](./getting-started.md)** - Setup and basic usage
- **[Design Tokens](./design-tokens.md)** - Colors, typography, spacing, and animations
- **[Components](./components/)** - Complete component library with examples
- **[Patterns](./patterns.md)** - Common meal logging interface patterns
- **[Accessibility](./accessibility.md)** - WCAG 2.1 AA compliance guidelines
- **[Mobile Guidelines](./mobile.md)** - Mobile-first design and Capacitor integration
- **[Testing](./testing.md)** - Component testing strategies and tools

## Key Features

### 🎨 Food-Focused Design
- Warm, appetite-appealing color palette (cream, brown, green)
- Typography optimized for meal titles and descriptions
- Photo-first layout patterns for food imagery

### 📱 Mobile-First Architecture
- 44px minimum touch targets for accessibility
- Bottom navigation optimized for thumb interaction
- Safe area handling for iOS/Android devices
- Capacitor 7 integration for native mobile apps

### ♿ Accessibility Excellence
- WCAG 2.1 AA compliant (4.5:1 contrast ratios)
- Screen reader compatible with proper ARIA attributes
- Keyboard navigation support for all interactive elements
- Reduced motion preferences respected

### 🎯 Performance Optimized
- CSS custom properties for dynamic theming
- Minimal bundle size with tree-shaking
- Optimized animations with hardware acceleration
- Mobile-optimized asset loading

### 🧪 Developer Experience
- TypeScript definitions for all components
- Comprehensive test coverage with Vitest and Playwright
- Live documentation with code examples
- Hot module replacement support

## Component Categories

### Base Components (shadcn/ui)
- **Button** - Primary actions with FoodyLog variants
- **Card** - Content containers with meal-specific layouts
- **Input** - Form controls with validation states
- **Badge** - Tags, ratings, and categorization

### Layout Components
- **AppLayout** - Main application structure
- **Header** - Branding and user menu
- **Navigation** - Mobile-first bottom navigation
- **PageTransition** - Smooth route transitions

### FoodyLog Components
- **MealCard** - Meal display with photo, rating, details
- **PhotoCapture** - Camera integration for meal photos
- **RatingInput** - 10-point rating system
- **TagInput** - Meal categorization with autocomplete

### Feedback Components
- **LoadingSpinner** - Branded loading states
- **Skeleton** - Content loading placeholders
- **Toast** - User feedback notifications
- **ErrorBoundary** - Graceful error handling

## Design Principles

### 1. Mobile-First & Touch-Optimized
Every component is designed for mobile interaction first, then enhanced for desktop. Touch targets meet accessibility standards with 44px minimum sizes.

### 2. Visual Hierarchy & Clarity
Food photos are the primary visual element, supported by clear typography and strategic use of color to guide user attention.

### 3. Speed & Efficiency
Minimal steps to complete core actions with smart defaults, predictive inputs, and instant visual feedback.

### 4. Emotional Connection
Beautiful food photography presentation with warm colors and delightful micro-interactions that make the app feel personal.

### 5. Accessibility First
Every component meets WCAG 2.1 AA standards with proper contrast, keyboard navigation, and screen reader support.

## Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 14+
- **PWA Support:** Full offline functionality with service workers
- **Native Mobile:** iOS 13+ and Android 8+ via Capacitor 7

## Contributing

See our [Contributing Guide](../CONTRIBUTING.md) for development setup, coding standards, and submission guidelines.

## License

This design system is part of the FoodyLog application. See [LICENSE](../../LICENSE) for details.