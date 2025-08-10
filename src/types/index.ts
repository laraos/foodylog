/**
 * FoodyLog Type Definitions
 * 
 * Central location for TypeScript type definitions used throughout
 * the FoodyLog application. Organized by feature and domain.
 */

import { ReactNode } from 'react';

// Environment variables
export interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production'
  readonly VITE_CONVEX_URL: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_GOOGLE_PLACES_API_KEY?: string
  readonly VITE_SENTRY_DSN?: string
  readonly CAP_SERVER_URL?: string
}

// Global app state
export interface AppState {
  isOnline: boolean
  isLoading: boolean
  error: string | null
}

// PWA related types
export interface PWAUpdateInfo {
  isUpdateAvailable: boolean
  updateServiceWorker: () => void
}

// Error handling
export interface AppError {
  message: string
  code?: string
  stack?: string
  timestamp: Date
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// API response wrapper
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
  timestamp: string
}

// Pagination
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  hasMore: boolean
}

// Common UI component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Toast notification types
export interface ToastNotification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  actions?: Array<{
    text: string
    action: () => void
  }>
}

// Device and platform detection
export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  platform: 'ios' | 'android' | 'web'
  hasCamera: boolean
  supportsOffline: boolean
}