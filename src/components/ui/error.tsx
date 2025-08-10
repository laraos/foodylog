/**
 * FoodyLog Error States
 * 
 * Comprehensive error state components for different scenarios.
 * Includes error messages, empty states, and recovery actions
 * with FoodyLog theme integration and accessibility support.
 */


import { 
  AlertCircle, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Camera, 
  Search,
  UtensilsCrossed,
  Settings,
} from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { Alert, AlertDescription, AlertTitle } from './alert';

interface ErrorStateProps {
  className?: string;
}

interface ErrorMessageProps extends ErrorStateProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'error' | 'warning' | 'info';
}

/**
 * ErrorMessage - General error message component
 */
export function ErrorMessage({ 
  title = 'Something went wrong',
  message,
  action,
  variant = 'error',
  className, 
}: ErrorMessageProps) {
  const variantStyles = {
    error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
    info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
  };

  return (
    <Alert className={cn(variantStyles[variant], className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {action && (
          <Button
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="mt-3"
          >
            {action.label}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

/**
 * NetworkError - Offline/network error state
 */
export function NetworkError({ 
  isOnline = false, 
  onRetry,
  className, 
}: { 
  isOnline?: boolean; 
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className,
    )}>
      {isOnline ? (
        <Wifi className="w-12 h-12 text-muted-foreground mb-4" />
      ) : (
        <WifiOff className="w-12 h-12 text-muted-foreground mb-4" />
      )}
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {isOnline ? 'Connection Problem' : 'You&apos;re Offline'}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        {isOnline 
          ? 'Unable to connect to our servers. Please check your connection and try again.'
          : 'No internet connection. Your changes will sync when you&apos;re back online.'
        }
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

/**
 * EmptyMeals - Empty state for meal list
 */
export function EmptyMeals({ 
  onAddMeal,
  className, 
}: { 
  onAddMeal?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-4 text-center',
      className,
    )}>
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <UtensilsCrossed className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No meals logged yet
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-sm">
        Start your food journey by logging your first meal. Capture photos, rate your experience, and build your personal food diary.
      </p>
      
      {onAddMeal && (
        <Button onClick={onAddMeal} size="lg">
          <Camera className="w-4 h-4 mr-2" />
          Add Your First Meal
        </Button>
      )}
    </div>
  );
}

/**
 * EmptySearch - Empty state for search results
 */
export function EmptySearch({ 
  query,
  onClearSearch,
  className, 
}: { 
  query: string;
  onClearSearch?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className,
    )}>
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Search className="w-6 h-6 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No results found
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        We couldn&apos;t find any meals matching &quot;{query}&quot;. Try adjusting your search terms or browse all meals.
      </p>
      
      {onClearSearch && (
        <Button onClick={onClearSearch} variant="outline">
          Clear Search
        </Button>
      )}
    </div>
  );
}

/**
 * CameraError - Camera permission/access error
 */
export function CameraError({ 
  onOpenSettings,
  onTryAgain,
  className, 
}: { 
  onOpenSettings?: () => void;
  onTryAgain?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-8 px-4 text-center',
      className,
    )}>
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
        <Camera className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Camera Access Needed
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        To take photos of your meals, please allow camera access in your device settings.
      </p>
      
      <div className="flex space-x-3">
        {onTryAgain && (
          <Button onClick={onTryAgain} variant="outline">
            Try Again
          </Button>
        )}
        {onOpenSettings && (
          <Button onClick={onOpenSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Open Settings
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * FormError - Inline form validation error
 */
export function FormError({ 
  message,
  className, 
}: { 
  message: string;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex items-center space-x-2 text-sm text-red-600 dark:text-red-400',
      className,
    )}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/**
 * ServerError - Server/API error state
 */
export function ServerError({ 
  onRetry,
  className, 
}: { 
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className,
    )}>
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Server Error
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm">
        We&apos;re experiencing technical difficulties. Please try again in a moment.
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

/**
 * ValidationError - Form validation error summary
 */
export function ValidationError({ 
  errors,
  className, 
}: { 
  errors: string[];
  className?: string;
}) {
  if (errors.length === 0) {return null;}

  return (
    <Alert className={cn('border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950', className)}>
      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      <AlertTitle className="text-red-800 dark:text-red-200">
        Please fix the following errors:
      </AlertTitle>
      <AlertDescription className="text-red-700 dark:text-red-300">
        <ul className="list-disc list-inside space-y-1 mt-2">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}