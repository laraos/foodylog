# FoodyLog

> The simplest way to remember every meal that matters

FoodyLog is a mobile-first food logging application that enables users to quickly capture, organize, and analyze their dining experiences. Built with React, TypeScript, and Vite, with PWA capabilities for offline-first functionality.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser with service worker support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd foodylog

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Start development server
bun run dev
```

The app will be available at `http://localhost:5173` and accessible on your local network for mobile testing.

## 📱 Development

### Available Scripts

```bash
# Development
bun run dev          # Start dev server with hot reload
bun run build        # Build for production
bun run preview      # Preview production build

# Mobile Development (Capacitor 7)
bun run cap:sync     # Sync web assets to native platforms
bun run cap:build    # Build and sync in one command
bun run cap:android  # Run on Android emulator/device
bun run cap:ios      # Run on iOS simulator/device
bun run cap:android:dev # Run on Android with live reload
bun run cap:ios:dev  # Run on iOS with live reload

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run type-check   # TypeScript type checking

# Testing
bun run test         # Run unit tests
bun run test:ui      # Run tests with UI
bun run test:coverage # Run tests with coverage
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   └── layout/         # Layout components (Navigation, Header)
├── pages/              # Route components
├── lib/                # Utility libraries (utils.ts, theme.ts)
├── types/              # TypeScript definitions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Mobile**: Capacitor 7 for iOS/Android native builds
- **Routing**: React Router DOM (SPA)
- **PWA**: Vite PWA Plugin with Workbox
- **UI Components**: shadcn/ui with custom FoodyLog theme
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Testing**: Vitest + React Testing Library
- **Package Manager**: Bun

## � Moabile Development Status

### ✅ Completed (Story 1.1.2)
- **Capacitor 7 Configuration**: Full setup with iOS and Android platforms
- **Android Deployment**: Successfully tested on Android emulator
- **Live Reload**: Configured for development workflow
- **Build Pipeline**: Automated sync and deployment scripts

### 🔧 Current Setup
- **App ID**: `com.foodylog.mobile`
- **Platforms**: iOS and Android native projects generated
- **Development**: Live reload with `CAP_SERVER_URL` environment variable
- **Deployment**: Working Android emulator deployment

### 📋 Next Steps
- Convex backend integration
- Clerk authentication setup
- Camera plugin for photo capture
- Offline data synchronization

## 📋 Features

### MVP (Sprint 1 - Nearly Complete ✅)

- ✅ React + TypeScript SPA with Vite
- ✅ PWA with offline support
- ✅ Mobile-first responsive design
- ✅ Error boundaries and loading states
- ✅ Service worker with auto-updates
- ✅ Basic routing and navigation
- ✅ Capacitor 7 mobile platform configuration
- ✅ Android emulator deployment working
- ✅ iOS platform ready (requires macOS for testing)
- ✅ shadcn/ui design system with custom FoodyLog theme
- ✅ Bottom navigation component for mobile-first UX
- ✅ Tailwind CSS integration with warm cream/brown/green palette
- ✅ **Complete Clerk authentication system**
- ✅ **Protected routes and session management**
- ✅ **Sign-in/Sign-up pages with FoodyLog branding**
- ✅ **Authentication testing page (/auth-test)**
- ✅ **Comprehensive unit tests for auth components**
- ✅ **Development setup helper for unconfigured environments**

### Next Sprint (Sprint 2 - Core Meal Logging)

- 📸 Photo capture with Capacitor Camera
- 🍽️ Meal logging and management
- 📊 Basic meal display and listing
- 🔄 Convex backend integration for data storage

### Future Features

- 🔍 Search and filtering
- 📊 Analytics dashboard
- 🔄 Offline sync capabilities
- 👤 Advanced user profile management

## 🧪 Testing

The project uses Vitest for unit testing with React Testing Library and includes comprehensive authentication testing:

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test --watch

# Run tests with coverage
bun run test:coverage
```

### Test Coverage:
- ✅ **Authentication Components**: Complete test coverage for ProtectedRoute, PublicRoute, and auth flows
- ✅ **Clerk Integration**: Mocked Clerk components for reliable testing
- ✅ **Route Protection**: Tests for authenticated and unauthenticated states
- ✅ **Error Handling**: Tests for authentication errors and edge cases

### Manual Testing:
- Visit `/auth-test` when authenticated for comprehensive authentication testing tools
- Test authentication flows, session persistence, and deep linking
- Verify mobile authentication on real devices using Capacitor

## 🎨 Design System

FoodyLog uses a custom design system built on shadcn/ui with a warm, food-focused theme:

### Theme Colors
- **Light Mode**: Warm cream background (#f0e5d9) with dark brown text (#2f2a25)
- **Dark Mode**: Dark brown background (#1e1b1a) with cream text (#f0e5d9)
- **Accent**: Green (#5da271 light, #4b845e dark) for primary actions
- **Rating Colors**: Color-coded meal ratings (excellent, great, good, poor, bad)

### Components Implemented
- ✅ **Navigation**: Mobile-first bottom navigation with 5 main sections
- ✅ **Button**: Multiple variants (default, outline, ghost, destructive)
- ✅ **Theme Toggle**: Automatic dark/light mode switching
- ✅ **Typography**: Consistent text styles and hierarchy
- ✅ **Layout**: CSS Grid-based app layout with safe area handling

### Accessibility
- WCAG 2.1 AA contrast compliance
- Keyboard navigation support
- Screen reader compatibility
- Touch-friendly 44px minimum targets

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Can be installed on mobile devices
- **Auto Updates**: Automatically updates when new versions are available
- **Push Notifications**: (Planned for future releases)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# App Configuration
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# Convex Backend
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk Authentication (Required)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here

# Optional Services
VITE_GOOGLE_PLACES_API_KEY=your_places_key
VITE_SENTRY_DSN=your_sentry_dsn

# Mobile Development (Capacitor live reload)
# Replace with your PC IP address for mobile testing
CAP_SERVER_URL=http://192.168.1.123:5173
```

### Authentication Setup

FoodyLog uses [Clerk](https://clerk.com) for authentication with a complete, production-ready implementation.

#### Quick Setup:
1. **Create Clerk Account**: Go to [dashboard.clerk.com](https://dashboard.clerk.com) and create a new application
2. **Get API Keys**: Copy your Publishable Key and Secret Key from the Clerk dashboard
3. **Update Environment**: Add your keys to `.env.local` (see above)
4. **Restart Server**: Run `bun run dev` again

If Clerk is not configured, the app will show setup instructions automatically.

#### Authentication Features:
- ✅ **Complete sign-in/sign-up flows** with FoodyLog branding
- ✅ **Protected route system** with automatic redirects
- ✅ **Session management** with persistence across app restarts
- ✅ **Deep linking support** preserves intended destinations
- ✅ **Mobile-optimized** authentication flows
- ✅ **Development helpers** for easy setup
- ✅ **Comprehensive testing** with AuthTestPage (`/auth-test`)

#### Testing Authentication:
Visit `/auth-test` when authenticated to access the comprehensive authentication testing interface, which includes:
- Real-time authentication state display
- Session persistence verification
- Deep linking tests
- Manual testing tools

### PWA Configuration

PWA settings are configured in `vite.config.ts` using `vite-plugin-pwa`. The app includes:

- Service worker with caching strategies
- Web app manifest with icons
- Offline fallback pages
- Update notifications

## 🚀 Deployment

### Web Deployment

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Mobile Deployment

The app is configured for mobile deployment using Capacitor 7:

#### Prerequisites for Mobile Development

- **Android**: Android Studio with SDK and emulator
- **iOS**: macOS with Xcode (for iOS development)

#### Setup Mobile Platforms

Mobile platforms are already configured. To deploy:

```bash
# Build web assets
bun run build

# Sync to mobile platforms
bun run cap:sync

# Run on Android (requires Android Studio & emulator)
bun run cap:android

# Run on iOS (requires macOS & Xcode)
bun run cap:ios
```

#### Live Reload Development

For faster development with live reload:

```bash
# Terminal 1: Start dev server
bun run dev

# Terminal 2: Set environment variable and run
# For Android Emulator:
CAP_SERVER_URL=http://10.0.2.2:5173 bun run cap:android:dev

# For physical device (replace with your PC IP):
CAP_SERVER_URL=http://192.168.1.123:5173 bun run cap:android:dev
```

#### Troubleshooting Mobile Deployment

If you encounter ADB authorization issues:

```bash
# Check connected devices
adb devices

# Restart ADB if needed
adb kill-server && adb start-server

# Manual app launch (if automatic launch fails)
adb shell am start -n com.foodylog.mobile/com.foodylog.mobile.MainActivity

# Open project in Android Studio for debugging
bunx cap open android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Phase 1: MVP Foundation (95% Complete ✅)
- [x] Project setup and PWA configuration
- [x] Capacitor 7 mobile platform configuration
- [x] Android emulator deployment
- [x] iOS platform setup (requires macOS for testing)
- [x] **Complete authentication system with Clerk**
- [x] **Protected routes and session management**
- [x] **Sign-in/Sign-up UI with custom branding**
- [x] **Authentication testing and verification tools**
- [x] **Comprehensive unit tests for auth components**
- [ ] Final accessibility audit (minor remaining work)

### Phase 1.5: Sprint 2 Preparation (Ready to Begin)
- [ ] Convex schema design for meals
- [ ] Basic meal logging form
- [ ] Photo capture with Capacitor Camera
- [ ] Meal display components

### Phase 2: Core Features
- [ ] Search and filtering
- [ ] Analytics dashboard
- [ ] Data export
- [ ] Performance optimization

### Phase 3: Advanced Features
- [ ] Social features
- [ ] Advanced analytics
- [ ] Premium features
- [ ] API integrations

---

Built with ❤️ for food enthusiasts everywhere.