/**
 * FoodyLog UI Components Index
 * 
 * Barrel export file for all UI components. This allows for clean imports
 * throughout the application and better tree-shaking.
 * 
 * Usage:
 * import { Button, Card, Input } from '~/components/ui';
 */

// Core shadcn/ui components with FoodyLog enhancements
export { Button, buttonVariants } from './button';
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  StatsCard,
  PhotoCard,
  ActionCard,
  cardVariants,
} from './card';
export { 
  Input, 
  SearchInput, 
  PasswordInput, 
  NumberInput, 
  TextArea, 
  FormField, 
} from './input';
export { 
  Badge, 
  MealTagBadge, 
  RatingBadge, 
  MealTypeBadge, 
  PriceBadge, 
  badgeVariants, 
} from './badge';
export { Skeleton } from './skeleton';
export { Alert, AlertDescription, AlertTitle } from './alert';

// FoodyLog-specific loading components
export { 
  LoadingSpinner, 
  InlineSpinner, 
  ButtonSpinner, 
} from './LoadingSpinner';
export {
  MealCardSkeleton,
  MealListSkeleton,
  FormSkeleton,
  PageLoadingSpinner,
  InlineLoader,
  ButtonLoader,
  ProgressLoader,
  SearchLoader,
  PhotoUploadLoader,
} from './loading';

// FoodyLog-specific error components
export {
  ErrorMessage,
  NetworkError,
  EmptyMeals,
  EmptySearch,
  CameraError,
  FormError,
  ServerError,
  ValidationError,
} from './error';

// Additional UI components for user profile management
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from './select';
export { Separator } from './separator';