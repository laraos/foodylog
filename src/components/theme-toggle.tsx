/**
 * FoodyLog Theme Toggle Component
 * 
 * Provides a button to switch between light, dark, and system themes.
 * Uses the FoodyLog theme system with proper accessibility support.
 */

import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/lib/theme';
import { cn } from '~/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Theme Toggle Component
 * 
 * Cycles through light -> dark -> system theme modes.
 * Shows appropriate icon for current theme state.
 * 
 * @param className - Additional CSS classes
 * @param showLabel - Whether to show text label alongside icon
 */
export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Light';
    }
  };

  const getNextThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Switch theme';
    }
  };

  return (
    <Button
      variant="ghost"
      size={showLabel ? 'default' : 'icon'}
      onClick={handleThemeChange}
      className={cn('transition-colors', className)}
      aria-label={getNextThemeLabel()}
      title={getNextThemeLabel()}
    >
      {getThemeIcon()}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {getThemeLabel()}
        </span>
      )}
    </Button>
  );
}

/**
 * Compact Theme Toggle for mobile/small spaces
 */
export function CompactThemeToggle({ className }: { className?: string }) {
  return <ThemeToggle className={className} showLabel={false} />;
}

/**
 * Extended Theme Toggle with label for desktop
 */
export function ExtendedThemeToggle({ className }: { className?: string }) {
  return <ThemeToggle className={className} showLabel={true} />;
}