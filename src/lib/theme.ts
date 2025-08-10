/**
 * FoodyLog Theme Management
 * 
 * Provides theme switching functionality for the FoodyLog application.
 * Supports light, dark, and system preference modes with persistence.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: (_theme: Theme) => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Theme Provider Component
 * 
 * Manages theme state and applies theme classes to the document root.
 * Persists theme preference in localStorage and responds to system changes.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'foodylog-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return React.createElement(
    ThemeProviderContext.Provider,
    { ...props, value },
    children,
  );
}

/**
 * Hook to access theme context
 * 
 * @returns Theme context with current theme and setter function
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    {throw new Error('useTheme must be used within a ThemeProvider');}

  return context;
};

/**
 * Gets the current effective theme (resolves "system" to actual theme)
 * 
 * @param theme - Current theme setting
 * @returns Effective theme ("light" or "dark")
 */
export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return theme;
}

/**
 * Theme configuration object with FoodyLog colors
 * Used for programmatic access to theme colors
 */
export const themeConfig = {
  light: {
    background: 'hsl(30, 43%, 90%)', // #f0e5d9
    backgroundHover: 'hsl(30, 40%, 87%)', // #e3d5c5
    subtle: 'hsl(30, 33%, 80%)', // #d4c2b2
    text: 'hsl(30, 12%, 16%)', // #2f2a25
    accent: 'hsl(139, 29%, 42%)', // #5da271
    accentHover: 'hsl(139, 29%, 46%)', // #6fb07e
    accentPress: 'hsl(139, 29%, 50%)', // #80bd8c
    accentText: 'hsl(0, 0%, 100%)', // #ffffff
  },
  dark: {
    background: 'hsl(24, 7%, 12%)', // #1e1b1a
    backgroundHover: 'hsl(28, 9%, 16%)', // #2a2522
    subtle: 'hsl(34, 12%, 22%)', // #453f3b
    text: 'hsl(30, 43%, 90%)', // #f0e5d9
    accent: 'hsl(139, 29%, 35%)', // #4b845e
    accentHover: 'hsl(139, 29%, 41%)', // #609a70
    accentPress: 'hsl(139, 29%, 47%)', // #74b182
    accentText: 'hsl(30, 12%, 16%)', // #2f2a25
  },
} as const;