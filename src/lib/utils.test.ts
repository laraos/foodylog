/**
 * Tests for FoodyLog Utility Functions
 * 
 * Comprehensive tests for core utility functions used throughout
 * the FoodyLog application. Tests cover edge cases, error conditions,
 * and expected behavior for all utility functions.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  getRatingColor,
  formatTimeAgo,
  formatPrice,
  truncateText,
  isValidUrl,
  generateTempId,
  debounce,
  isMobile,
  getDefaultMealType,
} from './utils';

describe('cn (className utility)', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('', null, undefined)).toBe('');
  });

  it('handles arrays and objects', () => {
    expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3');
  });
});

describe('getRatingColor', () => {
  it('returns correct color for excellent ratings (9-10)', () => {
    expect(getRatingColor(10)).toBe('text-rating-excellent');
    expect(getRatingColor(9)).toBe('text-rating-excellent');
  });

  it('returns correct color for great ratings (7-8)', () => {
    expect(getRatingColor(8)).toBe('text-rating-great');
    expect(getRatingColor(7)).toBe('text-rating-great');
  });

  it('returns correct color for good ratings (5-6)', () => {
    expect(getRatingColor(6)).toBe('text-rating-good');
    expect(getRatingColor(5)).toBe('text-rating-good');
  });

  it('returns correct color for poor ratings (3-4)', () => {
    expect(getRatingColor(4)).toBe('text-rating-poor');
    expect(getRatingColor(3)).toBe('text-rating-poor');
  });

  it('returns correct color for bad ratings (1-2)', () => {
    expect(getRatingColor(2)).toBe('text-rating-bad');
    expect(getRatingColor(1)).toBe('text-rating-bad');
  });

  it('handles edge cases', () => {
    expect(getRatingColor(0)).toBe('text-rating-bad');
    expect(getRatingColor(11)).toBe('text-rating-excellent');
    expect(getRatingColor(-1)).toBe('text-rating-bad');
  });
});

describe('formatTimeAgo', () => {
  const now = 1640995200000; // January 1, 2022, 00:00:00 UTC
  
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(now);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formats "Just now" for recent timestamps', () => {
    expect(formatTimeAgo(now)).toBe('Just now');
    expect(formatTimeAgo(now - 30000)).toBe('Just now'); // 30 seconds ago
  });

  it('formats minutes correctly', () => {
    expect(formatTimeAgo(now - 60000)).toBe('1 minute ago'); // 1 minute
    expect(formatTimeAgo(now - 120000)).toBe('2 minutes ago'); // 2 minutes
    expect(formatTimeAgo(now - 1800000)).toBe('30 minutes ago'); // 30 minutes
  });

  it('formats hours correctly', () => {
    expect(formatTimeAgo(now - 3600000)).toBe('1 hour ago'); // 1 hour
    expect(formatTimeAgo(now - 7200000)).toBe('2 hours ago'); // 2 hours
    expect(formatTimeAgo(now - 21600000)).toBe('6 hours ago'); // 6 hours
  });

  it('formats days correctly', () => {
    expect(formatTimeAgo(now - 86400000)).toBe('1 day ago'); // 1 day
    expect(formatTimeAgo(now - 172800000)).toBe('2 days ago'); // 2 days
    expect(formatTimeAgo(now - 518400000)).toBe('6 days ago'); // 6 days
  });

  it('formats weeks correctly', () => {
    expect(formatTimeAgo(now - 604800000)).toBe('1 week ago'); // 1 week
    expect(formatTimeAgo(now - 1209600000)).toBe('2 weeks ago'); // 2 weeks
    expect(formatTimeAgo(now - 2419200000)).toBe('4 weeks ago'); // 4 weeks
  });

  it('formats months correctly', () => {
    expect(formatTimeAgo(now - 2592000000)).toBe('1 month ago'); // 30 days
    expect(formatTimeAgo(now - 5184000000)).toBe('2 months ago'); // 60 days
    expect(formatTimeAgo(now - 15552000000)).toBe('6 months ago'); // 180 days
  });

  it('handles future timestamps', () => {
    expect(formatTimeAgo(now + 3600000)).toBe('Just now');
  });
});

describe('formatPrice', () => {
  it('formats USD prices correctly', () => {
    expect(formatPrice(12.99)).toBe('$12.99');
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('formats different currencies', () => {
    expect(formatPrice(12.99, 'EUR')).toBe('€12.99');
    expect(formatPrice(12.99, 'GBP')).toBe('£12.99');
    expect(formatPrice(12.99, 'JPY')).toBe('¥12.99');
  });

  it('handles decimal places correctly', () => {
    expect(formatPrice(12.5)).toBe('$12.50');
    expect(formatPrice(12.999)).toBe('$13.00');
    expect(formatPrice(12.001)).toBe('$12.00');
  });

  it('handles large numbers', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89');
  });

  it('handles negative numbers', () => {
    expect(formatPrice(-12.99)).toBe('-$12.99');
  });
});

describe('truncateText', () => {
  it('truncates text longer than maxLength', () => {
    expect(truncateText('This is a long text', 10)).toBe('This is a...');
    expect(truncateText('Hello world', 5)).toBe('Hello...');
  });

  it('returns original text if shorter than maxLength', () => {
    expect(truncateText('Short', 10)).toBe('Short');
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('handles exact length', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });

  it('trims whitespace before adding ellipsis', () => {
    expect(truncateText('Hello world ', 7)).toBe('Hello w...');
  });

  it('handles zero maxLength', () => {
    expect(truncateText('Hello', 0)).toBe('...');
  });
});

describe('isValidUrl', () => {
  it('validates correct URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
    expect(isValidUrl('ftp://example.com')).toBe(true);
  });

  it('rejects invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('example.com')).toBe(false);
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('http://')).toBe(false);
    expect(isValidUrl('://example.com')).toBe(false);
  });

  it('handles edge cases', () => {
    expect(isValidUrl('javascript:alert("xss")')).toBe(true); // Valid URL, but dangerous
    expect(isValidUrl('data:text/plain;base64,SGVsbG8=')).toBe(true);
    expect(isValidUrl('mailto:test@example.com')).toBe(true);
  });
});

describe('generateTempId', () => {
  it('generates unique IDs', () => {
    const id1 = generateTempId();
    const id2 = generateTempId();
    
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^temp_\d+_[a-z0-9]+$/);
    expect(id2).toMatch(/^temp_\d+_[a-z0-9]+$/);
  });

  it('includes timestamp in ID', () => {
    const mockTime = 1640995200000;
    vi.spyOn(Date, 'now').mockReturnValue(mockTime);
    
    const id = generateTempId();
    expect(id).toContain(`temp_${mockTime}_`);
    
    vi.restoreAllMocks();
  });

  it('generates IDs with correct format', () => {
    const id = generateTempId();
    const parts = id.split('_');
    
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe('temp');
    expect(parts[1]).toMatch(/^\d+$/); // timestamp
    expect(parts[2]).toMatch(/^[a-z0-9]+$/); // random string
    expect(parts[2]).toHaveLength(9); // random part length
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('cancels previous calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');
    
    vi.advanceTimersByTime(100);
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('third');
  });

  it('handles multiple arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn('arg1', 'arg2', 'arg3');
    vi.advanceTimersByTime(100);
    
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('preserves function context', () => {
    const obj = {
      value: 'test',
      method: vi.fn(function(this: any) {
        return this.value;
      }),
    };
    
    const debouncedMethod = debounce(obj.method.bind(obj), 100);
    debouncedMethod();
    vi.advanceTimersByTime(100);
    
    expect(obj.method).toHaveBeenCalled();
  });
});

describe('isMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('returns true for mobile widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });
    expect(isMobile()).toBe(true);
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    expect(isMobile()).toBe(true);
  });

  it('returns false for desktop widths', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    expect(isMobile()).toBe(false);
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    expect(isMobile()).toBe(false);
  });

  it('handles edge case at breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    expect(isMobile()).toBe(false); // 768 is desktop
  });
});

describe('getDefaultMealType', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns breakfast for morning hours (5-10)', () => {
    vi.useFakeTimers();
    
    // Test 7 AM
    vi.setSystemTime(new Date('2024-01-01T07:00:00'));
    expect(getDefaultMealType()).toBe('breakfast');
    
    // Test 10 AM
    vi.setSystemTime(new Date('2024-01-01T10:00:00'));
    expect(getDefaultMealType()).toBe('breakfast');
    
    // Test 5 AM (edge case)
    vi.setSystemTime(new Date('2024-01-01T05:00:00'));
    expect(getDefaultMealType()).toBe('breakfast');
  });

  it('returns lunch for midday hours (11-15)', () => {
    vi.useFakeTimers();
    
    // Test 12 PM
    vi.setSystemTime(new Date('2024-01-01T12:00:00'));
    expect(getDefaultMealType()).toBe('lunch');
    
    // Test 3 PM
    vi.setSystemTime(new Date('2024-01-01T15:00:00'));
    expect(getDefaultMealType()).toBe('lunch');
    
    // Test 11 AM (edge case)
    vi.setSystemTime(new Date('2024-01-01T11:00:00'));
    expect(getDefaultMealType()).toBe('lunch');
  });

  it('returns dinner for evening hours (16-21)', () => {
    vi.useFakeTimers();
    
    // Test 6 PM
    vi.setSystemTime(new Date('2024-01-01T18:00:00'));
    expect(getDefaultMealType()).toBe('dinner');
    
    // Test 9 PM
    vi.setSystemTime(new Date('2024-01-01T21:00:00'));
    expect(getDefaultMealType()).toBe('dinner');
    
    // Test 4 PM (edge case)
    vi.setSystemTime(new Date('2024-01-01T16:00:00'));
    expect(getDefaultMealType()).toBe('dinner');
  });

  it('returns snack for late night/early morning hours', () => {
    vi.useFakeTimers();
    
    // Test midnight
    vi.setSystemTime(new Date('2024-01-01T00:00:00'));
    expect(getDefaultMealType()).toBe('snack');
    
    // Test 3 AM
    vi.setSystemTime(new Date('2024-01-01T03:00:00'));
    expect(getDefaultMealType()).toBe('snack');
    
    // Test 10 PM
    vi.setSystemTime(new Date('2024-01-01T22:00:00'));
    expect(getDefaultMealType()).toBe('snack');
    
    // Test 4 AM
    vi.setSystemTime(new Date('2024-01-01T04:00:00'));
    expect(getDefaultMealType()).toBe('snack');
  });

  it('handles edge cases at boundaries', () => {
    vi.useFakeTimers();
    
    // Test exact boundary times
    vi.setSystemTime(new Date('2024-01-01T11:00:00')); // 11 AM -> lunch
    expect(getDefaultMealType()).toBe('lunch');
    
    vi.setSystemTime(new Date('2024-01-01T16:00:00')); // 4 PM -> dinner
    expect(getDefaultMealType()).toBe('dinner');
    
    vi.setSystemTime(new Date('2024-01-01T22:00:00')); // 10 PM -> snack
    expect(getDefaultMealType()).toBe('snack');
  });
});