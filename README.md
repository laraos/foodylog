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
- **Routing**: React Router DOM (SPA)
- **PWA**: Vite PWA Plugin with Workbox
- **Styling**: CSS Custom Properties + Mobile-first
- **Testing**: Vitest + React Testing Library
- **Package Manager**: Bun

## 📋 Features

### MVP (Current Sprint)

- ✅ React + TypeScript SPA with Vite
- ✅ PWA with offline support
- ✅ Mobile-first responsive design
- ✅ Error boundaries and loading states
- ✅ Service worker with auto-updates
- ✅ Basic routing and navigation

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
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_CONVEX_URL=your_convex_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
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

### Mobile Deployment (Future)

The app is prepared for mobile deployment using Capacitor:

```bash
# Add mobile platforms (when ready)
bunx cap add ios
bunx cap add android

# Build and sync
bun run build
bunx cap sync

# Run on device
bunx cap run ios
bunx cap run android
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