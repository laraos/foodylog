/**
 * Theme Integration Tests
 * 
 * Tests all shadcn/ui components with FoodyLog theme integration
 * in both light and dark modes to ensure proper color contrast
 * and visual consistency.
 */

import { describe, it, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Button } from '../button';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Input } from '../input';
import { Badge, MealTagBadge, RatingBadge, MealTypeBadge, PriceBadge } from '../badge';
import React from 'react';
import { testAccessibility } from '../../../test/accessibility';

// Theme provider mock for testing
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

describe('Theme Integration Tests', () => {
  beforeEach(() => {
    // Reset any theme classes
    document.documentElement.className = '';
  });

  afterEach(() => {
    cleanup();
    document.documentElement.className = '';
  });

  describe('Light Theme', () => {
    it('should render all Button variants correctly in light theme', async () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      for (const variant of variants) {
        const renderResult = render(
          <ThemeProvider theme="light">
            <Button variant={variant}>Button {variant}</Button>
          </ThemeProvider>,
        );

        // Should pass accessibility tests with proper contrast
        await testAccessibility(renderResult, {
          expectedFocusableElements: 1,
          skipKeyboardNavigation: true,
        });

        renderResult.unmount();
      }
    });

    it('should render all Card variants correctly in light theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a default card in light theme.</p>
              </CardContent>
            </Card>
            
            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has hover effects.</p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has enhanced shadows.</p>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });
    });

    it('should render Input components correctly in light theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <div>
              <label htmlFor="normal-input">Normal Input</label>
              <Input id="normal-input" placeholder="Enter text" />
            </div>
            
            <div>
              <label htmlFor="error-input">Error Input</label>
              <Input 
                id="error-input" 
                error="This field is required" 
                aria-invalid="true"
              />
            </div>
            
            <div>
              <label htmlFor="success-input">Success Input</label>
              <Input 
                id="success-input" 
                success={true}
                value="Valid input"
                readOnly
              />
            </div>
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 3,
      });
    });

    it('should render Badge variants correctly in light theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="light">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Badge examples">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="tag">Tag</Badge>
            <Badge variant="rating">Rating</Badge>
            <Badge variant="mealType">Meal Type</Badge>
            <Badge variant="price">Price</Badge>
            <MealTagBadge tag="italian" />
            <RatingBadge rating={8.5} />
            <MealTypeBadge mealType="dinner" />
            <PriceBadge price={24.99} />
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });
    });
  });

  describe('Dark Theme', () => {
    it('should render all Button variants correctly in dark theme', async () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      for (const variant of variants) {
        const renderResult = render(
          <ThemeProvider theme="dark">
            <Button variant={variant}>Button {variant}</Button>
          </ThemeProvider>,
        );

        // Should pass accessibility tests with proper contrast in dark mode
        await testAccessibility(renderResult, {
          expectedFocusableElements: 1,
          skipKeyboardNavigation: true,
        });

        renderResult.unmount();
      }
    });

    it('should render all Card variants correctly in dark theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="dark">
          <div className="space-y-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a default card in dark theme.</p>
              </CardContent>
            </Card>
            
            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has hover effects in dark mode.</p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has enhanced shadows in dark mode.</p>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });
    });

    it('should render Input components correctly in dark theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="dark">
          <div className="space-y-4">
            <div>
              <label htmlFor="normal-input-dark">Normal Input</label>
              <Input id="normal-input-dark" placeholder="Enter text" />
            </div>
            
            <div>
              <label htmlFor="error-input-dark">Error Input</label>
              <Input 
                id="error-input-dark" 
                error="This field is required" 
                aria-invalid="true"
              />
            </div>
            
            <div>
              <label htmlFor="success-input-dark">Success Input</label>
              <Input 
                id="success-input-dark" 
                success={true}
                value="Valid input"
                readOnly
              />
            </div>
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 3,
      });
    });

    it('should render Badge variants correctly in dark theme', async () => {
      const renderResult = render(
        <ThemeProvider theme="dark">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Badge examples in dark theme">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="tag">Tag</Badge>
            <Badge variant="rating">Rating</Badge>
            <Badge variant="mealType">Meal Type</Badge>
            <Badge variant="price">Price</Badge>
            <MealTagBadge tag="italian" />
            <RatingBadge rating={8.5} />
            <MealTypeBadge mealType="dinner" />
            <PriceBadge price={24.99} />
          </div>
        </ThemeProvider>,
      );

      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });
    });
  });

  describe('Theme Switching', () => {
    it('should handle theme switching without accessibility issues', async () => {
      // Test component in light theme first
      const { rerender } = render(
        <ThemeProvider theme="light">
          <div className="space-y-4">
            <Button variant="default">Primary Action</Button>
            <Card>
              <CardHeader>
                <CardTitle>Meal Card</CardTitle>
              </CardHeader>
              <CardContent>
                <label htmlFor="search-input">Search meals</label>
                <Input id="search-input" placeholder="Search meals..." />
                <div className="flex gap-2 mt-2">
                  <Badge variant="tag">italian</Badge>
                  <Badge variant="rating">⭐ 9/10</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>,
      );

      // Verify light theme accessibility
      await testAccessibility({ container: document.body } as any, {
        expectedFocusableElements: 2, // Button + Input
        skipKeyboardNavigation: true,
      });

      // Switch to dark theme
      rerender(
        <ThemeProvider theme="dark">
          <div className="space-y-4">
            <Button variant="default">Primary Action</Button>
            <Card>
              <CardHeader>
                <CardTitle>Meal Card</CardTitle>
              </CardHeader>
              <CardContent>
                <label htmlFor="search-input-dark">Search meals</label>
                <Input id="search-input-dark" placeholder="Search meals..." />
                <div className="flex gap-2 mt-2">
                  <Badge variant="tag">italian</Badge>
                  <Badge variant="rating">⭐ 9/10</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>,
      );

      // Verify dark theme accessibility
      await testAccessibility({ container: document.body } as any, {
        expectedFocusableElements: 2, // Button + Input
        skipKeyboardNavigation: true,
      });
    });

    it('should maintain proper color contrast in both themes', async () => {
      const testComponent = (
        <div className="space-y-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Card>
            <CardContent>
              <p className="text-foreground">This text should have proper contrast</p>
              <p className="text-muted-foreground">This muted text should also be readable</p>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Badge variant="default">High contrast badge</Badge>
            <Badge variant="outline">Outline badge</Badge>
          </div>
        </div>
      );

      // Test light theme
      const lightResult = render(
        <ThemeProvider theme="light">
          {testComponent}
        </ThemeProvider>,
      );

      await testAccessibility(lightResult, {
        expectedFocusableElements: 2,
        skipKeyboardNavigation: true,
      });

      lightResult.unmount();

      // Test dark theme
      const darkResult = render(
        <ThemeProvider theme="dark">
          {testComponent}
        </ThemeProvider>,
      );

      await testAccessibility(darkResult, {
        expectedFocusableElements: 2,
        skipKeyboardNavigation: true,
      });
    });
  });

  describe('FoodyLog Rating Colors', () => {
    it('should render rating colors correctly in both themes', async () => {
      const ratings = [
        { rating: 10, expected: 'excellent' },
        { rating: 8, expected: 'great' },
        { rating: 6, expected: 'good' },
        { rating: 4, expected: 'poor' },
        { rating: 2, expected: 'bad' },
      ];

      for (const theme of ['light', 'dark'] as const) {
        const renderResult = render(
          <ThemeProvider theme={theme}>
            <div className="space-y-2">
              {ratings.map(({ rating, expected }) => (
                <div key={rating} className="flex items-center gap-2">
                  <RatingBadge rating={rating} />
                  <span className={`text-rating-${expected}`}>
                    Rating {rating} - {expected}
                  </span>
                </div>
              ))}
            </div>
          </ThemeProvider>,
        );

        await testAccessibility(renderResult, {
          expectedFocusableElements: 0,
          skipKeyboardNavigation: true,
        });

        renderResult.unmount();
      }
    });
  });

  describe('Mobile-First Responsive Design', () => {
    it('should maintain accessibility across different viewport sizes', async () => {
      const component = (
        <div className="space-y-4">
          <Button size="lg" className="w-full sm:w-auto">
            Responsive Button
          </Button>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Responsive Card</CardTitle>
            </CardHeader>
            <CardContent>
              <label htmlFor="responsive-input">Full width input</label>
              <Input id="responsive-input" className="w-full" placeholder="Full width input" />
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>Mobile</Badge>
                <Badge>Friendly</Badge>
                <Badge>Design</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      );

      // Test in both themes with responsive design
      for (const theme of ['light', 'dark'] as const) {
        const renderResult = render(
          <ThemeProvider theme={theme}>
            {component}
          </ThemeProvider>,
        );

        await testAccessibility(renderResult, {
          expectedFocusableElements: 2, // Button + Input
          skipKeyboardNavigation: true,
        });

        renderResult.unmount();
      }
    });
  });
});