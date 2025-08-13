/**
 * Navigation - Mobile-first bottom navigation component for FoodyLog
 * 
 * Implements mobile-first navigation with bottom tab bar optimized for thumb navigation.
 * Provides quick access to main app sections with enhanced visual feedback and accessibility.
 * 
 * Features:
 * - 44px minimum touch targets for accessibility compliance
 * - 24px Lucide React icons for optimal visibility
 * - FoodyLog accent colors for active states (primary green)
 * - Smooth transitions and hover states with scale effects
 * - React Router integration for SPA navigation
 * - Enhanced focus states for keyboard navigation
 * - Screen reader friendly labels and ARIA attributes
 * - Safe area handling for mobile devices (iOS/Android)
 * - Responsive behavior (hidden on desktop for future sidebar)
 * - Comprehensive accessibility features (WCAG 2.1 AA)
 * - Keyboard navigation with arrow keys
 * - Screen reader announcements for navigation changes
 * - High contrast mode support
 * 
 * Requirements fulfilled: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, BarChart3, Settings, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigationInteractions } from '../../hooks/useNavigationInteractions';
import { 
  handleArrowNavigation, 
  announceToScreenReader,
  validateTouchTarget as validateTouchTargetUtil,
  prefersReducedMotion,
  type ArrowNavigationOptions 
} from '../../lib/accessibility';

/**
 * Navigation item configuration
 * Defines the main navigation structure for the app
 */
const navigationItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/',
        icon: Home,
        description: 'View your recent meals',
        isPrimary: false,
    },
    {
        id: 'search',
        label: 'Search',
        path: '/search',
        icon: Search,
        description: 'Find and filter your meals',
        isPrimary: false,
    },
    {
        id: 'add',
        label: 'Add Meal',
        path: '/add',
        icon: Plus,
        description: 'Log a new meal',
        isPrimary: true, // Special styling for primary action
    },
    {
        id: 'analytics',
        label: 'Analytics',
        path: '/analytics',
        icon: BarChart3,
        description: 'View your eating insights',
        isPrimary: false,
    },
    {
        id: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: Settings,
        description: 'App settings and preferences',
        isPrimary: false,
    },
] as const;

/**
 * Bottom navigation component with comprehensive accessibility features
 * 
 * Renders tab-style navigation optimized for thumb navigation.
 * Uses React Router Link components with enhanced interactions.
 * Implements active state detection and visual feedback.
 * Provides keyboard navigation and screen reader support.
 */
export function Navigation() {
    const location = useLocation();
    const { createRippleEffect } = useNavigationInteractions();
    const [currentFocusIndex, setCurrentFocusIndex] = React.useState(-1);
    const navigationRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

    /**
     * Determines if a navigation item is currently active
     * Handles exact matching for home route and prefix matching for others
     */
    const isActive = (path: string): boolean => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    /**
     * Get the currently active navigation item index
     */
    const getActiveIndex = React.useCallback((): number => {
        return navigationItems.findIndex(item => isActive(item.path));
    }, [location.pathname]);

    /**
     * Validate touch targets on mount and resize
     */
    React.useEffect(() => {
        const validateTouchTargets = () => {
            navigationRefs.current.forEach((ref, index) => {
                if (ref) {
                    const validation = validateTouchTargetUtil(ref);
                    if (process.env.NODE_ENV === 'development' && !validation.passes) {
                        console.warn(
                            `Navigation item "${navigationItems[index].label}" touch target too small: ` +
                            `${validation.width}x${validation.height}px. Minimum required: 44x44px.`
                        );
                    }
                }
            });
        };

        validateTouchTargets();
        
        const handleResize = () => validateTouchTargets();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Handle keyboard navigation within the navigation bar
     */
    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        const elements = navigationRefs.current.filter(Boolean) as HTMLAnchorElement[];
        if (elements.length === 0) return;

        const currentIndex = currentFocusIndex >= 0 ? currentFocusIndex : getActiveIndex();
        
        const navigationOptions: ArrowNavigationOptions = {
            horizontal: true,
            vertical: false,
            wrap: true,
        };

        const newIndex = handleArrowNavigation(
            event.nativeEvent,
            elements,
            currentIndex,
            navigationOptions
        );

        if (newIndex !== currentIndex) {
            setCurrentFocusIndex(newIndex);
            
            // Announce navigation item to screen readers
            const item = navigationItems[newIndex];
            announceToScreenReader(
                `${item.label} navigation item, ${item.description}`,
                'polite'
            );
        }

        // Handle Enter and Space to activate navigation
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const activeElement = elements[currentIndex];
            if (activeElement) {
                activeElement.click();
            }
        }
    }, [currentFocusIndex, getActiveIndex]);

    /**
     * Announce route changes to screen readers
     */
    React.useEffect(() => {
        const activeItem = navigationItems.find(item => isActive(item.path));
        if (activeItem) {
            // Delay announcement to ensure page has loaded
            const timer = setTimeout(() => {
                announceToScreenReader(
                    `Navigated to ${activeItem.label} page`,
                    'polite'
                );
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    return (
        <nav
            className="navigation"
            role="navigation"
            aria-label="Main navigation"
            onKeyDown={handleKeyDown}
        >
            <div className="navigation__container">
                {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    const isFocused = currentFocusIndex === index;

                    /**
                     * Handle enhanced interactions while preserving Link functionality
                     */
                    const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
                        // Add ripple effect for visual feedback
                        const target = event.currentTarget as HTMLElement;
                        createRippleEffect(event, target);

                        // Add haptic feedback on supported devices
                        if ('vibrate' in navigator && !prefersReducedMotion()) {
                            navigator.vibrate(10);
                        }
                    };

                    /**
                     * Handle focus events for keyboard navigation
                     */
                    const handleFocus = () => {
                        setCurrentFocusIndex(index);
                    };

                    const handleBlur = () => {
                        // Only clear focus index if we're not moving to another nav item
                        setTimeout(() => {
                            const activeElement = document.activeElement;
                            const isNavItem = navigationRefs.current.includes(activeElement as HTMLAnchorElement);
                            if (!isNavItem) {
                                setCurrentFocusIndex(-1);
                            }
                        }, 0);
                    };

                    return (
                        <Link
                            key={item.id}
                            ref={(el) => {
                                navigationRefs.current[index] = el;
                            }}
                            to={item.path}
                            className={cn(
                                'navigation__item',
                                active && 'navigation__item--active',
                                item.isPrimary && 'navigation__item--primary',
                                // Enhanced focus styles for keyboard navigation
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                // High contrast mode support
                                'forced-colors:border-[Highlight] forced-colors:text-[Highlight]',
                            )}
                            aria-label={`${item.label}, ${item.description}`}
                            aria-current={active ? 'page' : undefined}
                            aria-describedby={`nav-desc-${item.id}`}
                            tabIndex={active ? 0 : -1} // Only active item is in tab order initially
                            onClick={handleInteraction}
                            onTouchStart={handleInteraction}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            <div className="navigation__icon">
                                <Icon
                                    className={cn(
                                        'h-6 w-6 transition-all duration-200 ease-in-out',
                                        active ? 'text-primary' : 'text-muted-foreground',
                                        item.isPrimary && 'text-primary-foreground',
                                        // Enhanced focus indicator
                                        isFocused && 'scale-110',
                                    )}
                                    aria-hidden="true"
                                />
                            </div>
                            <span className={cn(
                                'navigation__label transition-all duration-200 ease-in-out',
                                active ? 'text-primary font-semibold' : 'text-muted-foreground',
                                item.isPrimary && 'text-primary-foreground font-semibold',
                            )}>
                                {item.label}
                            </span>

                            {/* Hidden description for screen readers */}
                            <span 
                                id={`nav-desc-${item.id}`}
                                className="sr-only"
                            >
                                {item.description}
                            </span>

                            {/* Active indicator */}
                            {active && !item.isPrimary && (
                                <div
                                    className="navigation__indicator"
                                    aria-hidden="true"
                                />
                            )}

                            {/* Focus indicator for high contrast mode */}
                            {isFocused && (
                                <div 
                                    className="absolute inset-0 border-2 border-white opacity-0 pointer-events-none rounded-md"
                                    style={{
                                        opacity: window.matchMedia('(prefers-contrast: high)').matches ? 1 : 0
                                    }}
                                    aria-hidden="true"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}