/**
 * FoodyLog Loading Components
 * 
 * Enhanced loading indicators with FoodyLog branding and animations.
 * Includes spinner variations, branded loading states, and accessibility features.
 * Optimized for food logging use cases with warm, appetite-appealing animations.
 */

import { Loader2, UtensilsCrossed, Camera } from 'lucide-react';
import { cn } from '~/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  showText?: boolean;
}

/**
 * LoadingSpinner - Primary loading indicator component
 * 
 * @param size - Size variant (sm, md, lg)
 * @param text - Optional loading text to display
 * @param showText - Whether to show the text (default: false for accessibility)
 * @param className - Additional CSS classes
 */
export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  showText = false,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className,
      )}
      role="status"
      aria-label={text}
    >
      <Loader2 
        className={cn(
          'animate-spin text-primary',
          sizeClasses[size],
        )}
      />
      
      {showText && text && (
        <span className={cn(
          'text-muted-foreground',
          textSizeClasses[size],
        )}>
          {text}
        </span>
      )}
      
      {/* Screen reader only text */}
      <span className="sr-only">{text}</span>
    </div>
  );
}

/**
 * InlineSpinner - Small spinner for inline loading states
 */
export function InlineSpinner({ className }: { className?: string }) {
  return (
    <Loader2 
      className={cn('w-4 h-4 animate-spin text-primary', className)}
      aria-hidden="true"
    />
  );
}

/**
 * ButtonSpinner - Spinner specifically for button loading states
 */
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <Loader2 
      className={cn('w-4 h-4 animate-spin', className)}
      aria-hidden="true"
    />
  );
}

/**
 * FoodyLogSpinner - Branded loading spinner with FoodyLog icon
 * Uses the UtensilsCrossed icon with custom animation for brand consistency
 */
export function FoodyLogSpinner({ 
  size = 'md', 
  text = 'Loading your meals...', 
  showText = true,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        className,
      )}
      role="status"
      aria-label={text}
    >
      <div className="relative">
        <UtensilsCrossed 
          className={cn(
            'animate-pulse text-primary',
            sizeClasses[size],
          )}
        />
        <div 
          className={cn(
            'absolute inset-0 animate-spin text-primary/30',
            sizeClasses[size],
          )}
        >
          <Loader2 className="w-full h-full" />
        </div>
      </div>
      
      {showText && text && (
        <span className={cn(
          'text-muted-foreground font-medium',
          textSizeClasses[size],
        )}>
          {text}
        </span>
      )}
      
      {/* Screen reader only text */}
      <span className="sr-only">{text}</span>
    </div>
  );
}

/**
 * CameraSpinner - Loading spinner for camera/photo operations
 */
export function CameraSpinner({ 
  text = 'Processing photo...', 
  className, 
}: { 
  text?: string; 
  className?: string; 
}) {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center gap-2 text-white',
        className,
      )}
      role="status"
      aria-label={text}
    >
      <div className="relative">
        <Camera className="w-6 h-6 animate-pulse" />
        <Loader2 className="absolute inset-0 w-6 h-6 animate-spin opacity-50" />
      </div>
      
      <span className="text-sm font-medium">
        {text}
      </span>
      
      <span className="sr-only">{text}</span>
    </div>
  );
}

/**
 * PulseLoader - Simple pulsing dots loader for subtle loading states
 */
export function PulseLoader({ className }: { className?: string }) {
  return (
    <div 
      className={cn('flex space-x-1', className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}