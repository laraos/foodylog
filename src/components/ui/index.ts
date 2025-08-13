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
export { Alert, AlertDescription, AlertTitle } from './alert';

// Toast notification system
export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  ToastWithIcon,
  toastVariants,
} from './toast';
export { Toaster } from './toaster';
export { 
  useToast,
  toast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showMealSavedToast,
  showPhotoUploadToast,
  showOfflineSyncToast,
  showNetworkErrorToast,
} from '../../hooks/use-toast';

// FoodyLog-specific loading components
export { 
  LoadingSpinner, 
  InlineSpinner, 
  ButtonSpinner,
  FoodyLogSpinner,
  CameraSpinner,
  PulseLoader,
} from './LoadingSpinner';
export {
  MealCardSkeleton,
  MealFormSkeleton,
  StatsCardSkeleton,
  SearchResultsSkeleton,
  PhotoGridSkeleton,
  PageLoadingSpinner,
  InlineLoader,
  ButtonLoader,
  ProgressLoader,
  CircularProgress,
  SearchLoader,
  PhotoUploadLoader,
  SyncLoader,
  TableLoader,
} from './loading';
export {
  Skeleton,
} from './skeleton';

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