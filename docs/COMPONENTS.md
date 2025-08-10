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

**Features:**
- Automatic system theme detection
- localStorage persistence
- Smooth theme transitions
- CSS custom property integration

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

## 📚 Utility Functions

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
- **Accessibility Tests**: axe-core integration
- **Visual Regression**: Planned for future iterations

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
- **MealCard** - Display meal entries
- **PhotoCapture** - Camera integration
- **MealForm** - Add/edit meal form
- **RatingInput** - Star rating component

### Sprint 3: Meal Management & Search
- **SearchBar** - Meal search interface
- **FilterPanel** - Advanced filtering
- **MealList** - Paginated meal display
- **TagInput** - Tag management

### Sprint 4: Analytics & Polish
- **AnalyticsChart** - Data visualization
- **StatsCard** - Metric display
- **ExportDialog** - Data export
- **SettingsPanel** - User preferences

---

This component documentation is maintained as part of the FoodyLog project. Please keep it updated as new components are added or existing ones are modified.