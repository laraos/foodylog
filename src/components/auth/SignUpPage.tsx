/**
 * SignUpPage Component
 * 
 * Provides the sign-up interface for FoodyLog using Clerk's pre-built
 * SignUp component with custom styling to match our design system.
 * 
 * Features:
 * - Clerk's accessible and secure sign-up form
 * - Custom styling matching FoodyLog design
 * - Mobile-optimized layout
 * - Email verification flow
 * - Automatic redirect after successful sign-up
 * - Integration with our routing system
 */

import React, { useEffect } from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { showDeviceEmulationWarning } from '../../lib/auth/clerk';
import { DeviceEmulationWarning } from './DeviceEmulationWarning';

/**
 * SignUpPage Component
 * 
 * Renders the sign-up page with Clerk's SignUp component.
 * Handles authentication state and redirects appropriately.
 */
export const SignUpPage: React.FC = () => {
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
          Start remembering every meal that matters
        </p>
      </div>
      
      {/* Clerk SignUp Component */}
      <div className="w-full max-w-md">
        <SignUp
          // Routing configuration - let Clerk handle its own routing
          routing="path"
          path="/auth/sign-up"
          
          // Sign-in page link
          signInUrl="/auth/sign-in"
          
          // Fallback redirect URLs (replaces deprecated redirectUrl, afterSignUpUrl)
          fallbackRedirectUrl={from}
          signInFallbackRedirectUrl={from}
          
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
      
      {/* Features Preview */}
      <div className="mt-8 max-w-md text-center">
        <h3 className="text-sm font-medium text-foreground mb-3">
          What you&apos;ll get with FoodyLog:
        </h3>
        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Quick meal logging with photos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Personal food analytics and insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Works offline on all your devices</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Free tier with premium upgrades</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>
          By signing up, you agree to our{' '}
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

export default SignUpPage;