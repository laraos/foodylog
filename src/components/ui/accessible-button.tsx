/**
 * AccessibleButton - Enhanced Button component with comprehensive accessibility features
 * 
 * Extends the base Button component with advanced accessibility features:
 * - Enhanced ARIA attributes and semantic markup
 * - Keyboard navigation support with visual feedback
 * - Screen reader announcements for state changes
 * - Touch target validation and optimization
 * - Focus management with visible indicators
 * - Loading and disabled state handling
 * - Reduced motion support
 * 
 * Requirements fulfilled: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';
import { 
  createAriaLabel, 
  announceToScreenReader, 
  validateTouchTarget as validateTouchTargetUtil,
  prefersReducedMotion,
  type TouchTargetValidationResult 
} from '~/lib/accessibility';

const accessibleButtonVariants = cva(
  // Base styles with enhanced focus indicators and accessibility
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm hover:shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95 shadow-sm hover:shadow-md',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90 shadow-sm hover:shadow-md',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/90',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 min-w-[44px]', // Ensure minimum touch target
        sm: 'h-9 rounded-md px-3 min-w-[44px]',
        lg: 'h-11 rounded-md px-8 min-w-[44px]',
        icon: 'h-10 w-10 min-w-[44px] min-h-[44px]', // Explicit touch target size
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  },
);

export interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accessibleButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  description?: string;
  announceOnClick?: boolean;
  validateTouchTarget?: boolean;
  children: React.ReactNode;
}

/**
 * AccessibleButton component with comprehensive accessibility features
 * 
 * @param className - Additional CSS classes
 * @param variant - Button style variant
 * @param size - Button size variant
 * @param loading - Loading state
 * @param loadingText - Text to display during loading
 * @param description - Additional description for screen readers
 * @param announceOnClick - Whether to announce button activation
 * @param validateTouchTarget - Whether to validate touch target size
 * @param asChild - Render as child component (using Slot)
 * @param disabled - Disabled state
 * @param children - Button content
 * @param props - Additional button props
 * @param ref - Button element ref
 */
const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false,
    loadingText = 'Loading...',
    description,
    announceOnClick = false,
    validateTouchTarget = true,
    asChild = false, 
    disabled,
    children,
    onClick,
    onFocus,
    onBlur,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [touchTargetValidation, setTouchTargetValidation] = React.useState<TouchTargetValidationResult | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    
    // Combine refs
    React.useImperativeHandle(ref, () => buttonRef.current!);
    
    // Validate touch target size on mount and resize
    React.useEffect(() => {
      if (!validateTouchTarget || !buttonRef.current) return;
      
      const validateSize = () => {
        if (buttonRef.current) {
          const validation = validateTouchTargetUtil(buttonRef.current);
          setTouchTargetValidation(validation);
          
          // Warn in development if touch target is too small
          if (process.env.NODE_ENV === 'development' && !validation.passes) {
            console.warn(
              `AccessibleButton touch target too small: ${validation.width}x${validation.height}px. ` +
              `Minimum required: 44x44px. Consider using size="lg" or adding padding.`
            );
          }
        }
      };
      
      // Initial validation
      validateSize();
      
      // Re-validate on window resize
      const handleResize = () => validateSize();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, [validateTouchTarget, size]);
    
    /**
     * Enhanced click handler with accessibility features
     */
    const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      
      // Announce button activation to screen readers
      if (announceOnClick) {
        const buttonText = typeof children === 'string' ? children : ariaLabel || 'Button';
        announceToScreenReader(`${buttonText} activated`);
      }
      
      // Add haptic feedback on supported devices
      if ('vibrate' in navigator && !prefersReducedMotion()) {
        navigator.vibrate(10);
      }
      
      onClick?.(event);
    }, [loading, disabled, announceOnClick, children, ariaLabel, onClick]);
    
    /**
     * Enhanced focus handler with announcements
     */
    const handleFocus = React.useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(true);
      
      // Announce focus for complex buttons
      if (description) {
        announceToScreenReader(description);
      }
      
      onFocus?.(event);
    }, [description, onFocus]);
    
    /**
     * Enhanced blur handler
     */
    const handleBlur = React.useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    }, [onBlur]);
    
    /**
     * Generate ARIA attributes
     */
    const ariaAttributes = React.useMemo(() => {
      const attributes = createAriaLabel(ariaLabel, description);
      
      // Add loading state attributes
      if (loading) {
        attributes['aria-busy'] = 'true';
        attributes['aria-live'] = 'polite';
      }
      
      // Add describedby if provided
      if (ariaDescribedBy) {
        attributes['aria-describedby'] = ariaDescribedBy;
      }
      
      return attributes;
    }, [ariaLabel, description, loading, ariaDescribedBy]);
    
    /**
     * Determine effective disabled state
     */
    const isDisabled = disabled || loading;
    
    /**
     * Get button content with loading state
     */
    const buttonContent = React.useMemo(() => {
      if (loading) {
        return (
          <>
            <Loader2 
              className={cn(
                "animate-spin",
                size === 'icon' ? "h-4 w-4" : "h-4 w-4 mr-2"
              )}
              aria-hidden="true"
            />
            {size !== 'icon' && (
              <span className="sr-only">{loadingText}</span>
            )}
            {size !== 'icon' && children}
          </>
        );
      }
      
      return children;
    }, [loading, loadingText, children, size]);
    
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        ref={buttonRef}
        className={cn(
          accessibleButtonVariants({ variant, size, loading, className }),
          // Add visual indicator for touch target validation in development
          process.env.NODE_ENV === 'development' && 
          touchTargetValidation && 
          !touchTargetValidation.passes && 
          'ring-2 ring-orange-500 ring-opacity-50'
        )}
        disabled={isDisabled}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...ariaAttributes}
        {...props}
      >
        {buttonContent}
        
        {/* Focus indicator for high contrast mode */}
        {isFocused && (
          <div 
            className="absolute inset-0 border-2 border-white opacity-0 pointer-events-none"
            style={{
              opacity: window.matchMedia('(prefers-contrast: high)').matches ? 1 : 0
            }}
            aria-hidden="true"
          />
        )}
      </Comp>
    );
  },
);

AccessibleButton.displayName = 'AccessibleButton';

export { AccessibleButton, accessibleButtonVariants };
export type { AccessibleButtonProps };