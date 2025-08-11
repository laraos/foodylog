/**
 * Type definitions for jest-axe
 * 
 * Since @types/jest-axe doesn't exist, we provide our own type definitions
 * for the jest-axe library used in accessibility testing.
 */

declare module 'jest-axe' {
  interface AxeResults {
    violations: Array<{
      id: string;
      impact?: string;
      tags: string[];
      description: string;
      help: string;
      helpUrl: string;
      nodes: Array<{
        any: any[];
        all: any[];
        none: any[];
        impact?: string;
        html: string;
        target: string[];
      }>;
    }>;
    passes: any[];
    incomplete: any[];
    inapplicable: any[];
  }

  interface AxeConfig {
    rules?: Record<string, { enabled: boolean }>;
    tags?: string[];
  }

  export function configureAxe(config?: AxeConfig): (container: Element) => Promise<AxeResults>;
  export function axe(container: Element): Promise<AxeResults>;
}

// Extend Jest matchers for accessibility testing
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}