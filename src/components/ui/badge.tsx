/**
 * FoodyLog Badge Component
 * 
 * Enhanced badge component with FoodyLog-specific variants for meal tags,
 * ratings, and other categorization needs. Includes accessibility support
 * and proper touch targets for mobile interaction.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        // FoodyLog-specific variants
        tag: 'border-transparent bg-muted text-muted-foreground hover:bg-muted/80',
        rating: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
        mealType: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        price: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
}

/**
 * Badge component with FoodyLog theme integration
 * 
 * @param className - Additional CSS classes
 * @param variant - Badge style variant
 * @param size - Badge size variant
 * @param removable - Whether badge can be removed
 * @param onRemove - Callback when remove button is clicked
 * @param props - Additional div props
 */
function Badge({ 
  className, 
  variant, 
  size, 
  removable = false, 
  onRemove, 
  children,
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, size }), className)} 
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Remove tag"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/**
 * MealTagBadge - Specialized badge for meal tags
 */
interface MealTagBadgeProps extends Omit<BadgeProps, 'variant'> {
  tag: string;
}

export function MealTagBadge({ tag, ...props }: MealTagBadgeProps) {
  return (
    <Badge variant="tag" {...props}>
      #{tag}
    </Badge>
  );
}

/**
 * RatingBadge - Specialized badge for meal ratings
 */
interface RatingBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  rating: number;
  maxRating?: number;
}

export function RatingBadge({ rating, maxRating = 10, ...props }: RatingBadgeProps) {
  return (
    <Badge variant="rating" {...props}>
      ⭐ {rating}/{maxRating}
    </Badge>
  );
}

/**
 * MealTypeBadge - Specialized badge for meal types
 */
interface MealTypeBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export function MealTypeBadge({ mealType, ...props }: MealTypeBadgeProps) {
  const icons = {
    breakfast: '🥞',
    lunch: '🥗',
    dinner: '🍽️',
    snack: '🍿',
  };

  const labels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch', 
    dinner: 'Dinner',
    snack: 'Snack',
  };

  return (
    <Badge variant="mealType" {...props}>
      {icons[mealType]} {labels[mealType]}
    </Badge>
  );
}

/**
 * PriceBadge - Specialized badge for meal prices
 */
interface PriceBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  price: number;
  currency?: string;
}

export function PriceBadge({ price, currency = 'USD', ...props }: PriceBadgeProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <Badge variant="price" {...props}>
      💰 {formattedPrice}
    </Badge>
  );
}

export { Badge, badgeVariants };
