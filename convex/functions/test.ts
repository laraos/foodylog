/**
 * Test Functions for Convex Backend
 * 
 * These functions are used to verify that the Convex backend is working
 * correctly and that the connection between frontend and backend is
 * established properly.
 * 
 * These functions will be removed once the real meal functions are implemented.
 */

import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

/**
 * Test query function
 * 
 * Simple query that returns a greeting message with timestamp.
 * Used to verify that queries work and real-time subscriptions are active.
 * 
 * @returns Object with greeting message and current timestamp
 */
export const testQuery = query({
  args: {},
  handler: async (_ctx) => {
    console.log('Test query executed at:', new Date().toISOString());
    
    return {
      message: 'Hello from Convex! 🚀',
      timestamp: Date.now(),
      environment: process.env.NODE_ENV || 'development',
      deployment: 'FoodyLog Backend',
    };
  },
});

/**
 * Test mutation function
 * 
 * Simple mutation that accepts a message and returns it with metadata.
 * Used to verify that mutations work and data can be sent to the backend.
 * 
 * @param message - Test message to echo back
 * @returns Object with echoed message and metadata
 */
export const testMutation = mutation({
  args: {
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    console.log('Test mutation executed with message:', args.message);
    
    // In a real mutation, we would insert/update data here
    // For now, we just return the message with metadata
    
    return {
      echo: args.message,
      receivedAt: Date.now(),
      status: 'success',
      note: 'This is a test mutation - no data was actually stored',
    };
  },
});

/**
 * Test query with parameters
 * 
 * Query that accepts parameters to test argument validation and processing.
 * 
 * @param name - Name to include in greeting
 * @param count - Number to include in response
 * @returns Personalized greeting with count
 */
export const testQueryWithArgs = query({
  args: {
    name: v.optional(v.string()),
    count: v.optional(v.number()),
  },
  handler: async (_ctx, args) => {
    const name = args.name || 'Anonymous';
    const count = args.count || 1;
    
    console.log(`Test query with args - name: ${name}, count: ${count}`);
    
    return {
      greeting: `Hello ${name}! This is message #${count}`,
      timestamp: Date.now(),
      args: args,
    };
  },
});

/**
 * Connection test query
 * 
 * Returns system information to verify the backend is running correctly.
 * Useful for debugging connection issues.
 * 
 * @returns System information and connection details
 */
export const connectionTest = query({
  args: {},
  handler: async (_ctx) => {
    return {
      status: 'connected',
      backend: 'Convex',
      project: 'FoodyLog',
      timestamp: Date.now(),
      serverTime: new Date().toISOString(),
      message: 'Backend connection successful! ✅',
    };
  },
});