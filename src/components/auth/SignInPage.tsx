/**
 * SignInPage Component
 * 
 * Provides the sign-in interface for FoodyLog using Clerk's pre-built
 * SignIn component with custom styling to match our design system.
 * 
 * Features:
 * - Clerk's accessible and secure sign-in form
 * - Custom styling matching FoodyLog design
 * - Mobile-optimized layout
 * - Automatic redirect after successful sign-in
 * - Integration with our routing system
 */

import React, { useEffect } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { showDeviceEmulationWarning } from '../../lib/auth/clerk';
import { DeviceEmulationWarning } from './DeviceEmulationWarning';

/**
 * SignInPage Component
 * 
 * Renders the sign-in page with Clerk's SignIn component.
 * Handles authentication state and redirects appropriately.
 */
export const SignInPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Get the intended destination from location state, default to meals page
  const from = (location.state as any)?.from?.pathname || '/meals';
  
  // Show warning if device emulation is detected
  useEffect(() => {
    showDeviceEmulationWarning();
  }, []);
  
  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  
  return (
    <>
      <DeviceEmulationWarning />
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
        {/* FoodyLog Branding */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          FoodyLog
        </h1>
        <p className="text-muted-foreground text-sm">
          The simplest way to remember every meal that matters
        </p>
      </div>
      
      {/* Clerk SignIn Component */}
      <div className="w-full max-w-md">
        <SignIn
          // Routing configuration - let Clerk handle its own routing
          routing="path"
          path="/auth/sign-in"
          
          // Sign-up page link
          signUpUrl="/auth/sign-up"
          
          // Fallback redirect URLs (replaces deprecated redirectUrl, afterSignInUrl, afterSignUpUrl)
          fallbackRedirectUrl={from}
          signUpFallbackRedirectUrl={from}
          
          // Custom appearance (configured in clerk.ts)
          appearance={{
            elements: {
              // Ensure the component takes full width on mobile
              rootBox: {
                width: '100%',
              },
              card: {
                width: '100%',
                boxShadow: 'none',
                border: '1px solid hsl(var(--border))',
              },
            },
          }}
        />
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
      </div>
    </>
  );
};

export default SignInPage;