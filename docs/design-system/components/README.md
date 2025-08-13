# Component Library

The FoodyLog component library provides a comprehensive set of UI components optimized for food logging experiences. All components are built with accessibility, mobile-first design, and TypeScript support.

## Component Categories

### Base Components (shadcn/ui)
Core UI primitives with FoodyLog theming and enhancements.

- **[Button](./button.md)** - Primary actions with food-focused variants
- **[Card](./card.md)** - Content containers with meal-specific layouts  
- **[Input](./input.md)** - Form controls with validation and icons
- **[Badge](./badge.md)** - Tags, ratings, and categorization
- **[Toast](./toast.md)** - User feedback notifications
- **[Skeleton](./skeleton.md)** - Loading state placeholders

### Layout Components
Structural components for consistent application layout.

- **[AppLayout](./app-layout.md)** - Main application structure
- **[Header](./header.md)** - Branding and user menu
- **[Navigation](./navigation.md)** - Mobile-first bottom navigation
- **[PageTransition](./page-transition.md)** - Smooth route transitions

### FoodyLog Components
Specialized components for meal logging functionality.

- **[MealCard](./meal-card.md)** - Meal display with photo and details
- **[PhotoCapture](./photo-capture.md)** - Camera integration
- **[RatingInput](./rating-input.md)** - 10-point rating system
- **[TagInput](./tag-input.md)** - Meal categorization with autocomplete

### Feedback Components
Components for loading states, errors, and user feedback.

- **[LoadingSpinner](./loading-spinner.md)** - Branded loading indicators
- **[ErrorBoundary](./error-boundary.md)** - Graceful error handling
- **[EmptyState](./empty-state.md)** - No content placeholders

## Component Standards

### Accessibility Requirements
All components must meet WCAG 2.1 AA standards:

- **Color Contrast:** 4.5:1 minimum for normal text, 3:1 for large text
- **Touch Targets:** 44px minimum size with 8px spacing
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Readers:** Proper ARIA attributes and semantic HTML
- **Focus Management:** Visible focus indicators

### Mobile-First Design
Components are designed for mobile interaction first:

- **Touch Optimized:** Appropriate touch target sizes
- **Responsive:** Adapts to different screen sizes
- **Performance:** Optimized for mobile devices
- **Safe Areas:** Handles iOS/Android device variations

### TypeScript Support
All components include comprehensive TypeScript definitions:

```typescript
// Example component interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### Testing Requirements
Each component includes:

- **Unit Tests:** Component behavior and props
- **Accessibility Tests:** axe-core integration
- **Visual Tests:** Screenshot comparisons
- **Interaction Tests:** User interaction flows

## Usage Patterns

### Import Structure
```typescript
// Base components
import { Button, Card, Input, Badge } from '~/components/ui';

// Layout components  
import { AppLayout, Header, Navigation } from '~/components/layout';

// FoodyLog components
import { MealCard, PhotoCapture, RatingInput } from '~/components/meal';
```

### Theming Integration
All components automatically inherit FoodyLog theme colors:

```tsx
<Button variant="default">
  Uses primary green color
</Button>

<Card className="bg-card text-card-foreground">
  Uses theme-aware colors
</Card>
```

### Responsive Behavior
Components adapt to different screen sizes:

```tsx
<MealCard 
  compact={isMobile}
  showPrice={!isMobile}
  className="w-full md:w-auto"
/>
```

## Component Development Guidelines

### File Structure
```
src/components/
├── ui/                    # Base shadcn/ui components
│   ├── button.tsx
│   ├── button.test.tsx
│   └── button.stories.tsx
├── layout/                # Layout components
├── meal/                  # FoodyLog-specific components
└── __tests__/            # Shared test utilities
```

### Component Template
```tsx
/**
 * ComponentName - Brief description
 * 
 * Detailed description of component purpose and features.
 * Include accessibility notes and usage guidelines.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        // ... other variants
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };
```

### Documentation Template
Each component should have comprehensive documentation including:

1. **Overview** - Purpose and key features
2. **API Reference** - Props and methods
3. **Examples** - Common usage patterns
4. **Accessibility** - WCAG compliance notes
5. **Mobile Considerations** - Touch and responsive behavior
6. **Testing** - Test examples and coverage

## Performance Considerations

### Bundle Size
- Tree-shakeable exports
- Minimal dependencies
- Optimized CSS output

### Runtime Performance
- Efficient re-renders with React.memo where appropriate
- Optimized animations with CSS transforms
- Lazy loading for complex components

### Mobile Performance
- Touch event optimization
- Reduced motion support
- Efficient image handling

## Browser Support

Components are tested and supported on:

- **Desktop:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 14+
- **PWA:** Full offline functionality
- **Native:** iOS 13+ and Android 8+ via Capacitor 7

## Contributing

When adding new components:

1. Follow the component template structure
2. Include comprehensive TypeScript types
3. Add accessibility features and testing
4. Write documentation with examples
5. Ensure mobile-first responsive design
6. Test across supported browsers and devices

See the [Contributing Guide](../../CONTRIBUTING.md) for detailed development guidelines.