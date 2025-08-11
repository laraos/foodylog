/**
 * Testing Utilities for FoodyLog
 * 
 * Provides custom render functions and utilities for testing React components
 * with all necessary providers (Router, Theme, Convex, Clerk) and common
 * testing patterns used throughout the FoodyLog application.
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { ThemeProvider } from '~/lib/theme';

// Mock Convex provider and hooks
const MockConvexProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement('div', { 'data-testid': 'convex-provider' }, children);
};

// Mock Clerk provider and hooks
const MockClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement('div', { 'data-testid': 'clerk-provider' }, children);
};

/**
 * Custom render function that wraps components with all necessary providers
 * 
 * This is the main testing utility for rendering FoodyLog components.
 * It automatically wraps components with Router, Theme, Convex, and Clerk providers.
 * 
 * @param ui - React element to render
 * @param options - Additional render options
 * @returns Render result with all providers
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    initialEntries: _initialEntries = ['/'],
    theme = 'light',
    ...renderOptions
  }: {
    initialEntries?: string[];
    theme?: 'light' | 'dark' | 'system';
  } & Omit<RenderOptions, 'wrapper'> = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <ThemeProvider defaultTheme={theme}>
          <MockConvexProvider>
            <MockClerkProvider>
              {children}
            </MockClerkProvider>
          </MockConvexProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Simplified render function for components that don't need all providers
 * 
 * @param ui - React element to render
 * @param options - Render options
 * @returns Render result with minimal providers
 */
export function renderWithRouter(
  ui: ReactElement,
  { initialEntries: _initialEntries = ['/'], ...renderOptions }: { initialEntries?: string[] } & Omit<RenderOptions, 'wrapper'> = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Mock user data for testing
 */
export const mockUser = {
  id: 'user_test123',
  firstName: 'Test',
  lastName: 'User',
  emailAddresses: [{ emailAddress: 'test@example.com' }],
  imageUrl: 'https://example.com/avatar.jpg',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

/**
 * Mock meal data for testing
 */
export const mockMeal = {
  _id: 'meal_test123',
  userId: 'user_test123',
  title: 'Test Meal',
  rating: 8,
  mealType: 'lunch' as const,
  price: 12.99,
  location: 'Test Restaurant',
  tags: ['delicious', 'healthy'],
  notes: 'Great meal!',
  photoUrl: 'https://example.com/meal.jpg',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

/**
 * Mock Convex query results
 */
export const mockConvexQuery = (data: any) => {
  return vi.fn().mockReturnValue(data);
};

/**
 * Mock Convex mutation functions
 */
export const mockConvexMutation = (result?: any) => {
  return vi.fn().mockResolvedValue(result);
};

/**
 * Mock Clerk authentication hooks
 */
export const mockUseAuth = (overrides: Partial<any> = {}) => {
  return {
    isSignedIn: true,
    isLoaded: true,
    user: mockUser,
    signOut: vi.fn(),
    ...overrides,
  };
};

/**
 * Mock Clerk user management hooks
 */
export const mockUseUser = (overrides: Partial<any> = {}) => {
  return {
    isSignedIn: true,
    isLoaded: true,
    user: mockUser,
    ...overrides,
  };
};

/**
 * Utility to wait for async operations in tests
 */
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock window.matchMedia for theme testing
 */
export const mockMatchMedia = (matches: boolean) => {
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

/**
 * Mock window dimensions for mobile testing
 */
export const mockWindowDimensions = (width: number, height: number) => {
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
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

/**
 * Mock Date.now for consistent time-based testing
 */
export const mockDateNow = (timestamp: number) => {
  const spy = vi.spyOn(Date, 'now');
  spy.mockReturnValue(timestamp);
  return spy;
};

/**
 * Create a mock file for testing file uploads
 */
export const createMockFile = (name: string, type: string, size: number = 1024) => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

/**
 * Mock Capacitor plugins for mobile testing
 */
export const mockCapacitorCamera = {
  getPhoto: vi.fn().mockResolvedValue({
    webPath: 'data:image/jpeg;base64,test',
    format: 'jpeg',
  }),
  requestPermissions: vi.fn().mockResolvedValue({ camera: 'granted' }),
};

export const mockCapacitorPreferences = {
  get: vi.fn().mockResolvedValue({ value: null }),
  set: vi.fn().mockResolvedValue(undefined),
  remove: vi.fn().mockResolvedValue(undefined),
  clear: vi.fn().mockResolvedValue(undefined),
};

/**
 * Test data generators for consistent test data
 */
export const generateMockMeals = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    ...mockMeal,
    _id: `meal_test${index}`,
    title: `Test Meal ${index + 1}`,
    rating: Math.floor(Math.random() * 10) + 1,
    createdAt: Date.now() - (index * 24 * 60 * 60 * 1000), // Spread over days
  }));
};

/**
 * Custom matchers for common FoodyLog assertions
 */
export const customMatchers = {
  toHaveValidMealData: (meal: any) => {
    const required = ['_id', 'userId', 'title', 'rating', 'mealType', 'createdAt'];
    const missing = required.filter(field => !(field in meal));
    
    return {
      pass: missing.length === 0,
      message: () => missing.length > 0 
        ? `Expected meal to have required fields. Missing: ${missing.join(', ')}`
        : 'Meal has all required fields',
    };
  },
  
  toHaveValidRating: (rating: number) => {
    const isValid = typeof rating === 'number' && rating >= 1 && rating <= 10;
    
    return {
      pass: isValid,
      message: () => isValid 
        ? 'Rating is valid (1-10)'
        : `Expected rating to be between 1-10, received: ${rating}`,
    };
  },
};

// Re-export everything from React Testing Library for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';