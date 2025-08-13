/**
 * Responsive Design Tests
 * 
 * Tests component behavior across different screen sizes and orientations.
 * Validates mobile-first design approach and touch-friendly interactions.
 * 
 * Requirements fulfilled: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// Import components
import { Button } from '../button';
import { Card, CardHeader, CardTitle, CardContent } from '../card';
import { Input, SearchInput } from '../input';
import { Badge } from '../badge';

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

// Viewport configurations for testing
const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  mobileLandscape: { width: 667, height: 375 }, // iPhone SE landscape
  tablet: { width: 768, height: 1024 }, // iPad portrait
  tabletLandscape: { width: 1024, height: 768 }, // iPad landscape
  desktop: { width: 1280, height: 720 }, // Desktop
  largeDesktop: { width: 1920, height: 1080 }, // Large desktop
} as const;

// Mock window dimensions and matchMedia
const mockViewport = (width: number, height: number) => {
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

  // Mock matchMedia for responsive breakpoints
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => {
      // Parse common media queries
      const matches = (() => {
        if (query.includes('min-width: 640px')) return width >= 640; // sm
        if (query.includes('min-width: 768px')) return width >= 768; // md
        if (query.includes('min-width: 1024px')) return width >= 1024; // lg
        if (query.includes('min-width: 1280px')) return width >= 1280; // xl
        if (query.includes('max-width: 639px')) return width <= 639; // mobile
        if (query.includes('orientation: landscape')) return width > height;
        if (query.includes('orientation: portrait')) return height > width;
        return false;
      })();

      return {
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });

  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    // Reset to default desktop viewport
    mockViewport(1280, 720);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Mobile Viewport (375px)', () => {
    beforeEach(() => {
      mockViewport(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    });

    it('should render buttons with proper mobile sizing', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="space-y-4 p-4">
            <Button className="w-full">Full Width Mobile Button</Button>
            <Button size="lg" className="w-full">Large Mobile Button</Button>
            <div className="flex gap-2">
              <Button className="flex-1">Flex Button 1</Button>
              <Button className="flex-1">Flex Button 2</Button>
            </div>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      const fullWidthButton = screen.getByText('Full Width Mobile Button');
      const largeButton = screen.getByText('Large Mobile Button');

      // Verify buttons are accessible and properly sized
      expect(fullWidthButton).toBeInTheDocument();
      expect(largeButton).toBeInTheDocument();

      // Check touch target size
      const buttonRect = fullWidthButton.getBoundingClientRect();
      expect(buttonRect.height).toBeGreaterThanOrEqual(40); // Minimum touch target
    });

    it('should render cards with mobile-optimized layout', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="p-4 space-y-4">
            <Card className="w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Mobile Card Title</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input className="w-full" placeholder="Full width input" />
                <div className="flex flex-wrap gap-2">
                  <Badge>Tag 1</Badge>
                  <Badge>Tag 2</Badge>
                  <Badge>Tag 3</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      expect(screen.getByText('Mobile Card Title')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Full width input')).toBeInTheDocument();
    });

    it('should handle mobile form layouts', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="p-4">
            <form className="space-y-4">
              <div>
                <label htmlFor="mobile-name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input 
                  id="mobile-name"
                  className="w-full" 
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="mobile-email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input 
                  id="mobile-email"
                  type="email"
                  className="w-full" 
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="mobile-search" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <SearchInput 
                  id="mobile-search"
                  className="w-full" 
                  placeholder="Search meals..."
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Form
              </Button>
            </form>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Verify form elements are properly labeled and accessible
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('should handle touch interactions properly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleRemove = vi.fn();

      render(
        <ThemeProvider theme="light">
          <div className="p-4 space-y-4">
            <Button onClick={handleClick} className="w-full">
              Touch Me
            </Button>
            <Badge removable onRemove={handleRemove}>
              Removable Tag
            </Badge>
          </div>
        </ThemeProvider>
      );

      // Test touch interactions
      const button = screen.getByText('Touch Me');
      const removeButton = screen.getByLabelText('Remove tag');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.click(removeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mobile Landscape (667px)', () => {
    beforeEach(() => {
      mockViewport(VIEWPORTS.mobileLandscape.width, VIEWPORTS.mobileLandscape.height);
    });

    it('should adapt layout for landscape orientation', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p>Card 1</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p>Card 2</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
    });
  });

  describe('Tablet Portrait (768px)', () => {
    beforeEach(() => {
      mockViewport(VIEWPORTS.tablet.width, VIEWPORTS.tablet.height);
    });

    it('should render tablet-optimized layouts', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tablet Card 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Tablet input" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tablet Card 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button>Action 1</Button>
                    <Button variant="outline">Action 2</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      expect(screen.getByText('Tablet Card 1')).toBeInTheDocument();
      expect(screen.getByText('Tablet Card 2')).toBeInTheDocument();
    });

    it('should handle tablet form layouts', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="max-w-2xl mx-auto p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tablet-first" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input id="tablet-first" placeholder="First name" />
                </div>
                <div>
                  <label htmlFor="tablet-last" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input id="tablet-last" placeholder="Last name" />
                </div>
              </div>
              <div>
                <label htmlFor="tablet-email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input id="tablet-email" type="email" placeholder="Email address" />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Desktop (1280px)', () => {
    beforeEach(() => {
      mockViewport(VIEWPORTS.desktop.width, VIEWPORTS.desktop.height);
    });

    it('should render desktop-optimized layouts', async () => {
      const { container } = render(
        <ThemeProvider theme="light">
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Desktop Card 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Desktop content with more space</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Desktop Card 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input placeholder="Desktop input" />
                    <div className="flex gap-2">
                      <Badge>Desktop</Badge>
                      <Badge>Layout</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Desktop Card 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      expect(screen.getByText('Desktop Card 1')).toBeInTheDocument();
      expect(screen.getByText('Desktop Card 2')).toBeInTheDocument();
      expect(screen.getByText('Desktop Card 3')).toBeInTheDocument();
    });

    it('should handle desktop navigation patterns', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider theme="light">
          <div className="max-w-7xl mx-auto p-8">
            <nav className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button variant="ghost">Home</Button>
                <Button variant="ghost">Meals</Button>
                <Button variant="ghost">Analytics</Button>
              </div>
              <div className="flex items-center space-x-2">
                <SearchInput placeholder="Search..." className="w-64" />
                <Button>Add Meal</Button>
              </div>
            </nav>
            <main>
              <Card>
                <CardContent className="p-8">
                  <p>Main content area</p>
                </CardContent>
              </Card>
            </main>
          </div>
        </ThemeProvider>
      );

      // Test navigation interactions
      const homeButton = screen.getByText('Home');
      const searchInput = screen.getByPlaceholderText('Search...');

      await user.click(homeButton);
      await user.click(searchInput);

      expect(searchInput).toHaveFocus();
    });
  });

  describe('Cross-Viewport Consistency', () => {
    it('should maintain accessibility across all viewports', async () => {
      const testComponent = (
        <div className="p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Responsive Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="responsive-input" className="block text-sm font-medium mb-1">
                  Test Input
                </label>
                <Input id="responsive-input" placeholder="Enter text" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Responsive</Badge>
                <Badge>Design</Badge>
              </div>
              <Button className="w-full sm:w-auto">
                Responsive Button
              </Button>
            </CardContent>
          </Card>
        </div>
      );

      // Test across multiple viewports
      for (const [name, viewport] of Object.entries(VIEWPORTS)) {
        mockViewport(viewport.width, viewport.height);

        const { container, unmount } = render(
          <ThemeProvider theme="light">
            {testComponent}
          </ThemeProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        // Verify key elements are present
        expect(screen.getByText('Responsive Test')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
        expect(screen.getByText('Responsive Button')).toBeInTheDocument();

        unmount();
      }
    });

    it('should handle orientation changes gracefully', async () => {
      // Start in portrait
      mockViewport(375, 667);

      const { rerender } = render(
        <ThemeProvider theme="light">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p>Orientation Test 1</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p>Orientation Test 2</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      expect(screen.getByText('Orientation Test 1')).toBeInTheDocument();

      // Switch to landscape
      mockViewport(667, 375);

      rerender(
        <ThemeProvider theme="light">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p>Orientation Test 1</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p>Orientation Test 2</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      );

      // Content should still be accessible
      expect(screen.getByText('Orientation Test 1')).toBeInTheDocument();
      expect(screen.getByText('Orientation Test 2')).toBeInTheDocument();
    });
  });

  describe('Performance on Different Viewports', () => {
    it('should render efficiently on mobile devices', () => {
      mockViewport(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);

      const startTime = performance.now();

      render(
        <ThemeProvider theme="light">
          <div className="space-y-4 p-4">
            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p>Mobile Card {i + 1}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm">Action</Button>
                    <Badge>Tag {i + 1}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ThemeProvider>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Render should complete quickly (under 100ms for this simple test)
      expect(renderTime).toBeLessThan(100);
    });

    it('should handle large datasets on desktop', () => {
      mockViewport(VIEWPORTS.desktop.width, VIEWPORTS.desktop.height);

      const startTime = performance.now();

      render(
        <ThemeProvider theme="light">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
            {Array.from({ length: 50 }, (_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Desktop Card {i + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder={`Input ${i + 1}`} />
                  <div className="flex gap-2 mt-2">
                    <Badge>Tag {i + 1}</Badge>
                    <Button size="sm">Action</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ThemeProvider>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Even with more components, render should be reasonable
      expect(renderTime).toBeLessThan(500);
    });
  });
});