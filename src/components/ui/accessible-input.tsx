/**
 * AccessibleInput - Enhanced Input components with comprehensive accessibility features
 * 
 * Extends the base Input components with advanced accessibility features:
 * - Comprehensive ARIA attributes and semantic markup
 * - Enhanced validation states with screen reader announcements
 * - Keyboard navigation support and focus management
 * - Error handling with proper associations
 * - Touch target optimization for mobile devices
 * - High contrast mode support
 * - Reduced motion support for animations
 * 
 * Requirements fulfilled: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

import * as React from 'react';
import { Search, Eye, EyeOff, AlertCircle, Check, Info } from 'lucide-react';
import { cn } from '~/lib/utils';
import { 
  createAriaLabel, 
  generateAriaId,
  announceToScreenReader, 
  validateTouchTarget as validateTouchTargetUtil,
  prefersReducedMotion,
  type TouchTargetValidationResult 
} from '~/lib/accessibility';

export interface AccessibleInputProps extends React.ComponentProps<'input'> {
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  description?: string;
  announceValidation?: boolean;
  validateTouchTarget?: boolean;
}

/**
 * Base AccessibleInput component with comprehensive accessibility features
 */
const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    className, 
    type, 
    error, 
    success, 
    helperText,
    icon, 
    rightIcon, 
    label,
    description,
    announceValidation = true,
    validateTouchTarget = true,
    disabled,
    required,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    onFocus,
    onBlur,
    onChange,
    ...props 
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [touchTargetValidation, setTouchTargetValidation] = React.useState<TouchTargetValidationResult | null>(null);
    
    // Generate unique IDs for ARIA relationships
    const errorId = React.useMemo(() => error ? generateAriaId('error') : undefined, [error]);
    const helperId = React.useMemo(() => helperText ? generateAriaId('helper') : undefined, [helperText]);
    const descriptionId = React.useMemo(() => description ? generateAriaId('desc') : undefined, [description]);
    
    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);
    
    // Validate touch target size for mobile accessibility
    React.useEffect(() => {
      if (!validateTouchTarget || !inputRef.current) return;
      
      const validateSize = () => {
        if (inputRef.current) {
          const validation = validateTouchTargetUtil(inputRef.current);
          setTouchTargetValidation(validation);
          
          // Warn in development if touch target is too small
          if (process.env.NODE_ENV === 'development' && !validation.passes) {
            console.warn(
              `AccessibleInput touch target too small: ${validation.width}x${validation.height}px. ` +
              `Minimum required: 44x44px. Consider increasing height or padding.`
            );
          }
        }
      };
      
      validateSize();
      
      const handleResize = () => validateSize();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, [validateTouchTarget]);
    
    // Announce validation state changes to screen readers
    React.useEffect(() => {
      if (!announceValidation) return;
      
      if (error) {
        announceToScreenReader(`Error: ${error}`, 'assertive');
      } else if (success) {
        announceToScreenReader('Input is valid', 'polite');
      }
    }, [error, success, announceValidation]);
    
    /**
     * Enhanced focus handler with accessibility features
     */
    const handleFocus = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      
      // Announce helper text on focus
      if (helperText && !error) {
        announceToScreenReader(helperText, 'polite');
      }
      
      onFocus?.(event);
    }, [helperText, error, onFocus]);
    
    /**
     * Enhanced blur handler
     */
    const handleBlur = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    }, [onBlur]);
    
    /**
     * Enhanced change handler with validation announcements
     */
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      
      // Clear previous error announcements when user starts typing
      if (error && event.target.value) {
        // Debounced announcement to avoid spam
        const timer = setTimeout(() => {
          announceToScreenReader('Error cleared', 'polite');
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }, [onChange, error]);
    
    /**
     * Generate comprehensive ARIA attributes
     */
    const ariaAttributes = React.useMemo(() => {
      const attributes = createAriaLabel(ariaLabel || label, description);
      
      // Build describedby list
      const describedByIds = [
        ariaDescribedBy,
        descriptionId,
        helperId,
        errorId,
      ].filter(Boolean);
      
      if (describedByIds.length > 0) {
        attributes['aria-describedby'] = describedByIds.join(' ');
      }
      
      // Add validation state attributes
      if (error) {
        attributes['aria-invalid'] = 'true';
      } else if (success) {
        attributes['aria-invalid'] = 'false';
      }
      
      // Add required attribute for screen readers
      if (required) {
        attributes['aria-required'] = 'true';
      }
      
      return attributes;
    }, [ariaLabel, label, description, ariaDescribedBy, descriptionId, helperId, errorId, error, success, required]);
    
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    
    return (
      <div className="relative">
        {/* Label */}
        {label && (
          <label 
            htmlFor={props.id}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <p 
            id={descriptionId}
            className="text-sm text-muted-foreground mb-2"
          >
            {description}
          </p>
        )}
        
        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={inputRef}
            type={type}
            className={cn(
              // Base styles with enhanced accessibility
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground transition-all duration-200 ease-in-out',
              // Focus styles with enhanced visibility
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              // Disabled styles
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Icon spacing
              icon && 'pl-10',
              rightIcon && 'pr-10',
              // Validation states with enhanced visual feedback
              hasError && 'border-red-500 focus-visible:ring-red-500 bg-red-50 dark:bg-red-950/20',
              hasSuccess && 'border-green-500 focus-visible:ring-green-500 bg-green-50 dark:bg-green-950/20',
              // Touch target optimization
              'min-h-[44px] md:min-h-[40px]',
              // High contrast mode support
              'forced-colors:border-[ButtonBorder] forced-colors:bg-[Field]',
              // Development touch target validation
              process.env.NODE_ENV === 'development' && 
              touchTargetValidation && 
              !touchTargetValidation.passes && 
              'ring-2 ring-orange-500 ring-opacity-50',
              className,
            )}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...ariaAttributes}
            {...props}
          />

          {/* Right icon or validation icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {hasError && (
              <AlertCircle 
                className="w-4 h-4 text-red-500" 
                aria-hidden="true"
              />
            )}
            {hasSuccess && !rightIcon && (
              <Check 
                className="w-4 h-4 text-green-500" 
                aria-hidden="true"
              />
            )}
            {rightIcon && !hasError && !hasSuccess && (
              <div className="text-muted-foreground">
                {rightIcon}
              </div>
            )}
          </div>
          
          {/* Focus indicator for high contrast mode */}
          {isFocused && (
            <div 
              className="absolute inset-0 border-2 border-white opacity-0 pointer-events-none rounded-md"
              style={{
                opacity: window.matchMedia('(prefers-contrast: high)').matches ? 1 : 0
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p 
            id={helperId}
            className="mt-1 text-sm text-muted-foreground flex items-center"
          >
            <Info className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        
        {/* Success message */}
        {hasSuccess && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center">
            <Check className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            Valid
          </p>
        )}
      </div>
    );
  },
);
AccessibleInput.displayName = 'AccessibleInput';

/**
 * AccessibleSearchInput - Enhanced search input with accessibility features
 */
interface AccessibleSearchInputProps extends Omit<AccessibleInputProps, 'icon' | 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export const AccessibleSearchInput = React.forwardRef<HTMLInputElement, AccessibleSearchInputProps>(
  ({ onClear, showClearButton = true, value, ...props }, ref) => {
    const hasValue = value && value.toString().length > 0;

    return (
      <AccessibleInput
        ref={ref}
        type="search"
        icon={<Search className="w-4 h-4" aria-hidden="true" />}
        rightIcon={
          hasValue && showClearButton && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              aria-label="Clear search"
              tabIndex={0}
            >
              <AlertCircle className="w-3 h-3" aria-hidden="true" />
            </button>
          ) : undefined
        }
        value={value}
        {...props}
      />
    );
  },
);
AccessibleSearchInput.displayName = 'AccessibleSearchInput';

/**
 * AccessiblePasswordInput - Enhanced password input with show/hide toggle
 */
interface AccessiblePasswordInputProps extends Omit<AccessibleInputProps, 'type' | 'rightIcon'> {}

export const AccessiblePasswordInput = React.forwardRef<HTMLInputElement, AccessiblePasswordInputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = React.useCallback(() => {
      setShowPassword(prev => {
        const newState = !prev;
        announceToScreenReader(
          newState ? 'Password visible' : 'Password hidden',
          'polite'
        );
        return newState;
      });
    }, []);

    return (
      <AccessibleInput
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="p-1 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            tabIndex={0}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);
AccessiblePasswordInput.displayName = 'AccessiblePasswordInput';

/**
 * AccessibleNumberInput - Enhanced number input with validation
 */
interface AccessibleNumberInputProps extends Omit<AccessibleInputProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  currency?: boolean;
}

export const AccessibleNumberInput = React.forwardRef<HTMLInputElement, AccessibleNumberInputProps>(
  ({ min, max, step = 1, currency = false, ...props }, ref) => {
    return (
      <AccessibleInput
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        icon={currency ? <span className="text-sm font-medium">$</span> : undefined}
        {...props}
      />
    );
  },
);
AccessibleNumberInput.displayName = 'AccessibleNumberInput';

/**
 * AccessibleTextArea - Enhanced multi-line text input
 */
interface AccessibleTextAreaProps extends React.ComponentProps<'textarea'> {
  error?: string;
  success?: boolean;
  helperText?: string;
  label?: string;
  description?: string;
  announceValidation?: boolean;
  validateTouchTarget?: boolean;
}

export const AccessibleTextArea = React.forwardRef<HTMLTextAreaElement, AccessibleTextAreaProps>(
  ({ 
    className, 
    error, 
    success, 
    helperText,
    label,
    description,
    announceValidation = true,
    validateTouchTarget = true,
    disabled,
    required,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    onFocus,
    onBlur,
    onChange,
    ...props 
  }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    
    // Generate unique IDs for ARIA relationships
    const errorId = React.useMemo(() => error ? generateAriaId('error') : undefined, [error]);
    const helperId = React.useMemo(() => helperText ? generateAriaId('helper') : undefined, [helperText]);
    const descriptionId = React.useMemo(() => description ? generateAriaId('desc') : undefined, [description]);
    
    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!);
    
    // Announce validation state changes
    React.useEffect(() => {
      if (!announceValidation) return;
      
      if (error) {
        announceToScreenReader(`Error: ${error}`, 'assertive');
      } else if (success) {
        announceToScreenReader('Input is valid', 'polite');
      }
    }, [error, success, announceValidation]);
    
    const handleFocus = React.useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      
      if (helperText && !error) {
        announceToScreenReader(helperText, 'polite');
      }
      
      onFocus?.(event);
    }, [helperText, error, onFocus]);
    
    const handleBlur = React.useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    }, [onBlur]);
    
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
    }, [onChange]);
    
    const ariaAttributes = React.useMemo(() => {
      const attributes = createAriaLabel(ariaLabel || label, description);
      
      const describedByIds = [
        ariaDescribedBy,
        descriptionId,
        helperId,
        errorId,
      ].filter(Boolean);
      
      if (describedByIds.length > 0) {
        attributes['aria-describedby'] = describedByIds.join(' ');
      }
      
      if (error) {
        attributes['aria-invalid'] = 'true';
      } else if (success) {
        attributes['aria-invalid'] = 'false';
      }
      
      if (required) {
        attributes['aria-required'] = 'true';
      }
      
      return attributes;
    }, [ariaLabel, label, description, ariaDescribedBy, descriptionId, helperId, errorId, error, success, required]);
    
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="relative">
        {/* Label */}
        {label && (
          <label 
            htmlFor={props.id}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <p 
            id={descriptionId}
            className="text-sm text-muted-foreground mb-2"
          >
            {description}
          </p>
        )}

        <div className="relative">
          <textarea
            ref={textareaRef}
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground transition-all duration-200 ease-in-out resize-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              hasError && 'border-red-500 focus-visible:ring-red-500 bg-red-50 dark:bg-red-950/20',
              hasSuccess && 'border-green-500 focus-visible:ring-green-500 bg-green-50 dark:bg-green-950/20',
              'forced-colors:border-[ButtonBorder] forced-colors:bg-[Field]',
              className,
            )}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...ariaAttributes}
            {...props}
          />

          {/* Validation icon */}
          {(hasError || hasSuccess) && (
            <div className="absolute right-3 top-3">
              {hasError && <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />}
              {hasSuccess && <Check className="w-4 h-4 text-green-500" aria-hidden="true" />}
            </div>
          )}
          
          {/* Focus indicator for high contrast mode */}
          {isFocused && (
            <div 
              className="absolute inset-0 border-2 border-white opacity-0 pointer-events-none rounded-md"
              style={{
                opacity: window.matchMedia('(prefers-contrast: high)').matches ? 1 : 0
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p 
            id={helperId}
            className="mt-1 text-sm text-muted-foreground flex items-center"
          >
            <Info className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        
        {/* Success message */}
        {hasSuccess && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center">
            <Check className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
            Valid
          </p>
        )}
      </div>
    );
  },
);
AccessibleTextArea.displayName = 'AccessibleTextArea';

export { AccessibleInput };
export type { AccessibleInputProps };