# Design Document

## Overview

The Design System Implementation provides a comprehensive, accessible, and maintainable foundation for FoodyLog's user interface. Built on shadcn/ui with Tailwind CSS, this system establishes consistent visual design, interaction patterns, and component architecture that supports both web and mobile platforms through Capacitor 7.

The design system emphasizes food-focused aesthetics, mobile-first responsiveness, and accessibility compliance (WCAG 2.1 AA) while providing the flexibility needed for FoodyLog's freemium business model and future feature expansion.

**Design Mission:** _"Create the most intuitive and visually appealing way to capture and relive food memories"_

## Design Principles

### 1. Mobile-First & Touch-Optimized
- Thumb-friendly navigation with 44px minimum touch targets
- Gesture-based interactions (swipe, pinch, tap)
- One-handed operation for core functions
- Optimized for various screen sizes (iPhone SE to iPhone 15 Pro Max)

### 2. Visual Hierarchy & Clarity
- Food photos as the primary visual element
- Clear typography with excellent readability
- Consistent spacing and alignment
- Strategic use of color to guide attention

### 3. Speed & Efficiency
- Minimal steps to complete core actions
- Smart defaults and predictive inputs
- Progressive disclosure of advanced features
- Instant visual feedback for all interactions

### 4. Emotional Connection
- Beautiful food photography presentation
- Warm, inviting color palette
- Micro-interactions that delight
- Personal touches that make the app feel unique to each user

### 5. Accessibility First
- WCAG 2.1 AA compliance
- High contrast ratios (4.5:1 minimum)
- Screen reader compatibility
- Keyboard navigation support
- Scalable text up to 200%

## Architecture

### Technology Stack

**Core Technologies:**
- **shadcn/ui**: Component foundation with copy-paste architecture
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **CSS Custom Properties**: Dynamic theming system supporting light/dark modes
- **Radix UI**: Accessible component primitives (via shadcn/ui)
- **Lucide React**: Consistent icon system
- **React 19**: Modern React features including concurrent rendering and improved hooks

**Integration Points:**
- **Vite**: Build system with optimized CSS processing
- **TypeScript**: Type-safe component development
- **Capacitor 7**: Mobile platform compatibility
- **Convex**: Real-time data integration considerations

### Design System Architecture

```
Design System Structure:
├── Theme Configuration
│   ├── CSS Custom Properties (light/dark modes)
│   ├── Tailwind Config Extensions
│   └── Component Variants System
├── Base Components (shadcn/ui)
│   ├── Primitive Components (Button, Input, Card)
│   ├── Composite Components (Form, Dialog, Navigation)
│   └── Layout Components (Container, Grid, Stack)
├── FoodyLog Components
│   ├── Meal-specific Components
│   ├── Food Photography Components
│   └── Analytics/Chart Components
└── Documentation & Examples
    ├── Component Storybook
    ├── Usage Guidelines
    └── Accessibility Documentation
```

### FoodyLog Custom Theme System

**CSS Variables Approach:**
- Primary theming through CSS custom properties
- Automatic light/dark mode switching via `prefers-color-scheme`
- Manual theme toggle support with `[data-theme="dark"]`
- Consistent color semantics across components
- Mobile-safe color contrast ratios

**FoodyLog Color Palette:**
```css
/* Base Theme Colors - Light Mode */
:root {
  --background: 30 43% 90%; /* hsla(30, 43%, 90%, 1) - #f0e5d9 */
  --background-hover: 30 40% 87%; /* hsla(30, 40%, 87%, 1) - #e3d5c5 */
  --subtle: 30 33% 80%; /* hsla(30, 33%, 80%, 1) - #d4c2b2 */
  --text: 30 12% 16%; /* hsla(30, 12%, 16%, 1) - #2f2a25 */

  /* Accent Colors - Green */
  --accent: 139 29% 42%; /* hsla(139, 29%, 42%, 1) - #5da271 */
  --accent-hover: 139 29% 46%; /* hsla(139, 29%, 46%, 1) - #6fb07e */
  --accent-press: 139 29% 50%; /* hsla(139, 29%, 50%, 1) - #80bd8c */
  --accent-text: 0 0% 100%; /* hsla(0, 0%, 100%, 1) - #ffffff */

  /* shadcn/ui compatible variables */
  --primary: var(--accent);
  --primary-foreground: var(--accent-text);
  --secondary: var(--subtle);
  --secondary-foreground: var(--text);
  --muted: var(--background-hover);
  --muted-foreground: var(--text);
  --card: var(--background);
  --card-foreground: var(--text);
  --popover: var(--background);
  --popover-foreground: var(--text);
  --border: var(--subtle);
  --input: var(--background-hover);
  --ring: var(--accent);
  --foreground: var(--text);

  /* Semantic Colors */
  --success: 139 29% 42%; /* Using accent green for success */
  --warning: 45 93% 47%; /* #f59e0b */
  --error: 0 84% 60%; /* #ef4444 */
  --info: 221 83% 53%; /* #3b82f6 */

  /* Rating Colors (using green accent variations) */
  --rating-excellent: 139 35% 45%; /* Darker green for excellent */
  --rating-great: 139 29% 42%; /* Accent green for great */
  --rating-good: 45 93% 47%; /* Warning yellow for good */
  --rating-poor: 25 95% 53%; /* Orange for poor */
  --rating-bad: 0 84% 60%; /* Error red for bad */
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 24 7% 12%; /* hsla(24, 7%, 12%, 1) - #1e1b1a */
    --background-hover: 28 9% 16%; /* hsla(28, 9%, 16%, 1) - #2a2522 */
    --subtle: 34 12% 22%; /* hsla(34, 12%, 22%, 1) - #453f3b */
    --text: 30 43% 90%; /* hsla(30, 43%, 90%, 1) - #f0e5d9 */

    /* Accent Colors - Green (Dark) */
    --accent: 139 29% 35%; /* hsla(139, 29%, 35%, 1) - #4b845e */
    --accent-hover: 139 29% 41%; /* hsla(139, 29%, 41%, 1) - #609a70 */
    --accent-press: 139 29% 47%; /* hsla(139, 29%, 47%, 1) - #74b182 */
    --accent-text: 30 12% 16%; /* hsla(30, 12%, 16%, 1) - #2f2a25 */
  }
}

/* Manual dark mode toggle */
[data-theme="dark"] {
  --background: 24 7% 12%;
  --background-hover: 28 9% 16%;
  --subtle: 34 12% 22%;
  --text: 30 43% 90%;
  --accent: 139 29% 35%;
  --accent-hover: 139 29% 41%;
  --accent-press: 139 29% 47%;
  --accent-text: 30 12% 16%;
}
```

**Typography System:**
```css
/* Font Family */
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Spacing System (4px grid):**
```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
```

## Components and Interfaces

### Core UI Components (shadcn/ui Based)

#### Button Component
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// Usage optimized for meal logging actions
<Button variant="default" size="lg">Add Meal</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" size="icon"><Camera className="h-4 w-4" /></Button>
```

#### MealCard Component (Custom)
```typescript
interface MealCardProps {
  meal: {
    id: string;
    title: string;
    rating: number;
    dateEaten: number;
    mealType: string;
    locationText?: string;
    tags: string[];
    primaryPhoto?: string;
    price?: number;
  };
  onTap?: (mealId: string) => void;
  showPrice?: boolean;
  compact?: boolean;
  className?: string;
}

// Visual Specifications:
// - Height: 80px (compact) / 120px (full)
// - Photo: 64x64px rounded corners (8px)
// - Title: text-lg font-semibold, max 2 lines with ellipsis
// - Rating: Star icon + number, primary color
// - Touch target: Full card area, 44px minimum height
```

#### PhotoCapture Component (Custom)
```typescript
interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  onPhotoSelect: (photo: string) => void;
  currentPhoto?: string;
  maxSize?: number; // in MB
  quality?: number; // 0-100
  maxPhotos?: number; // Freemium: 1 for free, 5 for premium
}

// Visual Specifications:
// - Default state: 200px height, dashed border, centered icon
// - With photo: Full image display with overlay controls
// - Actions: Camera icon, gallery icon, remove icon
// - Loading state: Spinner overlay during capture/processing
```

#### RatingInput Component (Custom)
```typescript
interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number; // default 10
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  disabled?: boolean;
}

// Visual Specifications:
// - Interactive stars with hover/tap states
// - Smooth animation on selection
// - Color gradient based on rating value
// - Size variants: sm (20px), md (24px), lg (32px)
```

#### TagInput Component (Custom)
```typescript
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
}

// Visual Specifications:
// - Pill-shaped tag display with remove buttons
// - Auto-complete dropdown with suggestions
// - Smooth add/remove animations
// - Character limit indicator
```

#### Input Components (shadcn/ui)
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// Enhanced for meal logging
<Input 
  label="Meal Title" 
  placeholder="What did you eat?"
  required
  maxLength={100}
/>
```

#### Badge Component (shadcn/ui)
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

// For meal tags and ratings
<Badge variant="outline">Italian</Badge>
<Badge variant="default">★ 8.5</Badge>
```

### Layout Components

#### Navigation System
```typescript
interface NavigationProps {
  variant: 'bottom' | 'sidebar' | 'header';
  items: NavigationItem[];
  activeItem: string;
  onItemSelect: (item: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number; // For notification counts
}

// Mobile-first bottom navigation (primary)
// - Height: 60px with safe area handling
// - Touch targets: 44x44px minimum
// - Active state: Primary color with icon fill
// - Badge: Small red circle for notifications
```

#### Layout Container
```typescript
interface LayoutProps {
  variant: 'default' | 'centered' | 'full-width';
  padding: 'none' | 'sm' | 'md' | 'lg';
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

// Responsive breakpoints:
// - sm: 640px (Mobile landscape)
// - md: 768px (Tablet portrait)
// - lg: 1024px (Tablet landscape / Small desktop)
// - xl: 1280px (Desktop)
```

#### Screen Layouts (SPA with React Router)

**Home/Meal List Screen:**
```
┌─────────────────────────────────────┐
│ ☰  FoodyLog         [UserButton]  │ Header (60px, Clerk UserButton)
├─────────────────────────────────────┤
│ 📊 This Week: 12 meals logged      │ Stats Card (80px)
│ ⭐ Average rating: 8.2/10           │
├─────────────────────────────────────┤
│ 🔍 Search meals...                  │ Search Bar (48px)
├─────────────────────────────────────┤
│ [MealCard Components]               │ Infinite scroll list
│ ┌─────┐ Delicious Pizza      ⭐ 9  │ 80px height each
│ │ 📷  │ Tony's Pizzeria           │
│ │     │ 2 hours ago               │
│ └─────┘ #pizza #italian #cheesy    │
├─────────────────────────────────────┤
│           ➕ Add Meal               │ FAB (60px)
└─────────────────────────────────────┘
```

**Add Meal Screen:**
```
┌─────────────────────────────────────┐
│ ←  Add New Meal              ✓ Save │ Header (protected route)
├─────────────────────────────────────┤
│ [PhotoCapture Component]            │ 200px height
│         📷 Add Photo                │
│      Tap to take photo              │
├─────────────────────────────────────┤
│ [Form Components]                   │
│ • Meal Title Input (48px)           │
│ • Rating Input (48px)               │
│ • Meal Type Dropdown (48px)         │
│ • Location Input (48px)             │
│ • Price Input (48px)                │
│ • Tags Input (48px)                 │
└─────────────────────────────────────┘
```

### Micro-Interactions & Animations

#### Meal Card Interactions
```css
/* Hover/Press States */
.meal-card {
  transition: all 0.2s ease-in-out;
}

.meal-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.meal-card:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}
```

#### Photo Capture Animation
```css
/* Camera shutter effect */
@keyframes shutter {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.photo-capture-flash {
  animation: shutter 0.3s ease-in-out;
}
```

#### Rating Selection
```css
/* Star fill animation */
@keyframes star-fill {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.star-selected {
  animation: star-fill 0.3s ease-in-out;
}
```

#### Form Validation
```css
/* Error shake animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.input-error {
  animation: shake 0.5s ease-in-out;
  border-color: var(--error);
}
```

## Data Models

### Theme Configuration
```typescript
interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg';
  fontScale: 'sm' | 'md' | 'lg';
}

// Theme provider hook for React 19 compatibility
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
}
```

### Accessibility Configuration
```typescript
interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  focusVisible: boolean;
  screenReaderOptimized: boolean;
}

// Touch target specifications
const TOUCH_TARGETS = {
  minimum: 44, // 44px minimum for iOS
  recommended: 48, // 48dp recommended for Android
  spacing: 8, // 8px minimum spacing between targets
} as const;
```

### Responsive Breakpoints
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
} as const;

// Responsive design patterns
const RESPONSIVE_PATTERNS = {
  mobileFirst: true,
  touchOptimized: true,
  safeAreaHandling: true,
  oneHandedOperation: true,
} as const;
```

### Icon System (Lucide React)
```typescript
// Core app icons
import {
  Camera, // Photo capture
  Star, // Ratings
  MapPin, // Location
  Tag, // Tags
  Clock, // Time/Date
  DollarSign, // Price
  Search, // Search
  Filter, // Filtering
  Plus, // Add actions
  MoreHorizontal, // More options
  Edit, // Edit actions
  Trash2, // Delete actions
  Share, // Share actions
  BarChart3, // Analytics
  Settings, // Settings
  User, // Profile
  Menu, // Navigation
  ChevronLeft, // Back navigation
  ChevronRight, // Forward navigation
  ChevronDown, // Dropdown
  X, // Close/Cancel
  Check, // Confirm/Success
  AlertCircle, // Warnings
  Info, // Information
  Heart, // Favorites
} from "lucide-react";

// Icon usage guidelines
const ICON_SIZES = {
  sm: 16, // Inline text icons
  md: 20, // Secondary actions
  lg: 24, // Primary actions
  xl: 32, // Hero icons
} as const;
```

## Error Handling

### Component Error Boundaries
```typescript
interface DesignSystemErrorBoundaryProps {
  fallback?: React.ComponentType<{error: Error}>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
}

// Graceful degradation for component failures
<DesignSystemErrorBoundary fallback={SimpleErrorFallback}>
  <ComplexComponent />
</DesignSystemErrorBoundary>
```

### Theme Loading States
```typescript
interface ThemeProviderProps {
  defaultTheme: 'light' | 'dark' | 'system';
  storageKey: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  children: React.ReactNode;
}

// Prevent flash of unstyled content
<ThemeProvider 
  defaultTheme="system" 
  storageKey="foodylog-theme"
  disableTransitionOnChange
>
  <App />
</ThemeProvider>
```

### Validation and Feedback
```typescript
interface ValidationState {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface FormFieldProps {
  validation?: ValidationState;
  showValidation?: 'always' | 'on-blur' | 'on-submit';
  validationDelay?: number;
}
```

## Testing Strategy

### Component Testing Approach
```typescript
// Example test structure for design system components
describe('Button Component', () => {
  it('renders all variants correctly', () => {
    // Test visual variants
  });
  
  it('handles interactions properly', () => {
    // Test click, focus, keyboard navigation
  });
  
  it('meets accessibility standards', () => {
    // Test ARIA attributes, keyboard navigation, screen reader compatibility
  });
  
  it('works on mobile devices', () => {
    // Test touch interactions, responsive behavior
  });
});
```

### Visual Regression Testing
- Automated screenshot comparison for component variants
- Cross-browser compatibility testing
- Mobile device testing across different screen sizes
- Dark/light mode consistency verification

### Accessibility Testing
- Automated axe-core integration
- Manual screen reader testing
- Keyboard navigation verification
- Color contrast validation
- Focus management testing

### Performance Testing
- Component render performance benchmarks
- CSS bundle size optimization
- Runtime performance monitoring
- Memory usage validation

## Implementation Phases

### Phase 1: Foundation Setup (Sprint 1 - Stories 1.2.1 & 1.2.2)

**Story 1.2.1: Setup shadcn/ui with Custom Theme (8 points)**
1. **shadcn/ui Installation & Configuration**
   - Install shadcn/ui CLI and core dependencies
   - Configure `components.json` with FoodyLog paths and preferences
   - Set up Tailwind CSS with custom theme extensions
   - Install required dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`

2. **FoodyLog Custom Theme Implementation**
   - Implement CSS custom properties with FoodyLog color palette
   - Configure light/dark mode variables with food-inspired colors
   - Set up automatic theme switching via `prefers-color-scheme`
   - Add manual theme toggle support with `[data-theme="dark"]`

3. **Theme Provider Setup**
   - Create theme provider component with React 19 compatibility
   - Implement theme persistence with localStorage
   - Add system preference detection
   - Prevent flash of unstyled content (FOUC)

**Story 1.2.2: Core UI Components (8 points)**
1. **shadcn/ui Base Components**
   - Install and customize Button component with FoodyLog variants
   - Install and customize Card component for meal display
   - Install and customize Input components with validation states
   - Install and customize Badge component for tags and ratings

2. **Loading and Error States**
   - Create loading spinner components with FoodyLog branding
   - Implement skeleton loading states for meal cards
   - Design error state components with recovery actions
   - Add toast notification system for user feedback

3. **Component Testing & Documentation**
   - Write unit tests for all base components
   - Create component documentation with usage examples
   - Test components in light/dark modes
   - Verify accessibility compliance (WCAG 2.1 AA)

### Phase 2: Layout and Navigation (Sprint 1 - Story 1.2.3)

**Story 1.2.3: Layout and Navigation (SPA) (4 points)**
1. **Main Layout Structure**
   - Create main layout component with header, content, and navigation areas
   - Implement safe area handling for mobile devices (iOS notch, Android navigation)
   - Add responsive container with max-width constraints
   - Set up proper semantic HTML structure for accessibility

2. **Bottom Navigation (Mobile-First)**
   - Create bottom navigation component with touch-optimized targets (44px minimum)
   - Implement active state indicators with FoodyLog accent colors
   - Add navigation icons from Lucide React with proper sizing
   - Handle navigation state with React Router integration

3. **Page Transitions & Responsive Behavior**
   - Implement smooth page transitions with CSS animations
   - Add responsive navigation that adapts to screen size
   - Create header component with user menu (Clerk UserButton integration)
   - Test navigation on various device sizes and orientations

### Phase 3: Custom Components & Polish (Sprint 2)

**Future Implementation (Post-MVP):**
1. **Food-Specific Components**
   - MealCard component with photo, rating, and details
   - PhotoCapture component with camera integration
   - RatingInput component with 10-point scale
   - TagInput component with autocomplete

2. **Advanced Features**
   - Micro-interactions and animations
   - Advanced form components
   - Data visualization components
   - Performance optimizations

## Design Decisions and Rationale

### Why shadcn/ui?
- **Copy-paste architecture**: Full control over component code, perfect for customization
- **Accessibility-first**: Built on Radix UI primitives with WCAG compliance
- **Customization flexibility**: Easy to modify for FoodyLog's food-focused aesthetic
- **TypeScript support**: Excellent developer experience with full type safety
- **React 19 compatibility**: Modern React features and concurrent rendering support
- **Community adoption**: Well-maintained, documented, and widely adopted

### CSS Custom Properties vs Utility Classes
- **Dynamic theming**: CSS variables enable runtime theme switching (light/dark)
- **Performance**: Reduced CSS bundle size compared to utility-only approach
- **Maintainability**: Centralized color management with semantic naming
- **Mobile compatibility**: Better support for system theme preferences
- **Food-focused branding**: Easy to maintain warm, appetite-appealing color palette

### Mobile-First Design Approach
- **Primary use case**: Food logging is primarily a mobile activity (80% of usage)
- **Touch interactions**: 44px minimum touch targets, optimized for thumb navigation
- **Performance**: Mobile-optimized asset loading and rendering
- **Accessibility**: Touch target size compliance and gesture support
- **One-handed operation**: Core functions accessible with thumb reach

### Food-Focused Color Palette Rationale
- **Appetite appeal**: Warm, earthy tones (beiges, greens) enhance food photography
- **Brand alignment**: Colors reflect FoodyLog's mission of celebrating food memories
- **Accessibility**: All color combinations meet WCAG 2.1 AA contrast ratios (4.5:1 minimum)
- **Cultural sensitivity**: Neutral, universally appealing colors that work globally
- **Photography enhancement**: Background colors that make food photos pop

### React 19 & Modern Stack Integration
- **Concurrent rendering**: Improved performance for image-heavy meal lists
- **Enhanced hooks**: Better state management for complex form interactions
- **Suspense improvements**: Smoother loading states for photo uploads
- **Automatic batching**: Better performance for rapid user interactions
- **Server components ready**: Future-proof for potential SSR implementation

### Accessibility-First Approach
- **WCAG 2.1 AA compliance**: All components meet accessibility standards
- **Screen reader support**: Proper semantic HTML and ARIA attributes
- **Keyboard navigation**: Full keyboard accessibility for all interactions
- **Touch accessibility**: Minimum 44px touch targets, proper spacing
- **Scalable text**: Support for 200% text scaling without layout breaks
- **Reduced motion**: Respect user preferences for motion sensitivity

This design system provides a robust, accessible, and visually appealing foundation for FoodyLog that prioritizes user experience, performance, and maintainability while staying true to the app's food-focused mission.