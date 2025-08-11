/**
 * Setup Functions for Development
 * 
 * These functions help set up test data and initialize the database
 * for development and testing purposes.
 */

import { mutation, query } from '../_generated/server';

/**
 * Create test user for development
 * 
 * Creates a test user that can be used for testing meal functions
 * when authentication is not fully set up.
 */
export const createTestUser = mutation({
  args: {},
  handler: async (ctx) => {
    const testClerkId = 'test-user-123';
    
    // Check if test user already exists
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', testClerkId))
      .first();

    if (existingUser) {
      console.log('Test user already exists:', existingUser._id);
      return existingUser._id;
    }

    // Create test user
    const now = Date.now();
    const userId = await ctx.db.insert('users', {
      clerkId: testClerkId,
      email: 'test@foodylog.com',
      firstName: 'Test',
      lastName: 'User',
      profileImageUrl: 'https://via.placeholder.com/150',

      // Default preferences
      preferences: {
        theme: 'system',
        currency: 'USD',
        timezone: 'America/New_York',
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

    console.log('Created test user:', userId);
    return userId;
  },
});

/**
 * Get test user
 * 
 * Returns the test user for development purposes.
 */
export const getTestUser = query({
  args: {},
  handler: async (ctx) => {
    const testUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', 'test-user-123'))
      .first();

    return testUser;
  },
});

/**
 * Reset test data
 * 
 * Clears all test data from the database.
 * Use with caution - this will delete all meals and user data!
 */
export const resetTestData = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all meals for test user
    const testUser = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', 'test-user-123'))
      .first();

    if (testUser) {
      const meals = await ctx.db
        .query('meals')
        .withIndex('by_user', (q) => q.eq('userId', testUser._id))
        .collect();

      for (const meal of meals) {
        await ctx.db.delete(meal._id);
      }

      // Reset user stats
      await ctx.db.patch(testUser._id, {
        stats: {
          totalMeals: 0,
          averageRating: 0,
          totalSpent: 0,
        },
        updatedAt: Date.now(),
      });

      console.log(`Reset test data: deleted ${meals.length} meals`);
    }

    return { success: true, deletedMeals: testUser ? (await ctx.db
      .query('meals')
      .withIndex('by_user', (q) => q.eq('userId', testUser._id))
      .collect()).length : 0 };
  },
});