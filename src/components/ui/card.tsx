/**
 * FoodyLog Card Components
 * 
 * Enhanced card components optimized for meal display and food content.
 * Includes interactive states, proper touch targets, and accessibility
 * features for the FoodyLog application.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border',
        interactive: 'border-border hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]',
        elevated: 'shadow-md border-border/50',
        outlined: 'border-2 border-border bg-transparent',
      },
      size: {
        default: '',
        compact: 'p-3',
        large: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asButton?: boolean;
}

/**
 * Base Card component with FoodyLog enhancements
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asButton = false, ...props }, ref) => {
    if (asButton) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          className={cn(
            cardVariants({ variant: 'interactive', size }),
            'text-left w-full',
            className,
          )}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        />
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          className,
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

/**
 * StatsCard - Card for displaying statistics and metrics
 */
interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  ...props 
}: StatsCardProps) {
  return (
    <Card className={cn('p-6', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <span className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600',
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * PhotoCard - Card optimized for displaying photos with overlay content
 */
interface PhotoCardProps extends Omit<CardProps, 'children'> {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  overlay?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'photo';
}

export function PhotoCard({ 
  src, 
  alt, 
  title, 
  description, 
  overlay, 
  aspectRatio = 'photo',
  className,
  ...props 
}: PhotoCardProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    photo: 'aspect-[4/3]',
  };

  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <div className={cn('relative', aspectRatioClasses[aspectRatio])}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/50 flex items-end p-4">
            {overlay}
          </div>
        )}
      </div>
      {(title || description) && (
        <div className="p-4">
          {title && (
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </Card>
  );
}

/**
 * ActionCard - Card with built-in action buttons
 */
interface ActionCardProps extends Omit<CardProps, 'children'> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function ActionCard({ 
  title, 
  description, 
  icon, 
  actions, 
  children,
  className,
  ...props 
}: ActionCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="text-primary">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <CardDescription className="mt-1">{description}</CardDescription>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants,
};
