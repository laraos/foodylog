/**
 * Header - Top navigation component for FoodyLog
 * 
 * Displays app branding, user menu, and contextual actions.
 * Integrates with Clerk authentication for user management.
 * Implements sticky positioning and safe area handling for mobile devices.
 * 
 * Features:
 * - FoodyLog branding with logo and title
 * - Clerk UserButton integration for authenticated users
 * - Responsive design with 60px consistent height
 * - Safe area handling for mobile notches and status bars
 * - WCAG 2.1 AA compliant accessibility features
 * - Semantic HTML structure with proper ARIA labels
 * - Theme toggle for development (will be moved to user menu later)
 * 
 * Requirements fulfilled:
 * - 3.1: Consistent header structure across all pages
 * - 3.2: Mobile-first responsive design
 * - 3.3: Smooth transitions and interactive feedback
 * - 3.4: Proper semantic markup with ARIA labels
 * - 3.5: Safe area handling for mobile devices
 * - 3.6: Keyboard navigation support
 * - 3.7: Screen reader compatibility
 */

import { User, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../lib/theme';
import { UserButton } from '../auth/UserButton';
import { useAuth } from '../../hooks/useAuth';

/**
 * Header component with FoodyLog branding and user menu integration
 * 
 * Displays the FoodyLog logo and title on the left side,
 * user menu button and actions on the right side.
 * Maintains consistent 60px height across all screen sizes.
 * Sticky positioned for persistent access during scrolling.
 * 
 * @returns JSX.Element - Header component with branding and user menu
 */
export function Header() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();

  /**
   * Fallback user button for unauthenticated state
   * 
   * Displays a generic user icon when no user is signed in.
   * Provides consistent visual structure regardless of auth state.
   */
  const FallbackUserButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full"
      aria-label="User menu (not signed in)"
      disabled
    >
      <User className="h-5 w-5" aria-hidden="true" />
    </Button>
  );

  /**
   * Loading state user button
   * 
   * Shows a loading indicator while authentication state is being determined.
   */
  const LoadingUserButton = () => (
    <div 
      className="h-10 w-10 rounded-full bg-muted animate-pulse"
      aria-label="Loading user information"
      role="status"
    />
  );

  /**
   * Theme toggle handler for development
   * 
   * Toggles between light and dark themes.
   * Will be moved to user menu in future iterations.
   */
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  /**
   * Get user display name for accessibility
   * 
   * Returns appropriate user identification for screen readers.
   */
  const getUserDisplayName = () => {
    if (!user) return 'Guest user';
    return user.fullName || user.firstName || user.email || 'User';
  };

  return (
    <header 
      className="header"
      role="banner"
      aria-label="FoodyLog application header"
    >
      <div className="header__container">
        {/* App branding section */}
        <div className="header__brand" role="img" aria-label="FoodyLog logo and title">
          <div 
            className="header__logo" 
            aria-hidden="true"
            role="presentation"
          >
            🍽️
          </div>
          <h1 className="header__title">
            <span className="sr-only">FoodyLog - </span>
            FoodyLog
          </h1>
        </div>

        {/* User actions section */}
        <div 
          className="header__actions"
          role="toolbar"
          aria-label="User actions and settings"
        >
          {/* Theme toggle - temporary for development */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="h-10 w-10 hidden sm:flex"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Current theme: ${theme}. Click to switch to ${theme === 'light' ? 'dark' : 'light'} theme.`}
          >
            <span aria-hidden="true">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
          </Button>

          {/* User menu button - Clerk UserButton when authenticated */}
          <div 
            className="flex items-center"
            aria-label={`User menu for ${getUserDisplayName()}`}
          >
            {isLoading ? (
              <LoadingUserButton />
            ) : isAuthenticated ? (
              <UserButton />
            ) : (
              <FallbackUserButton />
            )}
          </div>

          {/* Mobile menu button - placeholder for future mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:hidden"
            aria-label="Open mobile menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            disabled
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}