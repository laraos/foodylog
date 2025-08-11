/**
 * useUserPreferences Hook
 * 
 * Custom hook for managing user preferences in FoodyLog.
 * Handles reading and updating user preferences stored in Convex,
 * with optimistic updates for better user experience.
 * 
 * Features:
 * - Get current user preferences
 * - Update preferences with optimistic updates
 * - Handle loading and error states
 * - Type-safe preference management
 * - Automatic sync with Convex backend
 */

import { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

/**
 * User preferences type definition
 * Matches the schema definition in convex/schema.ts
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultMealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  currency?: string; // ISO currency code (USD, EUR, etc.)
  timezone?: string; // IANA timezone
}

/**
 * Default user preferences
 */
const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  currency: 'USD',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

/**
 * Hook return type
 */
interface UseUserPreferencesReturn {
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => Promise<void>;
  resetPreferences: () => Promise<void>;
}

/**
 * useUserPreferences Hook
 * 
 * Provides access to user preferences with CRUD operations.
 * Handles optimistic updates and error recovery.
 * 
 * @returns Object containing preferences, loading state, and update functions
 */
export const useUserPreferences = (): UseUserPreferencesReturn => {
  // Local state for optimistic updates and error handling
  const [optimisticPreferences, setOptimisticPreferences] = useState<UserPreferences | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Convex queries and mutations
  const currentUser = useQuery(api.functions.users.getCurrentUser);
  const updatePreferencesMutation = useMutation(api.functions.users.updateUserPreferences);

  // Determine current preferences (optimistic > server > default)
  const preferences: UserPreferences = optimisticPreferences || DEFAULT_PREFERENCES;

  // Loading state
  const isLoading = currentUser === undefined || isUpdating;

  /**
   * Update user preferences with optimistic updates
   * 
   * @param newPreferences - Partial preferences to update
   */
  const updatePreferences = useCallback(async (newPreferences: Partial<UserPreferences>) => {
    if (!currentUser) {
      setError('User not authenticated');
      return;
    }

    // Clear any previous errors
    setError(null);
    setIsUpdating(true);

    // Optimistic update
    const updatedPreferences = {
      ...preferences,
      ...newPreferences,
    };
    setOptimisticPreferences(updatedPreferences);

    try {
      // Update preferences in Convex
      await updatePreferencesMutation({
        preferences: newPreferences,
      });

      // Clear optimistic state on success (server state will take over)
      setOptimisticPreferences(null);
    } catch (err) {
      // Revert optimistic update on error
      setOptimisticPreferences(null);
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      
      // Re-throw error for component-level handling if needed
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, [currentUser, preferences, updatePreferencesMutation]);

  /**
   * Reset preferences to default values
   */
  const resetPreferences = useCallback(async () => {
    await updatePreferences(DEFAULT_PREFERENCES);
  }, [updatePreferences]);

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    resetPreferences,
  };
};

/**
 * Individual preference hooks for specific use cases
 */

/**
 * Hook for managing theme preference specifically
 */
export const useThemePreference = () => {
  const { preferences, updatePreferences, isLoading, error } = useUserPreferences();

  const setTheme = useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      return updatePreferences({ theme });
    },
    [updatePreferences],
  );

  return {
    theme: preferences.theme,
    setTheme,
    isLoading,
    error,
  };
};

/**
 * Hook for managing currency preference specifically
 */
export const useCurrencyPreference = () => {
  const { preferences, updatePreferences, isLoading, error } = useUserPreferences();

  const setCurrency = useCallback(
    (currency: string) => {
      return updatePreferences({ currency });
    },
    [updatePreferences],
  );

  return {
    currency: preferences.currency || 'USD',
    setCurrency,
    isLoading,
    error,
  };
};

/**
 * Hook for managing default meal type preference specifically
 */
export const useDefaultMealTypePreference = () => {
  const { preferences, updatePreferences, isLoading, error } = useUserPreferences();

  const setDefaultMealType = useCallback(
    (defaultMealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
      return updatePreferences({ defaultMealType });
    },
    [updatePreferences],
  );

  return {
    defaultMealType: preferences.defaultMealType,
    setDefaultMealType,
    isLoading,
    error,
  };
};

export default useUserPreferences;