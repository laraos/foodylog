# Mobile Guidelines

FoodyLog is designed mobile-first with comprehensive support for native mobile experiences through Capacitor 7. These guidelines ensure optimal performance and user experience across all mobile devices.

## Mobile-First Design Principles

### 1. Thumb-Friendly Navigation

All primary actions are optimized for one-handed operation within the thumb zone.

```tsx
// Bottom navigation within thumb reach
<Navigation className="fixed bottom-0 safe-area-inset-bottom">
  <NavigationItem 
    className="min-h-[44px] flex-1"
    href="/add"
    variant="primary"
  >
    <Plus className="w-6 h-6 mb-1" />
    <span className="text-xs">Add Meal</span>
  </NavigationItem>
</Navigation>

// Primary actions in easy reach
<div className="fixed bottom-20 right-4 z-50">
  <Button 
    size="lg" 
    className="h-14 w-14 rounded-full shadow-lg"
    aria-label="Quick add meal"
  >
    <Camera className="w-6 h-6" />
  </Button>
</div>
```

### 2. Touch Target Optimization

All interactive elements meet or exceed 44px minimum touch targets.

```tsx
// Proper touch target sizing
<Button className="min-h-[44px] min-w-[44px] px-6">
  Save Meal
</Button>

// Icon buttons with adequate touch area
<Button 
  variant="ghost" 
  size="icon" 
  className="h-11 w-11" // 44px touch target
  aria-label="Edit meal"
>
  <Edit className="w-5 h-5" />
</Button>

// List items with full-width touch targets
<div className="divide-y">
  {meals.map(meal => (
    <button
      key={meal.id}
      className="w-full p-4 text-left min-h-[44px] hover:bg-muted"
      onClick={() => navigate(`/meals/${meal.id}`)}
    >
      <MealListItem meal={meal} />
    </button>
  ))}
</div>
```

### 3. Safe Area Handling

Proper handling of device-specific safe areas (notches, home indicators).

```css
/* Safe area CSS utilities */
.safe-area-inset-top {
  padding-top: max(1rem, env(safe-area-inset-top));
}

.safe-area-inset-bottom {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}

.safe-area-inset-left {
  padding-left: max(1rem, env(safe-area-inset-left));
}

.safe-area-inset-right {
  padding-right: max(1rem, env(safe-area-inset-right));
}
```

```tsx
// Safe area implementation
<header className="sticky top-0 bg-background safe-area-inset-top">
  <div className="h-16 flex items-center justify-between px-4">
    <h1>FoodyLog</h1>
    <UserButton />
  </div>
</header>

<main className="flex-1 pb-20 safe-area-inset-bottom">
  {/* Content with safe bottom padding */}
</main>

<nav className="fixed bottom-0 left-0 right-0 bg-background border-t safe-area-inset-bottom">
  <NavigationItems />
</nav>
```

## Capacitor 7 Integration

### Device Permissions

Proper handling of device permissions for camera, location, and storage.

```typescript
// Camera permissions
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const requestPermission = async () => {
    try {
      const permission = await Camera.requestPermissions({
        permissions: ['camera', 'photos']
      });
      
      setHasPermission(
        permission.camera === 'granted' && 
        permission.photos === 'granted'
      );
      
      return permission;
    } catch (error) {
      console.error('Permission request failed:', error);
      setHasPermission(false);
      return null;
    }
  };
  
  const capturePhoto = async () => {
    if (hasPermission === false) {
      const permission = await requestPermission();
      if (!permission || permission.camera !== 'granted') {
        throw new Error('Camera permission denied');
      }
    }
    
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        width: 1024,
        height: 1024,
        correctOrientation: true,
      });
      
      return image;
    } catch (error) {
      if (error.message.includes('User cancelled')) {
        return null; // User cancelled, not an error
      }
      throw error;
    }
  };
  
  return { hasPermission, requestPermission, capturePhoto };
};
```

### Location Services

```typescript
// Location integration
import { Geolocation } from '@capacitor/geolocation';

export const useLocation = () => {
  const getCurrentLocation = async () => {
    try {
      const permission = await Geolocation.requestPermissions();
      
      if (permission.location !== 'granted') {
        throw new Error('Location permission denied');
      }
      
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      
      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
      };
    } catch (error) {
      console.error('Location error:', error);
      return null;
    }
  };
  
  return { getCurrentLocation };
};
```

### Storage and Preferences

```typescript
// Persistent storage with Capacitor Preferences
import { Preferences } from '@capacitor/preferences';

export const useOfflineStorage = () => {
  const saveOfflineData = async (key: string, data: any) => {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(data),
        group: 'foodylog_offline', // Capacitor 7 feature
      });
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };
  
  const getOfflineData = async (key: string) => {
    try {
      const result = await Preferences.get({
        key,
        group: 'foodylog_offline',
      });
      
      return result.value ? JSON.parse(result.value) : null;
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  };
  
  const clearOfflineData = async (key: string) => {
    try {
      await Preferences.remove({
        key,
        group: 'foodylog_offline',
      });
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  };
  
  return { saveOfflineData, getOfflineData, clearOfflineData };
};
```

## Responsive Breakpoints

Mobile-first responsive design with consistent breakpoints.

```typescript
// Responsive breakpoints
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
} as const;

// Responsive utilities
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<keyof typeof breakpoints>('sm');
  
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setScreenSize('2xl');
      else if (width >= 1280) setScreenSize('xl');
      else if (width >= 1024) setScreenSize('lg');
      else if (width >= 768) setScreenSize('md');
      else setScreenSize('sm');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  return {
    screenSize,
    isMobile: screenSize === 'sm',
    isTablet: screenSize === 'md',
    isDesktop: screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl',
  };
};
```

### Responsive Component Patterns

```tsx
// Responsive meal card
<MealCard 
  meal={meal}
  layout={isMobile ? 'compact' : 'full'}
  showPrice={!isMobile}
  className={cn(
    'w-full',
    isMobile ? 'p-3' : 'p-6',
    'md:max-w-sm lg:max-w-md'
  )}
/>

// Responsive grid
<div className={cn(
  'grid gap-4',
  'grid-cols-1',           // Mobile: 1 column
  'sm:grid-cols-2',        // Mobile landscape: 2 columns
  'md:grid-cols-2',        // Tablet: 2 columns
  'lg:grid-cols-3',        // Desktop: 3 columns
  'xl:grid-cols-4'         // Large desktop: 4 columns
)}>
  {meals.map(meal => (
    <MealCard key={meal.id} meal={meal} />
  ))}
</div>

// Responsive navigation
<nav className={cn(
  // Mobile: bottom navigation
  'fixed bottom-0 left-0 right-0 md:relative md:bottom-auto',
  // Desktop: top navigation
  'md:flex md:items-center md:justify-between'
)}>
  <NavigationItems />
</nav>
```

## Touch Interactions

### Gesture Support

```typescript
// Touch gesture handling
export const useTouchGestures = () => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > 50;
    const isRightSwipe = distanceX < -50;
    const isUpSwipe = distanceY > 50;
    const isDownSwipe = distanceY < -50;
    
    return { isLeftSwipe, isRightSwipe, isUpSwipe, isDownSwipe };
  };
  
  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
```

### Swipe Actions

```tsx
// Swipeable meal card
const SwipeableMealCard = ({ meal, onEdit, onDelete }) => {
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchGestures();
  const [swipeOffset, setSwipeOffset] = useState(0);
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      // Show delete action
      setSwipeOffset(-80);
    } else if (direction === 'right') {
      // Show edit action
      setSwipeOffset(80);
    }
  };
  
  return (
    <div className="relative overflow-hidden">
      {/* Background actions */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600"
          onClick={() => onEdit(meal.id)}
        >
          <Edit className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600"
          onClick={() => onDelete(meal.id)}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Main card content */}
      <div
        className="relative bg-background transition-transform duration-200"
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          const result = handleTouchEnd();
          if (result?.isLeftSwipe) handleSwipe('left');
          if (result?.isRightSwipe) handleSwipe('right');
        }}
      >
        <MealCard meal={meal} />
      </div>
    </div>
  );
};
```

### Haptic Feedback

```typescript
// Haptic feedback integration
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const lightImpact = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Haptics not supported, fail silently
    }
  };
  
  const mediumImpact = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      // Haptics not supported, fail silently
    }
  };
  
  const heavyImpact = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      // Haptics not supported, fail silently
    }
  };
  
  const selectionChanged = async () => {
    try {
      await Haptics.selectionChanged();
    } catch (error) {
      // Haptics not supported, fail silently
    }
  };
  
  return { lightImpact, mediumImpact, heavyImpact, selectionChanged };
};

// Usage in components
const RatingInput = ({ value, onChange }) => {
  const { selectionChanged } = useHaptics();
  
  const handleRatingChange = (newRating: number) => {
    onChange(newRating);
    selectionChanged(); // Haptic feedback on rating change
  };
  
  return (
    <div className="flex space-x-1">
      {[1,2,3,4,5,6,7,8,9,10].map(rating => (
        <button
          key={rating}
          className={cn(
            'w-8 h-8 rounded-full transition-colors',
            rating <= value ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}
          onClick={() => handleRatingChange(rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};
```

## Performance Optimization

### Image Optimization

```tsx
// Optimized image loading for mobile
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Generate responsive image URLs
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024];
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=80 ${size}w`)
      .join(', ');
  };
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
};
```

### Virtual Scrolling

```tsx
// Virtual scrolling for large meal lists
import { FixedSizeList as List } from 'react-window';

const VirtualMealList = ({ meals }) => {
  const { height: windowHeight } = useWindowSize();
  const listHeight = Math.min(windowHeight - 200, 600); // Account for header/nav
  
  const MealItem = ({ index, style, data }) => (
    <div style={style}>
      <MealCard 
        meal={data[index]} 
        compact 
        className="mx-4 mb-2"
      />
    </div>
  );
  
  return (
    <List
      height={listHeight}
      itemCount={meals.length}
      itemSize={100} // Height of compact meal card
      itemData={meals}
      overscanCount={5} // Render 5 extra items for smooth scrolling
    >
      {MealItem}
    </List>
  );
};
```

### Bundle Optimization

```typescript
// Lazy loading for mobile optimization
const MealDetail = lazy(() => import('./MealDetail'));
const Analytics = lazy(() => import('./Analytics'));
const Settings = lazy(() => import('./Settings'));

// Route-based code splitting
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<AddMeal />} />
    <Route 
      path="/meals/:id" 
      element={
        <Suspense fallback={<MealDetailSkeleton />}>
          <MealDetail />
        </Suspense>
      } 
    />
    <Route 
      path="/analytics" 
      element={
        <Suspense fallback={<AnalyticsSkeleton />}>
          <Analytics />
        </Suspense>
      } 
    />
    <Route 
      path="/settings" 
      element={
        <Suspense fallback={<SettingsSkeleton />}>
          <Settings />
        </Suspense>
      } 
    />
  </Routes>
);
```

## Testing on Mobile

### Device Testing

```typescript
// Device detection for testing
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile = isIOS || isAndroid;
  
  return {
    isIOS,
    isAndroid,
    isMobile,
    isCapacitor: !!(window as any).Capacitor,
    platform: isIOS ? 'ios' : isAndroid ? 'android' : 'web',
  };
};

// Platform-specific testing
describe('Mobile Interactions', () => {
  beforeEach(() => {
    // Mock touch events
    Object.defineProperty(window, 'ontouchstart', {
      value: jest.fn(),
      writable: true,
    });
  });
  
  it('should handle touch gestures', () => {
    const { container } = render(<SwipeableMealCard meal={mockMeal} />);
    
    const card = container.firstChild;
    
    // Simulate swipe left
    fireEvent.touchStart(card, {
      touches: [{ clientX: 100, clientY: 100 }],
    });
    
    fireEvent.touchMove(card, {
      touches: [{ clientX: 50, clientY: 100 }],
    });
    
    fireEvent.touchEnd(card);
    
    // Assert swipe action was triggered
    expect(screen.getByLabelText('Delete meal')).toBeVisible();
  });
});
```

### Capacitor Testing

```bash
# Test on iOS simulator
bunx cap run ios

# Test on Android emulator
bunx cap run android

# Test with live reload
CAP_SERVER_URL=http://192.168.1.100:5173 bunx cap run android --no-sync
```

## Accessibility on Mobile

### Voice Control

```tsx
// Voice control optimization
<Button
  aria-label="Add new meal to your food log"
  data-voice-command="add meal"
>
  <Plus className="w-5 h-5" />
</Button>

// Clear voice commands
<nav aria-label="Main navigation">
  <NavigationItem 
    href="/"
    aria-label="Go to home page"
    data-voice-command="home"
  >
    Home
  </NavigationItem>
  <NavigationItem 
    href="/add"
    aria-label="Add new meal"
    data-voice-command="add meal"
  >
    Add Meal
  </NavigationItem>
</nav>
```

### Switch Navigation

```tsx
// Switch navigation support
<div 
  role="group"
  aria-label="Meal actions"
  data-switch-group="meal-actions"
>
  <Button 
    data-switch-item="1"
    aria-label="Edit meal"
  >
    Edit
  </Button>
  <Button 
    data-switch-item="2"
    aria-label="Delete meal"
  >
    Delete
  </Button>
</div>
```

These mobile guidelines ensure FoodyLog provides an exceptional experience across all mobile devices while maintaining accessibility and performance standards.