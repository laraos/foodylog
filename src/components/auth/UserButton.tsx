/**
 * UserButton Component
 * 
 * Displays user profile information and provides sign-out functionality.
 * Uses Clerk's UserButton component with custom styling to match FoodyLog design.
 * 
 * Features:
 * - User avatar and profile info
 * - Sign-out functionality
 * - Account management links
 * - Custom styling matching FoodyLog theme
 */

import React from 'react';
import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * UserButton Component
 * 
 * Renders a user button with profile menu including sign-out option.
 * Falls back to a custom button if Clerk UserButton is not available.
 */
export const UserButton: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      {/* User Info */}
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-foreground">
          {user.fullName}
        </p>
        <p className="text-xs text-muted-foreground">
          {user.email}
        </p>
      </div>

      {/* Clerk UserButton with custom styling */}
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: {
              width: '40px',
              height: '40px',
            },
            userButtonPopoverCard: {
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
            },
            userButtonPopoverActionButton: {
              color: 'hsl(var(--foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--accent))',
              },
            },
            userButtonPopoverActionButtonText: {
              color: 'hsl(var(--foreground))',
            },
            userButtonPopoverActionButtonIcon: {
              color: 'hsl(var(--muted-foreground))',
            },
          },
        }}
        afterSignOutUrl="/auth/sign-in"
      />
    </div>
  );
};

/**
 * Simple Sign Out Button
 * 
 * Alternative component for cases where we just need a sign-out button
 * without the full user profile menu.
 */
export const SignOutButton: React.FC<{
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant = 'ghost', size = 'sm' }) => {
  const { signOut, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
  };

  return (
    <button
      onClick={handleSignOut}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Sign Out
    </button>
  );
};

export default UserButton;