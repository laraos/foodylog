/**
 * FoodyLog Input Components
 * 
 * Enhanced input components with validation states, icons, and
 * FoodyLog-specific features. Includes accessibility support
 * and proper mobile touch targets.
 */

import * as React from 'react';
import { Search, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { cn } from '~/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Base Input component with validation states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, icon, rightIcon, ...props }, ref) => {
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="relative">
        {/* Left icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            // Icon spacing
            icon && 'pl-10',
            rightIcon && 'pr-10',
            // Validation states
            hasError && 'border-red-500 focus-visible:ring-red-500',
            hasSuccess && 'border-green-500 focus-visible:ring-green-500',
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* Right icon or validation icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {hasError && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          {hasSuccess && !rightIcon && (
            <Check className="w-4 h-4 text-green-500" />
          )}
          {rightIcon && !hasError && !hasSuccess && (
            <div className="text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

/**
 * SearchInput - Input specifically for search functionality
 */
interface SearchInputProps extends Omit<InputProps, 'icon' | 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, showClearButton = true, value, ...props }, ref) => {
    const hasValue = value && value.toString().length > 0;

    return (
      <Input
        ref={ref}
        type="search"
        icon={<Search className="w-4 h-4" />}
        rightIcon={
          hasValue && showClearButton && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-0.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Clear search"
            >
              <AlertCircle className="w-4 h-4" />
            </button>
          ) : undefined
        }
        value={value}
        {...props}
      />
    );
  },
);
SearchInput.displayName = 'SearchInput';

/**
 * PasswordInput - Input with show/hide password toggle
 */
interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-0.5 rounded-full hover:bg-muted transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

/**
 * NumberInput - Input for numeric values with validation
 */
interface NumberInputProps extends Omit<InputProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  currency?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ min, max, step = 1, currency = false, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        icon={currency ? <span className="text-sm">$</span> : undefined}
        {...props}
      />
    );
  },
);
NumberInput.displayName = 'NumberInput';

/**
 * TextArea - Multi-line text input
 */
interface TextAreaProps extends React.ComponentProps<'textarea'> {
  error?: string;
  success?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, success, ...props }, ref) => {
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
            hasError && 'border-red-500 focus-visible:ring-red-500',
            hasSuccess && 'border-green-500 focus-visible:ring-green-500',
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* Validation icon */}
        {(hasError || hasSuccess) && (
          <div className="absolute right-3 top-3">
            {hasError && <AlertCircle className="w-4 h-4 text-red-500" />}
            {hasSuccess && <Check className="w-4 h-4 text-green-500" />}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';

/**
 * FormField - Complete form field with label and validation
 */
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ 
  label, 
  required = false, 
  error, 
  success, 
  children, 
  className, 
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {success && !error && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Valid
        </p>
      )}
    </div>
  );
}

export { Input };
