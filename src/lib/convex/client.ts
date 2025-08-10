/**
 * Convex Client Configuration
 * 
 * Sets up the Convex client for FoodyLog with proper TypeScript support.
 * This client handles real-time data synchronization, authentication,
 * and offline-first functionality.
 * 
 * Key Features:
 * - Real-time subscriptions for live data updates
 * - Optimistic updates for better UX
 * - Offline queue management
 * - TypeScript integration with generated types
 */

import { ConvexReactClient } from 'convex/react';

// Get Convex URL from environment variables
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error(
    'Missing VITE_CONVEX_URL environment variable. ' +
    'Please check your .env file and ensure Convex is properly configured.',
  );
}

/**
 * Convex client instance
 * 
 * This client handles all communication with the Convex backend.
 * It's configured to work with our authentication system and
 * provides real-time data synchronization.
 */
export const convex = new ConvexReactClient(CONVEX_URL, {
  // Enable verbose logging in development
  verbose: import.meta.env.DEV,
  
  // Configure for offline-first behavior
  // These settings help with mobile connectivity issues
  unsavedChangesWarning: false, // We handle this in our UI
  
  // WebSocket configuration for real-time updates
  webSocketConstructor: typeof WebSocket !== 'undefined' ? WebSocket : undefined,
});

/**
 * Helper function to check if Convex is connected
 * Useful for showing connection status in the UI
 */
export const isConvexConnected = () => {
  return convex.connectionState().isWebSocketConnected;
};

/**
 * Helper function to get connection state
 * Returns detailed connection information for debugging
 */
export const getConvexConnectionState = () => {
  return convex.connectionState();
};

/**
 * Type-safe wrapper for Convex environment variables
 * Ensures all required environment variables are present
 */
export const convexConfig = {
  url: CONVEX_URL,
  isDevelopment: import.meta.env.DEV,
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
} as const;

export default convex;