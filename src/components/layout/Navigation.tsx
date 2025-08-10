/**
 * Navigation - Bottom navigation component for FoodyLog
 * 
 * Implements mobile-first navigation with bottom tab bar.
 * Provides quick access to main app sections with visual
 * active states and accessibility support.
 * 
 * Features:
 * - Mobile-first bottom navigation design
 * - Active state indicators with smooth transitions
 * - Keyboard navigation support
 * - Screen reader friendly labels
 * - Safe area handling for mobile devices
 * - Responsive behavior for larger screens
 */

import { useLocation, Link } from 'react-router-dom';
import { Home, Search, BarChart3, Settings, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

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
 * Bottom navigation component
 * 
 * Renders tab-style navigation optimized for thumb navigation.
 * Uses react-router-dom Link components for SPA navigation.
 * Implements active state detection and visual feedback.
 */
export function Navigation() {
    const location = useLocation();

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

    return (
        <nav
            className="navigation"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="navigation__container">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={cn(
                                'navigation__item',
                                active && 'navigation__item--active',
                                item.isPrimary && 'navigation__item--primary',
                            )}
                            aria-label={item.description}
                            aria-current={active ? 'page' : undefined}
                        >
                            <div className="navigation__icon">
                                <Icon
                                    className={cn(
                                        'h-5 w-5 transition-colors duration-200',
                                        active ? 'text-primary' : 'text-muted-foreground',
                                        item.isPrimary && 'text-primary-foreground',
                                    )}
                                    aria-hidden="true"
                                />
                            </div>
                            <span className={cn(
                                'navigation__label',
                                active ? 'text-primary' : 'text-muted-foreground',
                                item.isPrimary && 'text-primary-foreground',
                            )}>
                                {item.label}
                            </span>

                            {/* Active indicator */}
                            {active && !item.isPrimary && (
                                <div
                                    className="navigation__indicator"
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