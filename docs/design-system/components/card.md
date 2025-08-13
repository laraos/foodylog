# Card Component

The Card component provides flexible content containers optimized for displaying meal information, statistics, and other structured content in FoodyLog.

## Overview

Built on shadcn/ui Card primitives with FoodyLog-specific enhancements, the Card component offers multiple variants and specialized layouts for food-related content.

### Key Features

- **Meal-Optimized:** Specialized layouts for food content
- **Interactive States:** Hover effects and touch feedback
- **Accessibility:** Proper semantic structure and ARIA support
- **Responsive:** Adapts to different screen sizes
- **Photo Integration:** Optimized for food photography display

## API Reference

### Base Card Props

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated' | 'outlined';
  size?: 'default' | 'compact' | 'large';
  asButton?: boolean;
}
```

### Card Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Standard card with subtle border | General content containers |
| `interactive` | Hover effects and cursor pointer | Clickable meal cards |
| `elevated` | Enhanced shadow for prominence | Featured content, modals |
| `outlined` | Prominent border, transparent background | Form sections, emphasis |

### Card Components

```typescript
// Base card structure
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

## Examples

### Basic Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Delicious Pizza</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Amazing margherita pizza from Tony's Pizzeria</p>
  </CardContent>
</Card>
```

### Interactive Meal Card

```tsx
<Card 
  variant="interactive" 
  asButton
  onClick={() => navigate(`/meals/${meal.id}`)}
  className="cursor-pointer"
>
  <CardContent className="p-4">
    <div className="flex items-center space-x-4">
      <img 
        src={meal.photo} 
        alt={meal.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{meal.title}</h3>
        <p className="text-sm text-muted-foreground">
          {formatTimeAgo(meal.dateEaten)} • {meal.location}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-rating-great">★ {meal.rating}</span>
          <span className="text-sm text-muted-foreground">
            ${meal.price}
          </span>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

### Stats Card

```tsx
import { StatsCard } from '~/components/ui/card';
import { TrendingUp } from 'lucide-react';

<StatsCard
  title="Meals This Week"
  value="12"
  description="3 more than last week"
  icon={<TrendingUp className="w-5 h-5" />}
  trend={{ value: 25, isPositive: true }}
/>
```

### Photo Card

```tsx
import { PhotoCard } from '~/components/ui/card';

<PhotoCard
  src={meal.primaryPhoto}
  alt={meal.title}
  title={meal.title}
  description={`${meal.rating}/10 • ${meal.location}`}
  aspectRatio="photo"
  overlay={
    <div className="text-white">
      <h3 className="font-semibold text-lg">{meal.title}</h3>
      <p className="text-sm opacity-90">
        ★ {meal.rating} • ${meal.price}
      </p>
    </div>
  }
/>
```

### Action Card

```tsx
import { ActionCard } from '~/components/ui/card';
import { Camera, Edit, Trash2 } from 'lucide-react';

<ActionCard
  title="Recent Meal"
  description="Added 2 hours ago"
  icon={<Camera className="w-5 h-5" />}
  actions={
    <>
      <Button variant="ghost" size="icon">
        <Edit className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="w-4 h-4" />
      </Button>
    </>
  }
>
  <div className="space-y-2">
    <p>Delicious homemade pasta with fresh basil</p>
    <div className="flex space-x-2">
      <Badge variant="tag">italian</Badge>
      <Badge variant="tag">homemade</Badge>
    </div>
  </div>
</ActionCard>
```

## Specialized Card Components

### MealCard (Full Implementation)

```tsx
interface MealCardProps {
  meal: {
    id: string;
    title: string;
    rating: number;
    dateEaten: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    locationText?: string;
    tags: string[];
    primaryPhoto?: string;
    price?: number;
  };
  onTap?: (mealId: string) => void;
  showPrice?: boolean;
  compact?: boolean;
  className?: string;
}

export function MealCard({ 
  meal, 
  onTap, 
  showPrice = true, 
  compact = false,
  className 
}: MealCardProps) {
  const handleClick = () => {
    onTap?.(meal.id);
  };

  return (
    <Card 
      variant="interactive"
      className={cn(
        'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        compact ? 'p-3' : 'p-4',
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View meal: ${meal.title}, rated ${meal.rating} out of 10`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Meal Photo */}
        <div className="flex-shrink-0">
          {meal.primaryPhoto ? (
            <img
              src={meal.primaryPhoto}
              alt={meal.title}
              className={cn(
                'rounded-lg object-cover',
                compact ? 'w-12 h-12' : 'w-16 h-16'
              )}
            />
          ) : (
            <div className={cn(
              'bg-muted rounded-lg flex items-center justify-center',
              compact ? 'w-12 h-12' : 'w-16 h-16'
            )}>
              <span className="text-2xl">🍽️</span>
            </div>
          )}
        </div>

        {/* Meal Details */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold text-foreground truncate',
            compact ? 'text-base' : 'text-lg'
          )}>
            {meal.title}
          </h3>
          
          <div className="flex items-center space-x-3 mt-1">
            <span className={cn(
              'flex items-center',
              getRatingColor(meal.rating)
            )}>
              ★ {meal.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatTimeAgo(meal.dateEaten)}
            </span>
            {meal.locationText && (
              <span className="text-sm text-muted-foreground truncate">
                {meal.locationText}
              </span>
            )}
          </div>

          {/* Tags */}
          {!compact && meal.tags.length > 0 && (
            <div className="flex space-x-1 mt-2">
              {meal.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="tag" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {meal.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{meal.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col items-end space-y-1">
          {showPrice && meal.price && (
            <span className="text-sm font-medium text-foreground">
              {formatPrice(meal.price)}
            </span>
          )}
          <MealTypeBadge mealType={meal.mealType} />
        </div>
      </div>
    </Card>
  );
}
```

## Accessibility Features

### Semantic Structure
```tsx
// Proper heading hierarchy
<Card>
  <CardHeader>
    <CardTitle as="h2">Section Title</CardTitle>
    <CardDescription>Supporting description</CardDescription>
  </CardHeader>
  <CardContent>
    <h3>Subsection</h3>
    <p>Content with proper structure</p>
  </CardContent>
</Card>
```

### Interactive Cards
```tsx
// Clickable card with proper accessibility
<Card 
  asButton
  role="button"
  tabIndex={0}
  aria-label="View meal details for Margherita Pizza"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  <CardContent>
    Clickable content
  </CardContent>
</Card>
```

### Screen Reader Support
```tsx
// Descriptive content for screen readers
<Card>
  <CardHeader>
    <CardTitle>
      <span className="sr-only">Meal: </span>
      Delicious Pizza
    </CardTitle>
    <CardDescription>
      Rated 9 out of 10, eaten 2 hours ago at Tony's Pizzeria
    </CardDescription>
  </CardHeader>
</Card>
```

## Mobile Considerations

### Touch Targets
```tsx
// Ensure proper touch target sizes
<Card 
  asButton
  className="min-h-[44px] p-4"
  onClick={handleClick}
>
  <div className="flex items-center justify-between">
    <span>Meal Title</span>
    <ChevronRight className="w-5 h-5" />
  </div>
</Card>
```

### Responsive Layout
```tsx
// Responsive card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {meals.map((meal) => (
    <MealCard 
      key={meal.id} 
      meal={meal}
      compact={isMobile}
    />
  ))}
</div>
```

### Swipe Gestures
```tsx
// Card with swipe actions (future enhancement)
<Card 
  className="relative overflow-hidden"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  <div className="swipe-actions absolute right-0 top-0 h-full">
    <Button variant="destructive" size="icon">
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
  <CardContent>
    Swipeable content
  </CardContent>
</Card>
```

## Styling Customization

### Custom Variants
```tsx
// Extend card variants for specific use cases
const mealCardVariants = cva(
  cardVariants.base,
  {
    variants: {
      ...cardVariants.variants,
      mealType: {
        breakfast: 'border-l-4 border-l-yellow-500',
        lunch: 'border-l-4 border-l-green-500',
        dinner: 'border-l-4 border-l-blue-500',
        snack: 'border-l-4 border-l-purple-500',
      }
    }
  }
);
```

### Theme Integration
```tsx
// Using design tokens
<Card 
  style={{
    backgroundColor: 'hsl(var(--card))',
    borderColor: 'hsl(var(--border))',
    color: 'hsl(var(--card-foreground))'
  }}
>
  Theme-aware card
</Card>
```

## Testing Examples

### Unit Tests
```typescript
describe('Card', () => {
  it('renders with correct content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles click events when interactive', () => {
    const handleClick = jest.fn();
    render(
      <Card asButton onClick={handleClick}>
        <CardContent>Clickable card</CardContent>
      </Card>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Tests
```typescript
it('should have proper ARIA attributes', () => {
  render(
    <Card asButton aria-label="View meal details">
      <CardContent>Meal card</CardContent>
    </Card>
  );
  
  const card = screen.getByRole('button');
  expect(card).toHaveAttribute('aria-label', 'View meal details');
});
```

## Performance Considerations

### Image Optimization
```tsx
// Lazy loading for meal photos
<Card>
  <img
    src={meal.photo}
    alt={meal.title}
    loading="lazy"
    className="w-full h-48 object-cover rounded-t-lg"
  />
  <CardContent>
    <h3>{meal.title}</h3>
  </CardContent>
</Card>
```

### Virtual Scrolling
```tsx
// For large lists of meal cards
import { FixedSizeList as List } from 'react-window';

const MealCardList = ({ meals }) => (
  <List
    height={600}
    itemCount={meals.length}
    itemSize={120}
    itemData={meals}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <MealCard meal={data[index]} compact />
      </div>
    )}
  </List>
);
```

The Card component provides a versatile foundation for displaying structured content in FoodyLog, with specialized variants optimized for meal logging workflows and comprehensive accessibility support.