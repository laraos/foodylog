# 🚀 FoodyLog CI/CD Setup Guide

This document provides comprehensive instructions for setting up and maintaining the CI/CD pipeline for FoodyLog.

## 📋 Overview

The FoodyLog CI/CD pipeline is built with GitHub Actions and provides:

- **Automated Testing**: Unit tests, integration tests, and type checking
- **Code Quality**: ESLint, Prettier, and security audits
- **Multi-Platform Builds**: Web (PWA), iOS, and Android
- **Automated Deployments**: Staging and production environments
- **Dependency Management**: Automated dependency updates and security audits

## 🔧 Pipeline Architecture

### Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - Runs on every PR and push to main/develop
   - Quality checks, builds, and deployments

2. **Release Pipeline** (`.github/workflows/release.yml`)
   - Triggered on version tags (v1.0.0, v1.1.0, etc.)
   - Production builds and GitHub releases

3. **Dependency Updates** (`.github/workflows/dependency-update.yml`)
   - Weekly automated dependency updates
   - Security audits and vulnerability checks

## 🔐 Required Secrets

Configure these secrets in your GitHub repository settings:

### Environment Variables
```bash
# Convex Backend
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_CONVEX_URL_PROD=https://your-prod-deployment.convex.cloud

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_CLERK_PUBLISHABLE_KEY_PROD=pk_live_...

# Optional Services
VITE_GOOGLE_PLACES_API_KEY=AIza...
VITE_SENTRY_DSN=https://...

# Code Coverage (optional)
CODECOV_TOKEN=your-codecov-token
```

### Mobile App Signing (for production releases)

#### Android Signing
```bash
ANDROID_KEYSTORE_BASE64=<base64-encoded-keystore>
ANDROID_KEYSTORE_PASSWORD=your-keystore-password
ANDROID_KEY_ALIAS=your-key-alias
ANDROID_KEY_PASSWORD=your-key-password
```

#### iOS Signing
```bash
IOS_CERTIFICATE_BASE64=<base64-encoded-certificate>
IOS_CERTIFICATE_PASSWORD=your-certificate-password
IOS_PROVISIONING_PROFILE_BASE64=<base64-encoded-profile>
```

## 🛠️ Setup Instructions

### 1. Repository Configuration

1. **Enable GitHub Actions**
   ```bash
   # In your repository settings
   Settings → Actions → General → Allow all actions and reusable workflows
   ```

2. **Branch Protection Rules**
   ```bash
   # For main branch
   Settings → Branches → Add rule
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators
   ```

3. **Required Status Checks**
   - `Quality Checks`
   - `Build Web App`
   - `Build Android App`
   - `Build iOS App`

### 2. Environment Setup

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Setup Pre-commit Hooks** (optional)
   ```bash
   # Add to package.json scripts
   "prepare": "husky install",
   "pre-commit": "lint-staged"
   ```

3. **Configure IDE**
   - Install ESLint and Prettier extensions
   - Enable format on save
   - Configure auto-fix on save

### 3. Local Development

1. **Run Quality Checks**
   ```bash
   # Type checking
   bun run type-check
   
   # Linting
   bun run lint
   
   # Formatting
   bun run format:check
   
   # Testing
   bun run test
   ```

2. **Fix Issues**
   ```bash
   # Auto-fix linting issues
   bun run lint:fix
   
   # Auto-format code
   bun run format
   ```

## 📊 Pipeline Stages

### 1. Quality Checks
- **Type Checking**: Ensures TypeScript types are correct
- **Linting**: Checks code style and potential issues
- **Testing**: Runs unit and integration tests
- **Coverage**: Generates code coverage reports

### 2. Build Verification
- **Web Build**: Builds the PWA for web deployment
- **Android Build**: Creates APK for Android devices
- **iOS Build**: Creates archive for iOS devices

### 3. Security & Dependencies
- **Security Audit**: Checks for known vulnerabilities
- **Dependency Check**: Validates dependency integrity
- **License Check**: Ensures license compliance

### 4. Deployment
- **Staging**: Automatic deployment to staging environment
- **Production**: Manual deployment triggered by releases

## 🔄 Release Process

### 1. Prepare Release
```bash
# Update version in package.json
npm version patch|minor|major

# Create and push tag
git push origin main --tags
```

### 2. Automated Release
- GitHub Actions creates release builds
- Artifacts are uploaded to GitHub releases
- Production deployment is triggered

### 3. Post-Release
- Monitor deployment status
- Verify functionality in production
- Update documentation if needed

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check logs in GitHub Actions
   # Common causes:
   - Missing environment variables
   - Dependency conflicts
   - Type errors
   ```

2. **Test Failures**
   ```bash
   # Run tests locally
   bun run test
   
   # Debug specific test
   bun run test -- --reporter=verbose
   ```

3. **Mobile Build Issues**
   ```bash
   # Android
   - Check Java version (17 required)
   - Verify Android SDK setup
   - Check signing configuration
   
   # iOS
   - Verify Xcode version
   - Check certificates and profiles
   - Validate provisioning setup
   ```

### Debug Commands

```bash
# Check workflow status
gh workflow list

# View workflow runs
gh run list

# View specific run logs
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id>
```

## 📈 Monitoring & Metrics

### Key Metrics
- **Build Success Rate**: Target >95%
- **Test Coverage**: Target >80%
- **Build Time**: Target <10 minutes
- **Deployment Frequency**: Track releases per week

### Monitoring Tools
- GitHub Actions dashboard
- Codecov for coverage tracking
- Sentry for error monitoring (if configured)

## 🔧 Maintenance

### Weekly Tasks
- Review dependency update PRs
- Check security audit results
- Monitor build performance
- Update documentation

### Monthly Tasks
- Review and update CI/CD configuration
- Optimize build times
- Update runner versions
- Security review

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Bun Documentation](https://bun.sh/docs)
- [Capacitor CI/CD Guide](https://capacitorjs.com/docs/guides/ci-cd)
- [Convex Deployment Guide](https://docs.convex.dev/production/hosting)

## 🆘 Support

If you encounter issues with the CI/CD pipeline:

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Search existing issues in the repository
4. Create a new issue with detailed information

---

*This documentation is maintained as part of the FoodyLog project. Please keep it updated as the CI/CD pipeline evolves.*