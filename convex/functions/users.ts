/**
 * User Management Functions
 * 
 * Handles user creation, updates, and profile management for FoodyLog.
 * Integrates with Clerk authentication to sync user data between
 * Clerk (authentication) and Convex (application data).
 * 
 * Key Features:
 * - User profile synchronization with Clerk
 * - User preferences management
 * - Subscription tier handling (freemium model)
 * - User statistics tracking
 */

import { mutation, query } from 'convex/_generated/server';
import { v } from 'convex/values';

/**
 * Helper function to get authenticated user from Convex context
 */
async function requireAuth(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error('Authentication required');
  }

  return identity;
}

/**
 * Helper function to get optional authenticated user
 */
async function getOptionalAuth(ctx: any) {
  return await ctx.auth.getUserIdentity();
}

/**
 * Create or update user profile
 * 
 * This function is called when a user signs up or when their Clerk profile
 * is updated. It ensures our Convex database has the latest user information.
 */
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', args.clerkId))
      .first();

    const now = Date.now();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImageUrl: args.profileImageUrl,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      // Create new user with default values
      const userId = await ctx.db.insert('users', {
        clerkId: args.clerkId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImageUrl: args.profileImageUrl,

        // Default preferences
        preferences: {
          theme: 'system',
          currency: 'USD',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },

        // Default subscription (free tier)
        subscription: {
          tier: 'free',
        },

        // Initialize stats
        stats: {
          totalMeals: 0,
          averageRating: 0,
          totalSpent: 0,
        },

        createdAt: now,
        updatedAt: now,
      });

      return userId;
    }
  },
});

/**
 * Get current user profile
 * 
 * Returns the current authenticated user's profile information.
 */
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await getOptionalAuth(ctx);

    if (!identity) {
      return null;
    }

    // Extract user info from Clerk identity
    return {
      _id: identity.subject,
      clerkId: identity.subject,
      email: identity.email || 'user@example.com',
      firstName: identity.given_name || 'User',
      lastName: identity.family_name || '',
      profileImageUrl: identity.picture || '',
    };
  },
});

/**
 * Update user preferences
 * 
 * Allows users to update their app preferences like theme, currency, etc.
 */
export const updateUserPreferences = mutation({
  args: {
    preferences: v.object({
      theme: v.optional(v.union(v.literal('light'), v.literal('dark'), v.literal('system'))),
      defaultMealType: v.optional(v.union(
        v.literal('breakfast'),
        v.literal('lunch'),
        v.literal('dinner'),
        v.literal('snack'),
      )),
      currency: v.optional(v.string()),
      timezone: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Merge new preferences with existing ones
    const updatedPreferences = {
      theme: 'system' as const,
      ...user.preferences,
      ...args.preferences,
    };

    await ctx.db.patch(user._id, {
      preferences: updatedPreferences,
      updatedAt: Date.now(),
    });

    return updatedPreferences;
  },
});

/**
 * Update user statistics
 * 
 * Internal function to update user statistics when meals are added/updated.
 * This is called by other functions, not directly by the frontend.
 */
export const updateUserStats = mutation({
  args: {
    userId: v.id('users'),
    totalMeals: v.optional(v.number()),
    averageRating: v.optional(v.number()),
    totalSpent: v.optional(v.number()),
    favoriteRestaurant: v.optional(v.string()),
    lastMealDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Merge new stats with existing ones
    const updatedStats = {
      ...user.stats,
      totalMeals: args.totalMeals ?? user.stats?.totalMeals ?? 0,
      averageRating: args.averageRating ?? user.stats?.averageRating ?? 0,
      totalSpent: args.totalSpent ?? user.stats?.totalSpent ?? 0,
      favoriteRestaurant: args.favoriteRestaurant ?? user.stats?.favoriteRestaurant,
      lastMealDate: args.lastMealDate ?? user.stats?.lastMealDate,
    };

    await ctx.db.patch(args.userId, {
      stats: updatedStats,
      updatedAt: Date.now(),
    });

    return updatedStats;
  },
});

/**
 * Get user by Clerk ID
 * 
 * Helper function to get user by their Clerk ID.
 * Used internally by other functions.
 */
export const getUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', args.clerkId))
      .first();
  },
});

/**
 * Delete user account
 * 
 * Handles user account deletion. This will also need to clean up
 * all associated data (meals, photos, etc.).
 */
export const deleteUser = mutation({
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // TODO: In a complete implementation, we would also need to:
    // 1. Delete all user's meals
    // 2. Delete all user's photos from storage
    // 3. Delete all user's tags
    // 4. Delete all user's analytics cache
    // For now, we'll just delete the user record

    await ctx.db.delete(user._id);

    return { success: true };
  },
});