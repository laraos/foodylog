/**
 * Meal Management Functions
 * 
 * Core CRUD operations for meal logging in FoodyLog.
 * Handles meal creation, reading, updating, and deletion with
 * proper authentication, validation, and freemium model constraints.
 * 
 * Key Features:
 * - Authenticated meal operations
 * - Freemium model enforcement (photo limits, tag limits)
 * - Real-time subscriptions for meal updates
 * - Search and filtering capabilities
 * - User statistics updates
 */

import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

/**
 * Helper function to get authenticated user from Convex context
 * For now, we'll use a mock user for testing purposes
 */
async function requireAuth(_ctx: any) {
  // TODO: Implement proper Clerk authentication
  // For testing purposes, return a mock user
  return {
    subject: 'test-user-123',
    email: 'test@foodylog.com',
    given_name: 'Test',
    family_name: 'User',
  };
}

/**
 * Create a new meal entry
 * 
 * Creates a meal with validation and freemium model constraints.
 * Free users: max 3 tags, 1 photo per meal
 * Premium users: unlimited tags, up to 5 photos per meal
 */
export const createMeal = mutation({
  args: {
    title: v.string(),
    rating: v.number(), // 1-10 scale
    mealType: v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    ),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    tags: v.array(v.string()),
    location: v.optional(v.object({
      name: v.string(),
      address: v.optional(v.string()),
      coordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number(),
      })),
      placeId: v.optional(v.string()),
    })),
    mealDate: v.optional(v.number()), // timestamp, defaults to now
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database to check subscription tier
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    // Validate input
    if (args.title.length > 100) {
      throw new Error('Meal title must be 100 characters or less');
    }

    if (args.rating < 1 || args.rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }

    if (args.description && args.description.length > 500) {
      throw new Error('Description must be 500 characters or less');
    }

    // Enforce freemium model constraints
    const isFreeTier = user.subscription?.tier === 'free' || !user.subscription?.tier;
    
    if (isFreeTier && args.tags.length > 3) {
      throw new Error('Free tier limited to 3 tags per meal. Upgrade to premium for unlimited tags.');
    }

    const now = Date.now();
    const mealDate = args.mealDate || now;

    // Create meal entry
    const mealId = await ctx.db.insert('meals', {
      userId: user._id,
      title: args.title.trim(),
      rating: args.rating,
      mealType: args.mealType,
      description: args.description?.trim(),
      price: args.price,
      currency: args.currency || user.preferences?.currency || 'USD',
      tags: args.tags.map(tag => tag.trim().toLowerCase()),
      location: args.location,
      photos: [], // Photos will be added separately
      
      // Social features (default values)
      isPublic: false,
      allowComments: false,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      
      // Sync status
      syncStatus: 'synced',
      lastSyncedAt: now,
      
      // Timestamps
      mealDate: mealDate,
      createdAt: now,
      updatedAt: now,
    });

    // Update user statistics
    const currentStats = user.stats || {
      totalMeals: 0,
      averageRating: 0,
      totalSpent: 0,
    };

    const newTotalMeals = currentStats.totalMeals + 1;
    const newTotalSpent = currentStats.totalSpent + (args.price || 0);
    const newAverageRating = ((currentStats.averageRating * currentStats.totalMeals) + args.rating) / newTotalMeals;

    await ctx.db.patch(user._id, {
      stats: {
        ...currentStats,
        totalMeals: newTotalMeals,
        averageRating: Math.round(newAverageRating * 100) / 100, // Round to 2 decimal places
        totalSpent: newTotalSpent,
        lastMealDate: mealDate,
        favoriteRestaurant: args.location?.name || currentStats.favoriteRestaurant,
      },
      updatedAt: now,
    });

    console.log(`Created meal "${args.title}" for user ${user.email}`);
    
    return mealId;
  },
});
/**
 * Ge
t meals for the current user
 * 
 * Returns paginated list of meals for the authenticated user.
 * Supports filtering by meal type, date range, and search.
 */
export const getUserMeals = query({
  args: {
    limit: v.optional(v.number()), // Default 20
    cursor: v.optional(v.string()), // For pagination
    mealType: v.optional(v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    )),
    startDate: v.optional(v.number()), // timestamp
    endDate: v.optional(v.number()), // timestamp
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Build query
    let query = ctx.db
      .query('meals')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id));

    // Apply filters
    if (args.mealType) {
      query = ctx.db
        .query('meals')
        .withIndex('by_user_type', (q) => 
          q.eq('userId', user._id).eq('mealType', args.mealType!)
        );
    }

    // Get meals (ordered by meal date, newest first)
    const meals = await query
      .order('desc')
      .take(args.limit || 20);

    // Filter by date range if specified
    let filteredMeals = meals;
    if (args.startDate || args.endDate) {
      filteredMeals = meals.filter(meal => {
        if (args.startDate && meal.mealDate < args.startDate) return false;
        if (args.endDate && meal.mealDate > args.endDate) return false;
        return true;
      });
    }

    console.log(`Retrieved ${filteredMeals.length} meals for user ${user.email}`);
    
    return filteredMeals;
  },
});

/**
 * Get a specific meal by ID
 * 
 * Returns detailed meal information if the user owns the meal.
 */
export const getMeal = query({
  args: {
    mealId: v.id('meals'),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Get meal
    const meal = await ctx.db.get(args.mealId);

    if (!meal) {
      throw new Error('Meal not found');
    }

    // Check ownership
    if (meal.userId !== user._id) {
      throw new Error('Access denied: You can only view your own meals');
    }

    return meal;
  },
});

/**
 * Update an existing meal
 * 
 * Updates meal information with validation and ownership checks.
 */
export const updateMeal = mutation({
  args: {
    mealId: v.id('meals'),
    title: v.optional(v.string()),
    rating: v.optional(v.number()),
    mealType: v.optional(v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    )),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    location: v.optional(v.object({
      name: v.string(),
      address: v.optional(v.string()),
      coordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number(),
      })),
      placeId: v.optional(v.string()),
    })),
    mealDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Get existing meal
    const meal = await ctx.db.get(args.mealId);

    if (!meal) {
      throw new Error('Meal not found');
    }

    // Check ownership
    if (meal.userId !== user._id) {
      throw new Error('Access denied: You can only update your own meals');
    }

    // Validate updates
    if (args.title && args.title.length > 100) {
      throw new Error('Meal title must be 100 characters or less');
    }

    if (args.rating && (args.rating < 1 || args.rating > 10)) {
      throw new Error('Rating must be between 1 and 10');
    }

    if (args.description && args.description.length > 500) {
      throw new Error('Description must be 500 characters or less');
    }

    // Enforce freemium model constraints for tags
    const isFreeTier = user.subscription?.tier === 'free' || !user.subscription?.tier;
    
    if (args.tags && isFreeTier && args.tags.length > 3) {
      throw new Error('Free tier limited to 3 tags per meal. Upgrade to premium for unlimited tags.');
    }

    // Build update object
    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updates.title = args.title.trim();
    if (args.rating !== undefined) updates.rating = args.rating;
    if (args.mealType !== undefined) updates.mealType = args.mealType;
    if (args.description !== undefined) updates.description = args.description?.trim();
    if (args.price !== undefined) updates.price = args.price;
    if (args.currency !== undefined) updates.currency = args.currency;
    if (args.tags !== undefined) updates.tags = args.tags.map(tag => tag.trim().toLowerCase());
    if (args.location !== undefined) updates.location = args.location;
    if (args.mealDate !== undefined) updates.mealDate = args.mealDate;

    // Update meal
    await ctx.db.patch(args.mealId, updates);

    console.log(`Updated meal ${args.mealId} for user ${user.email}`);
    
    return args.mealId;
  },
});

/**
 * Delete a meal
 * 
 * Deletes a meal and updates user statistics.
 */
export const deleteMeal = mutation({
  args: {
    mealId: v.id('meals'),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Get meal to delete
    const meal = await ctx.db.get(args.mealId);

    if (!meal) {
      throw new Error('Meal not found');
    }

    // Check ownership
    if (meal.userId !== user._id) {
      throw new Error('Access denied: You can only delete your own meals');
    }

    // Delete associated photos from storage
    // TODO: Implement photo deletion from Convex file storage
    // for (const photo of meal.photos) {
    //   await ctx.storage.delete(photo.storageId);
    // }

    // Delete meal
    await ctx.db.delete(args.mealId);

    // Update user statistics
    const currentStats = user.stats || {
      totalMeals: 0,
      averageRating: 0,
      totalSpent: 0,
    };

    if (currentStats.totalMeals > 0) {
      const newTotalMeals = currentStats.totalMeals - 1;
      const newTotalSpent = Math.max(0, currentStats.totalSpent - (meal.price || 0));
      
      // Recalculate average rating (simplified - in production, we'd need to recalculate from all remaining meals)
      const newAverageRating = newTotalMeals > 0 ? currentStats.averageRating : 0;

      await ctx.db.patch(user._id, {
        stats: {
          ...currentStats,
          totalMeals: newTotalMeals,
          averageRating: newAverageRating,
          totalSpent: newTotalSpent,
        },
        updatedAt: Date.now(),
      });
    }

    console.log(`Deleted meal ${args.mealId} for user ${user.email}`);
    
    return { success: true };
  },
});

/**
 * Search meals by title and tags
 * 
 * Full-text search across meal titles with tag filtering.
 */
export const searchMeals = query({
  args: {
    searchTerm: v.string(),
    mealType: v.optional(v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    )),
    tags: v.optional(v.array(v.string())),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await requireAuth(ctx);

    // Get user from database
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Use search index for full-text search
    const searchResults = await ctx.db
      .query('meals')
      .withSearchIndex('search_meals', (q) =>
        q.search('title', args.searchTerm)
         .eq('userId', user._id)
      )
      .take(args.limit || 20);

    // Apply additional filters
    let filteredResults = searchResults;

    if (args.mealType) {
      filteredResults = filteredResults.filter(meal => meal.mealType === args.mealType);
    }

    if (args.tags && args.tags.length > 0) {
      filteredResults = filteredResults.filter(meal =>
        args.tags!.some(tag => meal.tags.includes(tag.toLowerCase()))
      );
    }

    console.log(`Search "${args.searchTerm}" returned ${filteredResults.length} results for user ${user.email}`);
    
    return filteredResults;
  },
});