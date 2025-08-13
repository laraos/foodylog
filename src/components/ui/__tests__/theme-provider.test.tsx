/**
 * Theme Provider Unit Tests
 * 
 * Comprehensive tests for FoodyLog theme provider functionality including
 * theme switching, persistence, system preference detection, and React 19 compatibility.
 * 
 * Requirements fulfilled: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, getEffectiveTheme, themeConfig } from '~/lib/theme';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock matchMedia for system theme detection
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// Test component that uses theme context
function TestThemeComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div data-testid="theme-component">
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Dark
      </button>
      <button onClick={() => setTheme('system')} data-testid="set-system">
        System
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Reset localStorage mock
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    
    // Mock localStorage globally
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Reset document classes
    document.documentElement.className = '';
    
    // Default to light system preference
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  describe('Initialization', () => {
    it('should initialize with default theme when no stored preference', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      expect(document.documentElement).toHaveClass('light');
    });

    it('should initialize with stored theme preference', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      render(
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveClass('dark');
    });

    it('should initialize with system theme when no preference stored', () => {
      mockMatchMedia(true); // Dark system preference

      render(
        <ThemeProvider defaultTheme="system">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      expect(document.documentElement).toHaveClass('dark');
    });
  });

  describe('Theme Switching', () => {
    it('should switch to light theme and persist preference', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="dark" storageKey="test-theme">
          <TestThemeComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('set-light'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      expect(document.documentElement).toHaveClass('light');
      expect(document.documentElement).not.toHaveClass('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-theme', 'light');
    });

    it('should switch to dark theme and persist preference', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <TestThemeComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('set-dark'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveClass('dark');
      expect(document.documentElement).not.toHaveClass('light');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-theme', 'dark');
    });

    it('should switch to system theme and apply system preference', async () => {
      const user = userEvent.setup();
      mockMatchMedia(true); // Dark system preference

      render(
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <TestThemeComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('set-system'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      expect(document.documentElement).toHaveClass('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-theme', 'system');
    });
  });

  describe('System Theme Detection', () => {
    it('should apply light theme when system prefers light', () => {
      mockMatchMedia(false); // Light system preference

      render(
        <ThemeProvider defaultTheme="system">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(document.documentElement).toHaveClass('light');
      expect(document.documentElement).not.toHaveClass('dark');
    });

    it('should apply dark theme when system prefers dark', () => {
      mockMatchMedia(true); // Dark system preference

      render(
        <ThemeProvider defaultTheme="system">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(document.documentElement).toHaveClass('dark');
      expect(document.documentElement).not.toHaveClass('light');
    });

    it('should update theme when system preference changes', async () => {
      let mediaQueryCallback: ((event: MediaQueryListEvent) => void) | null = null;
      
      const mockMediaQuery = {
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event, callback) => {
          if (event === 'change') {
            mediaQueryCallback = callback;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue(mockMediaQuery),
      });

      render(
        <ThemeProvider defaultTheme="system">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(document.documentElement).toHaveClass('light');

      // Simulate system theme change to dark
      if (mediaQueryCallback) {
        mockMediaQuery.matches = true;
        mediaQueryCallback({ matches: true } as MediaQueryListEvent);
      }

      await waitFor(() => {
        expect(document.documentElement).toHaveClass('dark');
      });
    });
  });

  describe('Storage Key Configuration', () => {
    it('should use custom storage key', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light" storageKey="custom-theme-key">
          <TestThemeComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('set-dark'));

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('custom-theme-key', 'dark');
    });

    it('should use default storage key when not specified', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light">
          <TestThemeComponent />
        </ThemeProvider>
      );

      await user.click(screen.getByTestId('set-dark'));

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('foodylog-ui-theme', 'dark');
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      expect(() => {
        render(
          <ThemeProvider defaultTheme="light">
            <TestThemeComponent />
          </ThemeProvider>
        );
      }).not.toThrow();

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    it('should handle setItem errors gracefully', async () => {
      const user = userEvent.setup();
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage quota exceeded');
      });

      render(
        <ThemeProvider defaultTheme="light">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(async () => {
        await user.click(screen.getByTestId('set-dark'));
      }).not.toThrow();

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });

  describe('useTheme Hook', () => {
    it('should return initial state when used outside provider', () => {
      function TestComponent() {
        const { theme, setTheme } = useTheme();
        return (
          <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme('dark')}>Set Dark</button>
          </div>
        );
      }

      render(<TestComponent />);

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
    });

    it('should provide theme context when used inside provider', () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <TestThemeComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });

  describe('getEffectiveTheme Utility', () => {
    it('should return light for light theme', () => {
      expect(getEffectiveTheme('light')).toBe('light');
    });

    it('should return dark for dark theme', () => {
      expect(getEffectiveTheme('dark')).toBe('dark');
    });

    it('should return system preference for system theme', () => {
      mockMatchMedia(false); // Light system preference
      expect(getEffectiveTheme('system')).toBe('light');

      mockMatchMedia(true); // Dark system preference
      expect(getEffectiveTheme('system')).toBe('dark');
    });
  });

  describe('Theme Configuration', () => {
    it('should provide correct color values for light theme', () => {
      expect(themeConfig.light.background).toBe('hsl(30, 43%, 90%)');
      expect(themeConfig.light.text).toBe('hsl(30, 12%, 16%)');
      expect(themeConfig.light.accent).toBe('hsl(139, 29%, 42%)');
    });

    it('should provide correct color values for dark theme', () => {
      expect(themeConfig.dark.background).toBe('hsl(24, 7%, 12%)');
      expect(themeConfig.dark.text).toBe('hsl(30, 43%, 90%)');
      expect(themeConfig.dark.accent).toBe('hsl(139, 29%, 35%)');
    });
  });

  describe('React 19 Compatibility', () => {
    it('should work with React 19 concurrent features', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light">
          <TestThemeComponent />
        </ThemeProvider>
      );

      // Rapid theme switching to test concurrent updates
      await user.click(screen.getByTestId('set-dark'));
      await user.click(screen.getByTestId('set-light'));
      await user.click(screen.getByTestId('set-system'));

      expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    });

    it('should handle multiple theme providers without conflicts', () => {
      render(
        <div>
          <ThemeProvider defaultTheme="light" storageKey="theme1">
            <div data-testid="provider1">
              <TestThemeComponent />
            </div>
          </ThemeProvider>
          <ThemeProvider defaultTheme="dark" storageKey="theme2">
            <div data-testid="provider2">
              <TestThemeComponent />
            </div>
          </ThemeProvider>
        </div>
      );

      const provider1Theme = screen.getAllByTestId('current-theme')[0];
      const provider2Theme = screen.getAllByTestId('current-theme')[1];

      expect(provider1Theme).toHaveTextContent('light');
      expect(provider2Theme).toHaveTextContent('dark');
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', () => {
      const renderSpy = vi.fn();

      function TestComponent() {
        renderSpy();
        const { theme } = useTheme();
        return <div data-testid="theme">{theme}</div>;
      }

      const { rerender } = render(
        <ThemeProvider defaultTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(renderSpy).toHaveBeenCalledTimes(1);

      // Re-render provider with same props
      rerender(
        <ThemeProvider defaultTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      // Should not cause additional renders
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });
});