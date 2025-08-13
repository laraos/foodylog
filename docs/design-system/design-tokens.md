# Design Tokens

Design tokens are the visual design atoms of the FoodyLog design system. They define colors, typography, spacing, and other design decisions in a consistent, maintainable way.

## Color Palette

### Primary Colors

The FoodyLog color palette uses warm, food-inspired tones that enhance appetite appeal while maintaining excellent accessibility.

#### Light Mode
```css
:root {
  /* Background Colors */
  --background: 30 43% 90%;        /* #f0e5d9 - Warm cream */
  --card: 30 43% 90%;              /* #f0e5d9 - Card background */
  --muted: 30 40% 87%;             /* #e3d5c5 - Hover states */
  --secondary: 30 33% 80%;         /* #d4c2b2 - Secondary elements */
  
  /* Text Colors */
  --foreground: 30 12% 16%;        /* #2f2a25 - Dark brown text */
  --muted-foreground: 30 12% 16%;  /* #2f2a25 - Muted text */
  
  /* Accent Colors */
  --primary: 139 35% 35%;          /* #4a7c5d - Dark green */
  --primary-foreground: 0 0% 100%; /* #ffffff - White on green */
  --accent: 139 35% 35%;           /* #4a7c5d - Same as primary */
  
  /* Interactive Elements */
  --border: 30 33% 80%;            /* #d4c2b2 - Subtle borders */
  --input: 30 40% 87%;             /* #e3d5c5 - Input backgrounds */
  --ring: 139 29% 42%;             /* #5da271 - Focus rings */
}
```

#### Dark Mode
```css
.dark {
  /* Background Colors */
  --background: 24 7% 12%;         /* #1e1b1a - Dark brown */
  --card: 24 7% 12%;               /* #1e1b1a - Card background */
  --muted: 28 9% 16%;              /* #2a2522 - Hover states */
  --secondary: 34 12% 22%;         /* #453f3b - Secondary elements */
  
  /* Text Colors */
  --foreground: 30 43% 90%;        /* #f0e5d9 - Cream text */
  --muted-foreground: 30 43% 90%;  /* #f0e5d9 - Muted text */
  
  /* Accent Colors */
  --primary: 139 45% 35%;          /* #3f8653 - Darker green */
  --primary-foreground: 0 0% 100%; /* #ffffff - White on green */
  
  /* Interactive Elements */
  --border: 34 12% 22%;            /* #453f3b - Darker borders */
  --input: 28 9% 16%;              /* #2a2522 - Input backgrounds */
  --ring: 139 45% 35%;             /* #3f8653 - Focus rings */
}
```

### Rating Colors

Special color system for meal ratings with WCAG AA compliance:

```css
/* Light Mode Rating Colors */
--rating-excellent: 139 45% 28%;  /* #366142 - Excellent (9-10) */
--rating-great: 139 40% 30%;      /* #3d6b4a - Great (7-8) */
--rating-good: 45 85% 27%;        /* #826907 - Good (5-6) */
--rating-poor: 25 90% 35%;        /* #b84a00 - Poor (3-4) */
--rating-bad: 0 84% 42%;          /* #c41c1c - Bad (1-2) */

/* Dark Mode Rating Colors */
--rating-excellent: 139 35% 50%;  /* Brighter for dark backgrounds */
--rating-great: 139 29% 45%;      /* Adjusted contrast */
--rating-good: 45 93% 55%;        /* Enhanced visibility */
--rating-poor: 25 95% 60%;        /* Improved contrast */
--rating-bad: 0 84% 65%;          /* Better readability */
```

### Semantic Colors

```css
/* Status Colors */
--destructive: 0 84% 50%;         /* #dc2626 - Error states */
--success: 139 35% 35%;           /* Uses primary green */
--warning: 45 93% 47%;            /* #f59e0b - Warning states */
--info: 221 83% 53%;              /* #3b82f6 - Information */
```

### Usage Examples

```tsx
// Using color tokens in components
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Add Meal
  </button>
  <span className="text-rating-excellent">★ 9.5</span>
</div>

// CSS custom properties
.meal-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}
```

## Typography

### Font Families

```css
/* Primary font stack */
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Monospace for code */
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Font Sizes

Based on a modular scale optimized for readability across devices:

```css
--text-xs: 0.75rem;    /* 12px - Small labels, captions */
--text-sm: 0.875rem;   /* 14px - Secondary text, metadata */
--text-base: 1rem;     /* 16px - Body text, default */
--text-lg: 1.125rem;   /* 18px - Meal titles, important text */
--text-xl: 1.25rem;    /* 20px - Card titles, section headers */
--text-2xl: 1.5rem;    /* 24px - Page titles */
--text-3xl: 1.875rem;  /* 30px - Hero text */
--text-4xl: 2.25rem;   /* 36px - Large displays */
```

### Font Weights

```css
--font-normal: 400;    /* Regular text */
--font-medium: 500;    /* Emphasized text */
--font-semibold: 600;  /* Headings, important labels */
--font-bold: 700;      /* Strong emphasis */
```

### Line Heights

```css
--leading-tight: 1.25;    /* Headings */
--leading-snug: 1.375;    /* Subheadings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
```

### Typography Usage

```tsx
// Meal title
<h2 className="text-xl font-semibold leading-tight text-foreground">
  Delicious Margherita Pizza
</h2>

// Metadata
<p className="text-sm text-muted-foreground">
  2 hours ago • Tony's Pizzeria
</p>

// Body text
<p className="text-base leading-normal">
  Perfect crispy crust with fresh basil and mozzarella.
</p>
```

## Spacing System

Based on a 4px grid system for consistent spacing throughout the application:

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Spacing Usage Guidelines

- **4px (space-1):** Fine adjustments, icon spacing
- **8px (space-2):** Small gaps between related elements
- **12px (space-3):** Comfortable spacing for compact layouts
- **16px (space-4):** Standard spacing between elements
- **24px (space-6):** Section spacing, card padding
- **32px (space-8):** Large section breaks
- **48px+ (space-12+):** Major layout sections

```tsx
// Component spacing examples
<div className="p-6 space-y-4">        {/* 24px padding, 16px vertical gaps */}
  <div className="flex items-center space-x-2"> {/* 8px horizontal gaps */}
    <Icon className="mr-3" />           {/* 12px margin right */}
    <span>Meal title</span>
  </div>
</div>
```

## Border Radius

Consistent rounded corners throughout the design system:

```css
--radius: 0.5rem;                    /* 8px - Default radius */
--radius-sm: calc(var(--radius) - 4px); /* 4px - Small elements */
--radius-md: calc(var(--radius) - 2px); /* 6px - Medium elements */
--radius-lg: var(--radius);             /* 8px - Large elements */
--radius-xl: 0.75rem;                   /* 12px - Cards, modals */
--radius-2xl: 1rem;                     /* 16px - Large containers */
--radius-full: 9999px;                  /* Full circle - Badges, avatars */
```

### Border Radius Usage

```tsx
// Different radius applications
<button className="rounded-md">Button</button>           {/* 6px */}
<div className="rounded-lg">Card</div>                   {/* 8px */}
<img className="rounded-xl">Photo</img>                  {/* 12px */}
<span className="rounded-full">Badge</span>              {/* Full circle */}
```

## Shadows

Subtle shadows for depth and hierarchy:

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Shadow Usage

```tsx
// Shadow applications
<div className="shadow-sm">Subtle elevation</div>
<div className="shadow">Default card shadow</div>
<div className="shadow-md">Hover state</div>
<div className="shadow-lg">Modal, dropdown</div>
```

## Animations & Transitions

### Duration Scale

```css
--duration-75: 75ms;     /* Micro-interactions */
--duration-100: 100ms;   /* Quick feedback */
--duration-150: 150ms;   /* Button presses */
--duration-200: 200ms;   /* Standard transitions */
--duration-300: 300ms;   /* Smooth animations */
--duration-500: 500ms;   /* Page transitions */
--duration-700: 700ms;   /* Complex animations */
--duration-1000: 1000ms; /* Long animations */
```

### Easing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Custom Animations

```css
/* FoodyLog-specific animations */
@keyframes star-fill {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes shutter {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

### Animation Usage

```tsx
// Animation classes
<div className="transition-all duration-200 ease-out">
  Smooth transition
</div>

<button className="hover:scale-105 transition-transform duration-150">
  Hover effect
</button>

<div className="animate-star-fill">
  Rating selection
</div>
```

## Responsive Breakpoints

Mobile-first responsive design with consistent breakpoints:

```css
/* Tailwind CSS breakpoints */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Responsive Usage

```tsx
// Responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>

<button className="text-sm md:text-base lg:text-lg">
  Responsive text
</button>
```

## Accessibility Tokens

### Touch Targets

```css
--touch-target-min: 44px;  /* Minimum touch target size */
--touch-target-spacing: 8px; /* Minimum spacing between targets */
```

### Focus Indicators

```css
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-color: var(--ring);
```

### Motion Preferences

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Usage in Components

### CSS Custom Properties

```css
.meal-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  transition: all var(--duration-200) var(--ease-out);
}

.meal-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Tailwind Classes

```tsx
<div className="bg-card border border-border rounded-lg p-6 shadow transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-0.5">
  Meal card with design tokens
</div>
```

### TypeScript Integration

```typescript
// Design token types
export type ColorToken = 
  | 'background' | 'foreground' | 'card' | 'card-foreground'
  | 'primary' | 'primary-foreground' | 'secondary' | 'secondary-foreground'
  | 'muted' | 'muted-foreground' | 'accent' | 'accent-foreground'
  | 'destructive' | 'destructive-foreground' | 'border' | 'input' | 'ring';

export type SpacingToken = 
  | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';

export type RadiusToken = 
  | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
```

This comprehensive design token system ensures consistency, maintainability, and accessibility across the entire FoodyLog application while providing the flexibility needed for future enhancements.