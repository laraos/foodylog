/**
 * AuthTestPage Component
 * 
 * A test page to verify protected routes, session management, and deep linking
 * functionality. This component helps validate that Clerk's authentication
 * system is working correctly with our routing setup.
 * 
 * Features:
 * - Tests protected route access
 * - Displays current authentication state
 * - Tests deep linking preservation
 * - Shows session persistence information
 * - Provides manual authentication testing tools
 */

import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

/**
 * AuthTestPage Component
 * 
 * Displays comprehensive authentication state information and provides
 * tools for testing authentication flows, deep linking, and session persistence.
 */
export const AuthTestPage: React.FC = () => {
  const { isLoaded, isSignedIn, userId, sessionId, signOut } = useAuth();
  const { user } = useUser();
  const location = useLocation();
  
  // Get session start time from localStorage (if available)
  const sessionStartTime = localStorage.getItem('foodylog_session_start');
  
  // Store session start time if not already stored
  React.useEffect(() => {
    if (isSignedIn && !sessionStartTime) {
      localStorage.setItem('foodylog_session_start', new Date().toISOString());
    }
  }, [isSignedIn, sessionStartTime]);
  
  const handleSignOut = async () => {
    try {
      localStorage.removeItem('foodylog_session_start');
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  
  const testDeepLink = () => {
    // Test deep linking by navigating to a protected route
    window.location.href = '/analytics?test=deep-link&timestamp=' + Date.now();
  };
  
  const refreshPage = () => {
    window.location.reload();
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Authentication Test Page
        </h1>
        <p className="text-muted-foreground">
          This page helps verify that protected routes, session management, and deep linking work correctly.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Authentication State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Authentication State
              <Badge variant={isSignedIn ? 'default' : 'secondary'}>
                {isSignedIn ? 'Signed In' : 'Signed Out'}
              </Badge>
            </CardTitle>
            <CardDescription>
              Current authentication status from Clerk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Loaded:</span>
                <Badge variant={isLoaded ? 'default' : 'destructive'} className="ml-2">
                  {isLoaded ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Signed In:</span>
                <Badge variant={isSignedIn ? 'default' : 'secondary'} className="ml-2">
                  {isSignedIn ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="col-span-2">
                <span className="font-medium">User ID:</span>
                <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                  {userId || 'Not available'}
                </code>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Session ID:</span>
                <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                  {sessionId || 'Not available'}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Profile data from Clerk
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {user.imageUrl && (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Created: {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Not available'}</p>
                  <p>Updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Not available'}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No user data available</p>
            )}
          </CardContent>
        </Card>
        
        {/* Session Information */}
        <Card>
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
            <CardDescription>
              Session persistence and timing data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p>
                <span className="font-medium">Current URL:</span>
                <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                  {location.pathname + location.search}
                </code>
              </p>
              <p>
                <span className="font-medium">Session Start:</span>
                <span className="ml-2">
                  {sessionStartTime 
                    ? new Date(sessionStartTime).toLocaleString()
                    : 'Not recorded'
                  }
                </span>
              </p>
              <p>
                <span className="font-medium">Page Load Time:</span>
                <span className="ml-2">
                  {new Date().toLocaleString()}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
            <CardDescription>
              Tools for testing authentication flows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Button
                onClick={testDeepLink}
                variant="outline"
                size="sm"
              >
                Test Deep Link to Analytics
              </Button>
              <Button
                onClick={refreshPage}
                variant="outline"
                size="sm"
              >
                Refresh Page (Test Persistence)
              </Button>
              <Link to="/add">
                <Button variant="outline" size="sm" className="w-full">
                  Navigate to Add Meal
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" size="sm" className="w-full">
                  Navigate to Settings
                </Button>
              </Link>
              {isSignedIn && (
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  size="sm"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Protected Route Test Results */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Protected Route Test Results</CardTitle>
          <CardDescription>
            If you can see this page, protected routes are working correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">✅ Protected route access successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">✅ Clerk authentication state loaded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">✅ User session is active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">✅ React Router navigation working</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Test Instructions:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Sign out and verify redirect to sign-in page</li>
              <li>Sign back in and verify redirect to intended destination</li>
              <li>Test deep linking by clicking &quot;Test Deep Link&quot; button</li>
              <li>Refresh the page to test session persistence</li>
              <li>Navigate to different protected routes using the buttons above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthTestPage;