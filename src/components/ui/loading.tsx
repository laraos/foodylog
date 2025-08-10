/**
 * FoodyLog Loading States
 * 
 * Comprehensive loading state components for different use cases.
 * Includes skeletons, spinners, and progress indicators with
 * FoodyLog theme integration and accessibility support.
 */


import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Skeleton } from './skeleton';

interface LoadingStateProps {
  className?: string;
}

/**
 * MealCardSkeleton - Loading skeleton for meal cards
 * Matches the structure of the MealCard component
 */
export function MealCardSkeleton({ className }: LoadingStateProps) {
  return (
    <div className={cn(
      'flex items-center space-x-3 p-3 bg-card rounded-lg border border-border',
      className,
    )}>
      {/* Photo skeleton */}
      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex space-x-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
      </div>
      
      {/* Rating skeleton */}
      <div className="flex flex-col items-end space-y-1">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

/**
 * MealListSkeleton - Loading skeleton for meal list
 */
export function MealListSkeleton({ count = 5, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }, (_, i) => (
        <MealCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * FormSkeleton - Loading skeleton for forms
 */
export function FormSkeleton({ className }: LoadingStateProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Photo area skeleton */}
      <Skeleton className="h-48 w-full rounded-lg" />
      
      {/* Form fields skeleton */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </div>
      
      {/* Button skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

/**
 * PageLoadingSpinner - Full page loading state
 */
export function PageLoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * InlineLoader - Small inline loading indicator
 */
export function InlineLoader({ className }: LoadingStateProps) {
  return (
    <Loader2 
      className={cn('w-4 h-4 animate-spin text-primary', className)}
      aria-hidden="true"
    />
  );
}

/**
 * ButtonLoader - Loading state for buttons
 */
export function ButtonLoader({ className }: LoadingStateProps) {
  return (
    <Loader2 
      className={cn('w-4 h-4 animate-spin mr-2', className)}
      aria-hidden="true"
    />
  );
}

/**
 * ProgressLoader - Progress indicator with percentage
 */
interface ProgressLoaderProps extends LoadingStateProps {
  progress: number;
  label?: string;
}

export function ProgressLoader({ progress, label = 'Uploading...', className }: ProgressLoaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

/**
 * SearchLoader - Loading state for search results
 */
export function SearchLoader({ className }: LoadingStateProps) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Searching...</span>
      </div>
    </div>
  );
}

/**
 * PhotoUploadLoader - Loading state for photo uploads
 */
export function PhotoUploadLoader({ className }: LoadingStateProps) {
  return (
    <div className={cn(
      'absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg',
      className,
    )}>
      <div className="flex flex-col items-center space-y-2 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm">Processing photo...</span>
      </div>
    </div>
  );
}