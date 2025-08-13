/**
 * Badge Component Accessibility Tests
 * 
 * Tests the Badge component for WCAG 2.1 AA compliance including
 * proper semantic structure, keyboard navigation, and screen reader support.
 * Includes tests for FoodyLog-specific badge variants.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Badge, MealTagBadge, RatingBadge, MealTypeBadge, PriceBadge } from '../badge';
import { testAccessibility } from '../../../test/accessibility';

describe('Badge Accessibility', () => {
  it('should pass all accessibility tests', async () => {
    const renderResult = render(
      <Badge>Default Badge</Badge>,
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0, // Basic badge is not interactive
      skipKeyboardNavigation: true,
    });
  });

  it('should support removable badges with proper keyboard interaction', async () => {
    const handleRemove = vi.fn();
    
    const renderResult = render(
      <Badge removable onRemove={handleRemove} aria-label="Italian cuisine tag">
        Italian
      </Badge>,
    );

    const { getByRole } = renderResult;
    const removeButton = getByRole('button');
    
    expect(removeButton).toHaveAttribute('aria-label', 'Remove tag');
    
    // Test keyboard interaction
    fireEvent.keyDown(removeButton, { key: 'Enter' });
    fireEvent.keyDown(removeButton, { key: ' ' });

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1, // Remove button is focusable
    });
  });

  it('should support different variants with proper contrast', async () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'tag', 'rating', 'mealType', 'price'] as const;
    
    for (const variant of variants) {
      const renderResult = render(
        <Badge variant={variant}>Badge {variant}</Badge>,
      );

      // Each variant should pass accessibility tests
      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });

      renderResult.unmount();
    }
  });

  it('should support MealTagBadge with proper semantics', async () => {
    const renderResult = render(
      <MealTagBadge tag="italian" removable onRemove={vi.fn()} />,
    );

    // Use getByText to find the badge content
    const badgeText = renderResult.getByText('#italian');
    expect(badgeText).toBeInTheDocument();
    
    // Should have remove button
    const removeButton = renderResult.getByRole('button');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove tag');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should support RatingBadge with proper rating information', async () => {
    const renderResult = render(
      <RatingBadge rating={8.5} maxRating={10} aria-label="Meal rating 8.5 out of 10" />,
    );

    // Use getByText to find the badge content
    const badgeText = renderResult.getByText('⭐ 8.5/10');
    expect(badgeText).toBeInTheDocument();
    
    // Check the parent element for aria-label
    const badge = badgeText.closest('[aria-label]');
    expect(badge).toHaveAttribute('aria-label', 'Meal rating 8.5 out of 10');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
    });
  });

  it('should support MealTypeBadge with proper meal type semantics', async () => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
    
    for (const mealType of mealTypes) {
      const renderResult = render(
        <MealTypeBadge mealType={mealType} aria-label={`Meal type: ${mealType}`} />,
      );

      // Should contain emoji and text
      const expectedLabels = {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        snack: 'Snack',
      };
      
      // Find the badge by its aria-label and check it contains the expected text
      const badge = renderResult.container.querySelector(`[aria-label="Meal type: ${mealType}"]`);
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toContain(expectedLabels[mealType]);
      
      expect(badge).toHaveAttribute('aria-label', `Meal type: ${mealType}`);

      await testAccessibility(renderResult, {
        expectedFocusableElements: 0,
        skipKeyboardNavigation: true,
      });

      renderResult.unmount();
    }
  });

  it('should support PriceBadge with proper price formatting', async () => {
    const renderResult = render(
      <PriceBadge price={24.99} currency="USD" aria-label="Meal cost $24.99" />,
    );

    // Use getByText to find the badge content
    const badgeText = renderResult.getByText('💰 $24.99');
    expect(badgeText).toBeInTheDocument();
    
    // Check the parent element for aria-label
    const badge = badgeText.closest('[aria-label]');
    expect(badge).toHaveAttribute('aria-label', 'Meal cost $24.99');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
    });
  });

  it('should handle badge groups with proper navigation', async () => {
    const handleRemove = vi.fn();
    
    const renderResult = render(
      <div role="group" aria-label="Meal tags">
        <MealTagBadge tag="italian" removable onRemove={() => handleRemove('italian')} />
        <MealTagBadge tag="pasta" removable onRemove={() => handleRemove('pasta')} />
        <MealTagBadge tag="dinner" removable onRemove={() => handleRemove('dinner')} />
      </div>,
    );

    const { getByRole, getAllByRole } = renderResult;
    const group = getByRole('group');
    const removeButtons = getAllByRole('button');
    
    expect(group).toHaveAttribute('aria-label', 'Meal tags');
    expect(removeButtons).toHaveLength(3);
    
    // All remove buttons should be properly labeled
    removeButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label', 'Remove tag');
    });

    await testAccessibility(renderResult, {
      expectedFocusableElements: 3, // Three remove buttons
    });
  });

  it('should support badge as status indicator', async () => {
    const renderResult = render(
      <div>
        <span id="meal-status">Meal status:</span>
        <Badge 
          variant="secondary" 
          role="status" 
          aria-labelledby="meal-status"
          aria-live="polite"
        >
          Saved
        </Badge>
      </div>,
    );

    const { getByRole } = renderResult;
    const status = getByRole('status');
    
    expect(status).toHaveAttribute('aria-labelledby', 'meal-status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Saved');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
      expectedAriaLive: ['polite'],
    });
  });

  it('should handle badge with custom click handler', async () => {
    const handleClick = vi.fn();
    
    const renderResult = render(
      <Badge 
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Filter by Italian cuisine"
        className="cursor-pointer hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Italian
      </Badge>,
    );

    const { getByRole } = renderResult;
    const button = getByRole('button');
    
    expect(button).toHaveAttribute('tabindex', '0');
    expect(button).toHaveAttribute('aria-label', 'Filter by Italian cuisine');
    
    // Test click interaction
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should support different sizes with proper touch targets', async () => {
    const sizes = ['sm', 'default', 'lg'] as const;
    
    for (const size of sizes) {
      const renderResult = render(
        <Badge size={size} removable onRemove={vi.fn()}>
          Size {size}
        </Badge>,
      );

      const removeButton = renderResult.getByRole('button');
      
      // All sizes should have adequate touch targets
      // The actual size is controlled by CSS, but the button should be accessible
      expect(removeButton).toBeInTheDocument();

      await testAccessibility(renderResult, {
        expectedFocusableElements: 1,
        skipKeyboardNavigation: true,
      });

      renderResult.unmount();
    }
  });

  it('should handle badge removal with proper event handling', () => {
    const handleRemove = vi.fn();
    
    const { getByRole } = render(
      <Badge removable onRemove={handleRemove}>
        Removable Badge
      </Badge>,
    );

    const removeButton = getByRole('button');
    
    // Test click event
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
    
    // Test keyboard events
    fireEvent.keyDown(removeButton, { key: 'Enter' });
    fireEvent.keyDown(removeButton, { key: ' ' });
    
    // Event propagation should be stopped
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
    
    fireEvent(removeButton, clickEvent);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});