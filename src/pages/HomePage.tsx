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

import { ConvexTest } from '../components/ConvexTest';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/theme-toggle';
import { Camera, Search, BarChart3, Smartphone } from 'lucide-react';

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

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
            Capture Meals
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Take photos and log details about your favorite meals
          </p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
            Find & Filter
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Search and filter your meal history to find what you&apos;re looking for
          </p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
            Track Insights
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Get insights into your eating patterns and preferences
          </p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
            Works Offline
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            Log meals even without internet - syncs when you&apos;re back online
          </p>
        </div>
      </div>
      
      {/* Theme Demo Section */}
      <div className="bg-card text-card-foreground p-6 rounded-lg border border-border mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          🎨 FoodyLog Custom Theme Demo
        </h2>
        <p className="text-muted-foreground mb-4">
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
      </div>
      
      {/* Convex Backend Connection Test - Remove after Sprint 1 */}
      <ConvexTest />
      
      {/* Status Information */}
      <div className="bg-card text-card-foreground rounded-lg border border-border p-4 mt-auto">
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
      </div>
    </div>
  );
}

