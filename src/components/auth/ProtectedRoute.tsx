/**
 * ProtectedRoute Component
 * 
 * A wrapper component that ensures users are authenticated before
 * accessing protected content. Uses Clerk's built-in SignedIn/SignedOut
 * components for reliable authentication state management.
 * 
 * Features:
 * - Clerk's built-in authentication state checking
 * - Automatic redirect to sign-in page with preserved destination
 * - Loading states during authentication checks
 * - Session persistence across app restarts
 * - Deep linking support with proper redirects
 */

import React from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Props for ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 * 
 * Wraps components that require authentication using Clerk's built-in
 * SignedIn/SignedOut components for reliable authentication state management.
 * 
 * @param children - The protected content to render when authenticated
 * @param fallback - Optional custom loading component
 * @param redirectTo - Custom redirect path (defaults to /auth/sign-in)
 * 
 * @example
 * ```typescript
 * <ProtectedRoute>
 *   <MealListPage />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
  redirectTo = '/auth/sign-in',
}) => {
  const { isLoaded } = useAuth();
  const location = useLocation();
  
  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">
              Checking authentication...
            </p>
          </div>
        </div>
      )
    );
  }
  
  return (
    <>
      {/* Render content when user is signed in */}
      <SignedIn>
        {children}
      </SignedIn>
      
      {/* Redirect to sign-in when user is signed out */}
      <SignedOut>
        <Navigate
          to={redirectTo}
          state={{ from: location }}
          replace
        />
      </SignedOut>
    </>
  );
};

/**
 * RequireAuth Component
 * 
 * Alternative component that throws an error if not authenticated.
 * Uses Clerk's SignedIn component for reliable authentication checking.
 * 
 * @param children - The content that requires authentication
 * 
 * @example
 * ```typescript
 * <RequireAuth>
 *   <UserProfile />
 * </RequireAuth>
 * ```
 */
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    throw new Error('Authentication is still loading');
  }
  
  if (!isSignedIn) {
    throw new Error('Authentication required');
  }
  
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

/**
 * PublicRoute Component
 * 
 * Wrapper for routes that should only be accessible to unauthenticated users.
 * Uses Clerk's SignedIn/SignedOut components for reliable state management.
 * 
 * @param children - The public content to render
 * @param redirectTo - Where to redirect authenticated users
 * 
 * @example
 * ```typescript
 * <PublicRoute>
 *   <LandingPage />
 * </PublicRoute>
 * ```
 */
export const PublicRoute: React.FC<{
  children: React.ReactNode;
  redirectTo?: string;
}> = ({
  children,
  redirectTo = '/meals',
}) => {
  const { isLoaded } = useAuth();
  
  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      {/* Render content when user is signed out */}
      <SignedOut>
        {children}
      </SignedOut>
      
      {/* Redirect to main app when user is signed in */}
      <SignedIn>
        <Navigate to={redirectTo} replace />
      </SignedIn>
    </>
  );
};

export default ProtectedRoute;