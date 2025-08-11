# FoodyLog Accessibility Guide

FoodyLog is committed to providing an inclusive experience for all users, including those with disabilities. This document outlines our accessibility standards, testing procedures, and implementation guidelines.

## 🎯 Accessibility Standards

FoodyLog follows **WCAG 2.1 AA** standards to ensure the app is usable by people with various disabilities, including:

- Visual impairments (blindness, low vision, color blindness)
- Hearing impairments
- Motor disabilities
- Cognitive disabilities

### Key Principles

1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable by all users
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

## 🎨 Color and Contrast

### Color Contrast Standards

All text and interactive elements meet WCAG AA contrast requirements:

- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum contrast ratio
- **Interactive elements**: 3:1 minimum contrast ratio

### FoodyLog Color Palette Compliance

Our color system has been audited and achieves **100% WCAG AA compliance**:

#### Light Mode
- Background (#f0e6db) vs Text (#2e2924): **11.69:1** ✅
- Primary buttons (#3a784e) vs White text: **5.28:1** ✅
- All rating colors meet minimum contrast requirements ✅

#### Dark Mode
- Background (#211e1c) vs Text (#f0e6db): **13.45:1** ✅
- Primary buttons (#31814b) vs White text: **4.8:1** ✅
- All interactive elements meet contrast requirements ✅

### Color Usage Guidelines

- **Never rely on color alone** to convey information
- Use icons, text labels, or patterns alongside color
- Ensure sufficient contrast for all text and interactive elements
- Test with color blindness simulators

## ⌨️ Keyboard Navigation

### Navigation Standards

All interactive elements must be keyboard accessible:

- **Tab order**: Logical and intuitive
- **Focus indicators**: Visible focus rings on all interactive elements
- **Keyboard shortcuts**: Standard shortcuts work (Enter, Space, Escape)
- **Focus trapping**: Modals and dialogs trap focus appropriately

### FoodyLog Keyboard Patterns

#### Meal List Navigation
```
Tab → Navigate between meal cards
Enter/Space → Open meal details
Arrow keys → Navigate within meal card actions
Escape → Close meal details/modals
```

#### Meal Form Navigation
```
Tab → Move between form fields
Enter → Submit form (when on submit button)
Escape → Cancel/close form
```

#### Photo Capture
```
Tab → Focus camera button
Enter/Space → Activate camera
Escape → Cancel photo capture
```

### Implementation

```css
/* Focus styles for all interactive elements */
:focus-visible {
  outline: none;
  ring: 2px solid hsl(var(--ring));
  ring-offset: 2px;
}

/* Ensure minimum touch target size (44px) */
.interactive-element {
  min-height: 44px;
  min-width: 44px;
}
```

## 🔊 Screen Reader Support

### ARIA Implementation

#### Meal Cards
```jsx
<Card role="article" aria-labelledby="meal-title">
  <CardTitle id="meal-title">Delicious Pasta</CardTitle>
  <CardContent>
    <div aria-label="Meal details">
      <p>Rating: <span aria-label="9 out of 10 stars">9/10</span></p>
      <p>Price: $25</p>
    </div>
  </CardContent>
</Card>
```

#### Form Labels
```jsx
<label htmlFor="meal-title">
  Meal Title <span aria-label="required">*</span>
</label>
<Input 
  id="meal-title" 
  required 
  aria-required="true"
  aria-describedby="title-help"
/>
<div id="title-help">Enter the name of your meal</div>
```

#### Dynamic Content
```jsx
<div role="status" aria-live="polite">
  <span className="sr-only">Meal saved successfully</span>
</div>
```

### Screen Reader Testing

Test with popular screen readers:
- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

## 📱 Mobile Accessibility

### Touch Targets

All interactive elements meet minimum touch target sizes:
- **Minimum size**: 44px × 44px
- **Recommended size**: 48px × 48px
- **Spacing**: 8px minimum between targets

### Gestures

Support standard accessibility gestures:
- **Single tap**: Activate element
- **Double tap**: Confirm action (screen reader mode)
- **Swipe**: Navigate between elements
- **Pinch**: Zoom (don't disable)

### Implementation

```jsx
// Proper touch target sizing
<Button className="min-h-[44px] min-w-[44px] p-2">
  <Icon aria-hidden="true" />
  <span className="sr-only">Add meal</span>
</Button>

// Accessible swipe actions
<div 
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  aria-label="Swipe to delete meal"
>
  {/* Meal content */}
</div>
```

## 🧪 Testing Procedures

### Automated Testing

FoodyLog includes comprehensive accessibility testing utilities built on axe-core and React Testing Library. These utilities are specifically configured for FoodyLog's design system and WCAG 2.1 AA compliance requirements.

```bash
# Full accessibility audit
bun run audit:accessibility

# Color contrast only
bun run audit:colors

# Component tests only
bun run test:a11y

# Run all tests including accessibility
bun run test
```

### Accessibility Testing Utilities

**Location**: `src/test/accessibility.ts`

Our accessibility testing utilities provide comprehensive testing functions for ensuring WCAG 2.1 AA compliance:

#### Core Testing Functions

##### `testAccessibility(renderResult, options)`
Comprehensive accessibility test suite that runs all accessibility checks for a component.

```typescript
import { render } from '@testing-library/react';
import { testAccessibility } from '~/test/accessibility';
import { MealCard } from '~/components/meal/MealCard';

test('MealCard is accessible', async () => {
  const renderResult = render(
    <MealCard 
      meal={mockMeal} 
      onEdit={vi.fn()} 
      onDelete={vi.fn()} 
    />
  );

  // Run comprehensive accessibility tests
  await testAccessibility(renderResult, {
    expectedFocusableElements: 2, // Edit and delete buttons
    expectedAriaLive: ['polite'], // Status announcements
    skipColorContrast: false, // Test color contrast
    skipKeyboardNavigation: false // Test keyboard navigation
  });
});
```

**Options:**
- `expectedFocusableElements?: number` - Number of expected focusable elements
- `skipKeyboardNavigation?: boolean` - Skip keyboard navigation tests
- `skipColorContrast?: boolean` - Skip color contrast tests (useful in test environments)
- `expectedAriaLive?: string[]` - Expected aria-live region values

##### `testKeyboardNavigation(renderResult, expectedFocusableElements)`
Tests keyboard navigation through all interactive elements.

```typescript
import { testKeyboardNavigation } from '~/test/accessibility';

test('Navigation component keyboard accessibility', async () => {
  const renderResult = render(<Navigation />);
  
  // Test that all 5 navigation items are keyboard accessible
  const focusableElements = await testKeyboardNavigation(renderResult, 5);
  
  // Verify specific navigation behavior
  expect(focusableElements[0]).toHaveAttribute('href', '/');
  expect(focusableElements[2]).toHaveAttribute('href', '/add'); // Primary action
});
```

##### `testFocusTrap(renderResult, triggerSelector, modalSelector)`
Tests focus management for modal and dialog components.

```typescript
import { testFocusTrap } from '~/test/accessibility';

test('Meal edit dialog focus management', async () => {
  const renderResult = render(<MealEditDialog />);
  
  // Test focus trap in modal
  await testFocusTrap(
    renderResult,
    '[data-testid="edit-meal-button"]', // Trigger element
    '[role="dialog"]' // Modal container
  );
});
```

##### `testScreenReaderAnnouncements(renderResult, expectedAriaLive)`
Verifies screen reader support and ARIA implementation.

```typescript
import { testScreenReaderAnnouncements } from '~/test/accessibility';

test('Meal form screen reader support', async () => {
  const renderResult = render(<MealForm />);
  
  // Test screen reader announcements
  testScreenReaderAnnouncements(renderResult, [
    'polite', // Form validation messages
    'assertive' // Error announcements
  ]);
});
```

##### `testColorContrast(renderResult)`
Tests color contrast compliance for WCAG AA standards.

```typescript
import { testColorContrast } from '~/test/accessibility';

test('Rating component color contrast', async () => {
  const renderResult = render(<RatingDisplay rating={8} />);
  
  // Test color contrast meets WCAG AA standards
  const results = await testColorContrast(renderResult);
  expect(results.violations).toHaveLength(0);
});
```

#### Mock Screen Reader

For testing screen reader interactions:

```typescript
import { mockScreenReader } from '~/test/accessibility';

test('Meal save announcement', async () => {
  const { getByRole } = render(<MealForm />);
  
  // Clear previous announcements
  mockScreenReader.clear();
  
  // Trigger save action
  fireEvent.click(getByRole('button', { name: /save meal/i }));
  
  // Verify screen reader announcement
  expect(mockScreenReader.getLastAnnouncement()).toBe('Meal saved successfully');
});
```

#### Axe-Core Configuration

Our axe configuration is specifically tuned for FoodyLog:

```typescript
// Enabled rules critical for food logging workflow
'color-contrast': { enabled: true }, // Critical for meal photos and ratings
'aria-allowed-attr': { enabled: true }, // Critical for screen readers
'button-name': { enabled: true }, // Buttons must have accessible names
'form-field-multiple-labels': { enabled: true }, // Form accessibility
'label': { enabled: true }, // Form labels must be associated

// Disabled rules that conflict with shadcn/ui patterns
'landmark-one-main': { enabled: false }, // shadcn/ui layouts handle this
'region': { enabled: false }, // Not applicable to component testing
```

### Component Testing Examples

#### Testing a Meal Card Component

```typescript
import { render } from '@testing-library/react';
import { testAccessibility, testKeyboardNavigation } from '~/test/accessibility';
import { MealCard } from '~/components/meal/MealCard';

describe('MealCard Accessibility', () => {
  const mockMeal = {
    id: '1',
    title: 'Delicious Pasta',
    rating: 9,
    price: 25,
    createdAt: Date.now()
  };

  test('meets WCAG 2.1 AA standards', async () => {
    const renderResult = render(
      <MealCard 
        meal={mockMeal} 
        onEdit={vi.fn()} 
        onDelete={vi.fn()} 
      />
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 2, // Edit and delete buttons
      expectedAriaLive: [], // No live regions in basic card
    });
  });

  test('keyboard navigation works correctly', async () => {
    const renderResult = render(
      <MealCard 
        meal={mockMeal} 
        onEdit={vi.fn()} 
        onDelete={vi.fn()} 
      />
    );

    const focusableElements = await testKeyboardNavigation(renderResult, 2);
    
    // Verify button accessibility
    expect(focusableElements[0]).toHaveAttribute('aria-label', 'Edit meal: Delicious Pasta');
    expect(focusableElements[1]).toHaveAttribute('aria-label', 'Delete meal: Delicious Pasta');
  });
});
```

#### Testing a Form Component

```typescript
import { render, fireEvent } from '@testing-library/react';
import { testAccessibility, mockScreenReader } from '~/test/accessibility';
import { MealForm } from '~/components/meal/MealForm';

describe('MealForm Accessibility', () => {
  test('form accessibility compliance', async () => {
    const renderResult = render(<MealForm onSubmit={vi.fn()} />);

    await testAccessibility(renderResult, {
      expectedFocusableElements: 6, // Title, rating, price, tags, photo, submit
      expectedAriaLive: ['polite'], // Form validation messages
    });
  });

  test('screen reader announcements', async () => {
    const { getByRole, getByLabelText } = render(<MealForm onSubmit={vi.fn()} />);
    
    mockScreenReader.clear();
    
    // Test validation announcement
    fireEvent.click(getByRole('button', { name: /save meal/i }));
    
    expect(mockScreenReader.getLastAnnouncement()).toContain('Please fill in required fields');
  });
});
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps (except modals)
- [ ] All functionality available via keyboard

#### Screen Reader Testing
- [ ] All content is announced properly
- [ ] Form labels are associated correctly
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced
- [ ] Navigation landmarks are present

#### Visual Testing
- [ ] Text is readable at 200% zoom
- [ ] Color contrast meets WCAG AA standards
- [ ] Content reflows properly on small screens
- [ ] Focus indicators are visible
- [ ] No information conveyed by color alone

#### Mobile Testing
- [ ] Touch targets are minimum 44px
- [ ] Gestures work with assistive technology
- [ ] Screen reader navigation works
- [ ] Zoom functionality is not disabled

### Testing Tools

#### Browser Extensions
- **axe DevTools**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Accessibility audit in Chrome DevTools

#### Color Tools
- **WebAIM Contrast Checker**: Manual contrast testing
- **Colour Contrast Analyser**: Desktop tool for contrast checking

#### Screen Readers
- **NVDA** (Windows): Free, widely used
- **VoiceOver** (macOS/iOS): Built-in Apple screen reader
- **TalkBack** (Android): Built-in Android screen reader

## 🚀 Implementation Guidelines

### Component Development

#### Always Include
```jsx
// Proper semantic HTML
<button type="button" aria-label="Close dialog">
  <X aria-hidden="true" />
</button>

// Form associations
<label htmlFor="rating">Rating</label>
<select id="rating" aria-describedby="rating-help">
  <option value="1">1 star</option>
  {/* ... */}
</select>
<div id="rating-help">Rate your meal from 1 to 10</div>

// Loading states
<div role="status" aria-live="polite">
  <span className="sr-only">Loading meals...</span>
  <Spinner aria-hidden="true" />
</div>
```

#### Avoid
```jsx
// ❌ Div buttons without proper attributes
<div onClick={handleClick}>Click me</div>

// ❌ Images without alt text
<img src="meal.jpg" />

// ❌ Form inputs without labels
<input type="text" placeholder="Enter meal name" />

// ❌ Color-only information
<span style={{color: 'red'}}>Required</span>
```

### Error Handling

```jsx
// Accessible error messages
<Input 
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-message" : undefined}
/>
{hasError && (
  <div id="error-message" role="alert">
    Please enter a valid meal name
  </div>
)}
```

### Dynamic Content

```jsx
// Announce important changes
const [mealSaved, setMealSaved] = useState(false);

return (
  <>
    {mealSaved && (
      <div role="status" aria-live="polite">
        <span className="sr-only">Meal saved successfully</span>
      </div>
    )}
    {/* Form content */}
  </>
);
```

## 📊 Accessibility Metrics

### Current Status

- **Color Contrast**: 100% WCAG AA compliance
- **Keyboard Navigation**: Full support implemented
- **Screen Reader Support**: ARIA patterns implemented
- **Mobile Accessibility**: Touch targets and gestures optimized

### Continuous Monitoring

- Automated tests run on every PR
- Manual testing performed monthly
- User feedback collected and addressed
- Regular audits with accessibility experts

## 🤝 User Feedback

We welcome feedback from users with disabilities. Contact us:

- **Email**: accessibility@foodylog.app
- **GitHub Issues**: Tag with `accessibility` label
- **User Testing**: Participate in our accessibility user testing program

## 📚 Resources

### WCAG Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers
- [NVDA Download](https://www.nvaccess.org/download/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/)
- [TalkBack Help](https://support.google.com/accessibility/android/answer/6283677)

### Mobile Accessibility
- [iOS Accessibility](https://developer.apple.com/accessibility/ios/)
- [Android Accessibility](https://developer.android.com/guide/topics/ui/accessibility)

---

*This document is updated regularly to reflect our ongoing commitment to accessibility. Last updated: December 2024*