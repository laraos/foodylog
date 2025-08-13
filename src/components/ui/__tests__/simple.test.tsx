/**
 * Simple test to verify test environment setup
 */

import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have document available', () => {
    expect(document).toBeDefined();
    expect(document.body).toBeDefined();
  });
});