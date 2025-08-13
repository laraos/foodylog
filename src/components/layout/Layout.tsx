/**
 * AppLayout - Main layout component for FoodyLog SPA
 * 
 * Provides the overall structure for the application including
 * header with user menu, main content area, and bottom navigation.
 * Handles safe area insets for mobile devices and responsive design.
 * 
 * Features:
 * - Mobile-first responsive design with bottom navigation
 * - Header with Clerk UserButton integration (placeholder for now)
 * - Safe area handling for iOS/Android notches
 * - Smooth page transitions with react-router-dom
 * - Consistent spacing and accessibility landmarks
 * - WCAG 2.1 AA compliant navigation
 * - Enhanced page transitions and navigation animations
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { PageTransition } from './PageTransition';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Main application layout component
 * 
 * Wraps all pages with consistent header and navigation.
 * Uses CSS Grid for optimal layout performance and flexibility.
 * Implements mobile-first design with responsive breakpoints.
 * Includes smooth page transitions.
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      {/* Header with branding and user menu */}
      <Header />

      {/* Main content area with page transitions */}
      <main className="app-layout__main" role="main" aria-label="Main content">
        <div className="app-layout__content">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>

      {/* Bottom navigation for mobile-first design */}
      <Navigation />
    </div>
  );
}

// Export as Layout for backward compatibility
export { AppLayout as Layout };