/**
 * Card Component Accessibility Tests
 * 
 * Tests the Card component for WCAG 2.1 AA compliance including
 * proper semantic structure, keyboard navigation, and screen reader support.
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import { testAccessibility } from '../../../test/accessibility';

describe('Card Accessibility', () => {
  it('should pass all accessibility tests', async () => {
    const renderResult = render(
      <Card>
        <CardHeader>
          <CardTitle>Delicious Pasta</CardTitle>
          <CardDescription>Italian restaurant downtown</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Amazing carbonara with fresh ingredients. The atmosphere was cozy and service was excellent.</p>
        </CardContent>
        <CardFooter>
          <p>Rating: 9/10</p>
        </CardFooter>
      </Card>
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0, // Basic card has no interactive elements
      skipKeyboardNavigation: true,
    });
  });

  it('should support semantic article structure for meal cards', async () => {
    const renderResult = render(
      <Card role="article" aria-labelledby="meal-title">
        <CardHeader>
          <CardTitle id="meal-title">Sushi Dinner</CardTitle>
          <CardDescription>Yamato Sushi Restaurant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Fresh sashimi and perfectly seasoned rice. The chef's special roll was outstanding.</p>
          <div aria-label="Meal details">
            <p>Date: March 15, 2024</p>
            <p>Price: $45</p>
            <p>Type: Dinner</p>
          </div>
        </CardContent>
        <CardFooter>
          <div aria-label="Rating">
            <span>Rating: 10/10</span>
          </div>
        </CardFooter>
      </Card>
    );

    const { getByRole } = renderResult;
    const article = getByRole('article');
    
    expect(article).toHaveAttribute('aria-labelledby', 'meal-title');
    
    // Title should be properly associated
    const title = renderResult.container.querySelector('#meal-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Sushi Dinner');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
    });
  });

  it('should support interactive card with proper focus management', async () => {
    const handleClick = vi.fn();
    
    const renderResult = render(
      <Card 
        role="button" 
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="View meal details for Burger Night"
        className="cursor-pointer hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <CardHeader>
          <CardTitle>Burger Night</CardTitle>
          <CardDescription>Local Burger Joint</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Classic cheeseburger with crispy fries.</p>
        </CardContent>
      </Card>
    );

    const { getByRole } = renderResult;
    const button = getByRole('button');
    
    expect(button).toHaveAttribute('tabindex', '0');
    expect(button).toHaveAttribute('aria-label', 'View meal details for Burger Night');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should handle card with form elements', async () => {
    const renderResult = render(
      <Card>
        <CardHeader>
          <CardTitle>Quick Meal Log</CardTitle>
          <CardDescription>Add a new meal entry</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="meal-name">Meal name</label>
                <input 
                  id="meal-name" 
                  type="text" 
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="meal-rating">Rating (1-10)</label>
                <input 
                  id="meal-rating" 
                  type="number" 
                  min="1" 
                  max="10"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Save Meal
          </button>
        </CardFooter>
      </Card>
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 3, // 2 inputs + 1 button
    });
  });

  it('should support card with image and proper alt text', async () => {
    const renderResult = render(
      <Card role="article" aria-labelledby="pizza-title">
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src="/meal-photos/pizza.jpg" 
            alt="Margherita pizza with fresh basil, mozzarella, and tomato sauce on a wooden board"
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle id="pizza-title">Margherita Pizza</CardTitle>
          <CardDescription>Tony's Pizzeria</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Authentic Neapolitan-style pizza with perfect crust and fresh ingredients.</p>
        </CardContent>
      </Card>
    );

    const { getByRole } = renderResult;
    const image = getByRole('img');
    
    expect(image).toHaveAttribute('alt', 'Margherita pizza with fresh basil, mozzarella, and tomato sauce on a wooden board');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
    });
  });

  it('should handle loading state with proper announcements', async () => {
    const renderResult = render(
      <Card>
        <CardHeader>
          <CardTitle>Loading Meal...</CardTitle>
        </CardHeader>
        <CardContent>
          <div role="status" aria-live="polite">
            <span className="sr-only">Loading meal details, please wait...</span>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );

    const { getByRole } = renderResult;
    const status = getByRole('status');
    
    expect(status).toHaveAttribute('aria-live', 'polite');
    
    // Screen reader text should be present
    const srText = renderResult.container.querySelector('.sr-only');
    expect(srText).toHaveTextContent('Loading meal details, please wait...');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
      expectedAriaLive: ['polite'],
    });
  });

  it('should support card with action buttons', async () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();
    
    const renderResult = render(
      <Card role="article" aria-labelledby="taco-title">
        <CardHeader>
          <CardTitle id="taco-title">Fish Tacos</CardTitle>
          <CardDescription>Beachside Cantina</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Grilled mahi-mahi with cabbage slaw and lime crema.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button 
            onClick={handleEdit}
            aria-label="Edit Fish Tacos meal entry"
            className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            aria-label="Delete Fish Tacos meal entry"
            className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded"
          >
            Delete
          </button>
        </CardFooter>
      </Card>
    );

    const buttons = renderResult.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    expect(buttons[0]).toHaveAttribute('aria-label', 'Edit Fish Tacos meal entry');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Delete Fish Tacos meal entry');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 2,
    });
  });

  it('should support proper heading hierarchy when using semantic elements', async () => {
    const renderResult = render(
      <div>
        <h1>My Meals</h1>
        <Card role="article">
          <CardHeader>
            <h2 className="text-2xl font-semibold leading-none tracking-tight">Recent Dinner</h2>
            <CardDescription>Last night's meal</CardDescription>
          </CardHeader>
          <CardContent>
            <h3>Restaurant Details</h3>
            <p>The Olive Garden on Main Street</p>
            <h3>Meal Notes</h3>
            <p>Excellent pasta with garlic bread.</p>
          </CardContent>
        </Card>
      </div>
    );

    // Check heading hierarchy (h1 -> h2 -> h3)
    const h1 = renderResult.getByRole('heading', { level: 1 });
    const h2 = renderResult.getByRole('heading', { level: 2 });
    const h3s = renderResult.getAllByRole('heading', { level: 3 });
    
    expect(h1).toHaveTextContent('My Meals');
    expect(h2).toHaveTextContent('Recent Dinner');
    expect(h3s).toHaveLength(2);

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0,
      skipKeyboardNavigation: true,
    });
  });
});