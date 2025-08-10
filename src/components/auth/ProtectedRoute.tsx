/**
 * ProtectedRoute Component
 * 
 * A wrapper component that ensures users are authenticated before
 * accessing protected content. Integrates with react-router-dom
 * to handle redirects and maintains the intended destination.
 * 
 * Features:
 * - Authentication state checking
 * - Automatic redirect to sign-in page
 * - Preserves intended destination for post-auth redirect
 * - Loading states during authentication checks
 * - Error handling for authentication issues
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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
 * Wraps components that require authentication. Redirects unauthenticated
 * users to the sign-in page while preserving their intended destination.
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
  const { isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();
  
  // Show loading state while authentication is being determined
  if (isLoading) {
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
  
  // Show error state if there's an authentication error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="mb-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Authentication Error
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }
  
  // Render protected content
  return <>{children}</>;
};

/**
 * RequireAuth Component
 * 
 * Alternative component that throws an error if not authenticated.
 * Useful for components that should never render without authentication.
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
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    throw new Error('Authentication is still loading');
  }
  
  if (!isAuthenticated || !user) {
    throw new Error('Authentication required');
  }
  
  return <>{children}</>;
};

/**
 * PublicRoute Component
 * 
 * Wrapper for routes that should only be accessible to unauthenticated users.
 * Redirects authenticated users to the main app.
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
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect if authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;