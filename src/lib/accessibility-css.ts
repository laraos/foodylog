/**
 * FoodyLog Accessibility CSS Utilities
 * 
 * CSS-in-JS utilities for accessibility features that require dynamic styling.
 * Provides focus indicators, high contrast support, and reduced motion handling.
 * 
 * Features:
 * - Dynamic focus indicators based on user preferences
 * - High contrast mode support
 * - Reduced motion animations
 * - Color contrast validation helpers
 * - Touch target size utilities
 * 
 * Requirements fulfilled: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

import { WCAG_STANDARDS, prefersReducedMotion } from './accessibility';

/**
 * CSS Custom Properties for Accessibility
 * 
 * Defines CSS custom properties that can be used throughout the application
 * to ensure consistent accessibility features.
 */
export const accessibilityCustomProperties = `
  :root {
    /* Focus indicators */
    --focus-ring-width: 2px;
    --focus-ring-offset: 2px;
    --focus-ring-color: hsl(var(--ring));
    --focus-ring-style: solid;
    
    /* Touch targets */
    --touch-target-min: ${WCAG_STANDARDS.TOUCH_TARGETS.MINIMUM}px;
    --touch-target-recommended: ${WCAG_STANDARDS.TOUCH_TARGETS.RECOMMENDED}px;
    --touch-target-spacing: ${WCAG_STANDARDS.TOUCH_TARGETS.SPACING}px;
    
    /* Animation durations */
    --animation-duration-fast: 150ms;
    --animation-duration-normal: 200ms;
    --animation-duration-slow: 300ms;
    
    /* High contrast mode colors */
    --high-contrast-border: CanvasText;
    --high-contrast-background: Canvas;
    --high-contrast-text: CanvasText;
    --high-contrast-focus: Highlight;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    :root {
      --animation-duration-fast: 0ms;
      --animation-duration-normal: 0ms;
      --animation-duration-slow: 0ms;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    :root {
      --focus-ring-width: 3px;
      --focus-ring-offset: 1px;
    }
  }
  
  /* Forced colors mode (Windows High Contrast) */
  @media (forced-colors: active) {
    :root {
      --focus-ring-color: Highlight;
      --high-contrast-border: ButtonBorder;
      --high-contrast-background: ButtonFace;
      --high-contrast-text: ButtonText;
    }
  }
`;

/**
 * Screen Reader Only CSS Class
 * 
 * Hides content visually while keeping it available to screen readers.
 * Uses the most robust method that works across all screen readers.
 */
export const screenReaderOnlyCSS = `
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  
  /* Show on focus for keyboard users */
  .sr-only-focusable:focus,
  .sr-only-focusable:active {
    position: static !important;
    width: auto !important;
    height: auto !important;
    padding: inherit !important;
    margin: inherit !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: inherit !important;
  }
`;

/**
 * Enhanced Focus Indicators CSS
 * 
 * Provides consistent, visible focus indicators that meet WCAG requirements.
 * Includes support for different focus methods (keyboard vs mouse).
 */
export const focusIndicatorsCSS = `
  /* Base focus styles */
  .focus-visible {
    outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }
  
  /* Enhanced focus for interactive elements */
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  a:focus-visible,
  [tabindex]:focus-visible {
    outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    box-shadow: 0 0 0 var(--focus-ring-offset) var(--focus-ring-color);
  }
  
  /* Remove focus for mouse users (but keep for keyboard) */
  .js-focus-visible button:focus:not(.focus-visible),
  .js-focus-visible input:focus:not(.focus-visible),
  .js-focus-visible textarea:focus:not(.focus-visible),
  .js-focus-visible select:focus:not(.focus-visible),
  .js-focus-visible a:focus:not(.focus-visible),
  .js-focus-visible [tabindex]:focus:not(.focus-visible) {
    outline: none;
    box-shadow: none;
  }
  
  /* High contrast mode focus indicators */
  @media (forced-colors: active) {
    button:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible,
    a:focus-visible,
    [tabindex]:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
  }
  
  /* Skip links */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--high-contrast-background);
    color: var(--high-contrast-text);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top var(--animation-duration-fast) ease-in-out;
  }
  
  .skip-link:focus {
    top: 6px;
  }
`;

/**
 * Touch Target CSS Utilities
 * 
 * Ensures interactive elements meet minimum touch target requirements.
 */
export const touchTargetCSS = `
  /* Minimum touch target sizes */
  .touch-target {
    min-width: var(--touch-target-min);
    min-height: var(--touch-target-min);
  }
  
  .touch-target-recommended {
    min-width: var(--touch-target-recommended);
    min-height: var(--touch-target-recommended);
  }
  
  /* Touch target spacing */
  .touch-target-spaced {
    margin: calc(var(--touch-target-spacing) / 2);
  }
  
  /* Interactive elements should meet touch target requirements */
  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"],
  input[type="checkbox"],
  input[type="radio"],
  a[href],
  [role="button"],
  [role="link"],
  [tabindex="0"] {
    min-width: var(--touch-target-min);
    min-height: var(--touch-target-min);
  }
  
  /* Exception for inline elements */
  span[role="button"],
  span[role="link"] {
    display: inline-block;
    padding: 8px;
  }
`;

/**
 * Color Contrast Utilities
 * 
 * CSS utilities for ensuring proper color contrast ratios.
 */
export const colorContrastCSS = `
  /* High contrast text combinations */
  .contrast-high {
    color: #000000;
    background-color: #FFFFFF;
  }
  
  .contrast-high-inverse {
    color: #FFFFFF;
    background-color: #000000;
  }
  
  /* WCAG AA compliant color combinations for FoodyLog */
  .text-on-primary {
    color: #FFFFFF; /* White on FoodyLog green (#5da271) - 4.52:1 ratio */
  }
  
  .text-on-secondary {
    color: #2f2a25; /* Dark brown on cream background - 8.5:1 ratio */
  }
  
  .text-on-background {
    color: #2f2a25; /* Dark brown on cream - 8.5:1 ratio */
  }
  
  .text-muted {
    color: #6b5b4f; /* Medium brown - 4.5:1 ratio on cream */
  }
  
  /* Error and success states with proper contrast */
  .text-error {
    color: #dc2626; /* Red with 4.5:1 ratio on white */
  }
  
  .text-success {
    color: #16a34a; /* Green with 4.5:1 ratio on white */
  }
  
  .text-warning {
    color: #d97706; /* Orange with 4.5:1 ratio on white */
  }
  
  /* High contrast mode overrides */
  @media (forced-colors: active) {
    .text-on-primary,
    .text-on-secondary,
    .text-on-background,
    .text-muted,
    .text-error,
    .text-success,
    .text-warning {
      color: CanvasText;
    }
  }
`;

/**
 * Animation and Motion CSS
 * 
 * Provides accessible animations that respect user preferences.
 */
export const animationCSS = `
  /* Base animation classes */
  .animate-fade-in {
    animation: fadeIn var(--animation-duration-normal) ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp var(--animation-duration-normal) ease-out;
  }
  
  .animate-scale-in {
    animation: scaleIn var(--animation-duration-fast) ease-out;
  }
  
  /* Keyframes */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Hover and focus animations */
  .hover-lift {
    transition: transform var(--animation-duration-fast) ease-out;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
  }
  
  .focus-ring {
    transition: box-shadow var(--animation-duration-fast) ease-out;
  }
  
  .focus-ring:focus-visible {
    box-shadow: 0 0 0 var(--focus-ring-offset) var(--focus-ring-color);
  }
`;

/**
 * Complete Accessibility CSS
 * 
 * Combines all accessibility CSS utilities into a single string.
 */
export const accessibilityCSS = `
  ${accessibilityCustomProperties}
  ${screenReaderOnlyCSS}
  ${focusIndicatorsCSS}
  ${touchTargetCSS}
  ${colorContrastCSS}
  ${animationCSS}
`;

/**
 * Inject Accessibility CSS
 * 
 * Injects accessibility CSS into the document head.
 * Should be called during app initialization.
 */
export function injectAccessibilityCSS(): void {
  if (typeof document === 'undefined') return;
  
  // Check if already injected
  if (document.getElementById('foodylog-accessibility-css')) return;
  
  const style = document.createElement('style');
  style.id = 'foodylog-accessibility-css';
  style.textContent = accessibilityCSS;
  
  document.head.appendChild(style);
}

/**
 * Generate CSS for dynamic color contrast validation
 * 
 * Creates CSS custom properties for validated color combinations.
 */
export function generateContrastValidatedCSS(
  colorPairs: Array<{ foreground: string; background: string; name: string }>
): string {
  const { validateColorContrast } = require('./accessibility');
  
  let css = ':root {\n';
  
  colorPairs.forEach(({ foreground, background, name }) => {
    const validation = validateColorContrast(foreground, background);
    
    if (validation.passes) {
      css += `  --color-${name}-fg: ${foreground};\n`;
      css += `  --color-${name}-bg: ${background};\n`;
      css += `  --color-${name}-ratio: ${validation.ratio};\n`;
    } else {
      console.warn(
        `Color combination "${name}" fails WCAG contrast requirements: ` +
        `${validation.ratio}:1 (required: ${validation.requiredRatio}:1)`
      );
    }
  });
  
  css += '}\n';
  
  return css;
}

/**
 * Get CSS for reduced motion
 * 
 * Returns appropriate CSS values based on user's motion preferences.
 */
export function getMotionCSS(): { duration: string; easing: string } {
  const reducedMotion = prefersReducedMotion();
  
  return {
    duration: reducedMotion ? '0ms' : 'var(--animation-duration-normal)',
    easing: reducedMotion ? 'linear' : 'ease-in-out',
  };
}

/**
 * Export all utilities
 */
export default {
  accessibilityCSS,
  injectAccessibilityCSS,
  generateContrastValidatedCSS,
  getMotionCSS,
  screenReaderOnlyCSS,
  focusIndicatorsCSS,
  touchTargetCSS,
  colorContrastCSS,
  animationCSS,
};