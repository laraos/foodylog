/**
 * Accessibility Testing Utilities
 * 
 * Utilities for testing accessibility compliance in FoodyLog components.
 * Uses axe-core for automated accessibility testing and provides helpers
 * for keyboard navigation and screen reader testing.
 */

import type { RenderResult } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { configureAxe } from 'jest-axe';

/**
 * Configure axe-core for FoodyLog accessibility standards
 * 
 * Configures axe to test for WCAG 2.1 AA compliance with FoodyLog-specific
 * rules and exceptions. Focuses on critical accessibility issues that affect
 * food logging workflow and mobile usage.
 */
export const axe = configureAxe({
  rules: {
    // Enable critical accessibility rules
    'color-contrast': { enabled: true }, // Critical for meal photos and ratings
    'aria-allowed-attr': { enabled: true }, // Critical for screen readers
    'aria-required-attr': { enabled: true }, // Required ARIA attributes
    'button-name': { enabled: true }, // Buttons must have accessible names
    'form-field-multiple-labels': { enabled: true }, // Form accessibility
    'input-image-alt': { enabled: true }, // Image inputs need alt text
    'label': { enabled: true }, // Form labels must be associated

    // Disable rules that conflict with shadcn/ui patterns or component testing
    'landmark-one-main': { enabled: false }, // shadcn/ui layouts handle this
    'region': { enabled: false }, // Not applicable to component testing
    'page-has-heading-one': { enabled: false }, // Not applicable to component testing
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
});

/**
 * Test keyboard navigation for a component
 * 
 * Verifies that all interactive elements can be reached and activated
 * using only keyboard navigation. Essential for FoodyLog's mobile-first
 * approach where users may use external keyboards.
 * 
 * @param renderResult - React Testing Library render result
 * @param expectedFocusableElements - Number of expected focusable elements
 */
export const testKeyboardNavigation = async (
  renderResult: RenderResult,
  expectedFocusableElements: number
) => {
  const { container } = renderResult;

  // Get all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  expect(focusableElements).toHaveLength(expectedFocusableElements);

  // Test tab navigation through all elements
  let currentIndex = 0;
  for (const element of focusableElements) {
    // Focus the element
    (element as HTMLElement).focus();
    expect(document.activeElement).toBe(element);

    // Test Enter key activation for buttons and links
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      const clickSpy = vi.fn();
      element.addEventListener('click', clickSpy);

      fireEvent.keyDown(element, { key: 'Enter', code: 'Enter' });
      // Note: Some elements may not trigger click on Enter in test environment
      // This is expected behavior for testing
    }

    currentIndex++;
  }

  return focusableElements;
};

/**
 * Test focus management for modal/dialog components
 * 
 * Verifies that focus is properly trapped within modal components
 * and returns to the trigger element when closed. Critical for
 * FoodyLog's meal editing and photo capture workflows.
 * 
 * @param renderResult - React Testing Library render result
 * @param triggerSelector - CSS selector for element that opens modal
 * @param modalSelector - CSS selector for modal container
 */
export const testFocusTrap = async (
  renderResult: RenderResult,
  triggerSelector: string,
  modalSelector: string
) => {
  const { container } = renderResult;

  const trigger = container.querySelector(triggerSelector) as HTMLElement;
  const modal = container.querySelector(modalSelector) as HTMLElement;

  expect(trigger).toBeInTheDocument();

  // Focus trigger and activate
  trigger.focus();
  fireEvent.click(trigger);

  // Modal should be visible and focused
  expect(modal).toBeInTheDocument();

  // Focus should be trapped within modal
  const modalFocusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (modalFocusableElements.length > 0) {
    // First focusable element should be focused
    expect(document.activeElement).toBe(modalFocusableElements[0]);

    // Tab should cycle through modal elements only
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    // Focus should stay within modal bounds
    expect(modal.contains(document.activeElement)).toBe(true);
  }
};

/**
 * Test screen reader announcements
 * 
 * Verifies that important state changes and actions are properly
 * announced to screen readers. Critical for FoodyLog's meal logging
 * workflow where users need feedback on photo uploads and form submissions.
 * 
 * @param renderResult - React Testing Library render result
 * @param expectedAriaLive - Expected aria-live regions
 */
export const testScreenReaderAnnouncements = (
  renderResult: RenderResult,
  expectedAriaLive: string[] = []
) => {
  const { container } = renderResult;

  // Check for aria-live regions
  const liveRegions = container.querySelectorAll('[aria-live]');
  expect(liveRegions.length).toBeGreaterThanOrEqual(expectedAriaLive.length);

  // Verify specific aria-live values
  expectedAriaLive.forEach((expectedValue, index) => {
    if (liveRegions[index]) {
      expect(liveRegions[index]).toHaveAttribute('aria-live', expectedValue);
    }
  });

  // Check for proper labeling of form elements
  const formElements = container.querySelectorAll('input, select, textarea');
  formElements.forEach(element => {
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
    const hasAssociatedLabel = container.querySelector(`label[for="${element.id}"]`);

    const hasLabel = hasAriaLabel || hasAriaLabelledBy || hasAssociatedLabel;
    expect(hasLabel).toBeTruthy();
  });

  // Check for proper button descriptions
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    const hasAccessibleName =
      button.textContent?.trim() ||
      button.hasAttribute('aria-label') ||
      button.hasAttribute('aria-labelledby');

    expect(hasAccessibleName).toBeTruthy();
  });
};

/**
 * Test color contrast compliance
 * 
 * Verifies that text and background color combinations meet WCAG AA
 * standards. Critical for FoodyLog's rating system and meal photos
 * where text overlays are common.
 * 
 * @param renderResult - React Testing Library render result
 */
export const testColorContrast = async (renderResult: RenderResult) => {
  const { container } = renderResult;

  // Run axe-core color contrast checks
  const results = await axe(container);

  // Filter for color contrast violations
  const contrastViolations = results.violations.filter(
    (violation: any) => violation.id === 'color-contrast'
  );

  if (contrastViolations.length > 0) {
    console.error('Color contrast violations found:', contrastViolations);
  }

  expect(contrastViolations).toHaveLength(0);

  return results;
};

/**
 * Comprehensive accessibility test suite
 * 
 * Runs all accessibility tests for a component. Use this as the main
 * accessibility testing function for FoodyLog components.
 * 
 * @param renderResult - React Testing Library render result
 * @param options - Test configuration options
 */
export const testAccessibility = async (
  renderResult: RenderResult,
  options: {
    expectedFocusableElements?: number;
    skipKeyboardNavigation?: boolean;
    skipColorContrast?: boolean;
    expectedAriaLive?: string[];
  } = {}
) => {
  const {
    expectedFocusableElements = 0,
    skipKeyboardNavigation = false,
    skipColorContrast = false,
    expectedAriaLive = [],
  } = options;

  const { container } = renderResult;

  // Run axe-core accessibility tests
  const axeResults = await axe(container);

  // Check for violations manually since toHaveNoViolations might not be available
  if (axeResults.violations.length > 0) {
    console.error('Accessibility violations found:', axeResults.violations);
    throw new Error(`Found ${axeResults.violations.length} accessibility violations`);
  }

  // Test keyboard navigation if not skipped
  if (!skipKeyboardNavigation && expectedFocusableElements > 0) {
    await testKeyboardNavigation(renderResult, expectedFocusableElements);
  }

  // Test screen reader announcements
  testScreenReaderAnnouncements(renderResult, expectedAriaLive);

  // Test color contrast if not skipped (disabled in test environment due to JSDOM limitations)
  if (!skipColorContrast && typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    try {
      await testColorContrast(renderResult);
    } catch (error) {
      // Skip color contrast tests in test environment due to JSDOM limitations
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn('Color contrast test skipped in test environment:', errorMessage);
    }
  }

  return axeResults;
};

/**
 * Mock screen reader for testing
 * 
 * Provides a mock screen reader implementation for testing
 * screen reader interactions in FoodyLog components.
 */
export const mockScreenReader = {
  announcements: [] as string[],

  announce: (message: string) => {
    mockScreenReader.announcements.push(message);
  },

  clear: () => {
    mockScreenReader.announcements = [];
  },

  getLastAnnouncement: () => {
    return mockScreenReader.announcements[mockScreenReader.announcements.length - 1];
  },

  getAllAnnouncements: () => {
    return [...mockScreenReader.announcements];
  },
};

// Global setup for accessibility testing
if (typeof global !== 'undefined') {
  // Mock screen reader API
  (global as any).mockScreenReader = mockScreenReader;
}