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
│   ├── ui/             # Base UI components
│   └── layout/         # Layout components
├── pages/              # Route components
├── lib/                # Utility libraries
├── types/              # TypeScript definitions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Mobile**: Capacitor 7 for iOS/Android native builds
- **Routing**: React Router DOM (SPA)
- **PWA**: Vite PWA Plugin with Workbox
- **Styling**: CSS Custom Properties + Mobile-first
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

### MVP (Current Sprint)

- ✅ React + TypeScript SPA with Vite
- ✅ PWA with offline support
- ✅ Mobile-first responsive design
- ✅ Error boundaries and loading states
- ✅ Service worker with auto-updates
- ✅ Basic routing and navigation
- ✅ Capacitor 7 mobile platform configuration
- ✅ Android emulator deployment working
- ✅ iOS platform ready (requires macOS for testing)

### Planned Features

- 📸 Photo capture with Capacitor Camera
- 🍽️ Meal logging and management
- 🔍 Search and filtering
- 📊 Basic analytics
- 🔄 Offline sync with Convex
- 🔐 Authentication with Clerk

## 🧪 Testing

The project uses Vitest for unit testing with React Testing Library:

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test --watch

# Run tests with coverage
bun run test:coverage
```

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Can be installed on mobile devices
- **Auto Updates**: Automatically updates when new versions are available
- **Push Notifications**: (Planned for future releases)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# App Configuration
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# Backend Services (when ready)
VITE_CONVEX_URL=your_convex_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Optional Services
VITE_GOOGLE_PLACES_API_KEY=your_places_key
VITE_SENTRY_DSN=your_sentry_dsn

# Mobile Development (Capacitor live reload)
# Replace with your PC IP address for mobile testing
CAP_SERVER_URL=http://192.168.1.123:5173
```

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

### Phase 1: MVP Foundation (Current)
- [x] Project setup and PWA configuration
- [x] Capacitor 7 mobile platform configuration
- [x] Android emulator deployment
- [x] iOS platform setup (requires macOS for testing)
- [ ] Authentication system
- [ ] Basic meal logging
- [ ] Photo capture
- [ ] Offline support

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