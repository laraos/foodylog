/**
 * PageTransition - Smooth page transitions for React Router navigation
 * 
 * Provides smooth, accessible page transitions that respect user preferences
 * for reduced motion. Implements fade and slide animations optimized for
 * mobile-first design and food logging use cases.
 * 
 * Features:
 * - Smooth fade and slide transitions between pages
 * - Respects prefers-reduced-motion for accessibility
 * - Optimized for mobile touch interactions
 * - WCAG 2.1 AA compliant animations
 * - Performance optimized with CSS transforms
 * 
 * Requirements fulfilled: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */

import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page transition wrapper component
 * 
 * Wraps page content with smooth, simple transition animations.
 * Uses a single-phase fade transition for optimal performance and smoothness.
 * Automatically detects route changes and applies appropriate transitions.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const location = useLocation();

  return (
    <div className={cn('page-transition-container', className)}>
      {/* Page content with simple fade transition */}
      <div 
        className="page-transition"
        key={location.pathname}
      >
        {children}
      </div>
    </div>
  );
}



/**
 * usePageTransition - Hook for managing page transition state
 * 
 * Provides utilities for components to interact with page transitions.
 * Useful for triggering custom animations or handling transition events.
 */
export function usePageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== previousLocation.pathname) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousLocation(location);
      }, 350); // Total transition duration

      return () => clearTimeout(timer);
    }
  }, [location, previousLocation]);

  return {
    isTransitioning,
    currentPath: location.pathname,
    previousPath: previousLocation.pathname,
  };
}