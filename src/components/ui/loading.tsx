/**
 * FoodyLog Loading States
 * 
 * Comprehensive loading state components for different use cases.
 * Includes specialized loading indicators, progress bars, and contextual
 * loading states with FoodyLog theme integration and accessibility support.
 */

import { Loader2, Upload, Wifi, WifiOff } from 'lucide-react';
import { cn } from '~/lib/utils';
import { 
  MealCardSkeleton, 
  MealFormSkeleton, 
  StatsCardSkeleton,
  SearchResultsSkeleton,
  PhotoGridSkeleton,
} from './skeleton';

interface LoadingStateProps {
  className?: string;
}

// Re-export skeleton components for convenience
export {
  MealCardSkeleton,
  MealFormSkeleton,
  StatsCardSkeleton,
  SearchResultsSkeleton,
  PhotoGridSkeleton,
};

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
 * ProgressLoader - Enhanced progress indicator with percentage and animations
 */
interface ProgressLoaderProps extends LoadingStateProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'upload' | 'sync';
}

export function ProgressLoader({ 
  progress, 
  label = 'Loading...', 
  showPercentage = true,
  variant = 'default',
  className, 
}: ProgressLoaderProps) {
  const icons = {
    default: Loader2,
    upload: Upload,
    sync: Wifi,
  };

  const Icon = icons[variant];
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-primary animate-spin" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        {showPercentage && (
          <span className="text-sm font-semibold text-primary">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
      
      <div className="relative">
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${clampedProgress}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Progress milestones */}
        <div className="absolute top-0 w-full h-2 flex justify-between items-center">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={cn(
                'w-0.5 h-2 bg-background transition-opacity duration-300',
                clampedProgress >= milestone ? 'opacity-100' : 'opacity-30',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CircularProgress - Circular progress indicator for compact spaces
 */
interface CircularProgressProps extends LoadingStateProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export function CircularProgress({ 
  progress, 
  size = 'md', 
  showPercentage = true,
  className, 
}: CircularProgressProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-xs' },
    md: { container: 'w-12 h-12', text: 'text-sm' },
    lg: { container: 'w-16 h-16', text: 'text-base' },
  };

  const { container, text } = sizes[size];
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', container, className)}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <div className={cn('absolute inset-0 flex items-center justify-center', text)}>
          <span className="font-semibold text-foreground">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
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
 * PhotoUploadLoader - Enhanced loading state for photo uploads with progress
 */
interface PhotoUploadLoaderProps extends LoadingStateProps {
  progress?: number;
  stage?: 'uploading' | 'processing' | 'optimizing' | 'complete';
}

export function PhotoUploadLoader({ 
  progress, 
  stage = 'uploading', 
  className, 
}: PhotoUploadLoaderProps) {
  const stageMessages = {
    uploading: 'Uploading photo...',
    processing: 'Processing image...',
    optimizing: 'Optimizing for web...',
    complete: 'Upload complete!',
  };

  return (
    <div className={cn(
      'absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg',
      className,
    )}>
      <div className="flex flex-col items-center space-y-4 text-white p-6 rounded-lg bg-black/20">
        {stage !== 'complete' ? (
          <div className="relative">
            <Upload className="w-8 h-8 animate-pulse" />
            <Loader2 className="absolute inset-0 w-8 h-8 animate-spin opacity-50" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        <div className="text-center space-y-2">
          <span className="text-sm font-medium">{stageMessages[stage]}</span>
          
          {progress !== undefined && stage !== 'complete' && (
            <div className="w-48">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * SyncLoader - Loading state for offline sync operations
 */
interface SyncLoaderProps extends LoadingStateProps {
  pendingCount: number;
  isOnline: boolean;
}

export function SyncLoader({ pendingCount, isOnline, className }: SyncLoaderProps) {
  const Icon = isOnline ? Wifi : WifiOff;
  
  return (
    <div className={cn(
      'flex items-center space-x-3 p-4 bg-card border border-border rounded-lg',
      className,
    )}>
      <div className="relative">
        <Icon className={cn(
          'w-5 h-5',
          isOnline ? 'text-green-500' : 'text-orange-500',
        )} />
        {isOnline && (
          <Loader2 className="absolute inset-0 w-5 h-5 animate-spin text-green-500/30" />
        )}
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">
          {isOnline ? 'Syncing meals...' : 'Waiting for connection...'}
        </p>
        <p className="text-xs text-muted-foreground">
          {pendingCount} meal{pendingCount !== 1 ? 's' : ''} pending sync
        </p>
      </div>
      
      {isOnline && (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-4 bg-green-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * TableLoader - Loading state for data tables
 */
interface TableLoaderProps extends LoadingStateProps {
  rows?: number;
  columns?: number;
}

export function TableLoader({ rows = 5, columns = 4, className }: TableLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Table header skeleton */}
      <div className="flex space-x-4 p-4 bg-muted/50 rounded-lg">
        {Array.from({ length: columns }, (_, i) => (
          <div key={i} className="flex-1">
            <div className="h-4 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
      
      {/* Table rows skeleton */}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 p-4 bg-card border border-border rounded-lg">
          {Array.from({ length: columns }, (_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <div 
                className="h-4 bg-muted rounded animate-pulse"
                style={{ animationDelay: `${(rowIndex * columns + colIndex) * 0.1}s` }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}