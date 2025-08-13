/**
 * AnimationTestPage - Test page for navigation animations and transitions
 * 
 * Provides a comprehensive test environment for verifying page transitions,
 * navigation micro-interactions, and accessibility features.
 * Used for development and testing purposes.
 */

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageTransition } from '../components/layout/PageTransition';
import { useNavigationInteractions, useReducedMotion } from '../hooks/useNavigationInteractions';
import { LoadingSpinner, FoodyLogSpinner, PulseLoader } from '../components/ui/LoadingSpinner';
import { 
  Home, 
  Search, 
  BarChart3, 
  Settings, 
  Plus,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

export function AnimationTestPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoadingStates, setShowLoadingStates] = useState(false);
  const { isTransitioning, currentPath } = usePageTransition();
  const { navigateWithAnimation } = useNavigationInteractions();
  const { prefersReducedMotion, shouldAnimate } = useReducedMotion();

  /**
   * Test page transition animations
   */
  const testPageTransition = () => {
    setIsAnimating(true);
    
    // Simulate page transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  /**
   * Test loading states
   */
  const toggleLoadingStates = () => {
    setShowLoadingStates(!showLoadingStates);
  };

  /**
   * Navigation test items
   */
  const testNavigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/add', label: 'Add Meal', icon: Plus },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Animation Test Page</h1>
        <p className="text-muted-foreground">
          Test page for navigation animations, transitions, and micro-interactions.
        </p>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription>
            Current animation and accessibility settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Path:</span>
                <Badge variant="outline">{currentPath}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Page Transitioning:</span>
                <Badge variant={isTransitioning ? "default" : "secondary"}>
                  {isTransitioning ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reduced Motion:</span>
                <Badge variant={prefersReducedMotion ? "destructive" : "default"}>
                  {prefersReducedMotion ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Should Animate:</span>
                <Badge variant={shouldAnimate ? "default" : "secondary"}>
                  {shouldAnimate ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Transition Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Page Transition Tests
          </CardTitle>
          <CardDescription>
            Test smooth page transitions and loading states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={testPageTransition}
              disabled={isAnimating}
              className="flex items-center gap-2"
            >
              {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAnimating ? "Animating..." : "Test Transition"}
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleLoadingStates}
              className="flex items-center gap-2"
            >
              {showLoadingStates ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showLoadingStates ? "Hide" : "Show"} Loading States
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reload Page
            </Button>
          </div>

          {/* Loading States Demo */}
          {showLoadingStates && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center space-y-2">
                <h4 className="font-medium">Standard Spinner</h4>
                <LoadingSpinner size="md" showText />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-medium">FoodyLog Spinner</h4>
                <FoodyLogSpinner size="md" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-medium">Pulse Loader</h4>
                <PulseLoader />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Navigation Tests
          </CardTitle>
          <CardDescription>
            Test navigation micro-interactions and animations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {testNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => navigateWithAnimation(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Animation Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Animation Examples</CardTitle>
          <CardDescription>
            Examples of various animations used throughout the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hover Animation */}
            <div className="p-4 border rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <h4 className="font-medium mb-2">Hover Effect</h4>
              <p className="text-sm text-muted-foreground">Hover to see lift animation</p>
            </div>

            {/* Pulse Animation */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Pulse Animation</h4>
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse mx-auto"></div>
            </div>

            {/* Spin Animation */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Spin Animation</h4>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>

            {/* Scale Animation */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Scale Animation</h4>
              <Button 
                size="sm" 
                className="w-full transition-transform hover:scale-105 active:scale-95"
              >
                Press Me
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Information */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>
            WCAG 2.1 AA compliant animation and interaction features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">✓</Badge>
              <span className="text-sm">Respects prefers-reduced-motion</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">✓</Badge>
              <span className="text-sm">Keyboard navigation support</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">✓</Badge>
              <span className="text-sm">Screen reader compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">✓</Badge>
              <span className="text-sm">44px minimum touch targets</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">✓</Badge>
              <span className="text-sm">High contrast focus indicators</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}