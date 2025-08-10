/**
 * FoodyLog Database Schema
 * 
 * Defines the structure for all data tables in the FoodyLog application.
 * This schema supports the MVP requirements with room for future expansion.
 * 
 * Key Design Principles:
 * - User-centric: All data is associated with authenticated users
 * - Offline-first: Supports sync and conflict resolution
 * - Freemium model: Schema supports both free and premium features
 * - Performance: Indexed fields for common queries
 */

import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  /**
   * Users table - Stores user profile information
   * Synced with Clerk authentication system
   */
  users: defineTable({
    // Clerk user ID for authentication
    clerkId: v.string(),
    
    // Profile information
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImageUrl: v.optional(v.string()),
    
    // User preferences
    preferences: v.optional(v.object({
      theme: v.union(v.literal('light'), v.literal('dark'), v.literal('system')),
      defaultMealType: v.optional(v.union(
        v.literal('breakfast'),
        v.literal('lunch'), 
        v.literal('dinner'),
        v.literal('snack'),
      )),
      currency: v.optional(v.string()), // ISO currency code (USD, EUR, etc.)
      timezone: v.optional(v.string()), // IANA timezone
    })),
    
    // Subscription information (freemium model)
    subscription: v.optional(v.object({
      tier: v.union(v.literal('free'), v.literal('premium')),
      expiresAt: v.optional(v.number()), // timestamp
      stripeCustomerId: v.optional(v.string()),
    })),
    
    // User statistics (cached for performance)
    stats: v.optional(v.object({
      totalMeals: v.number(),
      averageRating: v.number(),
      totalSpent: v.number(),
      favoriteRestaurant: v.optional(v.string()),
      lastMealDate: v.optional(v.number()), // timestamp
    })),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_clerk_id', ['clerkId'])
    .index('by_email', ['email']),

  /**
   * Meals table - Core meal logging data
   * Supports both free (basic) and premium (extended) features
   */
  meals: defineTable({
    // User association
    userId: v.id('users'),
    
    // Basic meal information (available to all users)
    title: v.string(), // max 100 characters
    rating: v.number(), // 1-10 scale
    mealType: v.union(
      v.literal('breakfast'),
      v.literal('lunch'),
      v.literal('dinner'),
      v.literal('snack'),
    ),
    
    // Optional meal details
    description: v.optional(v.string()), // max 500 characters
    price: v.optional(v.number()), // in user's currency
    currency: v.optional(v.string()), // ISO currency code
    
    // Location information
    location: v.optional(v.object({
      name: v.string(), // Restaurant/place name
      address: v.optional(v.string()),
      coordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number(),
      })),
      placeId: v.optional(v.string()), // Google Places ID
    })),
    
    // Tags (free: max 3, premium: unlimited)
    tags: v.array(v.string()),
    
    // Photo references (free: 1 photo, premium: up to 5)
    photos: v.array(v.object({
      storageId: v.string(), // Convex file storage ID
      url: v.optional(v.string()), // Cached URL for performance
      caption: v.optional(v.string()),
      isPrimary: v.boolean(), // One primary photo per meal
    })),
    
    // Social features (Phase 3)
    isPublic: v.boolean(),
    allowComments: v.boolean(),
    likeCount: v.number(),
    commentCount: v.number(),
    shareCount: v.number(),
    
    // Offline sync support
    syncStatus: v.union(
      v.literal('synced'),
      v.literal('pending'),
      v.literal('conflict'),
    ),
    lastSyncedAt: v.optional(v.number()),
    
    // Timestamps
    mealDate: v.number(), // When the meal was eaten
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_date', ['userId', 'mealDate'])
    .index('by_user_type', ['userId', 'mealType'])
    .index('by_user_rating', ['userId', 'rating'])
    .index('by_sync_status', ['syncStatus'])
    .index('by_public', ['isPublic'])
    .searchIndex('search_meals', {
      searchField: 'title',
      filterFields: ['userId', 'mealType', 'tags'],
    }),

  /**
   * Meal photos table - Separate table for better performance
   * Links to Convex file storage for actual image data
   */
  mealPhotos: defineTable({
    mealId: v.id('meals'),
    userId: v.id('users'), // For direct user queries
    
    // File storage reference
    storageId: v.string(), // Convex file storage ID
    
    // Photo metadata
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(), // bytes
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    
    // Display properties
    caption: v.optional(v.string()),
    isPrimary: v.boolean(),
    order: v.number(), // Display order for multiple photos
    
    // Processing status
    processingStatus: v.union(
      v.literal('uploading'),
      v.literal('processing'),
      v.literal('ready'),
      v.literal('error'),
    ),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_meal', ['mealId'])
    .index('by_user', ['userId'])
    .index('by_meal_order', ['mealId', 'order'])
    .index('by_processing_status', ['processingStatus']),

  /**
   * User tags table - For tag autocomplete and analytics
   * Tracks user's personal tag usage patterns
   */
  userTags: defineTable({
    userId: v.id('users'),
    tag: v.string(),
    
    // Usage statistics
    usageCount: v.number(),
    lastUsedAt: v.number(),
    
    // Tag metadata
    color: v.optional(v.string()), // Hex color for UI
    category: v.optional(v.string()), // User-defined category
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_usage', ['userId', 'usageCount'])
    .index('by_user_recent', ['userId', 'lastUsedAt']),

  /**
   * Analytics cache table - Pre-computed analytics for performance
   * Reduces real-time calculation load for dashboard views
   */
  analyticsCache: defineTable({
    userId: v.id('users'),
    
    // Cache key and period
    cacheKey: v.string(), // e.g., "monthly_stats_2024_01"
    period: v.string(), // "daily", "weekly", "monthly", "yearly"
    startDate: v.number(), // timestamp
    endDate: v.number(), // timestamp
    
    // Cached data (flexible JSON structure)
    data: v.any(), // Analytics results
    
    // Cache metadata
    generatedAt: v.number(),
    expiresAt: v.number(),
    version: v.string(), // For cache invalidation
  })
    .index('by_user_key', ['userId', 'cacheKey'])
    .index('by_user_period', ['userId', 'period'])
    .index('by_expires', ['expiresAt']),
});