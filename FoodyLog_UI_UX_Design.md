# FoodyLog - UI/UX Design Kickoff

_Version 2.0 - August 2025_

## 📋 Design Overview

FoodyLog is a mobile-first food logging application that prioritizes simplicity, speed, and visual appeal. The design focuses on making meal logging effortless while providing meaningful insights through beautiful, intuitive interfaces.

### Design Mission

_"Create the most intuitive and visually appealing way to capture and relive food memories"_

## 🎨 Design Principles

### 1. **Mobile-First & Touch-Optimized**

- Thumb-friendly navigation with 44px minimum touch targets
- Gesture-based interactions (swipe, pinch, tap)
- One-handed operation for core functions
- Optimized for various screen sizes (iPhone SE to iPhone 15 Pro Max)

### 2. **Visual Hierarchy & Clarity**

- Food photos as the primary visual element
- Clear typography with excellent readability
- Consistent spacing and alignment
- Strategic use of color to guide attention

### 3. **Speed & Efficiency**

- Minimal steps to complete core actions
- Smart defaults and predictive inputs
- Progressive disclosure of advanced features
- Instant visual feedback for all interactions

### 4. **Emotional Connection**

- Beautiful food photography presentation
- Warm, inviting color palette
- Micro-interactions that delight
- Personal touches that make the app feel unique to each user

### 5. **Accessibility First**

- WCAG 2.1 AA compliance
- High contrast ratios (4.5:1 minimum)
- Screen reader compatibility
- Keyboard navigation support
- Scalable text up to 200%

## 🎨 Design System

### Color Palette (Custom Theme)

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

    /* shadcn/ui compatible variables for dark mode */
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

### Typography

```css
/* Font Family */
--font-sans:
  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Spacing System

```css
/* Spacing Scale (based on 4px grid) */
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

### Border Radius

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-full: 9999px; /* Fully rounded */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:
  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## 📱 Screen Layouts & Wireframes

### 1. Home/Meal List Screen (Auth-aware with Clerk, SPA)

```
┌─────────────────────────────────────┐
│ ☰  FoodyLog         [UserButton]  │ Header (60px, Clerk UserButton)
├─────────────────────────────────────┤
│                                     │
│ 📊 This Week: 12 meals logged      │ Stats Card
│ ⭐ Average rating: 8.2/10           │ (80px)
│                                     │
├─────────────────────────────────────┤
│ 🔍 Search meals...                  │ Search Bar
├─────────────────────────────────────┤ (48px)
│                                     │
│ ┌─────┐ Delicious Pizza      ⭐ 9  │
│ │ 📷  │ Tony's Pizzeria           │ Meal Card
│ │     │ 2 hours ago               │ (80px)
│ └─────┘ #pizza #italian #cheesy    │
│                                     │
│ ┌─────┐ Morning Coffee       ⭐ 7  │
│ │ ☕  │ Home                      │ Meal Card
│ │     │ 4 hours ago               │ (80px)
│ └─────┘ #coffee #morning          │
│                                     │
│ ┌─────┐ Sushi Lunch         ⭐ 10 │
│ │ 🍣  │ Sakura Restaurant         │ Meal Card
│ │     │ Yesterday                 │ (80px)
│ └─────┘ #sushi #fresh #expensive  │
│                                     │
├─────────────────────────────────────┤
│           ➕ Add Meal               │ FAB
└─────────────────────────────────────┘ (60px)
```

### 2. Add Meal Screen (Protected)

```
┌─────────────────────────────────────┐
│ ←  Add New Meal              ✓ Save │ Header (requires auth; redirect to SignIn if unauthenticated)
### 0. Auth Screens (Clerk in SPA)

```

┌─────────────────────────────────────┐
│ Sign In / Sign Up │
├─────────────────────────────────────┤
│ [Clerk <SignIn/> / <SignUp/>] │
│ • Email/password │
│ • OAuth (optional) │
│ • Forgot password │
└─────────────────────────────────────┘

```
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │ Photo Area
│ │         📷 Add Photo            │ │ (200px)
│ │      Tap to take photo          │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Meal Title                          │
│ ┌─────────────────────────────────┐ │ Text Input
│ │ What did you eat?               │ │ (48px)
│ └─────────────────────────────────┘ │
│                                     │
│ Rating                              │
│ ⭐⭐⭐⭐⭐⭐⭐⭐☆☆              │ Star Rating
│                                     │ (48px)
│ Meal Type                           │
│ ┌─────────────────────────────────┐ │ Dropdown
│ │ 🍽️ Dinner                ▼     │ │ (48px)
│ └─────────────────────────────────┘ │
│                                     │
│ Location (Optional)                 │
│ ┌─────────────────────────────────┐ │ Text Input
│ │ 📍 Restaurant name or "Home"    │ │ (48px)
│ └─────────────────────────────────┘ │
│                                     │
│ Price (Optional)                    │
│ ┌─────────────────────────────────┐ │ Number Input
│ │ 💰 $0.00                        │ │ (48px)
│ └─────────────────────────────────┘ │
│                                     │
│ Tags (Optional)                     │
│ ┌─────────────────────────────────┐ │ Text Input
│ │ 🏷️ delicious, spicy, healthy    │ │ (48px)
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### 3. Meal Detail Screen

```
┌─────────────────────────────────────┐
│ ←  Delicious Pizza           ⋯ More │ Header
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │        [MEAL PHOTO]             │ │ Hero Photo
│ │                                 │ │ (250px)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Delicious Pizza            ⭐ 9/10  │ Title & Rating
│ Tony's Pizzeria                     │ Location
│ February 15, 2025 • 7:30 PM        │ Date & Time
│                                     │
│ 💰 $18.50                          │ Price
│                                     │
│ 🏷️ pizza  italian  cheesy  crispy  │ Tags
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📝 Notes                        │ │ Notes Section
│ │ Amazing thin crust pizza with   │ │ (Expandable)
│ │ fresh mozzarella and basil.     │ │
│ │ Perfect crispy texture!         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─ Actions ─────────────────────┐   │
│ │ ✏️ Edit   📤 Share   🗑️ Delete │   │ Action Buttons
│ └───────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### 4. Analytics Screen

```
┌─────────────────────────────────────┐
│ ☰  Analytics                    📊  │ Header
├─────────────────────────────────────┤
│                                     │
│ ┌─── This Month ──────────────────┐ │
│ │ 🍽️ 28 meals    ⭐ 8.1 avg      │ │ Summary Cards
│ │ 💰 $420.50     📈 +12% vs last │ │ (100px)
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─── Meal Types ──────────────────┐ │
│ │     🥞 Breakfast    ████ 25%    │ │
│ │     🥗 Lunch        ██████ 35%  │ │ Chart Section
│ │     🍽️ Dinner       ████████ 40%│ │ (150px)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─── Top Rated Meals ─────────────┐ │
│ │ 1. Sushi Omakase        ⭐ 10   │ │
│ │ 2. Mom's Lasagna        ⭐ 9.5  │ │ Top Lists
│ │ 3. BBQ Brisket          ⭐ 9.2  │ │ (120px)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─── Recent Activity ─────────────┐ │
│ │ • Logged 3 meals this week      │ │
│ │ • Tried 2 new restaurants       │ │ Activity Feed
│ │ • Average rating improved       │ │ (100px)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## 🧩 Component Specifications

### 1. MealCard Component

```typescript
interface MealCardProps {
  meal: {
    _id: string;
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
}
```

**Visual Specifications:**

- Height: 80px (compact) / 120px (full)
- Photo: 64x64px rounded corners (8px)
- Title: text-lg font-semibold, max 2 lines with ellipsis
- Rating: Star icon + number, primary color
- Location: text-sm text-neutral-500
- Tags: Horizontal scroll, pill-shaped, max 3 visible
- Touch target: Full card area, 44px minimum height

### 2. PhotoCapture Component

```typescript
interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  onPhotoSelect: (photo: string) => void;
  currentPhoto?: string;
  maxSize?: number; // in MB
  quality?: number; // 0-100
}
```

**Visual Specifications:**

- Default state: 200px height, dashed border, centered icon
- With photo: Full image display with overlay controls
- Actions: Camera icon, gallery icon, remove icon
- Loading state: Spinner overlay during capture/processing
- Error state: Red border with error message

### 3. RatingInput Component

```typescript
interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number; // default 10
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  disabled?: boolean;
}
```

**Visual Specifications:**

- Interactive stars with hover/tap states
- Smooth animation on selection
- Color gradient based on rating value
- Accessible with keyboard navigation
- Size variants: sm (20px), md (24px), lg (32px)

### 4. TagInput Component

```typescript
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
}
```

**Visual Specifications:**

- Pill-shaped tag display with remove buttons
- Auto-complete dropdown with suggestions
- Smooth add/remove animations
- Character limit indicator
- Keyboard navigation support

## 🎭 Micro-Interactions & Animations

### 1. Meal Card Interactions

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

### 2. Photo Capture Animation

```css
/* Camera shutter effect */
@keyframes shutter {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.photo-capture-flash {
  animation: shutter 0.3s ease-in-out;
}
```

### 3. Rating Selection

```css
/* Star fill animation */
@keyframes star-fill {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.star-selected {
  animation: star-fill 0.3s ease-in-out;
}
```

### 4. Form Validation

```css
/* Error shake animation */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.input-error {
  animation: shake 0.5s ease-in-out;
  border-color: var(--error-500);
}
```

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* Small phones */
@media (max-width: 374px) {
  .container {
    padding: var(--space-3);
  }
  .meal-card {
    height: 72px;
  }
  .photo-capture {
    height: 160px;
  }
}

/* Standard phones */
@media (min-width: 375px) and (max-width: 767px) {
  .container {
    padding: var(--space-4);
  }
  .meal-card {
    height: 80px;
  }
  .photo-capture {
    height: 200px;
  }
}

/* Large phones / Small tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--space-6);
  }
  .meal-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Tablets and Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-8);
  }
  .meal-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## ♿ Accessibility Guidelines

### 1. Color & Contrast

- All text meets WCAG AA contrast ratios (4.5:1 minimum)
- Interactive elements have 3:1 contrast ratio minimum
- Color is never the only way to convey information
- Focus indicators are clearly visible

### 2. Touch Targets

- Minimum 44x44px touch targets on iOS
- Minimum 48x48dp touch targets on Android
- Adequate spacing between interactive elements
- Clear visual feedback for all interactions

### 3. Screen Reader Support

```html
<!-- Semantic HTML structure -->
<main role="main" aria-label="Meal list">
  <section aria-labelledby="recent-meals">
    <h2 id="recent-meals">Recent Meals</h2>
    <article role="article" aria-label="Pizza meal, rated 9 out of 10">
      <img src="pizza.jpg" alt="Delicious pizza with melted cheese" />
      <h3>Delicious Pizza</h3>
      <div aria-label="Rating: 9 out of 10 stars">⭐ 9</div>
    </article>
  </section>
</main>

<!-- ARIA labels for complex interactions -->
<button aria-label="Add new meal" aria-describedby="add-meal-help">
  ➕ Add Meal
</button>
<div id="add-meal-help" class="sr-only">
  Opens form to log a new meal with photo and details
</div>
```

### 4. Keyboard Navigation

- Tab order follows logical flow
- All interactive elements are keyboard accessible
- Escape key closes modals and dropdowns
- Enter/Space activate buttons and links
- Arrow keys navigate within components

## 🌙 Dark Mode Support

The color system automatically supports dark mode through CSS custom properties and the `prefers-color-scheme` media query. The theme seamlessly transitions between light and dark modes while maintaining the warm, food-focused aesthetic.

### shadcn/ui Theme Configuration (Vite SPA)

```typescript
// lib/theme.ts
export const theme = {
  light: {
    background: "hsl(30, 43%, 90%)", // #f0e5d9
    backgroundHover: "hsl(30, 40%, 87%)", // #e3d5c5
    subtle: "hsl(30, 33%, 80%)", // #d4c2b2
    text: "hsl(30, 12%, 16%)", // #2f2a25
    accent: "hsl(139, 29%, 42%)", // #5da271
    accentHover: "hsl(139, 29%, 46%)", // #6fb07e
    accentPress: "hsl(139, 29%, 50%)", // #80bd8c
    accentText: "hsl(0, 0%, 100%)", // #ffffff
  },
  dark: {
    background: "hsl(24, 7%, 12%)", // #1e1b1a
    backgroundHover: "hsl(28, 9%, 16%)", // #2a2522
    subtle: "hsl(34, 12%, 22%)", // #453f3b
    text: "hsl(30, 43%, 90%)", // #f0e5d9
    accent: "hsl(139, 29%, 35%)", // #4b845e
    accentHover: "hsl(139, 29%, 41%)", // #609a70
    accentPress: "hsl(139, 29%, 47%)", // #74b182
    accentText: "hsl(30, 12%, 16%)", // #2f2a25
  },
};

// Theme provider hook
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
}
```

### Component Dark Mode Examples

```typescript
// Dark mode aware components automatically use CSS variables
export function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="bg-card text-card-foreground border-border">
      {/* Content automatically adapts to theme */}
      <h3 className="text-foreground">{meal.title}</h3>
      <p className="text-muted-foreground">{meal.location}</p>
    </div>
  );
}

// Manual theme-aware styling when needed
export function CustomComponent() {
  return (
    <div className="bg-background dark:bg-background">
      <span className="text-foreground">
        This text adapts to the theme
      </span>
    </div>
  );
}
```

## 🎨 Icon System

### Primary Icons (Lucide React)

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
  Calendar, // Date picker
  Image, // Gallery
  Download, // Export
  Upload, // Import
} from "lucide-react";
```

### Icon Usage Guidelines

- 24px default size for primary actions
- 20px for secondary actions
- 16px for inline text icons
- Consistent stroke width (2px)
- Semantic color usage (primary for actions, neutral for info)

## 📐 Layout Grid System

```css
/* 4px base grid system */
.grid-container {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
}

/* Common layout patterns */
.layout-single {
  grid-template-columns: 1fr;
  max-width: 600px;
  margin: 0 auto;
}

.layout-sidebar {
  grid-template-columns: 280px 1fr;
  gap: var(--space-6);
}

.layout-cards {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
}

/* Safe areas for mobile */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

This UI/UX design document provides a comprehensive foundation for building FoodyLog's interface. The design system ensures consistency, accessibility, and a delightful user experience across all screens and interactions.

Would you like me to continue with additional sections covering:

1. **Detailed Component Library** with shadcn/ui implementations
2. **User Flow Diagrams** with step-by-step interactions
3. **Prototype Specifications** for development handoff
4. **Design Tokens** for the design system
5. **Animation Specifications** with detailed timing and easing functions

#

## ⚙️ shadcn/ui Configuration

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Rating color tokens used in UI components
        "rating-excellent": "hsl(var(--rating-excellent))",
        "rating-great": "hsl(var(--rating-great))",
        "rating-good": "hsl(var(--rating-good))",
        "rating-poor": "hsl(var(--rating-poor))",
        "rating-bad": "hsl(var(--rating-bad))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

### Global CSS with Custom Theme

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Custom theme variables */
    --background: 30 43% 90%;
    --foreground: 30 12% 16%;
    --card: 30 43% 90%;
    --card-foreground: 30 12% 16%;
    --popover: 30 43% 90%;
    --popover-foreground: 30 12% 16%;
    --primary: 139 29% 42%;
    --primary-foreground: 0 0% 100%;
    --secondary: 30 33% 80%;
    --secondary-foreground: 30 12% 16%;
    --muted: 30 40% 87%;
    --muted-foreground: 30 12% 16%;
    --accent: 139 29% 42%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 30 33% 80%;
    --input: 30 40% 87%;
    --ring: 139 29% 42%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 24 7% 12%;
    --foreground: 30 43% 90%;
    --card: 24 7% 12%;
    --card-foreground: 30 43% 90%;
    --popover: 24 7% 12%;
    --popover-foreground: 30 43% 90%;
    --primary: 139 29% 35%;
    --primary-foreground: 30 12% 16%;
    --secondary: 34 12% 22%;
    --secondary-foreground: 30 43% 90%;
    --muted: 28 9% 16%;
    --muted-foreground: 30 43% 90%;
    --accent: 139 29% 35%;
    --accent-foreground: 30 12% 16%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 34 12% 22%;
    --input: 28 9% 16%;
    --ring: 139 29% 35%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

# 🧱 Detailed Component Library (shadcn/ui Implementation)

### 1. Button Components

```typescript
// components/ui/button.tsx (shadcn/ui with custom theme)
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// Usage Examples
<Button>Add Meal</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" size="icon"><Camera className="h-4 w-4" /></Button>
```

### 2. MealCard Component

```typescript
// components/meal/MealCard.tsx
import { Star, MapPin, DollarSign } from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";

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

export function MealCard({
  meal,
  onTap,
  showPrice = true,
  compact = false,
  className
}: MealCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-rating-excellent";
    if (rating >= 7) return "text-rating-great";
    if (rating >= 5) return "text-rating-good";
    if (rating >= 3) return "text-rating-poor";
    return "text-rating-bad";
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-3 bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]",
        compact ? "h-20" : "h-24",
        className
      )}
      onClick={() => onTap?.(meal._id)}
      role="article"
      aria-label={`${meal.title}, rated ${meal.rating} out of 10`}
    >
      {/* Photo */}
      <div className={cn(
        "flex-shrink-0 rounded-lg overflow-hidden bg-muted",
        compact ? "w-14 h-14" : "w-16 h-16"
      )}>
        {meal.primaryPhoto ? (
          <img
            src={meal.primaryPhoto}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Camera className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-foreground truncate",
              compact ? "text-sm" : "text-base"
            )}>
              {meal.title}
            </h3>

            <div className="flex items-center space-x-2 mt-1">
              {meal.locationText && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="text-xs truncate max-w-24">
                    {meal.locationText}
                  </span>
                </div>
              )}

              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(meal.dateEaten)}
              </span>
            </div>

            {/* Tags */}
            {meal.tags.length > 0 && (
              <div className="flex items-center space-x-1 mt-2 overflow-hidden">
                {meal.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {meal.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{meal.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Rating & Price */}
      <div className="flex flex-col items-end space-y-1 ml-2">
            <div className={cn(
              "flex items-center space-x-1",
              getRatingColor(meal.rating)
            )}>
              <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold text-sm">{meal.rating}/10</span>
            </div>

            {showPrice && meal.price && (
              <div className="flex items-center text-muted-foreground">
                <DollarSign className="w-3 h-3" />
                <span className="text-xs">{meal.price.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 3. PhotoCapture Component

```typescript
// components/meal/PhotoCapture.tsx
import { useState, useRef } from "react";
import { Camera, Image, X, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCamera } from "~/hooks/useCamera";
import { cn } from "~/lib/utils";

interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  currentPhoto?: string;
  maxSize?: number;
  quality?: number;
  className?: string;
}

export function PhotoCapture({
  onPhotoCapture,
  currentPhoto,
  maxSize = 5,
  quality = 80,
  className
}: PhotoCaptureProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { capturePhoto, selectFromGallery, photoToBase64 } = useCamera();

  const handleCameraCapture = async () => {
    try {
      setIsLoading(true);
      const photo = await capturePhoto();
      if (photo) {
        const base64 = await photoToBase64(photo);
        if (base64) {
          onPhotoCapture(base64);
        }
      }
    } catch (error) {
      console.error('Camera capture failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGallerySelect = async () => {
    try {
      setIsLoading(true);
      const photo = await selectFromGallery();
      if (photo) {
        const base64 = await photoToBase64(photo);
        if (base64) {
          onPhotoCapture(base64);
        }
      }
    } catch (error) {
      console.error('Gallery selection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoCapture('');
  };

  if (currentPhoto) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden", className)}>
        <img
          src={currentPhoto}
          alt="Meal photo"
          className="w-full h-48 object-cover"
        />

        {/* Overlay controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCameraCapture}
              disabled={isLoading}
            >
              <Camera className="w-4 h-4 mr-1" />
              Retake
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleGallerySelect}
              disabled={isLoading}
            >
              <Image className="w-4 h-4 mr-1" />
              Replace
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemovePhoto}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "border-2 border-dashed border-border rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200",
      className
    )}>
      <div className="h-48 flex flex-col items-center justify-center space-y-4 p-6">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Processing photo...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>

            <div className="text-center">
              <h3 className="font-medium text-foreground mb-1">Add Photo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Capture your meal to remember it better
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="default"
                size="sm"
                onClick={handleCameraCapture}
                className="flex items-center"
              >
                <Camera className="w-4 h-4 mr-2" />
                Camera
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleGallerySelect}
                className="flex items-center"
              >
                <Image className="w-4 h-4 mr-2" />
                Gallery
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

### 4. RatingInput Component

```typescript
// components/meal/RatingInput.tsx
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  disabled?: boolean;
  className?: string;
}

export function RatingInput({
  value,
  onChange,
  max = 10,
  size = 'md',
  showNumber = true,
  disabled = false,
  className
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-primary"; // Excellent - use accent green
    if (rating >= 7) return "text-primary/80"; // Great - lighter green
    if (rating >= 5) return "text-yellow-500"; // Good - yellow
    if (rating >= 3) return "text-orange-500"; // Poor - orange
    return "text-red-500"; // Bad - red
  };

  const displayValue = hoverValue ?? value;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className="flex items-center space-x-1"
        onMouseLeave={() => setHoverValue(null)}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayValue;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              className={cn(
                "transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                isFilled ? getRatingColor(displayValue) : "text-muted-foreground"
              )}
              onClick={() => !disabled && onChange(starValue)}
              onMouseEnter={() => !disabled && setHoverValue(starValue)}
              aria-label={`Rate ${starValue} out of ${max} stars`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled ? "fill-current" : ""
                )}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className={cn(
          "font-semibold tabular-nums",
          getRatingColor(displayValue),
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        )}>
          {displayValue}/{max}
        </span>
      )}
    </div>
  );
}
```

## 🔄 Detailed User Flow Diagrams

### 1. Meal Logging Flow

```
Start: User wants to log a meal
    ↓
[Home Screen] → Tap "Add Meal" FAB
    ↓
[Add Meal Screen]
    ↓
Decision: Has photo?
    ├─ No → Skip to title input
    └─ Yes → Photo Capture Flow
        ↓
    [Photo Options] → Camera or Gallery?
        ├─ Camera → [Camera Interface] → Capture → Process → Preview
        └─ Gallery → [Gallery Picker] → Select → Process → Preview
        ↓
    [Photo Preview] → Accept or Retake?
        ├─ Retake → Back to Photo Options
        └─ Accept → Continue to form
    ↓
[Form Fields]
    ↓
1. Title Input (Required)
   - Auto-focus on screen load
   - Placeholder: "What did you eat?"
   - Character limit: 100
    ↓
2. Rating Input (Required)
   - Interactive star rating
   - Default: 5/10
   - Tap or drag to select
    ↓
3. Meal Type (Required)
   - Dropdown with 4 options
   - Smart default based on time of day
    ↓
4. Location (Optional)
   - Text input with GPS suggestion
   - Placeholder: "Restaurant name or 'Home'"
    ↓
5. Price (Optional)
   - Number input with currency symbol
   - Decimal support
    ↓
6. Tags (Optional)
   - Comma-separated input
   - Autocomplete from user history
   - Max 3 tags for free users
    ↓
[Validation]
   - Check required fields
   - Validate data formats
   - Show errors if any
    ↓
Decision: Valid?
    ├─ No → Show errors, stay on form
    └─ Yes → Continue
    ↓
[Save Process]
   - Show loading state
   - Optimistic update (add to list immediately)
   - Upload photo if present
   - Save to Convex
   - Handle offline if needed
    ↓
Decision: Save successful?
    ├─ No → Show error, allow retry
    └─ Yes → Success feedback
    ↓
[Success State]
   - Brief success message
   - Navigate back to meal list
   - New meal appears at top
    ↓
End: Meal logged successfully
```

### 2. Meal Discovery Flow

```
Start: User wants to find a past meal
    ↓
[Home Screen] → View meal list
    ↓
Decision: Many meals visible?
    ├─ Yes → Browse by scrolling
    └─ No → Use search
    ↓
[Search Flow]
    ↓
Tap search bar
    ↓
[Search Interface]
   - Auto-focus keyboard
   - Search as you type
   - Show recent searches
    ↓
Type search query
    ↓
[Search Results]
   - Real-time filtering
   - Highlight matching text
   - Show result count
    ↓
Decision: Found desired meal?
    ├─ No → Refine search or browse
    └─ Yes → Tap meal card
    ↓
[Meal Detail Screen]
   - Full photo display
   - All meal information
   - Action buttons (Edit, Share, Delete)
    ↓
Decision: What action?
    ├─ View only → Stay on screen
    ├─ Edit → Go to edit form
    ├─ Share → Open share sheet
    └─ Delete → Confirm deletion
    ↓
End: Action completed
```

### 3. Offline Sync Flow

```
Start: User performs action while offline
    ↓
[Action Detection]
   - Detect network status
   - Identify action type (Create, Update, Delete)
    ↓
[Offline Storage]
   - Store action in local queue
   - Save data locally
   - Show offline indicator
    ↓
[Optimistic Update]
   - Update UI immediately
   - Mark item as "pending sync"
   - Show sync status icon
    ↓
[Network Monitoring]
   - Listen for connectivity changes
   - Check connection quality
    ↓
Decision: Back online?
    ├─ No → Continue offline mode
    └─ Yes → Start sync process
    ↓
[Sync Process]
    ↓
1. Validate queued actions
2. Resolve conflicts if any
3. Upload in priority order
4. Update local data with server response
5. Remove from sync queue
    ↓
[Sync Status Updates]
   - Show progress indicator
   - Update item status
   - Handle errors gracefully
    ↓
Decision: Sync successful?
    ├─ No → Retry with backoff
    └─ Yes → Mark as synced
    ↓
[Cleanup]
   - Remove offline indicators
   - Clear temporary data
   - Update UI to final state
    ↓
End: Data synchronized
```

## 🎯 Interaction Patterns

### 1. Touch Gestures

```typescript
// Gesture definitions for mobile interactions
interface GesturePatterns {
  // Primary actions
  tap: {
    target: "44px minimum touch target";
    feedback: "Visual press state + haptic";
    timing: "Immediate response";
  };

  // Navigation
  swipeLeft: {
    action: "Go back / Previous item";
    threshold: "30% of screen width";
    animation: "Slide transition";
  };

  swipeRight: {
    action: "Go forward / Next item";
    threshold: "30% of screen width";
    animation: "Slide transition";
  };

  // List interactions
  swipeDown: {
    action: "Pull to refresh";
    threshold: "60px from top";
    feedback: "Elastic bounce + spinner";
  };

  longPress: {
    action: "Context menu / Quick actions";
    duration: "500ms";
    feedback: "Haptic + menu appearance";
  };

  // Photo interactions
  pinchZoom: {
    action: "Zoom photo";
    minScale: 1;
    maxScale: 3;
    animation: "Smooth scaling";
  };

  doubleTap: {
    action: "Zoom to fit / Reset zoom";
    timing: "300ms between taps";
    animation: "Smooth zoom transition";
  };
}
```

### 2. Loading States

```typescript
// Loading state patterns
interface LoadingStates {
  // Initial app load
  appLaunch: {
    type: "Splash screen";
    duration: "2s maximum";
    content: "Logo + brand colors";
  };

  // Data loading
  mealList: {
    type: "Skeleton screens";
    pattern: "Card-shaped placeholders";
    animation: "Shimmer effect";
  };

  // Photo processing
  photoUpload: {
    type: "Progress indicator";
    feedback: "Percentage + spinner";
    cancellable: true;
  };

  // Form submission
  formSave: {
    type: "Button loading state";
    feedback: "Spinner + disabled state";
    text: "Saving...";
  };

  // Search
  searchResults: {
    type: "Inline spinner";
    debounce: "300ms";
    placeholder: "Searching...";
  };
}
```

### 3. Error Handling

```typescript
// Error state patterns
interface ErrorStates {
  // Network errors
  offline: {
    message: "You're offline. Changes will sync when connected.";
    action: "Continue offline";
    style: "Info banner";
  };

  // Validation errors
  formValidation: {
    message: "Please fill in all required fields";
    action: "Highlight invalid fields";
    style: "Inline error text";
  };

  // Photo errors
  cameraPermission: {
    message: "Camera access needed to take photos";
    action: "Open Settings";
    style: "Modal dialog";
  };

  // Server errors
  serverError: {
    message: "Something went wrong. Please try again.";
    action: "Retry";
    style: "Toast notification";
  };

  // Empty states
  noMeals: {
    message: "No meals logged yet";
    action: "Add your first meal";
    style: "Empty state illustration";
  };
}
```

## 📱 Platform-Specific Considerations

### iOS Design Adaptations

```css
/* iOS-specific styles */
.ios-safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.ios-navigation {
  /* iOS navigation bar height */
  height: 44px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
}

.ios-button {
  /* iOS button styling */
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.ios-haptic {
  /* Trigger haptic feedback */
  -webkit-tap-highlight-color: transparent;
}
```

### Android Design Adaptations

```css
/* Android-specific styles */
.android-navigation {
  /* Material Design navigation */
  height: 56px;
  elevation: 4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.android-fab {
  /* Material Design FAB */
  width: 56px;
  height: 56px;
  border-radius: 28px;
  elevation: 6;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.android-ripple {
  /* Material ripple effect */
  position: relative;
  overflow: hidden;
}

.android-ripple::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

.android-ripple:active::before {
  width: 300px;
  height: 300px;
}
```

### PWA Install Experience

- Non-intrusive install banner when `beforeinstallprompt` fires; dismissible.
- Microcopy: “Install FoodyLog for faster access and offline support.”
- Provide manual install entry in Settings.
- Icons: 192x192, 512x512 PNG, plus maskable; add `apple-touch-icon` (180x180) for iOS.
- Colors: `background_color` `#ffffff`, `theme_color` `#16a34a`.
- Update UX: when a new version is available (PWA autoUpdate), show a toast “Update ready — Reload”.

## 📦 Additional shadcn/ui Components Needed

### Core Components to Install

```bash
# Essential UI components for FoodyLog
bunx shadcn-ui@latest add button
bunx shadcn-ui@latest add card
bunx shadcn-ui@latest add input
bunx shadcn-ui@latest add label
bunx shadcn-ui@latest add badge
bunx shadcn-ui@latest add select
bunx shadcn-ui@latest add textarea
bunx shadcn-ui@latest add dialog
bunx shadcn-ui@latest add dropdown-menu
bunx shadcn-ui@latest add toast
bunx shadcn-ui@latest add skeleton
bunx shadcn-ui@latest add avatar
bunx shadcn-ui@latest add separator
bunx shadcn-ui@latest add scroll-area
bunx shadcn-ui@latest add sheet
bunx shadcn-ui@latest add tabs
bunx shadcn-ui@latest add progress
bunx shadcn-ui@latest add alert
bunx shadcn-ui@latest add command
```

### Custom Component Extensions

```typescript
// components/ui/meal-rating.tsx - Custom rating component
import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface MealRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function MealRating({
  rating,
  maxRating = 10,
  size = "md",
  interactive = false,
  onChange
}: MealRatingProps) {
  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const getRatingColor = (currentRating: number) => {
    if (currentRating >= 9) return "text-primary";
    if (currentRating >= 7) return "text-primary/80";
    if (currentRating >= 5) return "text-yellow-500";
    if (currentRating >= 3) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.min(maxRating, 10) }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={cn(
              "transition-colors",
              interactive && "hover:scale-110 cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeMap[size],
                isFilled ? getRatingColor(rating) : "text-muted-foreground",
                isFilled && "fill-current"
              )}
            />
          </button>
        );
      })}
      <span className={cn(
        "ml-1 font-medium tabular-nums",
        getRatingColor(rating),
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
      )}>
        {rating}/{maxRating}
      </span>
    </div>
  );
}

// components/ui/photo-upload.tsx - Custom photo upload component
import { useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "~/lib/utils";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  currentPhoto?: string;
  onRemove?: () => void;
  maxSize?: number; // MB
  className?: string;
}

export function PhotoUpload({
  onPhotoSelect,
  currentPhoto,
  onRemove,
  maxSize = 5,
  className
}: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onPhotoSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoSelect(e.target.files[0]);
    }
  };

  if (currentPhoto) {
    return (
      <div className={cn("relative group", className)}>
        <img
          src={currentPhoto}
          alt="Meal photo"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">
              <Camera className="w-4 h-4 mr-1" />
              Replace
            </Button>
            {onRemove && (
              <Button size="sm" variant="destructive" onClick={onRemove}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed border-border rounded-lg p-6 text-center transition-colors",
        dragActive && "border-primary bg-primary/5",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-6 h-6 text-primary" />
        </div>

        <div>
          <h3 className="font-medium text-foreground mb-1">Add Photo</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop or click to upload (max {maxSize}MB)
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="default" size="sm" asChild>
            <label className="cursor-pointer">
              <Camera className="w-4 h-4 mr-1" />
              Camera
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-1" />
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## 🎨 Theme Integration Summary

The updated design system now perfectly integrates your custom color palette with shadcn/ui:

### ✅ **Color Palette Integration:**

- **Light Mode**: Warm cream background (#f0e5d9) with dark brown text (#2f2a25)
- **Dark Mode**: Dark brown background (#1e1b1a) with cream text (#f0e5d9)
- **Accent**: Beautiful green (#5da271 light, #4b845e dark) for primary actions
- **Semantic Colors**: Proper contrast ratios maintained across all themes

### ✅ **shadcn/ui Compatibility:**

- All components use CSS custom properties for theming
- Automatic dark mode support through `prefers-color-scheme`
- Manual theme switching capability
- Full TypeScript support with proper interfaces

### ✅ **Food App Optimizations:**

- Rating colors that work with the green accent theme
- Photo upload components with proper contrast
- Meal cards that showcase food photography beautifully
- Warm, inviting color scheme that enhances appetite appeal

The design system is now ready for implementation with your exact color specifications while maintaining all the benefits of shadcn/ui's component architecture and accessibility features.

This comprehensive UI/UX design document provides everything needed to build a beautiful, accessible, and user-friendly FoodyLog application. The design system ensures consistency across all components while the detailed specifications enable smooth development handoff.

Would you like me to create additional sections covering:

1. **Animation Specifications** with detailed timing functions
2. **Design Tokens** for programmatic design system
3. **Prototype Specifications** for interactive mockups
4. **Usability Testing Guidelines** for validation
5. **Design QA Checklist** for implementation review
