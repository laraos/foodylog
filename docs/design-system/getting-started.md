# Getting Started

Quick start guide for using the FoodyLog Design System in your development workflow.

## Installation

The FoodyLog Design System is built into the application and doesn't require separate installation. All components are available through the existing project structure.

### Prerequisites

- **Node.js:** 18+ (recommended: 20+)
- **Bun:** Latest version for package management
- **TypeScript:** 5.0+ for type safety
- **React:** 19+ for modern React features

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd foodylog

# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Run accessibility tests
bun run test:a11y

# Run E2E tests
bun run test:e2e
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Base shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Layout.tsx
│   └── meal/                  # FoodyLog-specific components
│       ├── MealCard.tsx
│       ├── PhotoCapture.tsx
│       └── RatingInput.tsx
├── lib/
│   ├── utils.ts               # Utility functions
│   └── theme.ts               # Theme configuration
├── types/
│   └── design-system.ts       # TypeScript definitions
└── index.css                  # Global styles and design tokens
```

## Basic Usage

### Importing Components

```typescript
// Base UI components
import { Button, Card, Input, Badge } from '~/components/ui';

// Layout components
import { AppLayout, Header, Navigation } from '~/components/layout';

// FoodyLog-specific components
import { MealCard, PhotoCapture, RatingInput } from '~/components/meal';

// Utility functions
import { cn, formatTimeAgo, getRatingColor } from '~/lib/utils';
```

### Using Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '~/components/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to FoodyLog</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Start logging your meals today!</p>
        <Button size="lg" className="mt-4">
          Add Your First Meal
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Theme Integration

All components automatically use the FoodyLog theme:

```tsx
// Components automatically inherit theme colors
<Button variant="default">
  Uses primary green color
</Button>

<Card className="bg-card text-card-foreground">
  Uses theme-aware colors
</Card>

// Manual theme color usage
<div className="bg-primary text-primary-foreground">
  Custom themed element
</div>
```

## Design Tokens

### Colors

```tsx
// Using design token classes
<div className="bg-background text-foreground">
  <span className="text-primary">Primary text</span>
  <span className="text-muted-foreground">Muted text</span>
</div>

// Rating colors
<span className="text-rating-excellent">★ 9.5</span>
<span className="text-rating-good">★ 6.0</span>
```

### Spacing

```tsx
// Using spacing tokens (4px grid system)
<div className="p-6 space-y-4">        {/* 24px padding, 16px gaps */}
  <div className="mb-2">               {/* 8px margin bottom */}
    <span className="mr-3">Content</span> {/* 12px margin right */}
  </div>
</div>
```

### Typography

```tsx
// Typography scale
<h1 className="text-2xl font-bold">Page Title</h1>
<h2 className="text-xl font-semibold">Section Title</h2>
<p className="text-base">Body text</p>
<span className="text-sm text-muted-foreground">Metadata</span>
```

## Common Patterns

### Meal Card Display

```tsx
import { MealCard } from '~/components/meal';

function MealList({ meals }) {
  return (
    <div className="space-y-4">
      {meals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          onTap={(id) => navigate(`/meals/${id}`)}
          showPrice
        />
      ))}
    </div>
  );
}
```

### Form with Validation

```tsx
import { Input, Button, FormField } from '~/components/ui';

function MealForm() {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form className="space-y-4">
      <FormField 
        label="Meal Title" 
        required
        error={errors.title}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you eat?"
        />
      </FormField>
      
      <Button type="submit" size="lg" className="w-full">
        Save Meal
      </Button>
    </form>
  );
}
```

### Responsive Layout

```tsx
import { AppLayout } from '~/components/layout';

function App() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Content automatically responsive */}
      </div>
    </AppLayout>
  );
}
```

## Accessibility Guidelines

### Keyboard Navigation

```tsx
// Proper keyboard support
<Button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
  }}
>
  Keyboard Accessible
</Button>
```

### Screen Reader Support

```tsx
// Proper ARIA attributes
<Button
  aria-label="Delete meal: Margherita Pizza"
  aria-describedby="delete-help"
>
  <Trash2 className="w-4 h-4" />
</Button>
<div id="delete-help" className="sr-only">
  This action cannot be undone
</div>
```

### Focus Management

```tsx
// Visible focus indicators
<Button className="focus-visible:ring-2 focus-visible:ring-primary">
  Focusable Button
</Button>

// Focus trap in modals
const firstFocusableRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  }
}, [isOpen]);
```

## Mobile Optimization

### Touch Targets

```tsx
// Proper touch target sizes
<Button className="min-h-[44px] min-w-[44px]">
  Touch Friendly
</Button>

// Navigation with thumb-friendly spacing
<nav className="flex justify-around p-2">
  {items.map(item => (
    <button
      key={item.id}
      className="min-h-[44px] px-3 py-2"
    >
      {item.label}
    </button>
  ))}
</nav>
```

### Safe Area Handling

```tsx
// Safe area CSS classes
<header className="sticky top-0 safe-area-inset-top">
  Header content
</header>

<nav className="fixed bottom-0 safe-area-inset-bottom">
  Navigation content
</nav>
```

### Responsive Images

```tsx
// Optimized image loading
<img
  src={meal.photo}
  alt={meal.title}
  loading="lazy"
  className="w-full h-48 object-cover rounded-lg"
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
/>
```

## Testing Components

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '~/components/ui';

test('button handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Best Practices

### Bundle Optimization

```tsx
// Lazy loading for better performance
const MealDetail = lazy(() => import('./MealDetail'));

function App() {
  return (
    <Suspense fallback={<MealDetailSkeleton />}>
      <MealDetail />
    </Suspense>
  );
}
```

### Image Optimization

```tsx
// Progressive image loading
const [isLoading, setIsLoading] = useState(true);

<div className="relative">
  {isLoading && <Skeleton className="absolute inset-0" />}
  <img
    src={meal.photo}
    alt={meal.title}
    onLoad={() => setIsLoading(false)}
    className={cn(
      'transition-opacity duration-200',
      isLoading ? 'opacity-0' : 'opacity-100'
    )}
  />
</div>
```

### Virtual Scrolling

```tsx
import { FixedSizeList as List } from 'react-window';

function VirtualMealList({ meals }) {
  return (
    <List
      height={600}
      itemCount={meals.length}
      itemSize={120}
      itemData={meals}
    >
      {({ index, style, data }) => (
        <div style={style}>
          <MealCard meal={data[index]} compact />
        </div>
      )}
    </List>
  );
}
```

## Customization

### Extending Components

```tsx
// Create custom variants
const customButtonVariants = cva(
  buttonVariants.base,
  {
    variants: {
      ...buttonVariants.variants,
      variant: {
        ...buttonVariants.variants.variant,
        success: 'bg-green-600 text-white hover:bg-green-700',
      }
    }
  }
);

function CustomButton({ variant, ...props }) {
  return (
    <button
      className={cn(customButtonVariants({ variant }))}
      {...props}
    />
  );
}
```

### Theme Customization

```css
/* Custom CSS properties */
:root {
  --custom-color: 120 50% 50%;
}

.custom-theme {
  --primary: var(--custom-color);
}
```

```tsx
// Using custom theme
<div className="custom-theme">
  <Button>Custom themed button</Button>
</div>
```

## Development Workflow

### Component Development

1. **Create Component:** Start with semantic HTML structure
2. **Add Styling:** Use Tailwind classes and design tokens
3. **Add Interactions:** Implement keyboard and mouse support
4. **Add Accessibility:** ARIA attributes and screen reader support
5. **Write Tests:** Unit, accessibility, and visual tests
6. **Document Usage:** Add examples and guidelines

### Code Quality

```bash
# Linting and formatting
bun run lint
bun run format

# Type checking
bun run type-check

# Test coverage
bun run test --coverage

# Build verification
bun run build
```

## Troubleshooting

### Common Issues

**Components not styled correctly:**
- Ensure Tailwind CSS is properly configured
- Check that design tokens are imported
- Verify component imports are correct

**TypeScript errors:**
- Update to latest TypeScript definitions
- Check component prop types
- Ensure proper imports from design system types

**Accessibility violations:**
- Run axe-core tests
- Check ARIA attributes
- Verify keyboard navigation
- Test with screen readers

**Performance issues:**
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Optimize image loading
- Consider virtual scrolling for large lists

### Getting Help

- **Documentation:** Check component-specific docs
- **Examples:** Review pattern examples
- **Tests:** Look at test files for usage examples
- **Issues:** Create GitHub issues for bugs or feature requests

## Next Steps

1. **Explore Components:** Browse the [component library](./components/)
2. **Learn Patterns:** Study [common patterns](./patterns.md)
3. **Understand Accessibility:** Review [accessibility guidelines](./accessibility.md)
4. **Mobile Development:** Check [mobile guidelines](./mobile.md)
5. **Testing:** Follow [testing strategies](./testing.md)

The FoodyLog Design System provides a solid foundation for building consistent, accessible, and performant food logging experiences. Start with the basic components and gradually explore more advanced patterns as needed.