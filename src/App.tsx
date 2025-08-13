/**
 * FoodyLog Main App Component
 * 
 * Root component that handles routing and global app state.
 * Implements SPA architecture with React Router for navigation.
 * Supports both web and mobile (Capacitor) environments.
 * Includes FoodyLog custom theme provider with shadcn/ui integration.
 * Integrates Clerk authentication with protected and public routes.
 * Initializes comprehensive accessibility features for WCAG 2.1 AA compliance.
 */

import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ThemeProvider } from './lib/theme';
import { AppLayout } from './components/layout/Layout';
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';
import { SignInPage } from './components/auth/SignInPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { AddMealPage } from './pages/AddMealPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ComponentDemo } from './pages/ComponentDemo';
import { AuthTestPage } from './components/auth/AuthTestPage';
import { ConvexTestPage } from './components/ConvexTestPage';
import { AnimationTestPage } from './pages/AnimationTestPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { AccessibilityDemo } from './pages/AccessibilityDemo';
import { initializeScreenReaderAnnouncements } from './lib/accessibility';
import { injectAccessibilityCSS } from './lib/accessibility-css';

function App() {
  /**
   * Initialize accessibility features on app mount
   * 
   * Sets up screen reader announcements, injects accessibility CSS,
   * and configures WCAG 2.1 AA compliance features.
   */
  useEffect(() => {
    // Initialize screen reader announcement system
    initializeScreenReaderAnnouncements();
    
    // Inject accessibility CSS for focus indicators, touch targets, etc.
    injectAccessibilityCSS();
    
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only-focusable';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    
    // Insert skip link as first element in body
    if (document.body.firstChild) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    } else {
      document.body.appendChild(skipLink);
    }
    
    // Set up focus-visible polyfill class
    document.documentElement.classList.add('js-focus-visible');
    
    // Announce app initialization to screen readers
    setTimeout(() => {
      const announcement = document.querySelector('[aria-live="polite"]');
      if (announcement) {
        announcement.textContent = 'FoodyLog application loaded and ready';
      }
    }, 1000);
    
    // Cleanup function
    return () => {
      const existingSkipLink = document.querySelector('.skip-link');
      if (existingSkipLink) {
        existingSkipLink.remove();
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="foodylog-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Authentication Routes */}
          <Route 
            path="/auth/sign-in/*" 
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/auth/sign-up/*" 
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected App Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/meals" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SearchPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AddMealPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AnalyticsPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Development/Demo Routes */}
          <Route 
            path="/components" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ComponentDemo />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth-test" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AuthTestPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/convex-test" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ConvexTestPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/animation-test" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AnimationTestPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/accessibility-demo" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AccessibilityDemo />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;