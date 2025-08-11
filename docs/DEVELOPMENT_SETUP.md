# FoodyLog Development Environment Setup

This guide will help you set up a consistent development environment for the FoodyLog project.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **Bun** (v1.0.0 or higher) - [Installation Guide](https://bun.sh/docs/installation)
- **Git**
- **VS Code** (recommended IDE)

### Mobile Development (Optional)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodylog
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Required Variables
- `VITE_CONVEX_URL` - Your Convex deployment URL
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication public key
- `CLERK_SECRET_KEY` - Clerk authentication secret key

### Optional Variables
- `VITE_GOOGLE_PLACES_API_KEY` - For location services
- `VITE_SENTRY_DSN` - For error tracking
- `CAP_SERVER_URL` - For Capacitor live reload (mobile development)

### Development Variables
- `VITE_APP_VERSION` - App version (default: 1.0.0)
- `VITE_ENVIRONMENT` - Environment (development/staging/production)

## Available Scripts

### Development
```bash
bun run dev          # Start development server with hot reload
bun run build        # Build for production
bun run preview      # Preview production build locally
```

### Code Quality
```bash
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues automatically
bun run format       # Format code with Prettier
bun run format:check # Check code formatting
bun run type-check   # Run TypeScript type checking
```

### Testing
```bash
bun run test         # Run unit tests with Vitest
bun run test:ui      # Run tests with UI
bun run test:coverage # Run tests with coverage report
bun run test:a11y    # Run accessibility tests
bun run test:e2e     # Run end-to-end tests with Playwright
bun run test:e2e:ui  # Run E2E tests with UI
```

### Mobile Development
```bash
bun run cap:sync     # Sync web build to native platforms
bun run cap:build    # Build and sync
bun run cap:android  # Run on Android
bun run cap:ios      # Run on iOS
bun run cap:android:dev # Run Android without sync (for live reload)
bun run cap:ios:dev     # Run iOS without sync (for live reload)
```

### Auditing
```bash
bun run audit:accessibility # Run accessibility audit
bun run audit:colors       # Audit color contrast
```

## VS Code Configuration

### Recommended Extensions

Install these extensions for the best development experience:

#### Essential Extensions
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **TypeScript Importer** (`pmneo.tsimporter`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
- **Path Intellisense** (`christian-kohler.path-intellisense`)

#### React Development
- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
- **Simple React Snippets** (`burkeholland.simple-react-snippets`)

#### Testing
- **Vitest** (`vitest.explorer`)
- **Playwright Test for VSCode** (`ms-playwright.playwright`)

#### Git & Productivity
- **GitLens** (`eamodio.gitlens`)
- **GitHub Pull Requests** (`github.vscode-pull-request-github`)
- **GitHub Copilot** (`github.copilot`)
- **Error Lens** (`usernamehw.errorlens`)
- **Todo Tree** (`gruntfuggly.todo-tree`)

#### Mobile Development
- **Ionic** (`ionic.ionic`)

#### Accessibility
- **axe Accessibility Linter** (`deque-systems.vscode-axe-linter`)

### VS Code Settings

Add these settings to your VS Code workspace settings (`.vscode/settings.json`):

```json
{
  // Editor Configuration
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.rulers": [80, 120],

  // Language-specific settings
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // TypeScript settings
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",

  // ESLint settings
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],

  // Tailwind CSS settings
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },

  // Testing settings
  "vitest.enable": true,
  "vitest.commandLine": "bun run test",

  // File exclusions
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.convex": true,
    "**/android/build": true,
    "**/ios/build": true
  }
}
```

## TypeScript Path Aliases

The project is configured with TypeScript path aliases for clean imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/button'
// Use: import { Button } from '~/components/ui/button'
```

Available aliases:
- `~/*` → `./src/*`

## Mobile Development Setup

### Android Development

1. **Install Android Studio**
2. **Setup Android SDK and emulator**
3. **Add Android platform**
   ```bash
   bunx cap add android
   ```

4. **Configure live reload** (optional)
   ```bash
   # Set your PC IP in .env
   CAP_SERVER_URL=http://YOUR_PC_IP:5173
   
   # Start dev server
   bun run dev
   
   # In another terminal, run Android app
   bun run cap:android:dev
   ```

### iOS Development (macOS only)

1. **Install Xcode**
2. **Add iOS platform**
   ```bash
   bunx cap add ios
   ```

3. **Configure live reload** (optional)
   ```bash
   # For iOS Simulator
   CAP_SERVER_URL=http://localhost:5173
   
   # Start dev server
   bun run dev
   
   # In another terminal, run iOS app
   bun run cap:ios:dev
   ```

## Code Quality Standards

### Formatting
- **Prettier** for code formatting
- **2 spaces** for indentation
- **80 character** line length (soft limit)
- **Semicolons** required
- **Single quotes** for strings

### Linting
- **ESLint** with TypeScript support
- **React hooks** rules enabled
- **Accessibility** rules enabled
- **Import sorting** automatic

### TypeScript
- **Strict mode** enabled
- **No unused variables** or parameters
- **Explicit return types** for functions (recommended)
- **Path aliases** for clean imports

## Testing Strategy

### Unit Tests (Vitest)
- Test React components with React Testing Library
- Test utility functions and hooks
- Aim for 80%+ code coverage

### End-to-End Tests (Playwright)
- Test critical user flows
- Cross-browser testing
- Mobile viewport testing

### Accessibility Tests
- Automated accessibility testing with axe-core
- Manual testing with screen readers
- WCAG 2.1 AA compliance target

## Performance Targets

- **App launch**: < 2 seconds cold start
- **Meal list load**: < 1 second for 100 meals
- **Photo upload**: < 5 seconds for 5MB image
- **Offline sync**: < 10 seconds for 50 pending items
- **Search results**: < 500ms for text search

## Troubleshooting

### Common Issues

1. **Bun installation issues**
   - Use the official installer from [bun.sh](https://bun.sh)
   - Restart terminal after installation

2. **Capacitor sync issues**
   - Run `bun run cap:sync` after making changes
   - Clean build folders if needed

3. **TypeScript path alias issues**
   - Restart TypeScript server in VS Code
   - Check `tsconfig.json` and `vite.config.ts` configuration

4. **Mobile live reload not working**
   - Check `CAP_SERVER_URL` in `.env`
   - Ensure mobile device is on same network
   - Use correct IP address for your development machine

### Getting Help

- Check the [project documentation](./README.md)
- Review [implementation notes](../IMPLEMENTATION_NOTES.md)
- Check existing [GitHub issues](https://github.com/your-repo/issues)

## Contributing

1. **Create feature branch** from `develop`
2. **Follow code quality standards**
3. **Write tests** for new features
4. **Update documentation** as needed
5. **Submit pull request** with clear description

### Commit Message Format
```
feat(meals): add photo capture functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)