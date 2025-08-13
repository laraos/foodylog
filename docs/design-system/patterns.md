# Design Patterns

Common interface patterns and usage guidelines for FoodyLog meal logging experiences. These patterns ensure consistency and optimal user experience across the application.

## Meal Logging Patterns

### 1. Quick Meal Entry

The most common user flow - adding a meal in under 30 seconds.

```tsx
// Quick entry form pattern
<Card className="p-6">
  <form onSubmit={handleQuickSave} className="space-y-4">
    {/* Photo capture - primary action */}
    <PhotoCapture
      onPhotoCapture={setPhoto}
      placeholder="Tap to add photo"
      className="h-48"
    />
    
    {/* Essential fields only */}
    <Input
      placeholder="What did you eat?"
      value={title}
      onChange={setTitle}
      maxLength={100}
      required
    />
    
    <div className="flex space-x-4">
      <RatingInput
        value={rating}
        onChange={setRating}
        size="lg"
        className="flex-1"
      />
      <Button type="submit" size="lg" className="px-8">
        Save
      </Button>
    </div>
    
    {/* Optional fields collapsed by default */}
    <Collapsible>
      <CollapsibleTrigger className="text-sm text-muted-foreground">
        Add more details
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <Input placeholder="Location" />
        <TagInput placeholder="Add tags" />
        <NumberInput placeholder="Price" currency />
      </CollapsibleContent>
    </Collapsible>
  </form>
</Card>
```

### 2. Meal Card Display

Consistent meal representation across lists, grids, and detail views.

```tsx
// Standard meal card pattern
<MealCard
  meal={meal}
  variant="interactive"
  onTap={(id) => navigate(`/meals/${id}`)}
  className="mb-4"
>
  {/* Photo with overlay rating */}
  <div className="relative">
    <img 
      src={meal.photo} 
      alt={meal.title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="absolute top-2 right-2">
      <Badge variant="rating" className="bg-black/50 text-white">
        ★ {meal.rating}
      </Badge>
    </div>
  </div>
  
  {/* Content with consistent spacing */}
  <CardContent className="p-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-lg truncate flex-1">
        {meal.title}
      </h3>
      {meal.price && (
        <span className="text-sm font-medium text-green-600 ml-2">
          {formatPrice(meal.price)}
        </span>
      )}
    </div>
    
    {/* Metadata row */}
    <div className="flex items-center text-sm text-muted-foreground mb-3">
      <MealTypeBadge mealType={meal.mealType} />
      <span className="mx-2">•</span>
      <span>{formatTimeAgo(meal.dateEaten)}</span>
      {meal.location && (
        <>
          <span className="mx-2">•</span>
          <span className="truncate">{meal.location}</span>
        </>
      )}
    </div>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-1">
      {meal.tags.slice(0, 3).map(tag => (
        <MealTagBadge key={tag} tag={tag} />
      ))}
      {meal.tags.length > 3 && (
        <Badge variant="outline" className="text-xs">
          +{meal.tags.length - 3}
        </Badge>
      )}
    </div>
  </CardContent>
</MealCard>
```

### 3. Search and Filter

Comprehensive search interface with filters and sorting.

```tsx
// Search pattern with filters
<div className="space-y-4">
  {/* Search bar */}
  <SearchInput
    placeholder="Search meals, restaurants, tags..."
    value={searchQuery}
    onChange={setSearchQuery}
    onClear={() => setSearchQuery('')}
    className="w-full"
  />
  
  {/* Filter chips */}
  <div className="flex flex-wrap gap-2">
    <FilterChip
      active={filters.mealType === 'all'}
      onClick={() => setFilters({...filters, mealType: 'all'})}
    >
      All Meals
    </FilterChip>
    <FilterChip
      active={filters.mealType === 'breakfast'}
      onClick={() => setFilters({...filters, mealType: 'breakfast'})}
    >
      🥞 Breakfast
    </FilterChip>
    <FilterChip
      active={filters.mealType === 'lunch'}
      onClick={() => setFilters({...filters, mealType: 'lunch'})}
    >
      🥗 Lunch
    </FilterChip>
    <FilterChip
      active={filters.mealType === 'dinner'}
      onClick={() => setFilters({...filters, mealType: 'dinner'})}
    >
      🍽️ Dinner
    </FilterChip>
    
    {/* Rating filter */}
    <Popover>
      <PopoverTrigger asChild>
        <FilterChip active={filters.minRating > 0}>
          ⭐ Rating {filters.minRating > 0 && `${filters.minRating}+`}
        </FilterChip>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-medium">Minimum Rating</h4>
          <RatingInput
            value={filters.minRating}
            onChange={(rating) => setFilters({...filters, minRating: rating})}
            showNumber
          />
        </div>
      </PopoverContent>
    </Popover>
    
    {/* Date range filter */}
    <DateRangeFilter
      value={filters.dateRange}
      onChange={(range) => setFilters({...filters, dateRange: range})}
    />
  </div>
  
  {/* Sort options */}
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">
      {filteredMeals.length} meals found
    </span>
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Most Recent</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
        <SelectItem value="price">Price: Low to High</SelectItem>
        <SelectItem value="alphabetical">A to Z</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
```

## Navigation Patterns

### 1. Mobile-First Bottom Navigation

Primary navigation optimized for thumb interaction.

```tsx
// Bottom navigation pattern
<Navigation className="fixed bottom-0 left-0 right-0 z-50">
  <NavigationItem 
    href="/" 
    icon={Home} 
    label="Home"
    active={pathname === '/'}
  />
  <NavigationItem 
    href="/search" 
    icon={Search} 
    label="Search"
    active={pathname.startsWith('/search')}
  />
  <NavigationItem 
    href="/add" 
    icon={Plus} 
    label="Add Meal"
    variant="primary"
    active={pathname === '/add'}
  />
  <NavigationItem 
    href="/analytics" 
    icon={BarChart3} 
    label="Analytics"
    active={pathname.startsWith('/analytics')}
  />
  <NavigationItem 
    href="/settings" 
    icon={Settings} 
    label="Settings"
    active={pathname.startsWith('/settings')}
  />
</Navigation>
```

### 2. Contextual Actions

Action buttons that appear based on context and user permissions.

```tsx
// Contextual action pattern
<Card className="relative group">
  <MealContent meal={meal} />
  
  {/* Actions appear on hover/focus */}
  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
    <div className="flex space-x-1">
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
        onClick={() => handleEdit(meal.id)}
        aria-label="Edit meal"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
        onClick={() => handleShare(meal.id)}
        aria-label="Share meal"
      >
        <Share className="w-4 h-4" />
      </Button>
    </div>
  </div>
</Card>
```

### 3. Breadcrumb Navigation

Clear navigation hierarchy for complex flows.

```tsx
// Breadcrumb pattern
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center space-x-2 text-sm">
    <li>
      <Link to="/" className="text-muted-foreground hover:text-foreground">
        Home
      </Link>
    </li>
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
    <li>
      <Link to="/meals" className="text-muted-foreground hover:text-foreground">
        Meals
      </Link>
    </li>
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
    <li className="text-foreground font-medium" aria-current="page">
      {meal.title}
    </li>
  </ol>
</nav>
```

## Form Patterns

### 1. Progressive Disclosure

Reveal form fields progressively to reduce cognitive load.

```tsx
// Progressive form pattern
<form className="space-y-6">
  {/* Always visible - essential fields */}
  <div className="space-y-4">
    <FormField label="Meal Title" required>
      <Input placeholder="What did you eat?" />
    </FormField>
    
    <FormField label="Rating" required>
      <RatingInput max={10} />
    </FormField>
  </div>
  
  {/* Conditional fields based on user input */}
  {showLocationField && (
    <FormField label="Location">
      <LocationInput placeholder="Where did you eat?" />
    </FormField>
  )}
  
  {/* Expandable sections */}
  <Accordion type="single" collapsible>
    <AccordionItem value="details">
      <AccordionTrigger>Additional Details</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <FormField label="Price">
          <NumberInput currency placeholder="0.00" />
        </FormField>
        <FormField label="Tags">
          <TagInput placeholder="Add tags" />
        </FormField>
        <FormField label="Notes">
          <TextArea placeholder="Any additional notes..." />
        </FormField>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  
  {/* Action buttons */}
  <div className="flex space-x-3">
    <Button type="submit" size="lg" className="flex-1">
      Save Meal
    </Button>
    <Button type="button" variant="outline" onClick={handleCancel}>
      Cancel
    </Button>
  </div>
</form>
```

### 2. Inline Validation

Real-time feedback during form completion.

```tsx
// Inline validation pattern
<FormField 
  label="Meal Title" 
  required
  error={errors.title}
  success={!errors.title && title.length > 0}
>
  <Input
    value={title}
    onChange={(e) => {
      setTitle(e.target.value);
      validateTitle(e.target.value);
    }}
    placeholder="What did you eat?"
    maxLength={100}
    aria-describedby="title-help"
  />
  <div id="title-help" className="text-xs text-muted-foreground mt-1">
    {title.length}/100 characters
  </div>
</FormField>
```

### 3. Smart Defaults

Intelligent form pre-filling based on context and user patterns.

```tsx
// Smart defaults pattern
const getSmartDefaults = () => ({
  mealType: getDefaultMealType(), // Based on current time
  location: user.lastLocation,    // User's recent location
  tags: user.frequentTags.slice(0, 3), // Most used tags
  rating: user.averageRating || 7, // User's typical rating
});

<MealForm initialValues={getSmartDefaults()} />
```

## Loading and Error Patterns

### 1. Skeleton Loading

Content-aware loading states that match the final layout.

```tsx
// Skeleton loading pattern
{isLoading ? (
  <div className="space-y-4">
    {Array.from({ length: 3 }, (_, i) => (
      <MealCardSkeleton key={i} />
    ))}
  </div>
) : (
  <div className="space-y-4">
    {meals.map(meal => (
      <MealCard key={meal.id} meal={meal} />
    ))}
  </div>
)}
```

### 2. Progressive Loading

Load critical content first, then enhance with additional data.

```tsx
// Progressive loading pattern
<MealCard meal={meal}>
  {/* Always show basic info */}
  <MealBasicInfo meal={meal} />
  
  {/* Load additional data progressively */}
  <Suspense fallback={<Skeleton className="h-4 w-24" />}>
    <MealLocationInfo mealId={meal.id} />
  </Suspense>
  
  <Suspense fallback={<div className="flex space-x-1">
    <Skeleton className="h-6 w-16 rounded-full" />
    <Skeleton className="h-6 w-20 rounded-full" />
  </div>}>
    <MealTags mealId={meal.id} />
  </Suspense>
</MealCard>
```

### 3. Error Recovery

Graceful error handling with recovery options.

```tsx
// Error recovery pattern
<ErrorBoundary
  fallback={({ error, retry }) => (
    <Card className="p-6 text-center">
      <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="font-semibold mb-2">Unable to load meals</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message || 'Something went wrong while loading your meals.'}
      </p>
      <div className="flex justify-center space-x-2">
        <Button onClick={retry}>Try Again</Button>
        <Button variant="outline" onClick={() => navigate('/add')}>
          Add New Meal
        </Button>
      </div>
    </Card>
  )}
>
  <MealList />
</ErrorBoundary>
```

## Data Display Patterns

### 1. Empty States

Engaging empty states that guide users to their first action.

```tsx
// Empty state pattern
<EmptyState
  icon={<Camera className="w-16 h-16 text-muted-foreground" />}
  title="No meals yet"
  description="Start building your food journal by adding your first meal"
  action={
    <Button size="lg" onClick={() => navigate('/add')}>
      <Plus className="w-4 h-4 mr-2" />
      Add Your First Meal
    </Button>
  }
  className="py-12"
/>
```

### 2. Data Visualization

Consistent chart and graph patterns for analytics.

```tsx
// Analytics pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <StatsCard
    title="Meals This Week"
    value="12"
    description="3 more than last week"
    trend={{ value: 25, isPositive: true }}
    icon={<TrendingUp className="w-5 h-5" />}
  />
  
  <StatsCard
    title="Average Rating"
    value="8.2"
    description="Out of 10"
    icon={<Star className="w-5 h-5" />}
  />
  
  <StatsCard
    title="Total Spent"
    value="$247"
    description="This month"
    trend={{ value: -12, isPositive: false }}
    icon={<DollarSign className="w-5 h-5" />}
  />
</div>

<Card className="mt-6">
  <CardHeader>
    <CardTitle>Meal Types This Week</CardTitle>
  </CardHeader>
  <CardContent>
    <MealTypeChart data={weeklyMealTypes} />
  </CardContent>
</Card>
```

### 3. Infinite Scroll

Efficient loading of large meal lists.

```tsx
// Infinite scroll pattern
<div className="space-y-4">
  {meals.map((meal, index) => (
    <MealCard 
      key={meal.id} 
      meal={meal}
      ref={index === meals.length - 5 ? loadMoreRef : null}
    />
  ))}
  
  {isLoadingMore && (
    <div className="flex justify-center py-4">
      <LoadingSpinner />
    </div>
  )}
  
  {hasMore && !isLoadingMore && (
    <div className="flex justify-center py-4">
      <Button variant="outline" onClick={loadMore}>
        Load More Meals
      </Button>
    </div>
  )}
</div>
```

## Accessibility Patterns

### 1. Focus Management

Proper focus handling for dynamic content and modals.

```tsx
// Focus management pattern
const DialogExample = () => {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      firstFocusableRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current?.focus();
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>Delete Meal</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this meal? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button 
            ref={firstFocusableRef}
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            ref={lastFocusableRef}
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

### 2. Screen Reader Announcements

Dynamic content announcements for screen readers.

```tsx
// Screen reader announcement pattern
const [announcement, setAnnouncement] = useState('');

const handleMealSave = async () => {
  try {
    await saveMeal(mealData);
    setAnnouncement('Meal saved successfully');
    // Clear announcement after screen reader has time to read it
    setTimeout(() => setAnnouncement(''), 1000);
  } catch (error) {
    setAnnouncement('Error saving meal. Please try again.');
  }
};

return (
  <>
    {/* Screen reader only announcements */}
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
    
    <form onSubmit={handleMealSave}>
      {/* Form content */}
    </form>
  </>
);
```

These patterns provide a solid foundation for building consistent, accessible, and user-friendly interfaces throughout the FoodyLog application. They can be mixed and matched based on specific use cases while maintaining the overall design system integrity.