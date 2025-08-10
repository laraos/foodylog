/**
 * FoodyLog Utility Functions
 * 
 * Core utility functions for the FoodyLog application including
 * shadcn/ui class merging and FoodyLog-specific helpers.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * This is the standard shadcn/ui utility for merging Tailwind classes
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the appropriate color class for a meal rating
 * Used throughout the app for consistent rating color display
 * 
 * @param rating - Rating value (1-10)
 * @returns Tailwind color class
 */
export function getRatingColor(rating: number): string {
  if (rating >= 9) {return 'text-rating-excellent';}
  if (rating >= 7) {return 'text-rating-great';}
  if (rating >= 5) {return 'text-rating-good';}
  if (rating >= 3) {return 'text-rating-poor';}
  return 'text-rating-bad';
}

/**
 * Formats a timestamp into a human-readable "time ago" string
 * Used for displaying meal dates in a user-friendly format
 * 
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string (e.g., "2 hours ago", "3 days ago")
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {return `${months} month${months > 1 ? 's' : ''} ago`;}
  if (weeks > 0) {return `${weeks} week${weeks > 1 ? 's' : ''} ago`;}
  if (days > 0) {return `${days} day${days > 1 ? 's' : ''} ago`;}
  if (hours > 0) {return `${hours} hour${hours > 1 ? 's' : ''} ago`;}
  if (minutes > 0) {return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;}
  return 'Just now';
}

/**
 * Formats a price value for display
 * Handles different currencies and formats consistently
 * 
 * @param price - Price value
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Truncates text to a specified length with ellipsis
 * Used for meal titles and descriptions in cards
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {return text;}
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Validates if a string is a valid URL
 * Used for photo URLs and external links
 * 
 * @param url - URL string to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates a random ID for temporary use
 * Used for optimistic updates and temporary meal IDs
 * 
 * @returns Random ID string
 */
export function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Debounces a function call
 * Used for search input and other performance-sensitive operations
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (..._args: any[]) => any>(
  func: T,
  wait: number,
): (..._args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Checks if the current environment is mobile
 * Used for conditional mobile-specific features
 * 
 * @returns Boolean indicating if running on mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {return false;}
  return window.innerWidth < 768;
}

/**
 * Gets the appropriate meal type based on current time
 * Used as smart default when adding new meals
 * 
 * @returns Meal type string
 */
export function getDefaultMealType(): 'breakfast' | 'lunch' | 'dinner' | 'snack' {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 11) {return 'breakfast';}
  if (hour >= 11 && hour < 16) {return 'lunch';}
  if (hour >= 16 && hour < 22) {return 'dinner';}
  return 'snack';
}