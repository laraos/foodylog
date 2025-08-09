/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production'
  readonly VITE_CONVEX_URL: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_GOOGLE_PLACES_API_KEY?: string
  readonly VITE_SENTRY_DSN?: string
  readonly CAP_SERVER_URL?: string
}

