/**
 * FoodyLog Skeleton Components
 * 
 * Enhanced skeleton loading states specifically designed for FoodyLog components.
 * Includes meal card skeletons, form skeletons, and other food-specific loading states.
 * Uses FoodyLog theme colors and animations for consistent branding.
 */

import * as React from 'react';
import { cn } from '~/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

/**
 * MealCardSkeleton - Enhanced skeleton for meal cards
 * Matches the exact structure of MealCard component for seamless loading
 */
function MealCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      'flex items-center space-x-4 p-4 bg-card rounded-lg border border-border',
      className,
    )}>
      {/* Photo skeleton with rounded corners */}
      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-2">
        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Metadata row (rating, time, location) */}
        <div className="flex items-center space-x-3">
          <Skeleton className="h-4 w-16" /> {/* Rating */}
          <Skeleton className="h-4 w-20" /> {/* Time */}
          <Skeleton className="h-4 w-24" /> {/* Location */}
        </div>
        
        {/* Tags skeleton */}
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
      
      {/* Price skeleton */}
      <div className="flex flex-col items-end space-y-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
}

/**
 * MealFormSkeleton - Skeleton for meal creation/editing forms
 */
function MealFormSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Photo upload area skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-48 w-full rounded-lg" /> {/* Photo area */}
      </div>
      
      {/* Form fields skeleton */}
      <div className="space-y-4">
        {/* Meal title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        {/* Rating */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex space-x-1">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </div>
        
        {/* Meal type and price row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        {/* Tags */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        {/* Notes */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-3">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
    </div>
  );
}

/**
 * StatsCardSkeleton - Skeleton for statistics cards
 */
function StatsCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      'p-6 bg-card rounded-lg border border-border space-y-3',
      className,
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Title */}
          <Skeleton className="h-8 w-16" /> {/* Value */}
          <Skeleton className="h-3 w-32" /> {/* Description */}
        </div>
        <Skeleton className="h-8 w-8 rounded" /> {/* Icon */}
      </div>
    </div>
  );
}

/**
 * SearchResultsSkeleton - Skeleton for search results
 */
function SearchResultsSkeleton({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }, (_, i) => (
        <MealCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * PhotoGridSkeleton - Skeleton for photo grid layouts
 */
function PhotoGridSkeleton({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 gap-4', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  );
}

export { 
  Skeleton,
  MealCardSkeleton,
  MealFormSkeleton,
  StatsCardSkeleton,
  SearchResultsSkeleton,
  PhotoGridSkeleton,
};
