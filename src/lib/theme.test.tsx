/**
 * Tests for FoodyLog Theme Management
 * 
 * Tests for theme provider, theme switching functionality,
 * and theme-related utilities used throughout FoodyLog.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, getEffectiveTheme } from './theme';

// Test component that uses the theme hook
function TestComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
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

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock matchMedia
const mockMatchMedia = vi.fn();

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });
    
    // Mock document.documentElement
    const mockDocumentElement = {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    };
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
    });
    
    // Default matchMedia implementation
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default theme when no stored theme exists', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
  });

  it('loads stored theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('uses custom default theme', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('applies light theme class to document', () => {
    mockLocalStorage.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
  });

  it('applies dark theme class to document', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('applies system theme based on media query', () => {
    mockLocalStorage.getItem.mockReturnValue('system');
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('applies light theme when system preference is light', () => {
    mockLocalStorage.getItem.mockReturnValue('system');
    mockMatchMedia.mockImplementation((query) => ({
      matches: false, // System prefers light
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
  });

  it('updates theme and saves to localStorage', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    await user.click(screen.getByTestId('set-dark'));
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('foodylog-ui-theme', 'dark');
  });

  it('uses custom storage key', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider storageKey="custom-theme-key">
        <TestComponent />
      </ThemeProvider>,
    );
    
    await user.click(screen.getByTestId('set-dark'));
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('custom-theme-key', 'dark');
  });

  it('updates document classes when theme changes', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    // Clear previous calls
    vi.clearAllMocks();
    
    await user.click(screen.getByTestId('set-dark'));
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });
});

describe('useTheme hook', () => {
  it('returns initial state when used outside ThemeProvider', () => {
    // The hook should return the initial state when context is undefined
    // This tests the fallback behavior rather than throwing an error
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <button onClick={() => setTheme('dark')} data-testid="set-theme">
            Set Dark
          </button>
        </div>
      );
    };

    render(<TestComponent />);
    
    // Should show the initial theme value
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
  });

  it('provides theme context correctly', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });
});

describe('getEffectiveTheme', () => {
  beforeEach(() => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });
  });

  it('returns light theme directly', () => {
    expect(getEffectiveTheme('light')).toBe('light');
  });

  it('returns dark theme directly', () => {
    expect(getEffectiveTheme('dark')).toBe('dark');
  });

  it('resolves system theme to dark when system prefers dark', () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    expect(getEffectiveTheme('system')).toBe('dark');
  });

  it('resolves system theme to light when system prefers light', () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: false, // System prefers light
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    expect(getEffectiveTheme('system')).toBe('light');
  });
});

describe('Theme integration', () => {
  it('handles theme switching flow correctly', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue('system');
    
    // Mock system preference as light
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    
    // Should start with system theme
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
    
    // Switch to dark
    await user.click(screen.getByTestId('set-dark'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('foodylog-ui-theme', 'dark');
    
    // Switch to light
    await user.click(screen.getByTestId('set-light'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('foodylog-ui-theme', 'light');
    
    // Switch back to system
    await user.click(screen.getByTestId('set-system'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('foodylog-ui-theme', 'system');
  });
});