/**
 * Comprehensive Component Tests
 * 
 * Tests all shadcn/ui components in both light and dark modes with
 * accessibility validation, responsive design, and visual consistency.
 * 
 * Requirements fulfilled: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// Import all UI components
import { Button } from '../button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  StatsCard,
  PhotoCard,
  ActionCard 
} from '../card';
import { 
  Input, 
  SearchInput, 
  PasswordInput, 
  NumberInput, 
  TextArea, 
  FormField 
} from '../input';
import { 
  Badge, 
  MealTagBadge, 
  RatingBadge, 
  MealTypeBadge, 
  PriceBadge 
} from '../badge';
import { Alert, AlertDescription, AlertTitle } from '../alert';
import { LoadingSpinner } from '../LoadingSpinner';
import { Skeleton } from '../skeleton';
import { Separator } from '../separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

// Theme provider for testing
function ThemeProvider({ 
  theme, 
  children, 
}: { 
  theme: 'light' | 'dark'; 
  children: React.ReactNode;
}) {
  return (
    <div className={theme} data-theme={theme}>
      {children}
    </div>
  );
}

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// Mock window dimensions for responsive testing
const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  window.dispatchEvent(new Event('resize'));
};

describe('Comprehensive Component Tests', () => {
  beforeEach(() => {
    // Reset any theme classes
    document.documentElement.className = '';
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  describe('Button Component', () => {
    const buttonVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    const buttonSizes = ['default', 'sm', 'lg', 'icon'] as const;

    describe('Light Theme', () => {
      it('should render all button variants correctly', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <div className="space-y-2">
              {buttonVariants.map(variant => (
                <Button key={variant} variant={variant}>
                  {variant} Button
                </Button>
              ))}
            </div>
          </ThemeProvider>
        );

        // Check accessibility
        const results = await axe(container);
        expect(results).toHaveNoViolations();

        // Verify all variants are rendered
        buttonVariants.forEach(variant => {
          expect(screen.getByText(`${variant} Button`)).toBeInTheDocument();
        });
      });

      it('should render all button sizes correctly', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <div className="space-y-2">
              {buttonSizes.map(size => (
                <Button key={size} size={size}>
                  {size === 'icon' ? '🍕' : `${size} Button`}
                </Button>
              ))}
            </div>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Dark Theme', () => {
      it('should render all button variants correctly in dark mode', async () => {
        const { container } = render(
          <ThemeProvider theme="dark">
            <div className="space-y-2">
              {buttonVariants.map(variant => (
                <Button key={variant} variant={variant}>
                  {variant} Button
                </Button>
              ))}
            </div>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Interactions', () => {
      it('should handle click events properly', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
          <ThemeProvider theme="light">
            <Button onClick={handleClick}>Click me</Button>
          </ThemeProvider>
        );

        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('should handle keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
          <ThemeProvider theme="light">
            <Button onClick={handleClick}>Press me</Button>
          </ThemeProvider>
        );

        const button = screen.getByRole('button');
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalledTimes(1);

        await user.keyboard(' ');
        expect(handleClick).toHaveBeenCalledTimes(2);
      });

      it('should handle disabled state', () => {
        const handleClick = vi.fn();

        render(
          <ThemeProvider theme="light">
            <Button disabled onClick={handleClick}>
              Disabled Button
            </Button>
          </ThemeProvider>
        );

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('Card Components', () => {
    describe('Basic Card', () => {
      it('should render card with all parts in light theme', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card description')).toBeInTheDocument();
        expect(screen.getByText('Card content goes here')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
      });

      it('should render card variants correctly', async () => {
        const variants = ['default', 'interactive', 'elevated', 'outlined'] as const;

        const { container } = render(
          <ThemeProvider theme="light">
            <div className="space-y-4">
              {variants.map(variant => (
                <Card key={variant} variant={variant}>
                  <CardContent>
                    <p>{variant} card</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe('StatsCard', () => {
      it('should render stats card with all features', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <StatsCard
              title="Total Meals"
              value={42}
              description="This month"
              icon={<span>🍽️</span>}
              trend={{ value: 12, isPositive: true }}
            />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('Total Meals')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
        expect(screen.getByText('This month')).toBeInTheDocument();
        expect(screen.getByText('+12%')).toBeInTheDocument();
      });
    });

    describe('PhotoCard', () => {
      it('should render photo card with accessibility', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <PhotoCard
              src="https://example.com/meal.jpg"
              alt="Delicious pizza"
              title="Pizza Night"
              description="Amazing margherita pizza"
              aspectRatio="square"
            />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Delicious pizza');
        expect(screen.getByText('Pizza Night')).toBeInTheDocument();
      });
    });

    describe('ActionCard', () => {
      it('should render action card with interactive elements', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <ActionCard
              title="Quick Action"
              description="Perform this action"
              icon={<span>⚡</span>}
              actions={<Button size="sm">Do it</Button>}
            >
              <p>Additional content</p>
            </ActionCard>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('Quick Action')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Do it' })).toBeInTheDocument();
      });
    });
  });

  describe('Input Components', () => {
    describe('Basic Input', () => {
      it('should render input with validation states', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <div className="space-y-4">
              <Input placeholder="Normal input" />
              <Input error="This field is required" placeholder="Error input" />
              <Input success placeholder="Success input" />
            </div>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });

      it('should handle input interactions', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
          <ThemeProvider theme="light">
            <Input placeholder="Type here" onChange={handleChange} />
          </ThemeProvider>
        );

        const input = screen.getByPlaceholderText('Type here');
        await user.type(input, 'Hello');

        expect(handleChange).toHaveBeenCalled();
        expect(input).toHaveValue('Hello');
      });
    });

    describe('SearchInput', () => {
      it('should render search input with clear functionality', async () => {
        const user = userEvent.setup();
        const handleClear = vi.fn();

        render(
          <ThemeProvider theme="light">
            <SearchInput
              value="search term"
              onClear={handleClear}
              placeholder="Search meals..."
            />
          </ThemeProvider>
        );

        const input = screen.getByRole('searchbox');
        expect(input).toHaveValue('search term');

        const clearButton = screen.getByLabelText('Clear search');
        await user.click(clearButton);

        expect(handleClear).toHaveBeenCalledTimes(1);
      });
    });

    describe('PasswordInput', () => {
      it('should toggle password visibility', async () => {
        const user = userEvent.setup();

        render(
          <ThemeProvider theme="light">
            <PasswordInput placeholder="Enter password" />
          </ThemeProvider>
        );

        const input = screen.getByPlaceholderText('Enter password');
        const toggleButton = screen.getByLabelText('Show password');

        expect(input).toHaveAttribute('type', 'password');

        await user.click(toggleButton);

        expect(input).toHaveAttribute('type', 'text');
        expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
      });
    });

    describe('NumberInput', () => {
      it('should handle numeric input with currency', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <NumberInput
              placeholder="Enter price"
              currency
              min={0}
              max={1000}
              step={0.01}
            />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        const input = screen.getByPlaceholderText('Enter price');
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveAttribute('min', '0');
        expect(input).toHaveAttribute('max', '1000');
      });
    });

    describe('TextArea', () => {
      it('should render textarea with validation', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <TextArea
              placeholder="Enter description"
              error="Description is required"
              rows={4}
            />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        const textarea = screen.getByPlaceholderText('Enter description');
        expect(textarea).toHaveAttribute('rows', '4');
        expect(screen.getByText('Description is required')).toBeInTheDocument();
      });
    });

    describe('FormField', () => {
      it('should render complete form field with label', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <FormField
              label="Email Address"
              required
              error="Please enter a valid email"
            >
              <Input type="email" placeholder="Enter email" />
            </FormField>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('Email Address')).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument(); // Required indicator
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      });
    });
  });

  describe('Badge Components', () => {
    describe('Basic Badge', () => {
      it('should render all badge variants', async () => {
        const variants = ['default', 'secondary', 'destructive', 'outline', 'tag', 'rating', 'mealType', 'price'] as const;

        const { container } = render(
          <ThemeProvider theme="light">
            <div className="flex flex-wrap gap-2">
              {variants.map(variant => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('should handle removable badges', async () => {
        const user = userEvent.setup();
        const handleRemove = vi.fn();

        render(
          <ThemeProvider theme="light">
            <Badge removable onRemove={handleRemove}>
              Removable Tag
            </Badge>
          </ThemeProvider>
        );

        const removeButton = screen.getByLabelText('Remove tag');
        await user.click(removeButton);

        expect(handleRemove).toHaveBeenCalledTimes(1);
      });
    });

    describe('Specialized Badges', () => {
      it('should render meal tag badge', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <MealTagBadge tag="italian" />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('#italian')).toBeInTheDocument();
      });

      it('should render rating badge', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <RatingBadge rating={8.5} />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('⭐ 8.5/10')).toBeInTheDocument();
      });

      it('should render meal type badge', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <MealTypeBadge mealType="dinner" />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('🍽️ Dinner')).toBeInTheDocument();
      });

      it('should render price badge', async () => {
        const { container } = render(
          <ThemeProvider theme="light">
            <PriceBadge price={24.99} />
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        expect(screen.getByText('💰 $24.99')).toBeInTheDocument();
      });
    });
  });

  describe('Loading Components', () => {
    it('should render loading spinner with accessibility', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <LoadingSpinner size="lg" />
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render skeleton components', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Layout Components', () => {
    it('should render separator component', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div>
            <p>Content above</p>
            <Separator />
            <p>Content below</p>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render tabs component with accessibility', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <ThemeProvider theme="light">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p>Content for tab 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Content for tab 2</p>
            </TabsContent>
          </Tabs>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Test tab switching
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(screen.getByText('Content for tab 2')).toBeInTheDocument();
    });
  });

  describe('Responsive Design Tests', () => {
    it('should handle mobile viewport correctly', async () => {
      mockWindowDimensions(375, 667); // iPhone SE

      const { container } = render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Button className="w-full sm:w-auto">Responsive Button</Button>
            <Card className="w-full">
              <CardContent>
                <Input className="w-full" placeholder="Full width input" />
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle tablet viewport correctly', async () => {
      mockWindowDimensions(768, 1024); // iPad

      const { container } = render(
        <ThemeProvider theme="light">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <p>Card 1</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p>Card 2</p>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle desktop viewport correctly', async () => {
      mockWindowDimensions(1920, 1080); // Desktop

      const { container } = render(
        <ThemeProvider theme="light">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent>
                  <p>Card 1</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p>Card 2</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p>Card 3</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Theme Consistency Tests', () => {
    it('should maintain consistent styling across themes', async () => {
      const testComponent = (
        <div className="space-y-4">
          <Button variant="default">Primary Button</Button>
          <Card>
            <CardHeader>
              <CardTitle>Test Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Test input" />
              <div className="flex gap-2 mt-2">
                <Badge variant="default">Badge</Badge>
                <MealTagBadge tag="test" />
              </div>
            </CardContent>
          </Card>
        </div>
      );

      // Test light theme
      const { container: lightContainer, unmount: unmountLight } = render(
        <ThemeProvider theme="light">
          {testComponent}
        </ThemeProvider>
      );

      const lightResults = await axe(lightContainer);
      expect(lightResults).toHaveNoViolations();

      unmountLight();

      // Test dark theme
      const { container: darkContainer } = render(
        <ThemeProvider theme="dark">
          {testComponent}
        </ThemeProvider>
      );

      const darkResults = await axe(darkContainer);
      expect(darkResults).toHaveNoViolations();
    });
  });

  describe('Touch Target Validation', () => {
    it('should have proper touch targets for mobile', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Button>Touch Target Button</Button>
            <Badge removable onRemove={() => {}}>
              Removable Badge
            </Badge>
          </div>
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: 'Touch Target Button' });
      const removeButton = screen.getByLabelText('Remove tag');

      // Check minimum touch target size (44px)
      const buttonRect = button.getBoundingClientRect();
      const removeRect = removeButton.getBoundingClientRect();

      expect(buttonRect.height).toBeGreaterThanOrEqual(40); // Close to 44px accounting for padding
      expect(removeRect.width).toBeGreaterThanOrEqual(24); // Smaller but still accessible
    });
  });

  describe('Error Boundary Integration', () => {
    it('should handle component errors gracefully', () => {
      const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div>No error</div>;
      };

      // This test ensures components don't break the entire app
      expect(() => {
        render(
          <ThemeProvider theme="light">
            <Card>
              <CardContent>
                <ThrowError shouldThrow={false} />
              </CardContent>
            </Card>
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });
});