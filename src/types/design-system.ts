/**
 * FoodyLog Design System TypeScript Definitions
 * 
 * Comprehensive type definitions for all design system components,
 * patterns, and utilities. Ensures type safety and excellent
 * developer experience throughout the application.
 */

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

// =============================================================================
// Design Tokens
// =============================================================================

export type ColorToken = 
  | 'background' | 'foreground' | 'card' | 'card-foreground'
  | 'primary' | 'primary-foreground' | 'secondary' | 'secondary-foreground'
  | 'muted' | 'muted-foreground' | 'accent' | 'accent-foreground'
  | 'destructive' | 'destructive-foreground' | 'border' | 'input' | 'ring'
  | 'rating-excellent' | 'rating-great' | 'rating-good' | 'rating-poor' | 'rating-bad';

export type SpacingToken = 
  | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';

export type RadiusToken = 
  | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type BreakpointToken = 
  | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type AnimationDuration = 
  | '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';

// =============================================================================
// Base Component Props
// =============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// =============================================================================
// Button Component Types
// =============================================================================

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    InteractiveComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// =============================================================================
// Card Component Types
// =============================================================================

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps {
  variant?: 'default' | 'interactive' | 'elevated' | 'outlined';
  size?: 'default' | 'compact' | 'large';
  asButton?: boolean;
}

export interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface PhotoCardProps extends Omit<CardProps, 'children'> {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  overlay?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'photo';
}

export interface ActionCardProps extends Omit<CardProps, 'children'> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

// =============================================================================
// Input Component Types
// =============================================================================

export interface InputProps 
  extends React.ComponentProps<'input'>,
    BaseComponentProps {
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface SearchInputProps extends Omit<InputProps, 'icon' | 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {}

export interface NumberInputProps extends Omit<InputProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  currency?: boolean;
}

export interface TextAreaProps 
  extends React.ComponentProps<'textarea'>,
    BaseComponentProps {
  error?: string;
  success?: boolean;
}

export interface FormFieldProps extends BaseComponentProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  children: React.ReactNode;
}

// =============================================================================
// Badge Component Types
// =============================================================================

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'tag' | 'rating' | 'mealType' | 'price';
  size?: 'default' | 'sm' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
}

export interface MealTagBadgeProps extends Omit<BadgeProps, 'variant'> {
  tag: string;
}

export interface RatingBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  rating: number;
  maxRating?: number;
}

export interface MealTypeBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface PriceBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  price: number;
  currency?: string;
}

// =============================================================================
// Toast Component Types
// =============================================================================

export interface ToastProps 
  extends React.ComponentPropsWithoutRef<'div'>,
    BaseComponentProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

export type ToastActionElement = React.ReactElement<any>;

// =============================================================================
// Skeleton Component Types
// =============================================================================

export interface SkeletonProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps {}

export interface MealCardSkeletonProps extends BaseComponentProps {}

export interface MealFormSkeletonProps extends BaseComponentProps {}

export interface StatsCardSkeletonProps extends BaseComponentProps {}

export interface SearchResultsSkeletonProps extends BaseComponentProps {
  count?: number;
}

export interface PhotoGridSkeletonProps extends BaseComponentProps {
  count?: number;
}

// =============================================================================
// Layout Component Types
// =============================================================================

export interface AppLayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}

export interface HeaderProps extends BaseComponentProps {}

export interface NavigationProps extends BaseComponentProps {}

export interface PageTransitionProps extends BaseComponentProps {
  children: React.ReactNode;
}

// =============================================================================
// FoodyLog-Specific Component Types
// =============================================================================

export interface Meal {
  id: string;
  title: string;
  rating: number;
  dateEaten: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  locationText?: string;
  tags: string[];
  primaryPhoto?: string;
  price?: number;
  notes?: string;
  isPublic?: boolean;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface MealCardProps extends BaseComponentProps {
  meal: Meal;
  onTap?: (mealId: string) => void;
  showPrice?: boolean;
  compact?: boolean;
  variant?: 'default' | 'interactive' | 'elevated';
}

export interface PhotoCaptureProps extends BaseComponentProps {
  onPhotoCapture: (photo: string) => void;
  onPhotoSelect: (photo: string) => void;
  currentPhoto?: string;
  maxSize?: number; // in MB
  quality?: number; // 0-100
  maxPhotos?: number; // Freemium: 1 for free, 5 for premium
  placeholder?: string;
}

export interface RatingInputProps extends BaseComponentProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number; // default 10
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  disabled?: boolean;
}

export interface TagInputProps extends BaseComponentProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
}

export interface LocationInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange: (location: string, coordinates?: { lat: number; lng: number }) => void;
  enableGeolocation?: boolean;
  placeholder?: string;
}

// =============================================================================
// Loading and Error Component Types
// =============================================================================

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary';
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  children: React.ReactNode;
}

export interface EmptyStateProps extends BaseComponentProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

// =============================================================================
// Theme and Accessibility Types
// =============================================================================

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg';
  fontScale: 'sm' | 'md' | 'lg';
}

export interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  focusVisible: boolean;
  screenReaderOptimized: boolean;
}

export interface TouchTargetConfig {
  minimum: number; // 44px minimum for iOS
  recommended: number; // 48dp recommended for Android
  spacing: number; // 8px minimum spacing between targets
}

// =============================================================================
// Responsive and Mobile Types
// =============================================================================

export interface ResponsiveConfig {
  mobileFirst: boolean;
  touchOptimized: boolean;
  safeAreaHandling: boolean;
  oneHandedOperation: boolean;
}

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isCapacitor: boolean;
  platform: 'ios' | 'android' | 'web';
  screenSize: BreakpointToken;
}

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// =============================================================================
// Animation and Interaction Types
// =============================================================================

export interface AnimationConfig {
  duration: AnimationDuration;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  respectReducedMotion: boolean;
}

export interface TouchGesture {
  isLeftSwipe: boolean;
  isRightSwipe: boolean;
  isUpSwipe: boolean;
  isDownSwipe: boolean;
}

export interface HapticFeedback {
  lightImpact: () => Promise<void>;
  mediumImpact: () => Promise<void>;
  heavyImpact: () => Promise<void>;
  selectionChanged: () => Promise<void>;
}

// =============================================================================
// Form and Validation Types
// =============================================================================

export interface ValidationState {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FormFieldValidation {
  validation?: ValidationState;
  showValidation?: 'always' | 'on-blur' | 'on-submit';
  validationDelay?: number;
}

export interface MealFormData {
  title: string;
  rating: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dateEaten: number;
  locationText?: string;
  coordinates?: { lat: number; lng: number };
  tags: string[];
  price?: number;
  notes?: string;
  photos: string[];
}

// =============================================================================
// Search and Filter Types
// =============================================================================

export interface SearchFilters {
  query: string;
  mealType: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack';
  minRating: number;
  maxRating: number;
  dateRange: {
    start: number;
    end: number;
  };
  tags: string[];
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface SortOptions {
  field: 'dateEaten' | 'rating' | 'title' | 'price';
  direction: 'asc' | 'desc';
}

// =============================================================================
// Analytics and Statistics Types
// =============================================================================

export interface MealStatistics {
  totalMeals: number;
  averageRating: number;
  totalSpent: number;
  favoriteRestaurant?: string;
  mostUsedTags: string[];
  mealTypeDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
  ratingDistribution: number[];
  weeklyTrend: {
    week: string;
    count: number;
    averageRating: number;
    totalSpent: number;
  }[];
}

// =============================================================================
// Utility Types
// =============================================================================

export type ComponentVariant<T> = T extends { variants: infer V } 
  ? V extends Record<string, any> 
    ? keyof V 
    : never 
  : never;

export type ComponentSize<T> = T extends { size: infer S } 
  ? S extends Record<string, any> 
    ? keyof S 
    : never 
  : never;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// =============================================================================
// Event Handler Types
// =============================================================================

export type MealEventHandler = (meal: Meal) => void;
export type MealIdEventHandler = (mealId: string) => void;
export type PhotoEventHandler = (photo: string) => void;
export type RatingEventHandler = (rating: number) => void;
export type TagsEventHandler = (tags: string[]) => void;
export type LocationEventHandler = (location: string, coordinates?: { lat: number; lng: number }) => void;

// =============================================================================
// Component Ref Types
// =============================================================================

export type ButtonRef = React.ElementRef<'button'>;
export type InputRef = React.ElementRef<'input'>;
export type TextAreaRef = React.ElementRef<'textarea'>;
export type DivRef = React.ElementRef<'div'>;

// =============================================================================
// Polymorphic Component Types
// =============================================================================

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & {
  as?: C;
}> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props>;

export type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

// =============================================================================
// Export All Types
// =============================================================================

export type {
  // Re-export common React types for convenience
  React,
  VariantProps,
};

// Default export for the main design system types
export default {
  ColorToken,
  SpacingToken,
  RadiusToken,
  BreakpointToken,
  AnimationDuration,
  ButtonProps,
  CardProps,
  InputProps,
  BadgeProps,
  ToastProps,
  SkeletonProps,
  MealCardProps,
  PhotoCaptureProps,
  RatingInputProps,
  TagInputProps,
  Meal,
  MealFormData,
  SearchFilters,
  SortOptions,
  MealStatistics,
  ThemeConfig,
  AccessibilityConfig,
  DeviceInfo,
  AnimationConfig,
  TouchGesture,
  HapticFeedback,
} as const;