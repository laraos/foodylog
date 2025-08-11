/**
 * Input Component Accessibility Tests
 * 
 * Tests the Input component for WCAG 2.1 AA compliance including
 * proper labeling, keyboard navigation, and error handling.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../input';
import { testAccessibility, testKeyboardNavigation } from '../../../test/accessibility';

describe('Input Accessibility', () => {
  it('should pass all accessibility tests with proper labeling', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="test-input">Email address</label>
        <Input id="test-input" type="email" placeholder="Enter your email" />
      </div>
    );

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should support keyboard navigation', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="test-input">Name</label>
        <Input id="test-input" type="text" />
      </div>
    );

    await testKeyboardNavigation(renderResult, 1);
  });

  it('should support aria-label when no visible label', async () => {
    const renderResult = render(
      <Input aria-label="Search meals" type="search" placeholder="Search..." />
    );

    const { getByRole } = renderResult;
    const input = getByRole('searchbox');
    
    expect(input).toHaveAttribute('aria-label', 'Search meals');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should handle error states accessibly', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="error-input">Email</label>
        <Input 
          id="error-input" 
          type="email" 
          aria-invalid="true"
          aria-describedby="error-message"
        />
        <div id="error-message" role="alert">
          Please enter a valid email address
        </div>
      </div>
    );

    const { getByRole } = renderResult;
    const input = getByRole('textbox');
    const errorMessage = getByRole('alert');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
    expect(errorMessage).toBeInTheDocument();

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
      // Note: role="alert" creates implicit aria-live="assertive" but may not be detectable in test environment
    });
  });

  it('should support required fields', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="required-input">
          Meal title <span aria-label="required">*</span>
        </label>
        <Input 
          id="required-input" 
          type="text" 
          required 
          aria-required="true"
        />
      </div>
    );

    const { getByRole } = renderResult;
    const input = getByRole('textbox');
    
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required', 'true');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should handle disabled state properly', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="disabled-input">Disabled field</label>
        <Input id="disabled-input" type="text" disabled />
      </div>
    );

    const { getByRole } = renderResult;
    const input = getByRole('textbox');
    
    expect(input).toBeDisabled();
    // HTML disabled attribute is sufficient for accessibility

    await testAccessibility(renderResult, {
      expectedFocusableElements: 0, // Disabled inputs are not focusable
      skipKeyboardNavigation: true,
    });
  });

  it('should support different input types', async () => {
    const inputTypes = [
      { type: 'text', role: 'textbox' },
      { type: 'email', role: 'textbox' },
      { type: 'search', role: 'searchbox' },
      { type: 'tel', role: 'textbox' },
      { type: 'url', role: 'textbox' },
      { type: 'number', role: 'spinbutton' },
    ] as const;

    for (const { type, role } of inputTypes) {
      const renderResult = render(
        <div>
          <label htmlFor={`${type}-input`}>{type} field</label>
          <Input id={`${type}-input`} type={type} />
        </div>
      );

      const { getByRole } = renderResult;
      const input = getByRole(role);
      
      expect(input).toHaveAttribute('type', type);

      await testAccessibility(renderResult, {
        expectedFocusableElements: 1,
        skipKeyboardNavigation: true,
      });

      renderResult.unmount();
    }

    // Test password input separately since it doesn't have an accessible role
    const passwordResult = render(
      <div>
        <label htmlFor="password-input">Password field</label>
        <Input id="password-input" type="password" />
      </div>
    );

    const passwordInput = passwordResult.container.querySelector('#password-input');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await testAccessibility(passwordResult, {
      expectedFocusableElements: 1,
      skipKeyboardNavigation: true,
    });

    passwordResult.unmount();
  });

  it('should handle focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    const { getByRole, container } = render(
      <div>
        <label htmlFor="focus-input">Focus test</label>
        <Input 
          id="focus-input" 
          type="text" 
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );

    const input = getByRole('textbox');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    
    // The input should be focused (it's wrapped in a div container)
    const actualInput = container.querySelector('#focus-input');
    expect(actualInput).toBe(input);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should support autocomplete attributes', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="autocomplete-input">Email</label>
        <Input 
          id="autocomplete-input" 
          type="email" 
          autoComplete="email"
        />
      </div>
    );

    const { getByRole } = renderResult;
    const input = getByRole('textbox');
    
    expect(input).toHaveAttribute('autocomplete', 'email');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });

  it('should handle placeholder text appropriately', async () => {
    const renderResult = render(
      <div>
        <label htmlFor="placeholder-input">Search</label>
        <Input 
          id="placeholder-input" 
          type="search" 
          placeholder="Enter meal name or restaurant"
        />
      </div>
    );

    const { getByRole } = renderResult;
    const input = getByRole('searchbox');
    
    expect(input).toHaveAttribute('placeholder', 'Enter meal name or restaurant');
    
    // Placeholder should not be the only form of labeling
    expect(input).toHaveAccessibleName('Search');

    await testAccessibility(renderResult, {
      expectedFocusableElements: 1,
    });
  });
});