# CI/CD Pipeline Setup Guide

This document provides comprehensive instructions for setting up and configuring the GitHub Actions CI/CD pipeline for FoodyLog.

## Overview

The CI/CD pipeline implements automated testing, building, and deployment for the FoodyLog application across web (PWA), iOS, and Android platforms using Bun as the package manager.

## Pipeline Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Code Quality  │    │   Build Web     │    │  Build Mobile   │
│   & Testing     │───▶│     (PWA)       │───▶│  (iOS/Android)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│Security & Perf  │    │Deploy Staging   │    │   Notifications │
│    Audits       │    │   Environment   │    │   & Reporting   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Required Environment Secrets

### GitHub Repository Secrets

Navigate to your GitHub repository → Settings → Secrets and variables → Actions, then add the following secrets:

#### Core Application Secrets
```bash
# Convex Backend Configuration
VITE_CONVEX_URL=https://your-convex-deployment.convex.cloud
CONVEX_DEPLOY_KEY=your-convex-deploy-key

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key

# Staging Environment
STAGING_URL=https://your-staging-deployment.vercel.app
```

#### Optional Secrets (for enhanced features)
```bash
# Google Places API (for restaurant search)
VITE_GOOGLE_PLACES_API_KEY=your-google-places-api-key

# Error Monitoring
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Code Coverage
CODECOV_TOKEN=your-codecov-token
```

### Environment Setup Instructions

1. **Convex Setup**:
   ```bash
   # Install Convex CLI
   bun add -g convex
   
   # Login and get deploy key
   bunx convex login
   bunx convex deploy --cmd-url-env-var-name VITE_CONVEX_URL
   
   # Copy the deploy key from Convex dashboard
   ```

2. **Clerk Setup**:
   ```bash
   # Get publishable key from Clerk dashboard
   # Navigate to: Clerk Dashboard → API Keys → Publishable Key
   ```

3. **Staging Environment**:
   ```bash
   # Set up staging deployment (example with Vercel)
   vercel --prod
   # Copy the deployment URL
   ```

## Branch Protection Rules

### Automated Setup

Run the branch protection setup script:

```bash
# Make the script executable
chmod +x scripts/setup-branch-protection.sh

# Run the script (requires GitHub CLI)
./scripts/setup-branch-protection.sh
```

### Manual Setup

1. Navigate to: Repository → Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 minimum)
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Required status checks:
     - `Code Quality & Testing`
     - `Build Web (PWA)`
     - `Build Android`
     - `Build iOS`
     - `Security & Performance Audit`
   - ✅ Require conversation resolution before merging
   - ✅ Include administrators

## Workflow Triggers

### Automatic Triggers
- **Push to `main` or `develop`**: Full pipeline with deployment
- **Pull Request**: Quality checks and builds (no deployment)

### Manual Triggers
- **Repository Dispatch**: Custom deployment triggers
- **Workflow Dispatch**: Manual pipeline execution

## Pipeline Jobs

### 1. Code Quality & Testing
- **Duration**: ~3-5 minutes
- **Runs on**: Ubuntu Latest
- **Steps**:
  - TypeScript type checking
  - ESLint code linting
  - Prettier formatting check
  - Unit tests with Vitest
  - Accessibility tests
  - Code coverage upload

### 2. Build Web (PWA)
- **Duration**: ~2-3 minutes
- **Runs on**: Ubuntu Latest
- **Dependencies**: Code Quality & Testing
- **Outputs**: Web build artifacts in `dist/`

### 3. Build Android
- **Duration**: ~5-8 minutes
- **Runs on**: Ubuntu Latest
- **Dependencies**: Build Web
- **Requirements**: Java 17, Android SDK
- **Outputs**: Android APK

### 4. Build iOS
- **Duration**: ~8-12 minutes
- **Runs on**: macOS Latest
- **Dependencies**: Build Web
- **Requirements**: Xcode, iOS SDK
- **Outputs**: iOS app bundle

### 5. Deploy Staging
- **Duration**: ~3-5 minutes
- **Runs on**: Ubuntu Latest
- **Dependencies**: All build jobs
- **Triggers**: Only on `main` or `develop` branches
- **Steps**:
  - Deploy Convex backend
  - Deploy web application
  - Run E2E tests against staging
  - Send deployment notifications

### 6. Security & Performance Audit
- **Duration**: ~2-4 minutes
- **Runs on**: Ubuntu Latest
- **Dependencies**: Code Quality & Testing
- **Steps**:
  - Dependency security audit
  - Lighthouse performance audit
  - PWA compliance check

## Performance Targets

The pipeline enforces the following performance requirements:

- **Lighthouse Performance**: ≥ 80/100
- **Lighthouse Accessibility**: ≥ 90/100
- **Lighthouse Best Practices**: ≥ 80/100
- **Lighthouse SEO**: ≥ 80/100
- **Lighthouse PWA**: ≥ 80/100

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs in GitHub Actions
# Common fixes:
bun install --frozen-lockfile  # Dependency issues
bun run type-check            # TypeScript errors
bun run lint:fix              # Linting issues
```

#### 2. Mobile Build Issues
```bash
# Android build failures
cd android && ./gradlew clean build

# iOS build failures
cd ios/App && xcodebuild clean build
```

#### 3. Test Failures
```bash
# Run tests locally
bun run test --run
bun run test:e2e
bun run test:a11y --run
```

#### 4. Deployment Issues
```bash
# Check Convex deployment
bunx convex deploy --dry-run

# Verify environment variables
echo $VITE_CONVEX_URL
echo $VITE_CLERK_PUBLISHABLE_KEY
```

### Debug Mode

Enable debug logging by adding to workflow environment:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Monitoring and Notifications

### Build Status
- GitHub Actions provides build status badges
- Failed builds trigger email notifications to repository admins

### Performance Monitoring
- Lighthouse CI reports are uploaded to temporary public storage
- Performance regressions are flagged in PR comments

### Security Monitoring
- Dependency vulnerabilities are reported via `bun audit`
- Security advisories trigger automated PR creation

## Cost Optimization

### GitHub Actions Minutes
- **Ubuntu runners**: 1x multiplier
- **macOS runners**: 10x multiplier (use sparingly)
- **Optimization**: Cache dependencies, parallel jobs

### Resource Usage
```yaml
# Example optimization
- name: Cache Bun dependencies
  uses: actions/cache@v4
  with:
    path: ~/.bun/install/cache
    key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
```

## Maintenance

### Regular Tasks
- **Weekly**: Review failed builds and performance metrics
- **Monthly**: Update GitHub Actions versions
- **Quarterly**: Review and update security policies

### Updates
- Monitor GitHub Actions marketplace for updates
- Keep Bun, Node.js, and mobile SDKs updated
- Review and update Lighthouse performance targets

## Support

For issues with the CI/CD pipeline:
1. Check GitHub Actions logs
2. Review this documentation
3. Test locally with the same commands
4. Create an issue with detailed error logs