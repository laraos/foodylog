/**
 * Vitest Test Setup
 * 
 * Global test configuration and setup for FoodyLog tests.
 * Includes mocks for browser APIs, external dependencies, and test utilities.
 * This file is automatically loaded before each test file.
 */

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupMocks, resetMocks } from './mocks';

// Setup jest-axe matchers
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// Setup all mocks before tests run
setupMocks();

// Cleanup after each test case
afterEach(() => {
  cleanup();
  resetMocks();
});

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_APP_VERSION: '1.0.0',
    VITE_ENVIRONMENT: 'test',
    VITE_CONVEX_URL: 'https://test.convex.cloud',
    VITE_CLERK_PUBLISHABLE_KEY: 'pk_test_123',
  },
}));

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: vi.fn(() => Promise.resolve()),
    ready: Promise.resolve({
      unregister: vi.fn(() => Promise.resolve(true)),
    }),
  },
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('sessionStorage', sessionStorageMock);

// Mock fetch
globalThis.fetch = vi.fn();

// Mock console methods in tests to reduce noise
globalThis.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};