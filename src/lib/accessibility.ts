/**
 * FoodyLog Accessibility Utilities
 * 
 * Comprehensive accessibility utilities for WCAG 2.1 AA compliance.
 * Provides focus management, ARIA helpers, keyboard navigation,
 * and screen reader support for the FoodyLog design system.
 * 
 * Features:
 * - Focus management with visible indicators
 * - ARIA attribute helpers and validation
 * - Keyboard navigation utilities
 * - Screen reader announcements
 * - Color contrast validation
 * - Touch target size validation
 * - Reduced motion support
 * 
 * Requirements fulfilled: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * WCAG 2.1 AA Standards Constants
 * 
 * Defines minimum requirements for accessibility compliance
 */
export const WCAG_STANDARDS = {
  // Color contrast ratios (WCAG 2.1 AA)
  CONTRAST_RATIOS: {
    NORMAL_TEXT: 4.5, // 4.5:1 for normal text
    LARGE_TEXT: 3.0,  // 3:1 for large text (18pt+ or 14pt+ bold)
    UI_COMPONENTS: 3.0, // 3:1 for UI components and graphics
  },
  
  // Touch target sizes (WCAG 2.1 AA)
  TOUCH_TARGETS: {
    MINIMUM: 44, // 44px minimum for iOS/Android
    RECOMMENDED: 48, // 48dp recommended for Android
    SPACING: 8, // 8px minimum spacing between targets
  },
  
  // Font sizes for large text classification
  LARGE_TEXT: {
    NORMAL: 18, // 18pt or larger
    BOLD: 14,   // 14pt or larger when bold
  },
} as const;

/**
 * Focus Management Hook
 * 
 * Provides comprehensive focus management with visible indicators,
 * focus trapping, and keyboard navigation support.
 * 
 * @param options - Focus management configuration
 * @returns Focus management utilities
 */
export interface FocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  skipLinks?: boolean;
  autoFocus?: boolean;
  focusableSelector?: string;
}

export function useFocusManagement(options: FocusManagementOptions = {}) {
  const {
    trapFocus = false,
    restoreFocus = true,
    skipLinks = true,
    autoFocus = false,
    focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * Get all focusable elements within a container
   * 
   * Returns elements that can receive keyboard focus,
   * excluding disabled and hidden elements.
   */
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const elements = container.querySelectorAll(focusableSelector) as NodeListOf<HTMLElement>;
    return Array.from(elements).filter(element => {
      return (
        !element.hasAttribute('disabled') &&
        !element.getAttribute('aria-hidden') &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        window.getComputedStyle(element).visibility !== 'hidden'
      );
    });
  }, [focusableSelector]);

  /**
   * Focus the first focusable element in container
   * 
   * Useful for modal dialogs and form sections.
   * Announces focus change to screen readers.
   */
  const focusFirst = useCallback(() => {
    if (!containerRef.current) return;
    
    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      announceToScreenReader(`Focused on ${focusableElements[0].getAttribute('aria-label') || focusableElements[0].textContent || 'element'}`);
    }
  }, [getFocusableElements]);

  /**
   * Focus the last focusable element in container
   * 
   * Used for reverse tab navigation in focus traps.
   */
  const focusLast = useCallback(() => {
    if (!containerRef.current) return;
    
    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length > 0) {
      const lastElement = focusableElements[focusableElements.length - 1];
      lastElement.focus();
      announceToScreenReader(`Focused on ${lastElement.getAttribute('aria-label') || lastElement.textContent || 'element'}`);
    }
  }, [getFocusableElements]);

  /**
   * Handle keyboard navigation within focus trap
   * 
   * Implements Tab and Shift+Tab cycling within container.
   * Supports Escape key to close modals.
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current || !trapFocus) return;

    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    switch (event.key) {
      case 'Tab':
        if (event.shiftKey) {
          // Shift + Tab: move to previous element
          if (activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: move to next element
          if (activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
        break;
        
      case 'Escape':
        // Allow parent components to handle escape
        event.stopPropagation();
        break;
        
      case 'Home':
        event.preventDefault();
        firstElement.focus();
        break;
        
      case 'End':
        event.preventDefault();
        lastElement.focus();
        break;
    }
  }, [trapFocus, getFocusableElements]);

  /**
   * Setup focus management on mount
   * 
   * Stores previous focus, sets up event listeners,
   * and optionally auto-focuses first element.
   */
  useEffect(() => {
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    if (autoFocus && containerRef.current) {
      // Delay auto-focus to ensure DOM is ready
      const timer = setTimeout(() => {
        focusFirst();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, focusFirst, restoreFocus]);

  /**
   * Setup keyboard event listeners
   */
  useEffect(() => {
    if (trapFocus && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('keydown', handleKeyDown);
      
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [trapFocus, handleKeyDown]);

  /**
   * Restore focus on unmount
   */
  useEffect(() => {
    return () => {
      if (restoreFocus && previousFocusRef.current) {
        // Delay focus restoration to avoid conflicts
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, 0);
      }
    };
  }, [restoreFocus]);

  return {
    containerRef,
    focusFirst,
    focusLast,
    getFocusableElements,
  };
}

/**
 * Screen Reader Announcements
 * 
 * Provides live region announcements for dynamic content changes.
 * Uses ARIA live regions to communicate with assistive technologies.
 */
let announceElement: HTMLElement | null = null;

/**
 * Initialize screen reader announcement system
 * 
 * Creates a live region element for screen reader announcements.
 * Should be called once during app initialization.
 */
export function initializeScreenReaderAnnouncements(): void {
  if (announceElement || typeof document === 'undefined') return;

  announceElement = document.createElement('div');
  announceElement.setAttribute('aria-live', 'polite');
  announceElement.setAttribute('aria-atomic', 'true');
  announceElement.setAttribute('aria-relevant', 'additions text');
  announceElement.className = 'sr-only';
  announceElement.style.cssText = `
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `;
  
  document.body.appendChild(announceElement);
}

/**
 * Announce message to screen readers
 * 
 * Sends a message to screen readers via ARIA live region.
 * Automatically handles message clearing and timing.
 * 
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (!announceElement) {
    initializeScreenReaderAnnouncements();
  }
  
  if (!announceElement || !message.trim()) return;

  // Update live region priority
  announceElement.setAttribute('aria-live', priority);
  
  // Clear previous message
  announceElement.textContent = '';
  
  // Add new message with slight delay to ensure screen readers pick it up
  setTimeout(() => {
    if (announceElement) {
      announceElement.textContent = message;
    }
  }, 100);
  
  // Clear message after announcement
  setTimeout(() => {
    if (announceElement) {
      announceElement.textContent = '';
    }
  }, 1000);
}

/**
 * ARIA Attribute Helpers
 * 
 * Utilities for managing ARIA attributes and relationships.
 */

/**
 * Generate unique ID for ARIA relationships
 * 
 * Creates unique IDs for aria-labelledby, aria-describedby, etc.
 * Ensures IDs are unique across the application.
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create ARIA label attributes
 * 
 * Generates appropriate ARIA labeling attributes based on content.
 * Prioritizes aria-labelledby over aria-label for better i18n support.
 * 
 * @param label - Label text or element ID
 * @param description - Optional description text or element ID
 * @returns ARIA attributes object
 */
export function createAriaLabel(
  label?: string | null,
  description?: string | null
): Record<string, string> {
  const attributes: Record<string, string> = {};
  
  if (label) {
    // If label looks like an ID (starts with #), use aria-labelledby
    if (label.startsWith('#')) {
      attributes['aria-labelledby'] = label.substring(1);
    } else {
      attributes['aria-label'] = label;
    }
  }
  
  if (description) {
    // If description looks like an ID (starts with #), use aria-describedby
    if (description.startsWith('#')) {
      attributes['aria-describedby'] = description.substring(1);
    } else {
      // Create a description element ID
      const descId = generateAriaId('desc');
      attributes['aria-describedby'] = descId;
      // Note: Caller should create element with this ID
    }
  }
  
  return attributes;
}

/**
 * Keyboard Navigation Utilities
 * 
 * Helpers for implementing keyboard navigation patterns.
 */

/**
 * Arrow key navigation handler
 * 
 * Implements arrow key navigation for lists, grids, and menus.
 * Supports both horizontal and vertical navigation.
 * 
 * @param event - Keyboard event
 * @param elements - Array of focusable elements
 * @param currentIndex - Current focused element index
 * @param options - Navigation options
 * @returns New focused element index
 */
export interface ArrowNavigationOptions {
  horizontal?: boolean;
  vertical?: boolean;
  wrap?: boolean;
  grid?: { columns: number };
}

export function handleArrowNavigation(
  event: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number,
  options: ArrowNavigationOptions = {}
): number {
  const { horizontal = true, vertical = true, wrap = true, grid } = options;
  
  if (elements.length === 0) return currentIndex;
  
  let newIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowLeft':
      if (horizontal) {
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : (wrap ? elements.length - 1 : 0);
      }
      break;
      
    case 'ArrowRight':
      if (horizontal) {
        event.preventDefault();
        newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (wrap ? 0 : elements.length - 1);
      }
      break;
      
    case 'ArrowUp':
      if (vertical) {
        event.preventDefault();
        if (grid) {
          const row = Math.floor(currentIndex / grid.columns);
          const col = currentIndex % grid.columns;
          const newRow = row > 0 ? row - 1 : (wrap ? Math.floor((elements.length - 1) / grid.columns) : 0);
          newIndex = Math.min(newRow * grid.columns + col, elements.length - 1);
        } else {
          newIndex = currentIndex > 0 ? currentIndex - 1 : (wrap ? elements.length - 1 : 0);
        }
      }
      break;
      
    case 'ArrowDown':
      if (vertical) {
        event.preventDefault();
        if (grid) {
          const row = Math.floor(currentIndex / grid.columns);
          const col = currentIndex % grid.columns;
          const maxRow = Math.floor((elements.length - 1) / grid.columns);
          const newRow = row < maxRow ? row + 1 : (wrap ? 0 : maxRow);
          newIndex = Math.min(newRow * grid.columns + col, elements.length - 1);
        } else {
          newIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (wrap ? 0 : elements.length - 1);
        }
      }
      break;
      
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
      
    case 'End':
      event.preventDefault();
      newIndex = elements.length - 1;
      break;
  }
  
  if (newIndex !== currentIndex && elements[newIndex]) {
    elements[newIndex].focus();
    announceToScreenReader(`Item ${newIndex + 1} of ${elements.length}`);
  }
  
  return newIndex;
}

/**
 * Color Contrast Validation
 * 
 * Utilities for validating color contrast ratios against WCAG standards.
 */

/**
 * Calculate relative luminance of a color
 * 
 * Implements WCAG formula for relative luminance calculation.
 * Used for contrast ratio calculations.
 * 
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)  
 * @param b - Blue component (0-255)
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * 
 * Implements WCAG contrast ratio formula.
 * Returns ratio from 1:1 (no contrast) to 21:1 (maximum contrast).
 * 
 * @param color1 - First color in hex format (#RRGGBB)
 * @param color2 - Second color in hex format (#RRGGBB)
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  // Parse hex colors
  const parseHex = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const rgb1 = parseHex(color1);
  const rgb2 = parseHex(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validate color contrast against WCAG standards
 * 
 * Checks if color combination meets WCAG 2.1 AA requirements.
 * 
 * @param foreground - Foreground color in hex format
 * @param background - Background color in hex format
 * @param isLargeText - Whether text is considered large (18pt+ or 14pt+ bold)
 * @returns Validation result with pass/fail and ratio
 */
export interface ContrastValidationResult {
  ratio: number;
  passes: boolean;
  level: 'AA' | 'AAA' | 'fail';
  requiredRatio: number;
}

export function validateColorContrast(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): ContrastValidationResult {
  const ratio = calculateContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? WCAG_STANDARDS.CONTRAST_RATIOS.LARGE_TEXT : WCAG_STANDARDS.CONTRAST_RATIOS.NORMAL_TEXT;
  
  const passes = ratio >= requiredRatio;
  const passesAAA = ratio >= (isLargeText ? 4.5 : 7);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passes,
    level: passesAAA ? 'AAA' : (passes ? 'AA' : 'fail'),
    requiredRatio,
  };
}

/**
 * Reduced Motion Support
 * 
 * Utilities for respecting user's motion preferences.
 */

/**
 * Check if user prefers reduced motion
 * 
 * Respects the prefers-reduced-motion media query.
 * Used to disable animations for users with vestibular disorders.
 * 
 * @returns True if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preferences
 * 
 * Returns 0 duration if user prefers reduced motion,
 * otherwise returns the specified duration.
 * 
 * @param duration - Desired animation duration in ms
 * @returns Actual duration to use (0 if reduced motion preferred)
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Touch Target Validation
 * 
 * Utilities for validating touch target sizes and spacing.
 */

/**
 * Validate touch target size
 * 
 * Checks if element meets minimum touch target requirements.
 * Considers both width and height for accessibility compliance.
 * 
 * @param element - Element to validate
 * @returns Validation result with dimensions and compliance
 */
export interface TouchTargetValidationResult {
  width: number;
  height: number;
  passes: boolean;
  meetsMinimum: boolean;
  meetsRecommended: boolean;
}

export function validateTouchTarget(element: HTMLElement): TouchTargetValidationResult {
  const rect = element.getBoundingClientRect();
  const { width, height } = rect;
  
  const meetsMinimum = width >= WCAG_STANDARDS.TOUCH_TARGETS.MINIMUM && 
                      height >= WCAG_STANDARDS.TOUCH_TARGETS.MINIMUM;
  const meetsRecommended = width >= WCAG_STANDARDS.TOUCH_TARGETS.RECOMMENDED && 
                          height >= WCAG_STANDARDS.TOUCH_TARGETS.RECOMMENDED;
  
  return {
    width: Math.round(width),
    height: Math.round(height),
    passes: meetsMinimum,
    meetsMinimum,
    meetsRecommended,
  };
}

/**
 * Accessibility Testing Utilities
 * 
 * Helpers for automated accessibility testing with axe-core.
 */

/**
 * Run accessibility audit on element
 * 
 * Uses axe-core to perform comprehensive accessibility testing.
 * Returns detailed results for violations and recommendations.
 * 
 * @param element - Element to test (defaults to document)
 * @param options - Axe-core options
 * @returns Promise with accessibility results
 */
export async function runAccessibilityAudit(
  element: Element | Document = document,
  options: any = {}
): Promise<any> {
  // Dynamic import to avoid bundling axe-core in production
  try {
    const axe = await import('axe-core');
    
    const defaultOptions = {
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      ...options,
    };
    
    return await axe.run(element, defaultOptions);
  } catch (error) {
    console.warn('axe-core not available for accessibility testing:', error);
    return null;
  }
}

/**
 * Export all accessibility utilities
 */
export default {
  WCAG_STANDARDS,
  useFocusManagement,
  initializeScreenReaderAnnouncements,
  announceToScreenReader,
  generateAriaId,
  createAriaLabel,
  handleArrowNavigation,
  calculateContrastRatio,
  validateColorContrast,
  prefersReducedMotion,
  getAnimationDuration,
  validateTouchTarget,
  runAccessibilityAudit,
};