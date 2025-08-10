/**
 * Header - Top navigation component for FoodyLog
 * 
 * Displays app branding, user menu, and contextual actions.
 * Integrates with Clerk authentication (placeholder for now).
 * Implements sticky positioning and safe area handling.
 * 
 * Features:
 * - FoodyLog branding with logo and title
 * - User authentication button (Clerk integration ready)
 * - Responsive design for all screen sizes
 * - Safe area handling for mobile notches
 * - Accessible navigation landmarks
 */

import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../lib/theme';
import { UserButton } from '../auth/UserButton';
import { useAuth } from '../../hooks/useAuth';

/**
 * Header component with branding and user menu
 * 
 * Displays the FoodyLog logo and title on the left,
 * user menu button on the right. Sticky positioned
 * for consistent access during scrolling.
 */
export function Header() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  // Fallback user button for when not authenticated
  const FallbackUserButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full"
      aria-label="User menu"
    >
      <User className="h-5 w-5" />
    </Button>
  );

  // Toggle theme for development - will be moved to user menu later
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header 
      className="header"
      role="banner"
      aria-label="FoodyLog header"
    >
      <div className="header__container">
        {/* App branding */}
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">
            🍽️
          </div>
          <h1 className="header__title">
            FoodyLog
          </h1>
        </div>

        {/* User actions */}
        <div className="header__actions">
          {/* Theme toggle - temporary for development */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="h-10 w-10"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>

          {/* User menu button - Clerk UserButton when authenticated */}
          {isAuthenticated ? <UserButton /> : <FallbackUserButton />}
        </div>
      </div>
    </header>
  );
}