/**
 * FoodyLog Loading Components
 * 
 * Reusable loading indicators with FoodyLog theme integration.
 * Includes spinner, skeleton, and inline loading states.
 * Implements accessibility best practices with proper ARIA labels.
 */


import { Loader2 } from 'lucide-react';
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