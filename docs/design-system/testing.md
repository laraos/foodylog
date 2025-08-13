# Testing Guide

Comprehensive testing strategies and tools for the FoodyLog design system. Ensures reliability, accessibility, and performance across all components and patterns.

## Testing Philosophy

### Test Pyramid

```
                    /\
                   /  \
                  /    \
                 / E2E  \
                /________\
               /          \
              /Integration \
             /______________\
            /                \
           /      Unit        \
          /____________________\
```

- **Unit Tests (70%):** Component behavior, props, and logic
- **Integration Tests (20%):** Component interactions and workflows
- **E2E Tests (10%):** Complete user journeys and critical paths

### Testing Principles

1. **Accessibility First:** Every component tested for WCAG compliance
2. **Mobile-First:** Touch interactions and responsive behavior
3. **Performance Aware:** Bundle size and runtime performance
4. **User-Centric:** Test user workflows, not implementation details
5. **Visual Consistency:** Prevent visual regressions

## Testing Stack

### Core Testing Tools

```json
{
  "dependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "vitest": "^1.0.0",
    "jsdom": "^23.0.0",
    "playwright": "^1.40.0",
    "axe-core": "^4.8.0",
    "@axe-core/playwright": "^4.8.0"
  }
}
```

### Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Capacitor for mobile testing
global.Capacitor = {
  isNativePlatform: () => false,
  getPlatform: () => 'web',
};
```

## Unit Testing

### Component Testing Template

```typescript
// src/components/ui/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  const user = userEvent.setup();

  describe('Rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders all variants correctly', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`button--${variant}`);
        unmount();
      });
    });

    it('renders all sizes correctly', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'] as const;
      
      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`button--${size}`);
        unmount();
      });
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard activation', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('does not trigger when disabled', async () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('shows loading state correctly', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Icons', () => {
    it('renders left icon correctly', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>
          With Icon
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon correctly', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          With Icon
        </Button>
      );
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', () => {
      render(
        <Button 
          aria-label="Custom label"
          aria-describedby="button-help"
        >
          Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'button-help');
    });

    it('has visible focus indicator', async () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');
      
      await user.tab();
      expect(button).toHaveFocus();
      expect(button).toHaveClass('focus-visible');
    });
  });

  describe('Touch Targets', () => {
    it('meets minimum touch target size', () => {
      render(<Button>Touch Target</Button>);
      const button = screen.getByRole('button');
      
      const styles = getComputedStyle(button);
      const minHeight = parseInt(styles.minHeight);
      const minWidth = parseInt(styles.minWidth);
      
      expect(minHeight).toBeGreaterThanOrEqual(44);
      expect(minWidth).toBeGreaterThanOrEqual(44);
    });
  });
});
```

### Form Component Testing

```typescript
// src/components/ui/__tests__/input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, FormField } from '../input';

describe('Input', () => {
  const user = userEvent.setup();

  describe('Basic Functionality', () => {
    it('accepts text input', async () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      
      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('handles controlled input', async () => {
      const handleChange = vi.fn();
      render(<Input value="controlled" onChange={handleChange} />);
      
      const input = screen.getByDisplayValue('controlled');
      await user.type(input, 'x');
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Validation States', () => {
    it('shows error state correctly', () => {
      render(<Input error="This field is required" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('shows success state correctly', () => {
      render(<Input success />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(screen.getByLabelText(/valid/i)).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Input icon={<span data-testid="search-icon">🔍</span>} />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Input rightIcon={<span data-testid="clear-icon">✕</span>} />);
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
    });
  });
});

describe('FormField', () => {
  it('associates label with input', () => {
    render(
      <FormField label="Email Address" required>
        <Input type="email" />
      </FormField>
    );
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email Address');
    
    expect(input).toHaveAccessibleName('Email Address');
    expect(label).toHaveTextContent('*'); // Required indicator
  });

  it('shows error message', () => {
    render(
      <FormField label="Email" error="Invalid email format">
        <Input type="email" />
      </FormField>
    );
    
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('Invalid email format');
    
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(errorMessage.id));
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });
});
```

### FoodyLog Component Testing

```typescript
// src/components/meal/__tests__/meal-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MealCard } from '../meal-card';
import { mockMeal } from '../../test/fixtures';

describe('MealCard', () => {
  const user = userEvent.setup();

  const defaultProps = {
    meal: mockMeal,
    onTap: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('displays meal information correctly', () => {
      render(<MealCard {...defaultProps} />);
      
      expect(screen.getByText(mockMeal.title)).toBeInTheDocument();
      expect(screen.getByText(`★ ${mockMeal.rating}`)).toBeInTheDocument();
      expect(screen.getByAltText(mockMeal.title)).toBeInTheDocument();
    });

    it('shows price when enabled', () => {
      render(<MealCard {...defaultProps} showPrice />);
      expect(screen.getByText('$12.99')).toBeInTheDocument();
    });

    it('hides price when disabled', () => {
      render(<MealCard {...defaultProps} showPrice={false} />);
      expect(screen.queryByText('$12.99')).not.toBeInTheDocument();
    });

    it('renders in compact mode', () => {
      render(<MealCard {...defaultProps} compact />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveClass('compact');
    });
  });

  describe('Interactions', () => {
    it('calls onTap when clicked', async () => {
      render(<MealCard {...defaultProps} />);
      
      await user.click(screen.getByRole('button'));
      expect(defaultProps.onTap).toHaveBeenCalledWith(mockMeal.id);
    });

    it('calls onTap when Enter is pressed', async () => {
      render(<MealCard {...defaultProps} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      
      expect(defaultProps.onTap).toHaveBeenCalledWith(mockMeal.id);
    });

    it('calls onTap when Space is pressed', async () => {
      render(<MealCard {...defaultProps} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');
      
      expect(defaultProps.onTap).toHaveBeenCalledWith(mockMeal.id);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label', () => {
      render(<MealCard {...defaultProps} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute(
        'aria-label',
        `View meal: ${mockMeal.title}, rated ${mockMeal.rating} out of 10`
      );
    });

    it('has proper semantic structure', () => {
      render(<MealCard {...defaultProps} />);
      
      // Should have heading for meal title
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockMeal.title);
      
      // Should have proper image alt text
      expect(screen.getByAltText(mockMeal.title)).toBeInTheDocument();
    });
  });

  describe('Rating Colors', () => {
    it('applies correct color for excellent rating', () => {
      const excellentMeal = { ...mockMeal, rating: 9 };
      render(<MealCard meal={excellentMeal} />);
      
      const rating = screen.getByText('★ 9');
      expect(rating).toHaveClass('text-rating-excellent');
    });

    it('applies correct color for poor rating', () => {
      const poorMeal = { ...mockMeal, rating: 3 };
      render(<MealCard meal={poorMeal} />);
      
      const rating = screen.getByText('★ 3');
      expect(rating).toHaveClass('text-rating-poor');
    });
  });
});
```

## Integration Testing

### Component Integration

```typescript
// src/components/__tests__/meal-form-integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MealForm } from '../meal/meal-form';
import { PhotoCapture } from '../meal/photo-capture';
import { RatingInput } from '../meal/rating-input';

describe('Meal Form Integration', () => {
  const user = userEvent.setup();

  it('completes full meal creation flow', async () => {
    const handleSubmit = vi.fn();
    
    render(<MealForm onSubmit={handleSubmit} />);
    
    // Fill in meal title
    const titleInput = screen.getByLabelText(/meal title/i);
    await user.type(titleInput, 'Delicious Pizza');
    
    // Set rating
    const ratingButtons = screen.getAllByRole('button', { name: /rate/i });
    await user.click(ratingButtons[7]); // Rating of 8
    
    // Select meal type
    const mealTypeSelect = screen.getByLabelText(/meal type/i);
    await user.selectOptions(mealTypeSelect, 'dinner');
    
    // Add location
    const locationInput = screen.getByLabelText(/location/i);
    await user.type(locationInput, "Tony's Pizzeria");
    
    // Add price
    const priceInput = screen.getByLabelText(/price/i);
    await user.type(priceInput, '15.99');
    
    // Add tags
    const tagInput = screen.getByLabelText(/tags/i);
    await user.type(tagInput, 'italian,pizza{enter}');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /save meal/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        title: 'Delicious Pizza',
        rating: 8,
        mealType: 'dinner',
        locationText: "Tony's Pizzeria",
        price: 15.99,
        tags: ['italian', 'pizza'],
        dateEaten: expect.any(Number),
        photos: [],
      });
    });
  });

  it('shows validation errors for incomplete form', async () => {
    render(<MealForm onSubmit={vi.fn()} />);
    
    // Try to submit without required fields
    const submitButton = screen.getByRole('button', { name: /save meal/i });
    await user.click(submitButton);
    
    // Should show validation errors
    expect(screen.getByText(/meal title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/rating is required/i)).toBeInTheDocument();
  });
});
```

### Navigation Integration

```typescript
// src/components/layout/__tests__/navigation-integration.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Navigation } from '../navigation';

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navigation Integration', () => {
  const user = userEvent.setup();

  it('navigates between pages correctly', async () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    );
    
    // Check initial state
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
    
    // Navigate to search
    const searchLink = screen.getByRole('link', { name: /search/i });
    await user.click(searchLink);
    
    // Should update active state
    expect(searchLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).not.toHaveAttribute('aria-current');
  });

  it('supports keyboard navigation', async () => {
    render(
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    );
    
    // Tab through navigation items
    await user.tab();
    expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('link', { name: /search/i })).toHaveFocus();
    
    // Arrow key navigation
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('link', { name: /add meal/i })).toHaveFocus();
  });
});
```

## Visual Regression Testing

### Playwright Visual Testing

```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  test('button variants', async ({ page }) => {
    await page.goto('/storybook/button');
    
    // Test all button variants
    await expect(page.locator('[data-testid="button-variants"]')).toHaveScreenshot('button-variants.png');
    
    // Test hover states
    await page.hover('[data-testid="primary-button"]');
    await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot('button-hover.png');
    
    // Test focus states
    await page.keyboard('Tab');
    await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot('button-focus.png');
  });

  test('meal card layouts', async ({ page }) => {
    await page.goto('/storybook/meal-card');
    
    // Test different meal card variants
    await expect(page.locator('[data-testid="meal-card-default"]')).toHaveScreenshot('meal-card-default.png');
    await expect(page.locator('[data-testid="meal-card-compact"]')).toHaveScreenshot('meal-card-compact.png');
  });

  test('dark mode consistency', async ({ page }) => {
    await page.goto('/storybook/theme-showcase');
    
    // Test light mode
    await expect(page.locator('[data-testid="theme-showcase"]')).toHaveScreenshot('theme-light.png');
    
    // Switch to dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(200); // Wait for theme transition
    
    // Test dark mode
    await expect(page.locator('[data-testid="theme-showcase"]')).toHaveScreenshot('theme-dark.png');
  });

  test('responsive layouts', async ({ page }) => {
    await page.goto('/storybook/responsive-layout');
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="responsive-layout"]')).toHaveScreenshot('layout-mobile.png');
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="responsive-layout"]')).toHaveScreenshot('layout-tablet.png');
    
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('[data-testid="responsive-layout"]')).toHaveScreenshot('layout-desktop.png');
  });
});
```

### Cross-Browser Testing

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Accessibility Testing

### Automated Accessibility Testing

```typescript
// src/test/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button, Card, Input, Badge } from '../components/ui';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Button component should be accessible', async () => {
    const { container } = render(
      <div>
        <Button>Default Button</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Cancel</Button>
        <Button size="icon" aria-label="Settings">
          ⚙️
        </Button>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Form components should be accessible', async () => {
    const { container } = render(
      <form>
        <label htmlFor="email">Email Address</label>
        <Input 
          id="email" 
          type="email" 
          required 
          aria-describedby="email-help"
        />
        <div id="email-help">Enter your email address</div>
        
        <fieldset>
          <legend>Rating</legend>
          <input type="radio" id="rating-1" name="rating" value="1" />
          <label htmlFor="rating-1">1 star</label>
          <input type="radio" id="rating-2" name="rating" value="2" />
          <label htmlFor="rating-2">2 stars</label>
        </fieldset>
        
        <Button type="submit">Submit</Button>
      </form>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Complex layouts should be accessible', async () => {
    const { container } = render(
      <main>
        <header>
          <h1>FoodyLog</h1>
          <nav aria-label="Main navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search</a></li>
              <li><a href="/add">Add Meal</a></li>
            </ul>
          </nav>
        </header>
        
        <section aria-labelledby="recent-meals">
          <h2 id="recent-meals">Recent Meals</h2>
          <Card>
            <h3>Pizza Night</h3>
            <p>Delicious homemade pizza</p>
            <Badge>Italian</Badge>
          </Card>
        </section>
      </main>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Testing

```typescript
// src/test/manual-accessibility.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MealCard } from '../components/meal/meal-card';

describe('Manual Accessibility Tests', () => {
  const user = userEvent.setup();

  it('supports keyboard navigation', async () => {
    render(
      <div>
        <MealCard meal={mockMeal} />
        <MealCard meal={mockMeal2} />
        <MealCard meal={mockMeal3} />
      </div>
    );
    
    // Tab through meal cards
    await user.tab();
    expect(screen.getAllByRole('button')[0]).toHaveFocus();
    
    await user.tab();
    expect(screen.getAllByRole('button')[1]).toHaveFocus();
    
    // Arrow key navigation
    await user.keyboard('{ArrowDown}');
    expect(screen.getAllByRole('button')[2]).toHaveFocus();
    
    await user.keyboard('{ArrowUp}');
    expect(screen.getAllByRole('button')[1]).toHaveFocus();
  });

  it('announces dynamic content changes', async () => {
    const { rerender } = render(
      <div>
        <div role="status" aria-live="polite" data-testid="announcements" />
        <MealCard meal={mockMeal} />
      </div>
    );
    
    // Simulate meal update
    const updatedMeal = { ...mockMeal, rating: 9 };
    rerender(
      <div>
        <div role="status" aria-live="polite" data-testid="announcements">
          Meal rating updated to 9 stars
        </div>
        <MealCard meal={updatedMeal} />
      </div>
    );
    
    expect(screen.getByTestId('announcements')).toHaveTextContent(
      'Meal rating updated to 9 stars'
    );
  });
});
```

## Performance Testing

### Bundle Size Testing

```typescript
// scripts/test-bundle-size.ts
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { gzipSync } from 'zlib';

const MAX_BUNDLE_SIZE = 250 * 1024; // 250KB
const MAX_GZIP_SIZE = 80 * 1024;   // 80KB

describe('Bundle Size Tests', () => {
  it('should not exceed maximum bundle size', () => {
    execSync('npm run build', { stdio: 'inherit' });
    
    const bundleContent = readFileSync('dist/assets/index.js');
    const gzippedSize = gzipSync(bundleContent).length;
    
    expect(bundleContent.length).toBeLessThan(MAX_BUNDLE_SIZE);
    expect(gzippedSize).toBeLessThan(MAX_GZIP_SIZE);
  });

  it('should tree-shake unused components', () => {
    // Test that importing only Button doesn't include Card code
    const testCode = `
      import { Button } from './src/components/ui';
      console.log(Button);
    `;
    
    // Build with only Button import
    // Verify Card-specific code is not included
    // This would require a more sophisticated build analysis
  });
});
```

### Runtime Performance Testing

```typescript
// src/test/performance.test.tsx
import { render, screen } from '@testing-library/react';
import { performance } from 'perf_hooks';
import { MealCard } from '../components/meal/meal-card';

describe('Performance Tests', () => {
  it('renders large lists efficiently', () => {
    const meals = Array.from({ length: 1000 }, (_, i) => ({
      ...mockMeal,
      id: `meal-${i}`,
      title: `Meal ${i}`,
    }));
    
    const startTime = performance.now();
    
    render(
      <div>
        {meals.map(meal => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render 1000 meal cards in under 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('handles rapid state updates efficiently', async () => {
    const { rerender } = render(<MealCard meal={mockMeal} />);
    
    const startTime = performance.now();
    
    // Simulate 100 rapid updates
    for (let i = 0; i < 100; i++) {
      rerender(<MealCard meal={{ ...mockMeal, rating: i % 10 + 1 }} />);
    }
    
    const endTime = performance.now();
    const updateTime = endTime - startTime;
    
    // Should handle 100 updates in under 50ms
    expect(updateTime).toBeLessThan(50);
  });
});
```

## Test Utilities and Fixtures

### Test Fixtures

```typescript
// src/test/fixtures.ts
import { Meal } from '../types/design-system';

export const mockMeal: Meal = {
  id: 'meal-1',
  title: 'Delicious Margherita Pizza',
  rating: 8,
  dateEaten: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
  mealType: 'dinner',
  locationText: "Tony's Pizzeria",
  tags: ['italian', 'pizza', 'cheese'],
  primaryPhoto: 'https://example.com/pizza.jpg',
  price: 12.99,
  notes: 'Perfect crispy crust with fresh basil',
  isPublic: false,
  userId: 'user-1',
  createdAt: Date.now() - 2 * 60 * 60 * 1000,
  updatedAt: Date.now() - 2 * 60 * 60 * 1000,
};

export const mockMeals: Meal[] = [
  mockMeal,
  {
    ...mockMeal,
    id: 'meal-2',
    title: 'Breakfast Burrito',
    rating: 7,
    mealType: 'breakfast',
    tags: ['mexican', 'eggs', 'spicy'],
    price: 8.50,
  },
  {
    ...mockMeal,
    id: 'meal-3',
    title: 'Caesar Salad',
    rating: 6,
    mealType: 'lunch',
    tags: ['salad', 'healthy', 'light'],
    price: 11.00,
  },
];
```

### Custom Render Utilities

```typescript
// src/test/utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  theme?: 'light' | 'dark';
}

const AllTheProviders = ({ 
  children, 
  initialRoute = '/',
  theme = 'light' 
}: {
  children: React.ReactNode;
  initialRoute?: string;
  theme?: 'light' | 'dark';
}) => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { initialRoute, theme, ...renderOptions } = options;
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialRoute={initialRoute} theme={theme}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - name: Install dependencies
        run: bun install
        
      - name: Run unit tests
        run: bun run test --coverage
        
      - name: Run accessibility tests
        run: bun run test:a11y
        
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          
  e2e:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Install Playwright
        run: bunx playwright install --with-deps
        
      - name: Run E2E tests
        run: bun run test:e2e
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

This comprehensive testing guide ensures the FoodyLog design system maintains high quality, accessibility, and performance standards across all components and user interactions.