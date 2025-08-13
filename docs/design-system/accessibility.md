# Accessibility Guidelines

FoodyLog is committed to providing an inclusive experience for all users. Our design system meets WCAG 2.1 AA standards and follows accessibility best practices throughout.

## Accessibility Standards

### WCAG 2.1 AA Compliance

All components and patterns meet or exceed WCAG 2.1 AA requirements:

- **Perceivable:** Information is presentable in ways users can perceive
- **Operable:** Interface components are operable by all users
- **Understandable:** Information and UI operation are understandable
- **Robust:** Content is robust enough for various assistive technologies

### Key Requirements

| Requirement | Standard | FoodyLog Implementation |
|-------------|----------|------------------------|
| Color Contrast | 4.5:1 normal text, 3:1 large text | All colors tested and compliant |
| Touch Targets | 44px minimum | All interactive elements meet standard |
| Keyboard Navigation | Full keyboard access | Complete keyboard support |
| Screen Readers | Proper ARIA and semantics | Comprehensive ARIA implementation |
| Focus Management | Visible focus indicators | Enhanced focus styles |

## Color and Contrast

### Contrast Ratios

All color combinations in the FoodyLog palette meet WCAG AA standards:

```css
/* Light Mode - All combinations tested */
--foreground: 30 12% 16%;        /* #2f2a25 - 12.8:1 on background */
--primary: 139 35% 35%;          /* #4a7c5d - 4.7:1 on background */
--muted-foreground: 30 12% 16%;  /* #2f2a25 - 12.8:1 on muted */

/* Dark Mode - Enhanced contrast */
--foreground: 30 43% 90%;        /* #f0e5d9 - 12.8:1 on background */
--primary: 139 45% 35%;          /* #3f8653 - 5.2:1 on background */
```

### Rating Colors (WCAG AA Compliant)

```css
/* Light mode rating colors - all 4.5:1+ contrast */
--rating-excellent: 139 45% 28%; /* #366142 - 6.1:1 contrast */
--rating-great: 139 40% 30%;     /* #3d6b4a - 5.4:1 contrast */
--rating-good: 45 85% 27%;       /* #826907 - 4.8:1 contrast */
--rating-poor: 25 90% 35%;       /* #b84a00 - 4.6:1 contrast */
--rating-bad: 0 84% 42%;         /* #c41c1c - 4.5:1 contrast */
```

### Color Usage Guidelines

```tsx
// ✅ Good - Color with additional indicators
<Button className="bg-destructive text-destructive-foreground">
  <X className="w-4 h-4 mr-2" />
  Delete Meal
</Button>

// ❌ Avoid - Color as only indicator
<span className="text-red-500">Error</span>

// ✅ Better - Color with text/icon
<div className="flex items-center text-destructive">
  <AlertCircle className="w-4 h-4 mr-2" />
  <span>Error: Please check your input</span>
</div>
```

### High Contrast Mode Support

```css
/* High contrast mode support */
@media (forced-colors: active) {
  .button {
    border: 2px solid ButtonBorder;
    background: ButtonFace;
    color: ButtonText;
  }
  
  .button:focus {
    outline: 2px solid Highlight;
    outline-offset: 2px;
  }
}
```

## Touch Targets and Spacing

### Minimum Touch Target Sizes

All interactive elements meet the 44px minimum requirement:

```tsx
// ✅ Proper touch target sizing
<Button className="min-h-[44px] min-w-[44px] px-4">
  Save Meal
</Button>

// ✅ Icon button with proper target
<Button 
  variant="ghost" 
  size="icon" 
  className="h-11 w-11" // 44px
  aria-label="Edit meal"
>
  <Edit className="w-5 h-5" />
</Button>

// ✅ Navigation items
<NavigationItem className="min-h-[44px] px-3 py-2">
  Home
</NavigationItem>
```

### Touch Target Spacing

Minimum 8px spacing between adjacent touch targets:

```tsx
// ✅ Proper spacing between buttons
<div className="flex space-x-2"> {/* 8px spacing */}
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</div>

// ✅ Navigation with adequate spacing
<nav className="flex justify-around p-2">
  {items.map((item, index) => (
    <NavigationItem 
      key={item.id}
      className={cn(
        "min-h-[44px] px-3",
        index > 0 && "ml-2" // 8px minimum spacing
      )}
    >
      {item.label}
    </NavigationItem>
  ))}
</nav>
```

## Keyboard Navigation

### Focus Management

Comprehensive keyboard navigation support:

```tsx
// Focus management in forms
const MealForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  
  // Auto-focus first field
  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // Custom keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          saveRef.current?.click();
          break;
        case 'Escape':
          handleCancel();
          break;
      }
    }
  };
  
  return (
    <form onKeyDown={handleKeyDown}>
      <Input 
        ref={titleRef}
        placeholder="Meal title"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            ratingRef.current?.focus();
          }
        }}
      />
      <RatingInput 
        ref={ratingRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            saveRef.current?.focus();
          }
        }}
      />
      <Button ref={saveRef} type="submit">
        Save Meal
      </Button>
    </form>
  );
};
```

### Navigation Patterns

```tsx
// Arrow key navigation in lists
const MealList = ({ meals }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = Math.min(focusedIndex + 1, meals.length - 1);
        setFocusedIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prevIndex);
        itemRefs.current[prevIndex]?.focus();
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        // Activate focused item
        itemRefs.current[focusedIndex]?.click();
        break;
    }
  };
  
  return (
    <div role="list" onKeyDown={handleKeyDown}>
      {meals.map((meal, index) => (
        <MealCard
          key={meal.id}
          ref={(el) => itemRefs.current[index] = el}
          meal={meal}
          tabIndex={index === focusedIndex ? 0 : -1}
          role="listitem"
          aria-posinset={index + 1}
          aria-setsize={meals.length}
        />
      ))}
    </div>
  );
};
```

### Focus Indicators

Enhanced focus styles for better visibility:

```css
/* Enhanced focus indicators */
.focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast focus indicators */
@media (prefers-contrast: high) {
  .focus-visible {
    outline-width: 3px;
    outline-offset: 1px;
    box-shadow: 0 0 0 1px hsl(var(--background));
  }
}

/* Custom focus styles for specific components */
.meal-card:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
}
```

## Screen Reader Support

### Semantic HTML

Proper semantic structure for screen readers:

```tsx
// ✅ Proper semantic structure
<main role="main" aria-label="Meal list">
  <header>
    <h1>Your Meals</h1>
    <p>You have {meals.length} meals logged</p>
  </header>
  
  <section aria-labelledby="recent-meals">
    <h2 id="recent-meals">Recent Meals</h2>
    <ul role="list">
      {meals.map(meal => (
        <li key={meal.id} role="listitem">
          <article aria-labelledby={`meal-${meal.id}`}>
            <h3 id={`meal-${meal.id}`}>{meal.title}</h3>
            <p>Rated {meal.rating} out of 10</p>
          </article>
        </li>
      ))}
    </ul>
  </section>
</main>
```

### ARIA Attributes

Comprehensive ARIA implementation:

```tsx
// Form with proper ARIA
<form role="form" aria-labelledby="meal-form-title">
  <h2 id="meal-form-title">Add New Meal</h2>
  
  <div className="form-group">
    <label htmlFor="meal-title" className="required">
      Meal Title
    </label>
    <input
      id="meal-title"
      type="text"
      required
      aria-required="true"
      aria-describedby="title-help title-error"
      aria-invalid={errors.title ? 'true' : 'false'}
    />
    <div id="title-help" className="help-text">
      Enter the name of your meal
    </div>
    {errors.title && (
      <div id="title-error" role="alert" className="error">
        {errors.title}
      </div>
    )}
  </div>
  
  <fieldset>
    <legend>Rating</legend>
    <div role="radiogroup" aria-labelledby="rating-label">
      <span id="rating-label" className="sr-only">
        Rate this meal from 1 to 10
      </span>
      {[1,2,3,4,5,6,7,8,9,10].map(rating => (
        <label key={rating}>
          <input
            type="radio"
            name="rating"
            value={rating}
            aria-describedby="rating-help"
          />
          <span>{rating} star{rating !== 1 ? 's' : ''}</span>
        </label>
      ))}
    </div>
    <div id="rating-help" className="help-text">
      Select a rating from 1 (poor) to 10 (excellent)
    </div>
  </fieldset>
</form>
```

### Live Regions

Dynamic content announcements:

```tsx
// Live region for status updates
const MealSaveStatus = () => {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  
  const saveMeal = async (mealData) => {
    setStatus('Saving meal...');
    setIsError(false);
    
    try {
      await api.saveMeal(mealData);
      setStatus('Meal saved successfully');
    } catch (error) {
      setStatus('Error saving meal. Please try again.');
      setIsError(true);
    }
    
    // Clear status after announcement
    setTimeout(() => setStatus(''), 3000);
  };
  
  return (
    <>
      {/* Polite announcements for success */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {!isError ? status : ''}
      </div>
      
      {/* Assertive announcements for errors */}
      <div 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
        className="sr-only"
      >
        {isError ? status : ''}
      </div>
      
      <Button onClick={() => saveMeal(mealData)}>
        Save Meal
      </Button>
    </>
  );
};
```

### Screen Reader Only Content

Content specifically for screen readers:

```tsx
// Screen reader only descriptions
<MealCard meal={meal}>
  <div className="sr-only">
    Meal entry: {meal.title}, rated {meal.rating} out of 10, 
    eaten {formatTimeAgo(meal.dateEaten)} at {meal.location}
  </div>
  
  <img 
    src={meal.photo} 
    alt={`Photo of ${meal.title}`}
    aria-describedby={`meal-details-${meal.id}`}
  />
  
  <div id={`meal-details-${meal.id}`} className="sr-only">
    This meal was rated {meal.rating} out of 10 and cost {formatPrice(meal.price)}
  </div>
  
  <h3 aria-label={`${meal.title}, ${meal.rating} out of 10 stars`}>
    {meal.title}
  </h3>
</MealCard>
```

## Motion and Animation

### Reduced Motion Support

Respect user preferences for reduced motion:

```css
/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep essential animations but reduce intensity */
  .loading-spinner {
    animation: spin 2s linear infinite !important;
  }
}
```

### Safe Animations

Animations that are safe for users with vestibular disorders:

```tsx
// Safe animation patterns
<div className={cn(
  'transition-all duration-200',
  // Respect reduced motion
  'motion-reduce:transition-none',
  // Safe transforms (no rotation/scaling)
  'hover:translate-y-[-2px]',
  // Avoid parallax and complex movements
  'motion-reduce:hover:translate-y-0'
)}>
  Content with safe animations
</div>
```

## Testing and Validation

### Automated Testing

```typescript
// Accessibility testing with axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('MealCard Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <MealCard meal={mockMeal} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper ARIA attributes', () => {
    render(<MealCard meal={mockMeal} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby');
    expect(card).toHaveAttribute('tabindex', '0');
  });
  
  it('should support keyboard navigation', () => {
    const handleClick = jest.fn();
    render(<MealCard meal={mockMeal} onClick={handleClick} />);
    
    const card = screen.getByRole('article');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] All interactive elements are reachable via Tab
- [ ] Tab order is logical and intuitive
- [ ] Enter/Space activate buttons and links
- [ ] Arrow keys work in lists and menus
- [ ] Escape closes modals and dropdowns
- [ ] Focus is visible and clear

#### Screen Reader Testing
- [ ] Content is announced in logical order
- [ ] Headings create proper document outline
- [ ] Form labels are associated correctly
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Images have appropriate alt text

#### Color and Contrast
- [ ] All text meets 4.5:1 contrast ratio
- [ ] Large text meets 3:1 contrast ratio
- [ ] Color is not the only way to convey information
- [ ] Focus indicators are visible
- [ ] High contrast mode works correctly

#### Touch and Mobile
- [ ] Touch targets are at least 44px
- [ ] Adequate spacing between touch targets
- [ ] Gestures have keyboard alternatives
- [ ] Content reflows properly when zoomed
- [ ] Orientation changes work correctly

### Browser Testing

Test across assistive technologies:

- **Screen Readers:** NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Voice Control:** Dragon NaturallySpeaking, Voice Control (macOS/iOS), Voice Access (Android)
- **Switch Navigation:** Switch Access (Android), Switch Control (iOS)
- **Magnification:** ZoomText, built-in OS magnifiers

## Implementation Guidelines

### Component Development

When creating new components:

1. **Start with semantic HTML**
2. **Add ARIA attributes as needed**
3. **Implement keyboard navigation**
4. **Test with screen readers**
5. **Validate color contrast**
6. **Ensure proper touch targets**

### Code Review Checklist

- [ ] Semantic HTML structure
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Touch target sizing
- [ ] Focus management
- [ ] Error handling accessibility
- [ ] Reduced motion support

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

By following these accessibility guidelines, FoodyLog ensures that all users can effectively log, search, and analyze their meals regardless of their abilities or the assistive technologies they use.