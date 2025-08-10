/**
 * UserProfile Component
 * 
 * Integrates Clerk's UserProfile component for profile management with
 * FoodyLog-specific styling and functionality. Handles profile editing,
 * avatar upload, and account management through Clerk's built-in features.
 * 
 * Features:
 * - Profile editing (name, email, avatar) via Clerk
 * - Account security settings via Clerk
 * - Account deletion via Clerk
 * - Custom styling to match FoodyLog design system
 * - Responsive design for mobile and desktop
 */

import React from 'react';
import { UserProfile as ClerkUserProfile } from '@clerk/clerk-react';

/**
 * UserProfile Component Props
 */
interface UserProfileProps {
  /**
   * Optional routing configuration for Clerk UserProfile
   */
  routing?: 'hash' | 'virtual';
  
  /**
   * Optional path for routing (when using path routing)
   */
  path?: string;
  
  /**
   * Optional URL to redirect to after profile actions
   */
  redirectUrl?: string;
}

/**
 * UserProfile Component
 * 
 * Renders Clerk's UserProfile component with FoodyLog-specific styling.
 * This component handles all profile management functionality including:
 * - Personal information editing
 * - Avatar upload and management
 * - Email and phone number management
 * - Password and security settings
 * - Account deletion
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  routing = 'hash',
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and security settings
        </p>
      </div>

      {/* Clerk UserProfile with custom styling */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <ClerkUserProfile
          routing={routing}
          appearance={{
            elements: {
              // Main container styling
              rootBox: {
                width: '100%',
              },
              card: {
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
              },
              
              // Header styling
              headerTitle: {
                color: 'hsl(var(--foreground))',
                fontSize: '1.25rem',
                fontWeight: '600',
              },
              headerSubtitle: {
                color: 'hsl(var(--muted-foreground))',
              },
              
              // Form styling
              formFieldLabel: {
                color: 'hsl(var(--foreground))',
                fontSize: '0.875rem',
                fontWeight: '500',
              },
              formFieldInput: {
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--foreground))',
                fontSize: '0.875rem',
                '&:focus': {
                  borderColor: 'hsl(var(--ring))',
                  outline: 'none',
                  boxShadow: '0 0 0 2px hsl(var(--ring) / 0.2)',
                },
              },
              formFieldInputShowPasswordButton: {
                color: 'hsl(var(--muted-foreground))',
                '&:hover': {
                  color: 'hsl(var(--foreground))',
                },
              },
              
              // Button styling
              formButtonPrimary: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                '&:hover': {
                  backgroundColor: 'hsl(var(--primary) / 0.9)',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: '0 0 0 2px hsl(var(--ring))',
                },
              },
              formButtonReset: {
                backgroundColor: 'transparent',
                color: 'hsl(var(--muted-foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                '&:hover': {
                  backgroundColor: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                },
              },
              
              // Navigation styling
              navbar: {
                backgroundColor: 'hsl(var(--muted))',
                borderBottom: '1px solid hsl(var(--border))',
              },
              navbarButton: {
                color: 'hsl(var(--muted-foreground))',
                '&:hover': {
                  backgroundColor: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                },
              },
              navbarButtonActive: {
                backgroundColor: 'hsl(var(--accent))',
                color: 'hsl(var(--accent-foreground))',
              },
              
              // Page styling
              page: {
                backgroundColor: 'transparent',
                padding: '1.5rem',
              },
              pageScrollBox: {
                backgroundColor: 'transparent',
              },
              
              // Avatar styling
              avatarBox: {
                width: '80px',
                height: '80px',
              },
              avatarImageActionsUpload: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                '&:hover': {
                  backgroundColor: 'hsl(var(--primary) / 0.9)',
                },
              },
              
              // Alert styling
              alert: {
                backgroundColor: 'hsl(var(--destructive) / 0.1)',
                border: '1px solid hsl(var(--destructive) / 0.2)',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--destructive))',
              },
              alertText: {
                color: 'hsl(var(--destructive))',
              },
              
              // Success styling
              formFieldSuccessText: {
                color: 'hsl(var(--success))',
              },
              
              // Error styling
              formFieldErrorText: {
                color: 'hsl(var(--destructive))',
                fontSize: '0.75rem',
              },
              
              // Modal styling (for confirmations)
              modalContent: {
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              },
              modalCloseButton: {
                color: 'hsl(var(--muted-foreground))',
                '&:hover': {
                  color: 'hsl(var(--foreground))',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;