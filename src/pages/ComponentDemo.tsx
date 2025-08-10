/**
 * Component Demo Page
 * 
 * Demonstrates all FoodyLog UI components with various states and variants.
 * Used for development, testing, and design review purposes.
 */

import * as React from 'react';
import { 
  Camera, 
  Star, 
  MapPin, 
  Settings,
  UtensilsCrossed,
  BarChart3,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatsCard,
  PhotoCard,
  ActionCard,
  Input,
  SearchInput,
  PasswordInput,
  NumberInput,
  TextArea,
  FormField,
  Badge,
  MealTagBadge,
  RatingBadge,
  MealTypeBadge,
  PriceBadge,
  LoadingSpinner,
  InlineSpinner,
  ButtonSpinner,
  MealCardSkeleton,
  MealListSkeleton,
  FormSkeleton,
  ProgressLoader,
  ErrorMessage,
  NetworkError,
  EmptyMeals,
  EmptySearch,
  CameraError,
  ValidationError,
} from '~/components/ui';

export function ComponentDemo() {
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');

  // Simulate progress
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 10);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">FoodyLog UI Components</h1>
          <p className="text-lg text-muted-foreground">
            Complete component library with FoodyLog theme integration
          </p>
        </div>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Buttons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Camera className="w-4 h-4" />
            </Button>
            <Button disabled>Disabled</Button>
            <Button onClick={() => setLoading(!loading)}>
              {loading && <ButtonSpinner />}
              {loading ? 'Loading...' : 'Toggle Loading'}
            </Button>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Basic Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the card content area where you can put any information.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            {/* Interactive Card */}
            <Card variant="interactive" asButton>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>
                  Click me! I have hover and press states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card responds to user interaction with smooth animations.
                </p>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <StatsCard
              title="Total Meals"
              value="127"
              description="This month"
              icon={<UtensilsCrossed className="w-6 h-6" />}
              trend={{ value: 12, isPositive: true }}
            />

            {/* Photo Card */}
            <PhotoCard
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
              alt="Delicious pizza"
              title="Margherita Pizza"
              description="Classic Italian pizza with fresh basil"
              aspectRatio="photo"
              overlay={
                <div className="text-white">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">9.5/10</span>
                  </div>
                </div>
              }
            />

            {/* Action Card */}
            <ActionCard
              title="Quick Actions"
              description="Common meal logging actions"
              icon={<Camera className="w-5 h-5" />}
              actions={
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              }
            >
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Meal
                </Button>
                <Button className="w-full" size="sm" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </ActionCard>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <FormField label="Meal Title" required>
                <Input placeholder="What did you eat?" />
              </FormField>

              <FormField label="Search Meals">
                <SearchInput 
                  placeholder="Search your meals..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                />
              </FormField>

              <FormField label="Password" required>
                <PasswordInput placeholder="Enter your password" />
              </FormField>

              <FormField label="Price">
                <NumberInput 
                  placeholder="0.00"
                  currency
                  min={0}
                  step={0.01}
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Input with Error" error="This field is required">
                <Input placeholder="This has an error" error="This field is required" />
              </FormField>

              <FormField label="Input with Success">
                <Input placeholder="This is valid" success />
              </FormField>

              <FormField label="Input with Icon">
                <Input 
                  placeholder="Location"
                  icon={<MapPin className="w-4 h-4" />}
                />
              </FormField>

              <FormField label="Notes">
                <TextArea 
                  placeholder="Add any notes about your meal..."
                  rows={3}
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Badges</h2>
          <div className="space-y-4">
            
            <div>
              <h3 className="text-lg font-medium mb-3">Basic Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge size="sm">Small</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">FoodyLog Badges</h3>
              <div className="flex flex-wrap gap-2">
                <MealTagBadge tag="delicious" />
                <MealTagBadge tag="spicy" removable onRemove={() => {}} />
                <MealTagBadge tag="healthy" />
                <RatingBadge rating={9} />
                <RatingBadge rating={7} />
                <RatingBadge rating={4} />
                <MealTypeBadge mealType="breakfast" />
                <MealTypeBadge mealType="lunch" />
                <MealTypeBadge mealType="dinner" />
                <MealTypeBadge mealType="snack" />
                <PriceBadge price={24.99} />
                <PriceBadge price={8.50} />
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card>
              <CardHeader>
                <CardTitle>Loading Spinners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
                <div className="flex items-center space-x-2">
                  <span>Inline:</span>
                  <InlineSpinner />
                </div>
                <LoadingSpinner size="md" text="Loading meals..." showText />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Loader</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressLoader 
                  progress={progress} 
                  label="Uploading photo..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <MealCardSkeleton />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Complex Skeletons</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Meal List Skeleton</h4>
                <MealListSkeleton count={3} />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Form Skeleton</h4>
                <FormSkeleton />
              </div>
            </div>
          </div>
        </section>

        {/* Error States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Error States</h2>
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ErrorMessage
                title="Validation Error"
                message="Please check your input and try again."
                variant="error"
                action={{
                  label: 'Retry',
                  onClick: () => console.log('Retry clicked'),
                }}
              />

              <ErrorMessage
                title="Warning"
                message="Your session will expire in 5 minutes."
                variant="warning"
                action={{
                  label: 'Extend Session',
                  onClick: () => console.log('Extend clicked'),
                }}
              />
            </div>

            <ValidationError 
              errors={[
                'Meal title is required',
                'Rating must be between 1 and 10',
                'Please select a meal type',
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NetworkError 
                isOnline={false}
                onRetry={() => console.log('Retry clicked')}
              />
              
              <EmptyMeals 
                onAddMeal={() => console.log('Add meal clicked')}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EmptySearch 
                query="pizza"
                onClearSearch={() => console.log('Clear search clicked')}
              />
              
              <CameraError 
                onOpenSettings={() => console.log('Open settings clicked')}
                onTryAgain={() => console.log('Try again clicked')}
              />
            </div>
          </div>
        </section>

        {/* Theme Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Theme Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="w-full h-16 bg-background border border-border rounded"></div>
              <p className="text-xs text-center">Background</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-foreground rounded"></div>
              <p className="text-xs text-center">Foreground</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-primary rounded"></div>
              <p className="text-xs text-center">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-secondary rounded"></div>
              <p className="text-xs text-center">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-muted rounded"></div>
              <p className="text-xs text-center">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-accent rounded"></div>
              <p className="text-xs text-center">Accent</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}