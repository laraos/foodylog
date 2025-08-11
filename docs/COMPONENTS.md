# FoodyLog Component Documentation

_Updated: August 2025_

This document provides comprehensive documentation for all implemented components in the FoodyLog application.

## 📋 Overview

FoodyLog uses a component-based architecture built on React 18 with TypeScript, shadcn/ui, and a custom theme system. All components follow the FoodyLog design system with warm cream/brown/green color palette.

## 🎨 Design System Components

### Theme System

#### ThemeProvider
**Location**: `src/lib/theme.ts`

Manages application theme state with support for light, dark, and system preference modes.

```typescript
// Usage in App.tsx
import { ThemeProvider } from '~/lib/theme';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="foodylog-ui-theme">
      {/* App content */}
    </ThemeProvider>
  );
}
```

**Props:**
- `children: React.ReactNode` - App content to wrap with theme context
- `defaultTheme?: Theme` - Initial theme ('light' | 'dark' | 'system'), defaults to 'system'
- `storageKey?: string` - localStorage key for theme persistence, defaults to 'foodylog-ui-theme'

**Features:**
- Automatic system theme detection via `matchMedia('(prefers-color-scheme: dark)')`
- localStorage persistence with custom storage key support
- Smooth theme transitions with CSS class management
- CSS custom property integration for consistent theming
- Document root class management ('light'/'dark' classes)

**Testing:**
- ✅ **Comprehensive test coverage** in `src/lib/theme.test.tsx`
- ✅ **Theme switching functionality** with all three modes (light/dark/system)
- ✅ **localStorage persistence** and retrieval testing
- ✅ **System preference detection** with mocked matchMedia
- ✅ **Document class management** verification
- ✅ **Custom storage key support** testing
- ✅ **Theme context integration** with useTheme hook

#### ThemeToggle
**Location**: `src/components/theme-toggle.tsx`

Interactive button for switching between themes.

```typescript
import { ThemeToggle, CompactThemeToggle, ExtendedThemeToggle } from '~/components/theme-toggle';

// Basic usage
<ThemeToggle />

// Compact version for mobile
<CompactThemeToggle />

// Extended version with label
<ExtendedThemeToggle />
```

**Props:**
- `className?: string` - Additional CSS classes
- `showLabel?: boolean` - Whether to show text label

## 🧱 UI Components (shadcn/ui)

All UI components are built using shadcn/ui with Radix UI primitives and custom FoodyLog theming. They provide consistent styling, accessibility compliance, and mobile-first responsive design.

### Button
**Location**: `src/components/ui/button.tsx`

Versatile button component with multiple variants and sizes.

```typescript
import { Button } from '~/components/ui/button';

// Variants
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="destructive">Delete Action</Button>
<Button variant="link">Link Style</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**Props:**
- `variant`: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
- `size`: `default` | `sm` | `lg` | `icon`
- `asChild?: boolean` - Render as child component using Radix Slot

### Card
**Location**: `src/components/ui/card.tsx`

Container component for grouping related content.

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Meal Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Meal details...</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Badge
**Location**: `src/components/ui/badge.tsx`

Small status indicators and tags.

```typescript
import { Badge } from '~/components/ui/badge';

<Badge variant="default">Tag</Badge>
<Badge variant="secondary">Category</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Input
**Location**: `src/components/ui/input.tsx`

Form input component with FoodyLog theme integration.

```typescript
import { Input } from '~/components/ui/input';

<Input 
  type="text" 
  placeholder="Enter meal title..." 
  value={value}
  onChange={handleChange}
/>
```

### Select
**Location**: `src/components/ui/select.tsx`

Dropdown selection component built with Radix UI primitives.

```typescript
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '~/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select meal type..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="breakfast">Breakfast</SelectItem>
    <SelectItem value="lunch">Lunch</SelectItem>
    <SelectItem value="dinner">Dinner</SelectItem>
    <SelectItem value="snack">Snack</SelectItem>
  </SelectContent>
</Select>
```

### Tabs
**Location**: `src/components/ui/tabs.tsx`

Tabbed interface component for organizing content sections.

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

<Tabs defaultValue="recent">
  <TabsList>
    <TabsTrigger value="recent">Recent</TabsTrigger>
    <TabsTrigger value="favorites">Favorites</TabsTrigger>
  </TabsList>
  <TabsContent value="recent">
    {/* Recent meals content */}
  </TabsContent>
  <TabsContent value="favorites">
    {/* Favorite meals content */}
  </TabsContent>
</Tabs>
```

### Separator
**Location**: `src/components/ui/separator.tsx`

Visual separator component for dividing content sections.

```typescript
import { Separator } from '~/components/ui/separator';

<Separator className="my-4" />
<Separator orientation="vertical" className="mx-4" />
```

### Alert
**Location**: `src/components/ui/alert.tsx`

Alert messages for user feedback.

```typescript
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-react';

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

### Loading Components
**Location**: `src/components/ui/loading.tsx`, `src/components/ui/LoadingSpinner.tsx`

Loading states and spinners.

```typescript
import { LoadingSpinner } from '~/components/ui/LoadingSpinner';
import { Loading } from '~/components/ui/loading';

// Spinner
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />

// Loading component
<Loading message="Loading meals..." />
```

### Skeleton
**Location**: `src/components/ui/skeleton.tsx`

Placeholder loading states.

```typescript
import { Skeleton } from '~/components/ui/skeleton';

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

## 🏗️ Layout Components

### Navigation
**Location**: `src/components/layout/Navigation.tsx`

Mobile-first bottom navigation with 5 main sections.

```typescript
import { Navigation } from '~/components/layout/Navigation';

// Used in main layout
<Navigation />
```

**Features:**
- Mobile-first bottom tab design
- Active state indicators
- Keyboard navigation support
- Screen reader friendly
- Safe area handling for mobile devices

**Navigation Items:**
1. **Home** (`/`) - Recent meals view
2. **Search** (`/search`) - Find and filter meals
3. **Add Meal** (`/add`) - Primary action (highlighted)
4. **Analytics** (`/analytics`) - Eating insights
5. **Settings** (`/settings`) - App preferences

### Header
**Location**: `src/components/layout/Header.tsx`

Application header with branding and user actions.

### Layout
**Location**: `src/components/layout/Layout.tsx`

Main application layout wrapper.

```typescript
import { Layout } from '~/components/layout/Layout';

function App() {
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  );
}
```

## 🛠️ Utility Components

### ErrorBoundary
**Location**: `src/components/ErrorBoundary.tsx`

React error boundary for graceful error handling.

```typescript
import { ErrorBoundary } from '~/components/ErrorBoundary';

<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

### ConvexTest
**Location**: `src/components/ConvexTest.tsx`

Development component for testing Convex integration.

## 🔐 Authentication Components

> **Note**: Authentication components have been updated to use the latest Clerk API patterns. Deprecated properties (`redirectUrl`, `afterSignInUrl`, `afterSignUpUrl`) have been replaced with new fallback redirect properties (`fallbackRedirectUrl`, `signInFallbackRedirectUrl`, `signUpFallbackRedirectUrl`) for better control over post-authentication navigation.

### SignInPage
**Location**: `src/components/auth/SignInPage.tsx`

Complete sign-in page component using Clerk's pre-built SignIn component with FoodyLog branding and custom styling.

```typescript
import { SignInPage } from '~/components/auth/SignInPage';

// Used in App.tsx routing
<Route path="/auth/sign-in/*" element={<SignInPage />} />
```

**Features:**
- Clerk's accessible and secure sign-in form
- Custom FoodyLog branding and styling
- Mobile-optimized layout with responsive design
- Automatic redirect to intended destination after sign-in
- Integration with react-router-dom for SPA navigation
- Loading states during authentication checks
- Error handling for authentication issues

**Props:** None (self-contained component)

### SignUpPage
**Location**: `src/components/auth/SignUpPage.tsx`

Complete sign-up page component using Clerk's pre-built SignUp component with FoodyLog branding and feature preview.

```typescript
import { SignUpPage } from '~/components/auth/SignUpPage';

// Used in App.tsx routing
<Route path="/auth/sign-up/*" element={<SignUpPage />} />
```

**Features:**
- Clerk's accessible and secure sign-up form
- Custom FoodyLog branding and styling
- Mobile-optimized layout with responsive design
- Email verification flow integration
- Feature preview showcasing FoodyLog benefits
- Automatic redirect to intended destination after sign-up
- Integration with react-router-dom for SPA navigation

**Props:** None (self-contained component)

### ProtectedRoute
**Location**: `src/components/auth/ProtectedRoute.tsx`

Route wrapper component that ensures users are authenticated before accessing protected content.

```typescript
import { ProtectedRoute, PublicRoute, RequireAuth } from '~/components/auth/ProtectedRoute';

// Protect entire page
<ProtectedRoute>
  <MealListPage />
</ProtectedRoute>

// Public-only route (redirects authenticated users)
<PublicRoute>
  <LandingPage />
</PublicRoute>

// Require auth in component (throws error if not authenticated)
<RequireAuth>
  <UserProfile />
</RequireAuth>
```

**Features:**
- Authentication state checking with Clerk integration
- Automatic redirect to sign-in page for unauthenticated users
- Preserves intended destination for post-auth redirect
- Loading states during authentication checks
- Error handling for authentication issues
- Support for public-only routes
- RequireAuth variant for components that must have authentication

**Props:**
- `children: React.ReactNode` - Protected content to render
- `fallback?: React.ReactNode` - Custom loading component
- `redirectTo?: string` - Custom redirect path (defaults to /auth/sign-in)

### DevelopmentAuthWrapper
**Location**: `src/components/auth/DevelopmentAuthWrapper.tsx`

Development helper component that shows setup instructions when Clerk is not properly configured.

```typescript
import { DevelopmentAuthWrapper } from '~/components/auth/DevelopmentAuthWrapper';

// Used in main.tsx
<DevelopmentAuthWrapper isClerkConfigured={isClerkConfigured}>
  <App />
</DevelopmentAuthWrapper>
```

**Features:**
- Detects if Clerk is properly configured
- Shows step-by-step setup instructions for developers
- Explains why Clerk is used for FoodyLog
- Links to relevant documentation
- Styled with FoodyLog design system
- Only shows in development when Clerk is not configured

**Props:**
- `children: React.ReactNode` - App content to render when configured
- `isClerkConfigured: boolean` - Whether Clerk is properly set up

### AuthTestPage
**Location**: `src/components/auth/AuthTestPage.tsx`

Comprehensive authentication testing interface for manual verification of authentication flows, session management, and deep linking functionality.

```typescript
import { AuthTestPage } from '~/components/auth/AuthTestPage';

// Used in App.tsx routing (protected route)
<Route path="/auth-test" element={<AuthTestPage />} />
```

**Features:**
- **Authentication State Display**: Real-time display of current authentication status from Clerk
- **User Information**: Shows user profile data, creation/update timestamps, and session details
- **Session Information**: Displays session persistence data, current URL, and timing information
- **Test Actions**: Interactive buttons for testing deep linking, page refresh, and navigation
- **Protected Route Verification**: Visual confirmation that protected routes are working correctly
- **Manual Testing Tools**: Comprehensive tools for testing authentication flows

**Key Testing Capabilities:**
- Deep link testing to protected routes (e.g., `/analytics`)
- Session persistence verification across page refreshes
- Navigation testing to different protected routes
- Sign-out functionality testing
- Authentication state monitoring

**Usage:**
- Access via `/auth-test` when authenticated
- Provides step-by-step testing instructions
- Shows real-time authentication state changes
- Includes visual indicators for successful authentication features

**Props:** None (self-contained component)

**Security Note:** This component is only accessible to authenticated users via protected routes and is intended for development and testing purposes.

### DeviceEmulationWarning
**Location**: `src/components/auth/DeviceEmulationWarning.tsx`

Development helper component that shows a dismissible warning banner when device emulation is detected during authentication flows.

```typescript
import { DeviceEmulationWarning } from '~/components/auth/DeviceEmulationWarning';

// Used in authentication pages
<DeviceEmulationWarning />
```

**Features:**
- **Automatic Detection**: Detects Chrome DevTools device emulation
- **Development Only**: Only shows in development mode
- **Dismissible**: Can be dismissed for the current session
- **Helpful Instructions**: Provides clear steps to resolve Cloudflare issues
- **Session Storage**: Remembers dismissal state per session

**Purpose:**
Helps developers avoid Cloudflare verification loops that occur when using Chrome DevTools device emulation during authentication flows.

**Props:** None (self-contained component)

### UserButton
**Location**: `src/components/auth/UserButton.tsx`

User profile button component with sign-out functionality using Clerk's UserButton.

```typescript
import { UserButton, SignOutButton } from '~/components/auth/UserButton';

// Full user button with profile menu
<UserButton />

// Simple sign-out button
<SignOutButton variant="ghost" size="sm" />
```

**Features:**
- **Clerk Integration**: Uses Clerk's UserButton with custom styling
- **Profile Menu**: Access to account management and sign-out
- **Custom Styling**: Matches FoodyLog design system
- **Responsive**: Shows user info on larger screens
- **Alternative Component**: Simple SignOutButton for minimal use cases

**Props:**
- `UserButton`: None (self-contained)
- `SignOutButton`: `variant?`, `size?` (button styling options)

## 🔐 Authentication Patterns

### useAuth Hook
**Location**: `src/hooks/useAuth.ts`

Custom hook that provides unified authentication state management across FoodyLog.

```typescript
import { useAuth, useRequireAuth, useAuthRedirect } from '~/hooks/useAuth';

// Basic usage
const { isAuthenticated, user, isLoading, signOut } = useAuth();

// Require authentication (throws error if not authenticated)
const user = useRequireAuth();

// Handle authentication redirects
const { shouldRedirect, redirectTo } = useAuthRedirect(true);
```

**Features:**
- Unified interface for Clerk authentication state
- User profile data extraction and formatting
- Loading and error state management
- Session persistence across app restarts
- Mobile-optimized authentication flows
- Integration with Convex backend (planned)

### Authentication Flow
1. **Unauthenticated users** are redirected to `/auth/sign-in`
2. **Sign-in page** handles authentication with Clerk
3. **After authentication**, users are redirected to their intended destination
4. **Protected routes** automatically check authentication status
5. **Session management** handles token refresh and logout

### Clerk Configuration
**Location**: `src/lib/auth/clerk.ts`

Centralized Clerk configuration with FoodyLog custom theming:

```typescript
import { clerkConfig } from '~/lib/auth/clerk';

// Custom appearance matching FoodyLog design system
// Environment-based configuration
// Mobile-optimized authentication flows
```

**Features:**
- Custom appearance matching FoodyLog design system
- Environment variable validation
- Mobile-optimized UI components
- Integration with shadcn/ui theme system
- Development mode detection and warnings

## 📚 Utility Functions

### Theme Utils
**Location**: `src/lib/theme.ts`

Theme-related utility functions and hooks.

```typescript
import { useTheme, getEffectiveTheme, themeConfig } from '~/lib/theme';

// Theme hook (graceful fallback if used outside provider)
const { theme, setTheme } = useTheme();

// Get effective theme (resolves 'system' to actual theme)
const effectiveTheme = getEffectiveTheme('system'); // 'light' or 'dark'

// Access theme colors programmatically
const lightColors = themeConfig.light;
const darkColors = themeConfig.dark;
```

**Functions:**
- `useTheme()` - Hook for accessing theme context with graceful fallback
- `getEffectiveTheme(theme)` - Resolves 'system' theme to actual light/dark preference
- `themeConfig` - Object containing theme color definitions for programmatic access

### Core Utils
**Location**: `src/lib/utils.ts`

Essential utility functions for the application.

```typescript
import { 
  cn, 
  getRatingColor, 
  formatTimeAgo, 
  formatPrice, 
  truncateText,
  isValidUrl,
  generateTempId,
  debounce,
  isMobile,
  getDefaultMealType
} from '~/lib/utils';

// Class name merging (shadcn/ui standard)
const className = cn('base-class', condition && 'conditional-class');

// Rating colors
const colorClass = getRatingColor(8); // Returns 'text-rating-great'

// Time formatting
const timeAgo = formatTimeAgo(Date.now() - 3600000); // "1 hour ago"

// Price formatting
const price = formatPrice(12.50); // "$12.50"

// Text truncation
const shortText = truncateText("Very long meal title", 20); // "Very long meal ti..."

// URL validation
const isValid = isValidUrl("https://example.com"); // true

// Temporary ID generation
const tempId = generateTempId(); // "temp_1234567890_abc123def"

// Function debouncing
const debouncedSearch = debounce(searchFunction, 300);

// Mobile detection
const onMobile = isMobile(); // true/false

// Smart meal type default
const mealType = getDefaultMealType(); // "breakfast", "lunch", "dinner", or "snack"
```

## 🎨 Theme Integration

All components automatically integrate with the FoodyLog theme system through CSS custom properties:

### Color Tokens
```css
/* Light Mode */
--background: 30 43% 90%;     /* #f0e5d9 - Warm cream */
--foreground: 30 12% 16%;     /* #2f2a25 - Dark brown */
--primary: 139 29% 42%;       /* #5da271 - Green accent */

/* Dark Mode */
--background: 24 7% 12%;      /* #1e1b1a - Dark brown */
--foreground: 30 43% 90%;     /* #f0e5d9 - Cream */
--primary: 139 29% 35%;       /* #4b845e - Darker green */
```

### Rating Colors
```css
--rating-excellent: 139 35% 45%;  /* Darker green */
--rating-great: 139 29% 42%;      /* Primary green */
--rating-good: 45 93% 47%;        /* Yellow */
--rating-poor: 25 95% 53%;        /* Orange */
--rating-bad: 0 84% 60%;          /* Red */
```

## 📱 Mobile Considerations

All components are designed mobile-first with:

- **Touch Targets**: Minimum 44px height for accessibility
- **Safe Areas**: Proper handling of device notches and home indicators
- **Responsive Design**: Adapts to various screen sizes
- **Gesture Support**: Swipe, tap, and long-press interactions
- **Performance**: Optimized for mobile devices

## ♿ Accessibility Features

Components include comprehensive accessibility support:

- **WCAG 2.1 AA Compliance**: All color contrasts meet standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user motion preferences

## 🧪 Testing

Components are tested with:

- **Unit Tests**: Vitest + React Testing Library
- **Accessibility Tests**: axe-core integration with custom FoodyLog configuration
- **Visual Regression**: Planned for future iterations

### Accessibility Testing Utilities

**Location**: `src/test/accessibility.ts`

All components should include accessibility testing using our comprehensive testing utilities:

```typescript
import { render } from '@testing-library/react';
import { testAccessibility } from '~/test/accessibility';

test('Component accessibility compliance', async () => {
  const renderResult = render(<YourComponent />);
  
  await testAccessibility(renderResult, {
    expectedFocusableElements: 2, // Number of interactive elements
    expectedAriaLive: ['polite'], // Expected live regions
    skipColorContrast: false, // Test color contrast
    skipKeyboardNavigation: false // Test keyboard navigation
  });
});
```

### Current Test Coverage

#### Theme System (`src/lib/theme.test.tsx`)
- ✅ **ThemeProvider functionality**: Default theme, stored theme loading, custom defaults
- ✅ **Theme switching**: Light, dark, and system mode transitions
- ✅ **localStorage integration**: Theme persistence and custom storage keys
- ✅ **System preference detection**: Automatic dark/light mode based on OS settings
- ✅ **Document class management**: Proper CSS class application and removal
- ✅ **useTheme hook**: Context access with graceful fallback behavior
- ✅ **getEffectiveTheme utility**: System theme resolution to actual light/dark values
- ✅ **Integration testing**: Complete theme switching workflow verification

#### Authentication System
- ✅ **ProtectedRoute component**: Authentication state checking and redirects
- ✅ **PublicRoute component**: Unauthenticated-only route protection
- ✅ **Clerk integration**: Mocked authentication flows and session management
- ✅ **Route protection**: Comprehensive testing of authenticated/unauthenticated states
- ✅ **Error handling**: Authentication errors and edge case scenarios

#### Accessibility Testing Framework
- ✅ **axe-core Configuration**: Custom configuration for FoodyLog's design system
- ✅ **Keyboard Navigation Testing**: Automated testing of tab order and keyboard accessibility
- ✅ **Focus Management Testing**: Modal and dialog focus trap verification
- ✅ **Screen Reader Testing**: ARIA implementation and announcement verification
- ✅ **Color Contrast Testing**: WCAG AA compliance verification
- ✅ **Mock Screen Reader**: Testing utilities for screen reader interactions
- ✅ **Comprehensive Test Suite**: Single function to run all accessibility tests

### Component Testing Examples

#### Basic Component Accessibility Test

```typescript
import { render } from '@testing-library/react';
import { testAccessibility } from '~/test/accessibility';
import { Button } from '~/components/ui/button';

describe('Button Accessibility', () => {
  test('meets WCAG 2.1 AA standards', async () => {
    const renderResult = render(
      <Button onClick={vi.fn()}>Save Meal</Button>
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });
});
```

#### Form Component Accessibility Test

```typescript
import { render } from '@testing-library/react';
import { testAccessibility, testScreenReaderAnnouncements } from '~/test/accessibility';
import { MealForm } from '~/components/meal/MealForm';

describe('MealForm Accessibility', () => {
  test('form accessibility compliance', async () => {
    const renderResult = render(<MealForm onSubmit={vi.fn()} />);

    await testAccessibility(renderResult, {
      expectedFocusableElements: 6, // All form inputs and submit button
      expectedAriaLive: ['polite'], // Form validation messages
    });
  });

  test('proper form labeling', async () => {
    const renderResult = render(<MealForm onSubmit={vi.fn()} />);
    
    testScreenReaderAnnouncements(renderResult, ['polite']);
  });
});
```

#### Navigation Component Accessibility Test

```typescript
import { render } from '@testing-library/react';
import { testKeyboardNavigation } from '~/test/accessibility';
import { Navigation } from '~/components/layout/Navigation';

describe('Navigation Accessibility', () => {
  test('keyboard navigation works correctly', async () => {
    const renderResult = render(<Navigation />);

    const focusableElements = await testKeyboardNavigation(renderResult, 5);
    
    // Verify all navigation items are accessible
    expect(focusableElements).toHaveLength(5);
    expect(focusableElements[2]).toHaveAttribute('href', '/add'); // Primary action
  });
});
```

#### Modal Component Focus Management Test

```typescript
import { render } from '@testing-library/react';
import { testFocusTrap } from '~/test/accessibility';
import { MealEditDialog } from '~/components/meal/MealEditDialog';

describe('MealEditDialog Accessibility', () => {
  test('focus management works correctly', async () => {
    const renderResult = render(
      <MealEditDialog 
        isOpen={true} 
        meal={mockMeal} 
        onClose={vi.fn()} 
      />
    );

    await testFocusTrap(
      renderResult,
      '[data-testid="edit-meal-button"]',
      '[role="dialog"]'
    );
  });
});
```

## 📝 Usage Guidelines

### Component Naming
- **PascalCase** for component files: `MealCard.tsx`
- **camelCase** for utility files: `formatDate.ts`
- **kebab-case** for shadcn/ui components: `dropdown-menu.tsx`

### Import Patterns
```typescript
// UI components
import { Button, Card, Badge } from '~/components/ui';

// Layout components
import { Navigation, Header } from '~/components/layout';

// Utilities
import { cn, formatTimeAgo } from '~/lib/utils';
import { useTheme } from '~/lib/theme';
```

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Leverage CSS custom properties for theme colors
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design principles

## 🔄 Future Components

Planned components for upcoming sprints:

### Sprint 2: Core Meal Logging
- **MealCard** - Display meal entries with photos and ratings
- **PhotoCapture** - Camera integration with Capacitor Camera plugin
- **MealForm** - Add/edit meal form with validation
- **RatingInput** - Star rating component (1-10 scale)
- **TagInput** - Tag management with autocomplete
- **LocationPicker** - Restaurant/location selection

### Sprint 3: Meal Management & Search
- **SearchBar** - Meal search interface with filters
- **FilterPanel** - Advanced filtering (date, rating, tags, price)
- **MealList** - Paginated meal display with infinite scroll
- **MealDetail** - Detailed meal view with edit/delete actions
- **PhotoGallery** - Multiple photo display and management

### Sprint 4: Analytics & Polish
- **AnalyticsChart** - Data visualization with Chart.js
- **StatsCard** - Metric display (spending, ratings, frequency)
- **ExportDialog** - Data export (CSV, JSON)
- **SettingsPanel** - User preferences and account management
- **NotificationCenter** - Push notification management

---

This component documentation is maintained as part of the FoodyLog project. Please keep it updated as new components are added or existing ones are modified.