/**
 * HomePage - Landing page for FoodyLog application
 * 
 * Displays welcome message and basic app information for MVP.
 * Now includes shadcn/ui components with FoodyLog custom theme.
 * Will be expanded in future sprints to show meal dashboard,
 * quick actions, and recent meals.
 * 
 * Features:
 * - Welcome message for new users
 * - App version and status information
 * - Theme toggle demonstration
 * - shadcn/ui components with custom FoodyLog theme
 * - Mobile-friendly responsive design
 * - Accessibility compliant structure
 */

import { Link } from 'react-router-dom';
import { ConvexTest } from '../components/ConvexTest';
import { Button, Card, CardHeader, CardTitle, CardContent, StatsCard } from '../components/ui';
import { ThemeToggle } from '../components/theme-toggle';
import { Camera, Search, BarChart3, Smartphone, Palette, UtensilsCrossed } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col gap-8 min-h-full p-4">
      {/* Hero Section with Theme Toggle */}
      <div className="text-center py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Welcome to FoodyLog
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          The simplest way to remember every meal that matters
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Start Logging Meals
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid using new Card components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card variant="interactive">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Capture Meals
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Take photos and log details about your favorite meals
            </p>
          </CardContent>
        </Card>
        
        <Card variant="interactive">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Find & Filter
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Search and filter your meal history to find what you&apos;re looking for
            </p>
          </CardContent>
        </Card>
        
        <Card variant="interactive">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Track Insights
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get insights into your eating patterns and preferences
            </p>
          </CardContent>
        </Card>
        
        <Card variant="interactive">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Works Offline
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Log meals even without internet - syncs when you&apos;re back online
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Demo using StatsCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatsCard
          title="Total Meals"
          value="0"
          description="Ready to start logging"
          icon={<UtensilsCrossed className="w-6 h-6" />}
        />
        <StatsCard
          title="Average Rating"
          value="--"
          description="No meals yet"
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <StatsCard
          title="This Month"
          value="0"
          description="Meals logged"
          icon={<Camera className="w-6 h-6" />}
        />
      </div>
      
      {/* Theme Demo Section using new Card component */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            FoodyLog UI Components Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This page demonstrates the FoodyLog custom theme with warm cream/brown colors and green accents.
            Try switching between light, dark, and system themes using the toggle above.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
          <div className="pt-4 border-t border-border">
            <Link to="/components">
              <Button variant="outline" className="w-full">
                <Palette className="w-4 h-4 mr-2" />
                View Complete Component Library
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Convex Backend Connection Test - Remove after Sprint 1 */}
      <ConvexTest />
      
      {/* Status Information using new Card component */}
      <Card className="mt-auto">
        <CardHeader>
          <CardTitle className="text-lg">App Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="font-medium text-foreground">Version:</span>
              <span className="text-muted-foreground font-mono text-sm">
                {import.meta.env.VITE_APP_VERSION || '1.0.0'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="font-medium text-foreground">Environment:</span>
              <span className="text-muted-foreground font-mono text-sm">
                {import.meta.env.VITE_ENVIRONMENT || 'development'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-foreground">PWA:</span>
              <span className="text-muted-foreground font-mono text-sm">
                {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

