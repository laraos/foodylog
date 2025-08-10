/**
 * useAuth Hook - Authentication State Management
 * 
 * Provides a unified interface for authentication state across FoodyLog.
 * Integrates Clerk authentication with Convex backend and handles
 * user session management, loading states, and error handling.
 * 
 * Key Features:
 * - Unified auth state from Clerk
 * - Loading and error state management
 * - User profile data extraction
 * - Session persistence across app restarts
 * - Mobile-optimized authentication flows
 */

import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useMemo, useCallback } from 'react';

/**
 * Authentication state interface
 * 
 * Provides a consistent interface for authentication state
 * across all components in the FoodyLog application.
 */
export interface AuthState {
  // User authentication status
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // User data
  user: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    fullName: string;
  } | null;
  
  // Convex integration
  isConvexAuthenticated: boolean;
  
  // Authentication actions
  signOut: () => Promise<void>;
  
  // Error state
  error: string | null;
}

/**
 * useAuth Hook
 * 
 * Main authentication hook for FoodyLog. Use this throughout the app
 * to access authentication state and user information.
 * 
 * @returns AuthState object with user data and authentication methods
 * 
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { isAuthenticated, user, isLoading } = useAuth();
 *   
 *   if (isLoading) return <LoadingSpinner />;
 *   if (!isAuthenticated) return <SignInPrompt />;
 *   
 *   return <div>Welcome, {user.firstName}!</div>;
 * }
 * ```
 */
export const useAuth = (): AuthState => {
  // Clerk authentication state
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { signOut: clerkSignOut, isSignedIn } = useClerkAuth();
  
  // For now, we'll use a simpler approach without Convex auth integration
  // This will be enhanced in future sprints when we add Convex backend integration
  
  // Sign out function - memoized to prevent unnecessary re-renders
  const signOut = useCallback(async () => {
    try {
      await clerkSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }, [clerkSignOut]);
  
  // Compute authentication state
  const authState = useMemo(() => {
    // Loading state: Clerk is still loading
    const isLoading = !isClerkLoaded;
    
    // Authenticated: use Clerk's isSignedIn, ensuring it's a boolean
    // During loading, isSignedIn can be undefined, so we default to false
    const isAuthenticated = Boolean(isSignedIn);
    
    // Extract user profile data from Clerk
    const user = clerkUser ? {
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      profileImageUrl: clerkUser.imageUrl || '',
      fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 
                clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 
                'User',
    } : null;
    
    return {
      isAuthenticated,
      isLoading,
      user,
      isConvexAuthenticated: isAuthenticated, // For now, same as Clerk auth
      signOut,
      error: null,
    };
  }, [clerkUser, isClerkLoaded, isSignedIn, signOut]);
  
  return authState;
};

/**
 * useRequireAuth Hook
 * 
 * Hook that ensures the user is authenticated. Throws an error if not.
 * Use this in components that absolutely require authentication.
 * 
 * @returns Authenticated user data (guaranteed to be non-null)
 * 
 * @example
 * ```typescript
 * function ProtectedComponent() {
 *   const user = useRequireAuth();
 *   // user is guaranteed to be authenticated
 *   return <div>Hello, {user.firstName}!</div>;
 * }
 * ```
 */
export const useRequireAuth = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    throw new Error('Authentication is still loading');
  }
  
  if (!isAuthenticated || !user) {
    throw new Error('Authentication required');
  }
  
  return user;
};

/**
 * useAuthRedirect Hook
 * 
 * Hook that handles authentication redirects. Returns redirect information
 * for components that need to redirect based on authentication state.
 * 
 * @param requireAuth - Whether authentication is required
 * @returns Redirect information
 */
export const useAuthRedirect = (requireAuth: boolean = true) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  return {
    shouldRedirect: !isLoading && (requireAuth ? !isAuthenticated : isAuthenticated),
    redirectTo: requireAuth ? '/auth/sign-in' : '/meals',
    isLoading,
  };
};

/**
 * useUserProfile Hook
 * 
 * Hook that returns just the user profile data, or null if not authenticated.
 * Useful for components that only need user data without auth state.
 * 
 * @returns User profile data or null
 */
export const useUserProfile = () => {
  const { user } = useAuth();
  return user;
};

/**
 * useIsAuthenticated Hook
 * 
 * Simple hook that returns just the authentication status.
 * Useful for conditional rendering without needing the full auth state.
 * 
 * @returns Boolean indicating if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export default useAuth;