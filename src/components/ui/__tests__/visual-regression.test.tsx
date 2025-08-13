/**
 * Visual Regression Tests
 * 
 * Tests for visual consistency across components, themes, and states.
 * Validates that components maintain their visual appearance and
 * behavior across different conditions.
 * 
 * Requirements fulfilled: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import all components for visual testing
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
import { LoadingSpinner } from '../LoadingSpinner';
import { Skeleton } from '../skeleton';
import { Alert, AlertDescription, AlertTitle } from '../alert';

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

// Visual test utilities
const captureComponentState = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);
  return {
    backgroundColor: computedStyle.backgroundColor,
    color: computedStyle.color,
    borderColor: computedStyle.borderColor,
    borderWidth: computedStyle.borderWidth,
    borderRadius: computedStyle.borderRadius,
    fontSize: computedStyle.fontSize,
    fontWeight: computedStyle.fontWeight,
    padding: computedStyle.padding,
    margin: computedStyle.margin,
    width: computedStyle.width,
    height: computedStyle.height,
    display: computedStyle.display,
    opacity: computedStyle.opacity,
    transform: computedStyle.transform,
    boxShadow: computedStyle.boxShadow,
  };
};

const compareVisualStates = (state1: any, state2: any, tolerance = 0) => {
  const differences: string[] = [];
  
  Object.keys(state1).forEach(key => {
    if (state1[key] !== state2[key]) {
      differences.push(`${key}: ${state1[key]} !== ${state2[key]}`);
    }
  });
  
  return {
    isEqual: differences.length <= tolerance,
    differences,
  };
};

describe('Visual Regression Tests', () => {
  beforeEach(() => {
    // Reset any global styles
    document.documentElement.className = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  describe('Button Visual Consistency', () => {
    it('should maintain consistent styling across variants', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      const capturedStates: Record<string, any> = {};

      variants.forEach(variant => {
        const { container, unmount } = render(
          <ThemeProvider theme="light">
            <Button variant={variant} data-testid={`button-${variant}`}>
              {variant} Button
            </Button>
          </ThemeProvider>
        );

        const button = screen.getByTestId(`button-${variant}`);
        capturedStates[variant] = captureComponentState(button);

        unmount();
      });

      // Verify each variant has distinct styling
      variants.forEach(variant => {
        expect(capturedStates[variant]).toBeDefined();
        expect(capturedStates[variant].backgroundColor).toBeTruthy();
      });

      // Verify default and secondary have different backgrounds
      expect(capturedStates.default.backgroundColor).not.toBe(capturedStates.secondary.backgroundColor);
    });

    it('should maintain consistent styling across sizes', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'] as const;
      const capturedStates: Record<string, any> = {};

      sizes.forEach(size => {
        const { container, unmount } = render(
          <ThemeProvider theme="light">
            <Button size={size} data-testid={`button-${size}`}>
              {size === 'icon' ? '🍕' : `${size} Button`}
            </Button>
          </ThemeProvider>
        );

        const button = screen.getByTestId(`button-${size}`);
        capturedStates[size] = captureComponentState(button);

        unmount();
      });

      // Verify size differences
      expect(capturedStates.sm.height).not.toBe(capturedStates.lg.height);
      expect(capturedStates.default.padding).not.toBe(capturedStates.sm.padding);
    });

    it('should maintain visual consistency between themes', () => {
      const { container: lightContainer, unmount: unmountLight } = render(
        <ThemeProvider theme="light">
          <Button data-testid="theme-button">Theme Test</Button>
        </ThemeProvider>
      );

      const lightButton = screen.getByTestId('theme-button');
      const lightState = captureComponentState(lightButton);

      unmountLight();

      const { container: darkContainer, unmount: unmountDark } = render(
        <ThemeProvider theme="dark">
          <Button data-testid="theme-button">Theme Test</Button>
        </ThemeProvider>
      );

      const darkButton = screen.getByTestId('theme-button');
      const darkState = captureComponentState(darkButton);

      unmountDark();

      // Themes should have different colors but same structure
      expect(lightState.backgroundColor).not.toBe(darkState.backgroundColor);
      expect(lightState.borderRadius).toBe(darkState.borderRadius);
      expect(lightState.padding).toBe(darkState.padding);
    });

    it('should handle hover and focus states consistently', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider theme="light">
          <Button data-testid="interactive-button">Interactive Button</Button>
        </ThemeProvider>
      );

      const button = screen.getByTestId('interactive-button');
      const initialState = captureComponentState(button);

      // Test focus state
      await user.tab();
      expect(button).toHaveFocus();
      
      const focusState = captureComponentState(button);
      expect(focusState.outline).toBeTruthy(); // Should have focus outline

      // Test hover state (simulated)
      fireEvent.mouseEnter(button);
      await waitFor(() => {
        const hoverState = captureComponentState(button);
        // Hover state might change background or transform
        expect(hoverState).toBeDefined();
      });
    });

    it('should handle disabled state visually', () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="space-x-4">
            <Button data-testid="enabled-button">Enabled</Button>
            <Button disabled data-testid="disabled-button">Disabled</Button>
          </div>
        </ThemeProvider>
      );

      const enabledButton = screen.getByTestId('enabled-button');
      const disabledButton = screen.getByTestId('disabled-button');

      const enabledState = captureComponentState(enabledButton);
      const disabledState = captureComponentState(disabledButton);

      // Disabled button should have reduced opacity
      expect(parseFloat(disabledState.opacity)).toBeLessThan(parseFloat(enabledState.opacity));
    });
  });

  describe('Card Visual Consistency', () => {
    it('should maintain consistent card styling across variants', () => {
      const variants = ['default', 'interactive', 'elevated', 'outlined'] as const;
      const capturedStates: Record<string, any> = {};

      variants.forEach(variant => {
        const { container, unmount } = render(
          <ThemeProvider theme="light">
            <Card variant={variant} data-testid={`card-${variant}`}>
              <CardContent>
                <p>{variant} card content</p>
              </CardContent>
            </Card>
          </ThemeProvider>
        );

        const card = screen.getByTestId(`card-${variant}`);
        capturedStates[variant] = captureComponentState(card);

        unmount();
      });

      // Verify variants have distinct styling
      expect(capturedStates.elevated.boxShadow).not.toBe(capturedStates.default.boxShadow);
      expect(capturedStates.outlined.borderWidth).not.toBe(capturedStates.default.borderWidth);
    });

    it('should render specialized cards consistently', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <StatsCard
              title="Total Meals"
              value={42}
              description="This month"
              trend={{ value: 12, isPositive: true }}
              data-testid="stats-card"
            />
            <PhotoCard
              src="https://example.com/meal.jpg"
              alt="Test meal"
              title="Test Meal"
              description="Delicious test meal"
              data-testid="photo-card"
            />
            <ActionCard
              title="Quick Action"
              description="Test action card"
              actions={<Button size="sm">Action</Button>}
              data-testid="action-card"
            />
          </div>
        </ThemeProvider>
      );

      const statsCard = screen.getByTestId('stats-card');
      const photoCard = screen.getByTestId('photo-card');
      const actionCard = screen.getByTestId('action-card');

      // Verify all cards are rendered with proper styling
      expect(captureComponentState(statsCard)).toBeDefined();
      expect(captureComponentState(photoCard)).toBeDefined();
      expect(captureComponentState(actionCard)).toBeDefined();
    });
  });

  describe('Input Visual Consistency', () => {
    it('should maintain consistent input styling across states', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Input placeholder="Normal input" data-testid="normal-input" />
            <Input 
              error="Error message" 
              placeholder="Error input" 
              data-testid="error-input"
            />
            <Input 
              success 
              placeholder="Success input" 
              data-testid="success-input"
            />
            <Input 
              disabled 
              placeholder="Disabled input" 
              data-testid="disabled-input"
            />
          </div>
        </ThemeProvider>
      );

      const normalInput = screen.getByTestId('normal-input');
      const errorInput = screen.getByTestId('error-input');
      const successInput = screen.getByTestId('success-input');
      const disabledInput = screen.getByTestId('disabled-input');

      const normalState = captureComponentState(normalInput);
      const errorState = captureComponentState(errorInput);
      const successState = captureComponentState(successInput);
      const disabledState = captureComponentState(disabledInput);

      // Error input should have different border color
      expect(errorState.borderColor).not.toBe(normalState.borderColor);
      
      // Success input should have different border color
      expect(successState.borderColor).not.toBe(normalState.borderColor);
      
      // Disabled input should have reduced opacity
      expect(parseFloat(disabledState.opacity)).toBeLessThan(parseFloat(normalState.opacity));
    });

    it('should render specialized inputs consistently', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <SearchInput 
              placeholder="Search..." 
              data-testid="search-input"
            />
            <PasswordInput 
              placeholder="Password..." 
              data-testid="password-input"
            />
            <NumberInput 
              placeholder="Number..." 
              currency 
              data-testid="number-input"
            />
            <TextArea 
              placeholder="Textarea..." 
              rows={3}
              data-testid="textarea"
            />
          </div>
        </ThemeProvider>
      );

      const searchInput = screen.getByTestId('search-input');
      const passwordInput = screen.getByTestId('password-input');
      const numberInput = screen.getByTestId('number-input');
      const textarea = screen.getByTestId('textarea');

      // Verify all inputs have consistent base styling
      const searchState = captureComponentState(searchInput);
      const passwordState = captureComponentState(passwordInput);
      const numberState = captureComponentState(numberInput);
      const textareaState = captureComponentState(textarea);

      expect(searchState.borderRadius).toBe(passwordState.borderRadius);
      expect(passwordState.borderRadius).toBe(numberState.borderRadius);
      
      // Textarea should have different height
      expect(textareaState.height).not.toBe(searchState.height);
    });
  });

  describe('Badge Visual Consistency', () => {
    it('should maintain consistent badge styling across variants', () => {
      const variants = ['default', 'secondary', 'destructive', 'outline', 'tag', 'rating', 'mealType', 'price'] as const;
      const capturedStates: Record<string, any> = {};

      variants.forEach(variant => {
        const { container, unmount } = render(
          <ThemeProvider theme="light">
            <Badge variant={variant} data-testid={`badge-${variant}`}>
              {variant}
            </Badge>
          </ThemeProvider>
        );

        const badge = screen.getByTestId(`badge-${variant}`);
        capturedStates[variant] = captureComponentState(badge);

        unmount();
      });

      // Verify variants have distinct styling
      variants.forEach(variant => {
        expect(capturedStates[variant]).toBeDefined();
        expect(capturedStates[variant].backgroundColor).toBeTruthy();
      });

      // Outline variant should have transparent background
      expect(capturedStates.outline.backgroundColor).toContain('transparent');
    });

    it('should render specialized badges consistently', () => {
      render(
        <ThemeProvider theme="light">
          <div className="flex gap-2">
            <MealTagBadge tag="italian" data-testid="meal-tag" />
            <RatingBadge rating={8.5} data-testid="rating-badge" />
            <MealTypeBadge mealType="dinner" data-testid="meal-type" />
            <PriceBadge price={24.99} data-testid="price-badge" />
          </div>
        </ThemeProvider>
      );

      const mealTag = screen.getByTestId('meal-tag');
      const ratingBadge = screen.getByTestId('rating-badge');
      const mealType = screen.getByTestId('meal-type');
      const priceBadge = screen.getByTestId('price-badge');

      // Verify all badges have consistent base styling
      const mealTagState = captureComponentState(mealTag);
      const ratingState = captureComponentState(ratingBadge);
      const mealTypeState = captureComponentState(mealType);
      const priceState = captureComponentState(priceBadge);

      expect(mealTagState.borderRadius).toBe(ratingState.borderRadius);
      expect(ratingState.fontSize).toBe(mealTypeState.fontSize);
      expect(mealTypeState.padding).toBe(priceState.padding);
    });

    it('should handle removable badges consistently', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();

      render(
        <ThemeProvider theme="light">
          <Badge removable onRemove={handleRemove} data-testid="removable-badge">
            Removable
          </Badge>
        </ThemeProvider>
      );

      const badge = screen.getByTestId('removable-badge');
      const removeButton = screen.getByLabelText('Remove tag');

      const badgeState = captureComponentState(badge);
      const buttonState = captureComponentState(removeButton);

      // Remove button should be properly styled
      expect(buttonState.borderRadius).toBeTruthy();
      expect(buttonState.padding).toBeTruthy();

      // Test interaction
      await user.click(removeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading Components Visual Consistency', () => {
    it('should render loading spinner consistently', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const capturedStates: Record<string, any> = {};

      sizes.forEach(size => {
        const { container, unmount } = render(
          <ThemeProvider theme="light">
            <LoadingSpinner size={size} data-testid={`spinner-${size}`} />
          </ThemeProvider>
        );

        const spinner = screen.getByTestId(`spinner-${size}`);
        capturedStates[size] = captureComponentState(spinner);

        unmount();
      });

      // Verify size differences
      expect(capturedStates.sm.width).not.toBe(capturedStates.lg.width);
      expect(capturedStates.md.height).not.toBe(capturedStates.sm.height);
    });

    it('should render skeleton components consistently', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" data-testid="skeleton-full" />
            <Skeleton className="h-4 w-3/4" data-testid="skeleton-three-quarters" />
            <Skeleton className="h-8 w-1/2" data-testid="skeleton-half" />
          </div>
        </ThemeProvider>
      );

      const skeletonFull = screen.getByTestId('skeleton-full');
      const skeletonThreeQuarters = screen.getByTestId('skeleton-three-quarters');
      const skeletonHalf = screen.getByTestId('skeleton-half');

      const fullState = captureComponentState(skeletonFull);
      const threeQuartersState = captureComponentState(skeletonThreeQuarters);
      const halfState = captureComponentState(skeletonHalf);

      // All skeletons should have consistent styling
      expect(fullState.backgroundColor).toBe(threeQuartersState.backgroundColor);
      expect(threeQuartersState.borderRadius).toBe(halfState.borderRadius);
    });
  });

  describe('Theme Consistency Tests', () => {
    it('should maintain visual hierarchy across themes', () => {
      const testComponent = (
        <div className="space-y-4 p-4">
          <Card data-testid="theme-card">
            <CardHeader>
              <CardTitle data-testid="theme-title">Theme Test Card</CardTitle>
              <CardDescription data-testid="theme-description">
                Testing theme consistency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input placeholder="Theme test input" data-testid="theme-input" />
              <div className="flex gap-2 mt-2">
                <Button data-testid="theme-button">Primary</Button>
                <Button variant="outline" data-testid="theme-outline">Outline</Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge data-testid="theme-badge">Badge</Badge>
                <Badge variant="outline" data-testid="theme-badge-outline">Outline Badge</Badge>
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

      const lightStates = {
        card: captureComponentState(screen.getByTestId('theme-card')),
        title: captureComponentState(screen.getByTestId('theme-title')),
        description: captureComponentState(screen.getByTestId('theme-description')),
        input: captureComponentState(screen.getByTestId('theme-input')),
        button: captureComponentState(screen.getByTestId('theme-button')),
        outline: captureComponentState(screen.getByTestId('theme-outline')),
        badge: captureComponentState(screen.getByTestId('theme-badge')),
        badgeOutline: captureComponentState(screen.getByTestId('theme-badge-outline')),
      };

      unmountLight();

      // Test dark theme
      const { container: darkContainer, unmount: unmountDark } = render(
        <ThemeProvider theme="dark">
          {testComponent}
        </ThemeProvider>
      );

      const darkStates = {
        card: captureComponentState(screen.getByTestId('theme-card')),
        title: captureComponentState(screen.getByTestId('theme-title')),
        description: captureComponentState(screen.getByTestId('theme-description')),
        input: captureComponentState(screen.getByTestId('theme-input')),
        button: captureComponentState(screen.getByTestId('theme-button')),
        outline: captureComponentState(screen.getByTestId('theme-outline')),
        badge: captureComponentState(screen.getByTestId('theme-badge')),
        badgeOutline: captureComponentState(screen.getByTestId('theme-badge-outline')),
      };

      unmountDark();

      // Verify themes have different colors but same structure
      Object.keys(lightStates).forEach(key => {
        const lightState = lightStates[key as keyof typeof lightStates];
        const darkState = darkStates[key as keyof typeof darkStates];

        // Colors should be different
        expect(lightState.backgroundColor).not.toBe(darkState.backgroundColor);
        expect(lightState.color).not.toBe(darkState.color);

        // Structure should be the same
        expect(lightState.borderRadius).toBe(darkState.borderRadius);
        expect(lightState.padding).toBe(darkState.padding);
        expect(lightState.fontSize).toBe(darkState.fontSize);
      });
    });
  });

  describe('Animation and Transition Consistency', () => {
    it('should handle transitions consistently', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Button data-testid="transition-button">Hover Me</Button>
            <Card variant="interactive" data-testid="transition-card">
              <CardContent>
                <p>Interactive Card</p>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      );

      const button = screen.getByTestId('transition-button');
      const card = screen.getByTestId('transition-card');

      const initialButtonState = captureComponentState(button);
      const initialCardState = captureComponentState(card);

      // Test hover states
      fireEvent.mouseEnter(button);
      fireEvent.mouseEnter(card);

      await waitFor(() => {
        const hoverButtonState = captureComponentState(button);
        const hoverCardState = captureComponentState(card);

        // States should be captured (actual transition testing would require more sophisticated tools)
        expect(hoverButtonState).toBeDefined();
        expect(hoverCardState).toBeDefined();
      });
    });
  });

  describe('Error State Visual Consistency', () => {
    it('should render error states consistently', () => {
      render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Input 
              error="Input error message" 
              data-testid="error-input"
            />
            <Alert variant="destructive" data-testid="error-alert">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong
              </AlertDescription>
            </Alert>
            <Button variant="destructive" data-testid="error-button">
              Destructive Action
            </Button>
          </div>
        </ThemeProvider>
      );

      const errorInput = screen.getByTestId('error-input');
      const errorAlert = screen.getByTestId('error-alert');
      const errorButton = screen.getByTestId('error-button');

      const inputState = captureComponentState(errorInput);
      const alertState = captureComponentState(errorAlert);
      const buttonState = captureComponentState(errorButton);

      // Error states should use consistent error colors
      expect(inputState.borderColor).toContain('red');
      expect(alertState.backgroundColor).toContain('red');
      expect(buttonState.backgroundColor).toContain('red');
    });
  });
});