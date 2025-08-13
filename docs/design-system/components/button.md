# Button Component

The Button component provides consistent, accessible action elements throughout FoodyLog with food-focused styling and comprehensive interaction states.

## Overview

Built on shadcn/ui Button with FoodyLog theme integration, the Button component supports multiple variants, sizes, and states optimized for meal logging interactions.

### Key Features

- **Accessibility:** WCAG 2.1 AA compliant with proper focus states
- **Touch Optimized:** 44px minimum touch targets for mobile
- **Theme Integration:** Automatic FoodyLog color scheme support
- **Loading States:** Built-in loading indicators
- **Keyboard Navigation:** Full keyboard accessibility

## API Reference

### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Primary green button | Main actions (Add Meal, Save) |
| `destructive` | Red button for dangerous actions | Delete, Remove |
| `outline` | Outlined button | Secondary actions |
| `secondary` | Subtle background button | Cancel, Back |
| `ghost` | Transparent button | Icon buttons, minimal actions |
| `link` | Text-only button | Navigation links |

### Sizes

| Size | Height | Padding | Use Case |
|------|--------|---------|----------|
| `sm` | 36px | 12px | Compact spaces, secondary actions |
| `default` | 40px | 16px | Standard buttons |
| `lg` | 44px | 32px | Primary actions, mobile touch targets |
| `icon` | 40px | 10px | Icon-only buttons |

## Examples

### Basic Usage

```tsx
import { Button } from '~/components/ui/button';

// Primary action button
<Button variant="default" size="lg">
  Add Meal
</Button>

// Secondary action
<Button variant="outline">
  Cancel
</Button>

// Destructive action
<Button variant="destructive">
  Delete Meal
</Button>
```

### With Icons

```tsx
import { Plus, Camera, Save } from 'lucide-react';

// Left icon
<Button leftIcon={<Plus className="w-4 h-4" />}>
  Add Meal
</Button>

// Right icon
<Button rightIcon={<Camera className="w-4 h-4" />}>
  Take Photo
</Button>

// Icon only
<Button variant="ghost" size="icon" aria-label="Save meal">
  <Save className="w-4 h-4" />
</Button>
```

### Loading States

```tsx
// Loading button
<Button loading disabled>
  Saving Meal...
</Button>

// Custom loading with icon
<Button 
  leftIcon={isLoading ? <Spinner /> : <Plus />}
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add Meal'}
</Button>
```

### Form Integration

```tsx
// Form submit button
<form onSubmit={handleSubmit}>
  <Button type="submit" size="lg" className="w-full">
    Save Meal
  </Button>
</form>

// Form reset
<Button type="reset" variant="outline">
  Clear Form
</Button>
```

### Navigation

```tsx
import { Link } from 'react-router-dom';

// Router Link integration
<Button asChild>
  <Link to="/add-meal">Add New Meal</Link>
</Button>

// External link
<Button asChild variant="link">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    View Restaurant
  </a>
</Button>
```

## Accessibility Features

### Keyboard Navigation
- **Tab:** Focus button
- **Enter/Space:** Activate button
- **Escape:** Remove focus (when appropriate)

### Screen Reader Support
```tsx
// Descriptive labels
<Button aria-label="Add new meal to your food log">
  <Plus className="w-4 h-4" />
</Button>

// State announcements
<Button 
  aria-pressed={isActive}
  aria-describedby="button-help"
>
  Toggle Filter
</Button>
<div id="button-help" className="sr-only">
  Click to toggle meal type filter
</div>
```

### Focus Management
```tsx
// Auto-focus for primary actions
<Button autoFocus>
  Save Changes
</Button>

// Focus trap in modals
<Button 
  ref={firstFocusableElement}
  onKeyDown={handleKeyDown}
>
  Confirm Delete
</Button>
```

## Mobile Considerations

### Touch Targets
All buttons meet 44px minimum touch target requirements:

```tsx
// Mobile-optimized primary button
<Button size="lg" className="min-h-[44px] min-w-[44px]">
  Add Meal
</Button>

// Icon button with proper touch target
<Button 
  variant="ghost" 
  size="icon" 
  className="h-11 w-11" // 44px touch target
  aria-label="Menu"
>
  <Menu className="w-5 h-5" />
</Button>
```

### Responsive Sizing
```tsx
// Responsive button sizing
<Button className="text-sm md:text-base px-4 md:px-6">
  Responsive Button
</Button>

// Mobile-first approach
<Button size="lg" className="w-full sm:w-auto">
  Full width on mobile
</Button>
```

### Touch Feedback
```tsx
// Enhanced touch feedback
<Button 
  className="active:scale-95 transition-transform duration-100"
  onTouchStart={handleTouchStart}
>
  Touch Optimized
</Button>
```

## Styling Customization

### Custom Variants
```tsx
// Extend button variants
const customButtonVariants = cva(
  buttonVariants.base,
  {
    variants: {
      ...buttonVariants.variants,
      variant: {
        ...buttonVariants.variants.variant,
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
      }
    }
  }
);
```

### Theme Integration
```tsx
// Using CSS custom properties
<Button 
  style={{
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))'
  }}
>
  Custom Theme Button
</Button>

// Tailwind classes with theme
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Theme Aware Button
</Button>
```

## Testing Examples

### Unit Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Accessibility Tests
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(
    <Button variant="default" size="lg">
      Accessible Button
    </Button>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Visual Regression Tests
```typescript
import { test, expect } from '@playwright/test';

test('button variants visual test', async ({ page }) => {
  await page.goto('/button-examples');
  
  // Test all variants
  await expect(page.locator('[data-testid="button-variants"]')).toHaveScreenshot();
  
  // Test hover states
  await page.hover('[data-testid="primary-button"]');
  await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot();
});
```

## Performance Considerations

### Bundle Size
- Tree-shakeable exports
- Minimal dependencies (only class-variance-authority and clsx)
- Optimized CSS output

### Runtime Performance
```tsx
// Memoized button for expensive renders
const MemoizedButton = React.memo(Button);

// Optimized event handlers
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

## Common Patterns

### Confirmation Dialogs
```tsx
const [showConfirm, setShowConfirm] = useState(false);

<Button 
  variant="destructive"
  onClick={() => setShowConfirm(true)}
>
  Delete Meal
</Button>

{showConfirm && (
  <Dialog>
    <DialogContent>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this meal?
      </DialogDescription>
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowConfirm(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}
```

### Form Actions
```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
  <Button 
    type="submit" 
    size="lg" 
    className="flex-1 sm:flex-none"
    disabled={!isValid || isSubmitting}
  >
    {isSubmitting ? 'Saving...' : 'Save Meal'}
  </Button>
  
  <Button 
    type="button" 
    variant="outline" 
    onClick={handleCancel}
    className="sm:w-auto"
  >
    Cancel
  </Button>
</div>
```

### Loading States
```tsx
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await performAction();
  } finally {
    setIsLoading(false);
  }
};

<Button 
  onClick={handleAction}
  disabled={isLoading}
  leftIcon={isLoading ? <Spinner /> : <Plus />}
>
  {isLoading ? 'Adding Meal...' : 'Add Meal'}
</Button>
```

The Button component provides a solid foundation for all interactive elements in FoodyLog, ensuring consistency, accessibility, and optimal user experience across all devices and interaction methods.