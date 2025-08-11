# FoodyLog Testing Guide

This document provides comprehensive guidance for testing in the FoodyLog application, including setup, utilities, patterns, and best practices.

## 📋 Table of Contents

- [Testing Stack](#testing-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing Utilities](#testing-utilities)
- [Mocking Strategy](#mocking-strategy)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## 🛠 Testing Stack

FoodyLog uses a modern testing stack optimized for React applications:

- **Test Runner**: [Vitest](https://vitest.dev/) - Fast, Vite-native test runner
- **Testing Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Simple and complete testing utilities
- **Assertions**: [Jest-DOM](https://github.com/testing-library/jest-dom) - Custom DOM element matchers
- **User Interactions**: [User Event](https://testing-library.com/docs/user-event/intro/) - Realistic user interaction simulation
- **Coverage**: [V8](https://v8.dev/) - Built-in code coverage reporting
- **Mocking**: [Vitest](https://vitest.dev/guide/mocking.html) - Comprehensive mocking capabilities

## 📁 Project Structure

```
src/
├── test/
│   ├── setup.ts              # Global test setup and configuration
│   ├── test-utils.tsx        # Custom render functions and utilities
│   ├── mocks.ts              # Mock implementations for external dependencies
│   └── README.md             # This documentation
├── lib/
│   ├── utils.test.ts         # Tests for utility functions
│   ├── theme.test.ts         # Tests for theme management
│   └── *.ts                  # Source files
├── components/
│   └── **/*.test.tsx         # Component tests (co-located)
└── App.test.tsx              # Main app component tests
```

## 🚀 Getting Started

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test --watch

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage

# Run specific test file
bun run test src/lib/utils.test.ts

# Run tests matching a pattern
bun run test --grep "theme"
```

### Test Configuration

Tests are configured in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    globals: true,           // Global test functions (describe, it, expect)
    environment: 'jsdom',    // DOM environment for React components
    setupFiles: ['./src/test/setup.ts'], // Global setup
    css: true,              // Process CSS imports
    coverage: {
      provider: 'v8',       // Coverage provider
      reporter: ['text', 'json', 'html'], // Coverage formats
      exclude: [            // Files to exclude from coverage
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'coverage/',
      ],
    },
  },
});
```

## 🧰 Testing Utilities

### Custom Render Functions

Use `renderWithProviders` for components that need React context:

```typescript
import { renderWithProviders, screen } from '~/test/test-utils';
import { MyComponent } from './MyComponent';

test('renders with all providers', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

// With custom options
test('renders with dark theme', () => {
  renderWithProviders(<MyComponent />, {
    theme: 'dark',
    initialEntries: ['/meals'],
  });
});
```

### Mock Data

Pre-built mock data for consistent testing:

```typescript
import { mockUser, mockMeal, generateMockMeals } from '~/test/test-utils';

test('displays user information', () => {
  const user = { ...mockUser, firstName: 'Custom' };
  // Use in your test
});

test('handles multiple meals', () => {
  const meals = generateMockMeals(10);
  // Test with 10 mock meals
});
```

### Utility Functions

Common testing utilities:

```typescript
import { 
  waitFor, 
  mockDateNow, 
  mockWindowDimensions,
  createMockFile 
} from '~/test/test-utils';

test('handles file upload', async () => {
  const file = createMockFile('photo.jpg', 'image/jpeg', 2048);
  // Test file upload functionality
});

test('responsive behavior', () => {
  mockWindowDimensions(375, 667); // Mobile dimensions
  // Test mobile-specific behavior
});
```

## 🎭 Mocking Strategy

### External Dependencies

All external dependencies are mocked in `src/test/mocks.ts`:

#### Convex (Backend)
```typescript
import { mockUseQuery, mockUseMutation } from '~/test/mocks';

// Mock query results
mockUseQuery.mockReturnValue([
  { _id: '1', title: 'Test Meal', rating: 8 }
]);

// Mock mutation functions
const mockCreateMeal = mockUseMutation.mockResolvedValue('meal_123');
```

#### Clerk (Authentication)
```typescript
import { mockUseAuth, mockUseUser } from '~/test/mocks';

// Mock authenticated user
mockUseAuth.mockReturnValue({
  isSignedIn: true,
  user: mockClerkUser,
  signOut: vi.fn(),
});

// Mock unauthenticated state
mockUseAuth.mockReturnValue({
  isSignedIn: false,
  isLoaded: true,
});
```

#### Capacitor (Mobile)
```typescript
import { mockCapacitorCamera, mockCapacitorPreferences } from '~/test/mocks';

// Mock camera functionality
mockCapacitorCamera.getPhoto.mockResolvedValue({
  webPath: 'data:image/jpeg;base64,test',
  format: 'jpeg',
});

// Mock preferences storage
mockCapacitorPreferences.get.mockResolvedValue({
  value: JSON.stringify({ theme: 'dark' })
});
```

### Browser APIs

Common browser APIs are mocked globally:

```typescript
// Already mocked in setup.ts
- localStorage/sessionStorage
- matchMedia (for responsive design)
- IntersectionObserver (for lazy loading)
- ResizeObserver (for responsive components)
- fetch (for HTTP requests)
- geolocation (for location features)
```

## ✍️ Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '~/test/test-utils';
import { MealCard } from './MealCard';
import { mockMeal } from '~/test/test-utils';

describe('MealCard', () => {
  it('displays meal information', () => {
    renderWithProviders(<MealCard meal={mockMeal} />);
    
    expect(screen.getByText(mockMeal.title)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockMeal.rating}/10`)).toBeInTheDocument();
  });

  it('handles edit action', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    
    renderWithProviders(
      <MealCard meal={mockMeal} onEdit={onEdit} />
    );
    
    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockMeal._id);
  });

  it('shows rating color correctly', () => {
    const highRatedMeal = { ...mockMeal, rating: 9 };
    renderWithProviders(<MealCard meal={highRatedMeal} />);
    
    const ratingElement = screen.getByTestId('meal-rating');
    expect(ratingElement).toHaveClass('text-rating-excellent');
  });
});
```

### Utility Function Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { formatTimeAgo, getRatingColor } from './utils';

describe('formatTimeAgo', () => {
  it('formats recent timestamps as "Just now"', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);
    
    expect(formatTimeAgo(now)).toBe('Just now');
    expect(formatTimeAgo(now - 30000)).toBe('Just now'); // 30 seconds ago
    
    vi.restoreAllMocks();
  });

  it('formats hours correctly', () => {
    const now = 1640995200000; // Fixed timestamp
    vi.spyOn(Date, 'now').mockReturnValue(now);
    
    expect(formatTimeAgo(now - 3600000)).toBe('1 hour ago');
    expect(formatTimeAgo(now - 7200000)).toBe('2 hours ago');
    
    vi.restoreAllMocks();
  });
});
```

### Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current[0]).toBe('initial');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key', 
      JSON.stringify('updated')
    );
  });
});
```

## 📋 Best Practices

### Test Organization

1. **Co-locate tests**: Place test files next to the code they test
2. **Descriptive names**: Use clear, descriptive test names
3. **Group related tests**: Use `describe` blocks to group related tests
4. **One assertion per test**: Keep tests focused and simple

### Test Structure

Follow the **Arrange-Act-Assert** pattern:

```typescript
test('calculates total price correctly', () => {
  // Arrange
  const items = [
    { price: 10.99, quantity: 2 },
    { price: 5.50, quantity: 1 }
  ];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(27.48);
});
```

### Accessibility Testing

Include accessibility checks in component tests:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = renderWithProviders(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Performance Testing

Test performance-critical functionality:

```typescript
test('renders large lists efficiently', () => {
  const startTime = performance.now();
  const meals = generateMockMeals(1000);
  
  renderWithProviders(<MealList meals={meals} />);
  
  const endTime = performance.now();
  expect(endTime - startTime).toBeLessThan(100); // Should render in <100ms
});
```

### Error Boundary Testing

Test error handling:

```typescript
test('handles errors gracefully', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  renderWithProviders(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
```

## 🔄 CI/CD Integration

Tests run automatically in GitHub Actions:

```yaml
- name: Run tests
  run: bun run test:coverage

- name: Upload coverage reports
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/lcov.info
```

### Coverage Requirements

- **Target**: 80% overall coverage
- **Critical paths**: 90% coverage for core functionality
- **New code**: 100% coverage for new features

### Quality Gates

Tests must pass before:
- Merging pull requests
- Deploying to staging
- Releasing to production

## 🐛 Troubleshooting

### Common Issues

#### Tests timing out
```typescript
// Increase timeout for slow operations
test('handles slow operation', async () => {
  // ... test code
}, 10000); // 10 second timeout
```

#### Mock not working
```typescript
// Ensure mocks are reset between tests
afterEach(() => {
  vi.clearAllMocks();
});
```

#### Component not rendering
```typescript
// Check if component needs providers
renderWithProviders(<MyComponent />); // Instead of render()
```

#### Async operations not completing
```typescript
// Wait for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### Debug Mode

Run tests with debug information:

```bash
# Enable debug logging
DEBUG=* bun run test

# Run single test with debugging
bun run test --reporter=verbose src/components/MyComponent.test.tsx
```

### Test Coverage Issues

View detailed coverage report:

```bash
bun run test:coverage
open coverage/index.html
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest-DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [FoodyLog Development Guide](../docs/development.md)

## 🤝 Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure 100% coverage for new code
3. Update mocks if adding new dependencies
4. Document complex testing scenarios
5. Run full test suite before submitting PR

For questions or issues with testing, please refer to the [FoodyLog Development Planning](../../FoodyLog_Development_Planning.md) document or create an issue in the repository.