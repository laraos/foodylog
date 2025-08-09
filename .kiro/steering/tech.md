# FoodyLog Technical Stack

## Architecture
Single SPA codebase that builds both Web PWA and native mobile apps via Capacitor 7.

## Core Technologies
- **Frontend**: React + TypeScript + Vite (SPA with react-router-dom)
- **Mobile**: Capacitor 7 for iOS/Android native builds
- **Backend**: Convex (serverless functions + database + real-time sync)
- **Authentication**: Clerk (frontend-first with JWT verification in Convex)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Package Manager**: Bun for fast package management and scripts

## Key Libraries & Frameworks
- **State Management**: Convex React hooks + React 19 features
- **Forms**: React Hook Form v7+
- **Icons**: Lucide React
- **Testing**: Vitest (unit) + Playwright (E2E) + axe-core (accessibility)
- **Storage**: Convex File Storage + Capacitor Preferences/Filesystem for offline

## Development Commands

### Setup & Development
```bash
# Install dependencies
bun install

# Run web development server (accessible on LAN)
bun run dev

# Build for production
bun run build
```

### Mobile Development
```bash
# First-time platform setup
bunx cap add android
bunx cap add ios

# Sync web build to native platforms
bunx cap sync

# Run on mobile (device/emulator)
bunx cap run android
bunx cap run ios
```

### Live Reload on Device
Set environment variable for device access:
```bash
# Android Emulator
CAP_SERVER_URL=http://10.0.2.2:5173

# Physical device (replace with your PC IP)
CAP_SERVER_URL=http://192.168.1.123:5173
```

Then run:
```bash
bun run dev                    # Terminal 1
bunx cap run android --no-sync # Terminal 2
```

### Testing
```bash
# Unit tests
bun run test

# E2E tests
bun run test:e2e

# Accessibility tests
bun run test:a11y
```

### Deployment
```bash
# Deploy backend
bunx convex deploy

# Build mobile apps
bunx cap build android
bunx cap build ios
```

## Environment Variables
Required variables in `.env`:
```bash
VITE_CONVEX_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# Optional
VITE_GOOGLE_PLACES_API_KEY=
VITE_SENTRY_DSN=

# Development only (Capacitor live reload)
CAP_SERVER_URL=
```

## Performance Requirements
- App launch: < 2 seconds cold start
- Meal list load: < 1 second for 100 meals
- Photo upload: < 5 seconds for 5MB image
- Offline sync: < 10 seconds for 50 pending items
- Search results: < 500ms for text search

## Code Quality Standards
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- 80%+ test coverage target
- WCAG 2.1 AA accessibility compliance
- Mobile-first responsive design