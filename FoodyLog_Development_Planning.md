# FoodyLog - Development Team Planning

_Version 2.0 - August 2025_

## 📋 Project Overview

FoodyLog is a mobile-first food logging application built with a single SPA codebase using React + TypeScript + Vite (PWA) and Capacitor 7 for native builds, with Convex backend. Authentication is handled by Clerk (frontend-first), and Convex consumes Clerk-issued JWTs for backend authorization. The project follows a 12-month development timeline with MVP delivery in 3 months.

### Project Scope

- **MVP Timeline**: 3 months (Months 1-3)
- **Enhanced Features**: 3 months (Months 4-6)
- **Growth Features**: 6 months (Months 7-12)
- **Target Platforms**: iOS, Android, Web (PWA)
- **Tech Stack (App)**: React + TypeScript + React Router + Vite + Capacitor 7 + Convex + Clerk + shadcn/ui
- **Tech Stack (Web PWA)**: Vite + vite-plugin-pwa

## 👨‍💻 Developer Quickstart (Bun)

```bash
bun install
bun run dev

# Build web
bun run build

# Mobile platforms (first time)
bunx cap add android
# bunx cap add ios

# Sync and run
bunx cap sync
bunx cap run android
```

## 🔁 Mobile Live Reload (Capacitor)

- Vite serves on LAN (`vite --host` is set in scripts).
- Set `CAP_SERVER_URL` so device/emulator can reach the dev server:

```bash
# .env.example
# Android Emulator
CAP_SERVER_URL=http://10.0.2.2:5173
# Physical device (replace with your PC IP)
# CAP_SERVER_URL=http://192.168.1.123:5173
```

Then run:
```bash
bun run dev         # terminal 1
bunx cap run android --no-sync   # terminal 2
```

## 📦 PWA Details (Checklist)

- Manifest name/short_name/start_url/display/icons (192/512 PNG + maskable) and `apple-touch-icon`.
- `vite-plugin-pwa` with `registerType: 'autoUpdate'` and update toast.
- Offline shell loads when cached (Lighthouse PWA pass: installable, offline, HTTPS).

## 🤖 CI/CD (Bun) Notes

- Use `oven-sh/setup-bun@v1`, then `bun install`, `bun run build`, `bunx convex deploy`, `bunx cap build android`.
- Cache Bun downloads (GitHub Actions cache); enable workflow concurrency to cancel stale runs.

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

## 🧾 Documentation Hygiene

- Prefer Bun across docs; commit only `bun.lockb` (no `package-lock.json`).
- Keep `.env.example` updated:

```bash
VITE_CONVEX_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
# Optional
VITE_GOOGLE_PLACES_API_KEY=
VITE_SENTRY_DSN=
# Dev only (Capacitor live reload)
CAP_SERVER_URL=
```

## 👥 Team Structure & Roles

> Assumption: Solo developer leading the project. UI/UX and QA support are as-needed contractors.

### Core Team (Solo)

#### 1. **Solo Full-Stack Developer** (Primary Role)

**Responsibilities:**

 - React + TypeScript SPA (Vite) development with shadcn/ui
- Capacitor 7 mobile app development
- Convex backend functions and schema design
- API integration and data management
- Performance optimization and testing

**Required Skills:**

- Expert in React + TypeScript (SPA with Vite)
- Proficient in react-router-dom (SPA routing)
- Experience with Capacitor for mobile development
- Convex backend development experience
- TypeScript and modern JavaScript
- Mobile-first responsive design
- Git workflow and CI/CD

**Time Allocation (per sprint):**

- 60–70% Feature delivery (frontend + backend)
- 15–25% Testing and polish
- 10–15% Planning, ops, docs

#### 2. **UI/UX Designer** (As-needed Contract)

**Responsibilities:**

- Design system implementation and maintenance
- User interface design and prototyping
- User experience optimization
- Accessibility compliance (WCAG 2.1 AA)
- Design QA and component review

**Required Skills:**

- Figma/Sketch proficiency
- Mobile-first design principles
- shadcn/ui component system knowledge
- Accessibility standards (WCAG 2.1 AA)
- Food app design experience (preferred)

**Engagement:**

- On-demand, up to 5–10 hours per sprint (when scheduled)

#### 3. **QA Engineer** (As-needed Contract)

**Responsibilities:**

- Manual testing across devices and platforms
- Automated testing setup (Playwright)
- Accessibility testing with screen readers
- Performance testing and optimization
- Bug tracking and regression testing

**Required Skills:**

- Mobile app testing experience
- Playwright/automated testing
- Accessibility testing tools
- Cross-platform testing (iOS/Android)
- Performance testing methodologies

**Engagement:**

- On-demand test cycles before key releases; otherwise developer-driven testing

### Extended Team (Growth Phase)

#### 4. **Mobile Developer** (Months 4-12)

**Responsibilities:**

- Advanced Capacitor 7 features implementation
- Native iOS/Android optimizations
- App store deployment and maintenance
- Push notifications and background sync
- Performance optimization for mobile

#### 5. **Backend Developer** (Months 7-12)

**Responsibilities:**

- Advanced Convex functions and optimizations
- Third-party integrations (Google Places; App Store/Play billing webhooks or chosen web payments provider)
- Analytics and monitoring setup
- Database optimization and scaling
- Security audits and improvements

## 📅 Sprint Planning & Timeline

### Development Methodology: **Agile with 2-week Sprints**

### Phase 1: MVP Foundation (Months 1-3)

#### **Sprint 1-2: Project Setup & Core Infrastructure** (Weeks 1-4)

**Sprint 1 Goals:**

- [ ] Project initialization and repository setup
- [ ] Development environment configuration
- [ ] CI/CD pipeline setup with GitHub Actions
- [ ] Design system implementation with shadcn/ui
- [ ] Basic authentication with Clerk

**Sprint 1 Tasks:**

```
🔧 Setup & Configuration (28 hours)
├── Initialize React + TypeScript + Vite project (SPA + PWA)
├── Configure Capacitor 7 for iOS/Android
├── Setup Convex backend and authentication
├── Implement shadcn/ui with custom theme
├── Configure Tailwind CSS with design tokens
├── Setup internationalization (i18n) infrastructure
├── Setup ESLint, Prettier, and TypeScript
└── Create GitHub Actions CI/CD pipeline

🎨 Design System (18 hours)
├── Implement color palette and typography
├── Create base UI components (Button, Card, Input)
├── Setup dark mode support
├── Create component documentation
└── Accessibility audit and fixes

🔐 Authentication (12 hours)
├── Clerk setup and configuration
├── Login/Register screens with react-router-dom
├── Protected route implementation
├── User session management
└── Password reset functionality
```

**Sprint 2 Goals:**

- [ ] User profile management
- [ ] Basic meal logging functionality
- [ ] Photo capture with Capacitor Camera
- [ ] Basic meal list display

**Sprint 2 Tasks:**

```
👤 User Management (14 hours)
├── User profile creation and editing
├── User preferences (currency, timezone)
├── Profile photo upload
└── Account deletion functionality

📱 Core Meal Logging (22 hours)
├── Add meal form with React Hook Form
├── Photo capture with Capacitor 7 Camera
├── Rating input component
├── Meal type selection
├── Tags input with autocomplete
└── Form validation and error handling

💾 Data Management (18 hours)
├── Convex schema design and implementation
├── Meal CRUD operations
├── Photo upload to Convex storage
└── Basic meal list with pagination
```

#### **Sprint 3-4: Core Features & UI Polish** (Weeks 5-8)

**Sprint 3 Goals:**

- [ ] Meal management (view, edit, delete)
- [ ] Meal list UI (card + pagination)
- [ ] Gallery photo selection
- [ ] Performance optimization
- [ ] Mobile responsiveness

**Sprint 4 Goals:**

- [ ] Offline storage and sync implementation
- [ ] Basic search (title) + initial search backend
- [ ] Error handling and loading states
- [ ] Accessibility improvements
- [ ] Testing setup (unit and E2E)
- [ ] Bug fixes and polish

#### **Sprint 5-6: MVP Completion & Testing** (Weeks 9-12)

**Sprint 5 Goals:**

- [ ] Complete offline functionality
- [ ] App store preparation (icons, screenshots)
- [ ] Performance optimization
- [ ] Security audit and fixes
- [ ] Beta testing preparation

**Sprint 6 Goals:**

- [ ] Comprehensive testing (manual and automated)
- [ ] Bug fixes and stability improvements
- [ ] Documentation completion
- [ ] MVP release preparation
- [ ] Marketing website planning (optional, Phase 2)

### Phase 2: Enhanced Features (Months 4-6)

#### **Sprint 7-8: Premium Features Foundation** (Weeks 13-16)

- [ ] (Planning only) Subscription system with Clerk identity + native billing/web provider (implementation begins Months 7-9)
- [ ] Marketing website launch (optional, Phase 2)
- [ ] Add Sentry (web) + Crashlytics (native) setup; wire release version from CI
- [ ] Multiple photo support
- [ ] Enhanced meal details (cuisine, companions, etc.)
- [ ] Advanced search and filtering
- [ ] Budget tracking system

#### **Sprint 9-10: Advanced Features** (Weeks 17-20)

- [ ] Places integration with Google Places API
- [ ] Enhanced analytics with charts
- [ ] Export functionality (CSV, PDF)
- [ ] Notifications system
- [ ] Performance optimizations
- [ ] Spanish and French localization (app copy and UI)
- [ ] Add Lighthouse CI with performance budgets (bundle sizes, LCP, CLS)

#### **Sprint 11-12: Polish & Launch Prep** (Weeks 21-24)

- [ ] Marketing website completion (optional)
- [ ] App store optimization
- [ ] Advanced testing and QA
- [ ] Fastlane automation for iOS/Android releases; metadata and screenshots
- [ ] Launch preparation
- [ ] Documentation and support materials

### Phase 3: Growth Features (Months 7-12)

#### **Sprint 13-18: Social Features** (Weeks 25-36)

- [ ] User profiles and social features
- [ ] Meal sharing and discovery
- [ ] Follow/unfollow functionality
- [ ] Comments and likes system
- [ ] Activity feed implementation
- [ ] Content moderation system
- [ ] Ads integration for free tier: AdMob + UMP consent, placements, caps (align with PRD Months 7–9)
- [ ] Premium subscription implementation + beta; premium gating across app

#### **Sprint 19-24: AI & Advanced Features** (Weeks 37-48)

- [ ] AI-powered food recognition
- [ ] Smart recommendations
- [ ] Advanced analytics and insights
- [ ] Partnership integrations
- [ ] International expansion
- [ ] Performance scaling
- [ ] Premium full launch; billing edge cases and dunning flows

## 📋 Task Breakdown Structure

### Epic 1: Authentication & User Management

```
🔐 Authentication System
├── 📝 User Registration
│   ├── Email/password signup form
│   ├── Form validation and error handling
│   ├── Email verification (optional)
│   └── Welcome onboarding flow
├── 🔑 User Login
│   ├── Login form with React Hook Form
│   ├── Remember me functionality
│   ├── Password reset flow
│   └── Social login (future)
├── 👤 User Profile
│   ├── Profile creation and editing
│   ├── Avatar upload with Capacitor
│   ├── Preferences management
│   └── Account deletion
└── 🛡️ Security
    ├── Session management
    ├── Protected routes
    ├── Rate limiting
    └── Data encryption
```

### Epic 2: Core Meal Logging

```
🍽️ Meal Management
├── ➕ Add Meal
│   ├── Photo capture with Capacitor Camera
│   ├── Meal details form (title, rating, type)
│   ├── Location input with GPS
│   ├── Tags input with autocomplete
│   ├── Price input (optional)
│   └── Form submission and validation
├── 📋 Meal List
│   ├── Chronological meal display
│   ├── Meal cards with photos and ratings
│   ├── Infinite scroll pagination
│   ├── Pull-to-refresh functionality
│   └── Loading states and skeletons
├── 🔍 Search & Filter
│   ├── Text search by title and tags
│   ├── Filter by meal type and rating
│   ├── Date range filtering
│   └── Search result highlighting
├── ✏️ Edit Meal
│   ├── Edit form pre-populated with data
│   ├── Photo replacement functionality
│   ├── Update validation and error handling
│   └── Optimistic updates
└── 🗑️ Delete Meal
    ├── Confirmation dialog
    ├── Soft delete with undo option
    ├── Photo cleanup
    └── Analytics update
```

### Epic 3: Offline & Sync

```
📱 Offline Functionality
├── 💾 Local Storage
│   ├── Meal data caching with Capacitor Preferences
│   ├── Photo storage with Filesystem API
│   ├── User preferences caching
│   └── Search index caching
├── 🔄 Sync System
│   ├── Offline action queue
│   ├── Conflict resolution
│   ├── Background sync
│   ├── Sync status indicators
│   └── Error handling and retry logic
├── 🌐 Network Detection
│   ├── Online/offline status monitoring
│   ├── Connection quality detection
│   ├── Sync trigger on connectivity
│   └── User feedback for network issues
└── 📊 Sync Analytics
    ├── Sync success/failure tracking
    ├── Performance monitoring
    ├── User behavior analytics
    └── Error reporting
```

## 🔄 Development Workflow

### Git Workflow: **Git Flow (develop + feature branches)**

```
main (production)
└── develop (staging)
    ├── feature/auth-system
    ├── feature/meal-logging
    ├── feature/offline-sync
    └── feature/analytics
release/* (release branches)
hotfix/* (critical fixes)
```

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes
- `release/version` - Release preparation
- `chore/description` - Maintenance tasks

### Commit Message Format

```
type(scope): description

feat(auth): add user registration with email verification
fix(meals): resolve photo upload issue on iOS
docs(readme): update installation instructions
test(meals): add unit tests for meal creation
refactor(ui): improve button component accessibility
```

### Pull Request Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/meal-logging
   ```

2. **Development & Testing**
   - Write code following TypeScript and ESLint rules
   - Add unit tests for new functionality
   - Test on multiple devices/browsers
   - Update documentation if needed

3. **Pull Request Creation**
   - Use PR template with checklist
   - Add screenshots for UI changes
   - Link related issues
   - Request appropriate reviewers

4. **Code Review Process**
   - At least 1 approval required
   - All CI checks must pass
   - Address review feedback
   - Update based on QA testing

5. **Merge & Deploy**
   - Squash and merge to develop
   - Automatic deployment to staging
   - Manual promotion to production

### Code Review Checklist

```markdown
## Code Review Checklist

### Functionality

- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] Performance is acceptable

### Code Quality

- [ ] Code follows TypeScript best practices
- [ ] Functions are pure and testable
- [ ] No code duplication
- [ ] Proper error boundaries

### UI/UX

- [ ] Matches design specifications
- [ ] Responsive on all screen sizes
- [ ] Accessibility standards met
- [ ] Loading states implemented

### Testing

- [ ] Unit tests added/updated
- [ ] E2E tests pass
- [ ] Manual testing completed
- [ ] Accessibility testing done

### Documentation

- [ ] Code is self-documenting
- [ ] Complex logic is commented
- [ ] README updated if needed
- [ ] API documentation updated
```

## 🧪 Testing Strategy

### Testing Pyramid

```
                    🔺
                   /   \
                  /  E2E \     (10% - Critical user flows)
                 /       \
                /_________\
               /           \
              / Integration \   (20% - Component integration)
             /               \
            /_________________\
           /                   \
          /       Unit          \  (70% - Individual functions)
         /                       \
        /_________________________\
```

### Unit Testing (70% of tests)

**Tools:** Vitest + Testing Library
**Coverage Target:** 80%

```typescript
// Example unit test structure
describe('MealCard Component', () => {
  it('should display meal information correctly', () => {
    const mockMeal = {
      _id: '1',
      title: 'Test Meal',
      rating: 8,
      dateEaten: Date.now(),
      mealType: 'lunch',
      tags: ['delicious'],
    };

    render(<MealCard meal={mockMeal} />);

    expect(screen.getByText('Test Meal')).toBeInTheDocument();
    expect(screen.getByText('8/10')).toBeInTheDocument();
    expect(screen.getByText('delicious')).toBeInTheDocument();
  });

  it('should handle missing photo gracefully', () => {
    const mealWithoutPhoto = { ...mockMeal, primaryPhoto: undefined };
    render(<MealCard meal={mealWithoutPhoto} />);

    expect(screen.getByTestId('photo-placeholder')).toBeInTheDocument();
  });
});
```

### Integration Testing (20% of tests)

**Tools:** Vitest + MSW (Mock Service Worker)
**Focus:** Component interactions and API integration

```typescript
// Example integration test
describe('Meal Creation Flow', () => {
  it('should create meal with photo upload', async () => {
    const user = userEvent.setup();

    render(<AddMealPage />);

    // Upload photo
    const photoInput = screen.getByLabelText(/add photo/i);
    await user.upload(photoInput, mockPhotoFile);

    // Fill form
    await user.type(screen.getByLabelText(/meal title/i), 'Pizza');
    await user.selectOptions(screen.getByLabelText(/meal type/i), 'dinner');

    // Submit
    await user.click(screen.getByRole('button', { name: /save meal/i }));

    // Verify API call
    expect(mockCreateMeal).toHaveBeenCalledWith({
      title: 'Pizza',
      mealType: 'dinner',
      photo: expect.any(File),
    });
  });
});
```

### E2E Testing (10% of tests)

**Tools:** Playwright
**Focus:** Critical user journeys

```typescript
// Example E2E test
test("complete meal logging journey", async ({ page }) => {
  // Login
  await page.goto("/login");
  await page.fill("[data-testid=email]", "test@example.com");
  await page.fill("[data-testid=password]", "password123");
  await page.click("[data-testid=login-button]");

  // Navigate to add meal
  await page.click("[data-testid=add-meal-fab]");

  // Fill meal form
  await page.fill("[data-testid=meal-title]", "Delicious Pizza");
  await page.selectOption("[data-testid=meal-type]", "dinner");
  await page.click("[data-testid=rating-8]");

  // Submit and verify
  await page.click("[data-testid=save-meal]");
  await expect(page.locator("[data-testid=meal-list]")).toContainText(
    "Delicious Pizza"
  );
});
```

### Accessibility Testing

**Tools:** axe-core + Manual testing
**Requirements:** WCAG 2.1 AA compliance

```typescript
// Automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('MealCard should be accessible', async () => {
  const { container } = render(<MealCard meal={mockMeal} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Performance Testing

**Tools:** Lighthouse CI + Web Vitals
**Targets:**

- Performance Score: >90
- Accessibility Score: >95
- Best Practices Score: >90
- SEO Score: >90

## 📊 Project Management

### Tools & Platforms

#### **Primary Tools:**

- **Project Management:** GitHub Projects (Kanban board)
- **Communication:** Slack/Discord for daily communication
- **Documentation:** Notion/Confluence for specs and decisions
- **Design:** Figma for design collaboration
- **Code Repository:** GitHub with automated workflows

#### **Kanban Board Structure:**

```
📋 Backlog → 🔄 In Progress → 👀 Review → 🧪 Testing → ✅ Done
```

### Sprint Ceremonies

#### **Sprint Planning** (1 hour, every 2 weeks)

- Review previous sprint performance
- Estimate and prioritize backlog items
- Commit to sprint goals and tasks
- Identify dependencies and blockers

#### **Daily Standups** (15 minutes, daily)

- What did you complete yesterday?
- What will you work on today?
- Any blockers or impediments?
- Quick sync on dependencies

#### **Sprint Review** (1 hour, end of sprint)

- Demo completed features
- Gather stakeholder feedback
- Update product backlog based on learnings
- Celebrate achievements

#### **Sprint Retrospective** (1 hour, end of sprint)

- What went well?
- What could be improved?
- Action items for next sprint
- Process improvements

### Risk Management

#### **Technical Risks:**

| Risk                           | Probability | Impact | Mitigation Strategy                   |
| ------------------------------ | ----------- | ------ | ------------------------------------- |
| React 19 compatibility issues  | Medium      | High   | Thorough testing, fallback plans      |
| Capacitor 7 plugin limitations | Low         | Medium | Research alternatives, custom plugins |
| Convex scaling issues          | Low         | High   | Monitor usage, optimization plans     |
| Mobile performance problems    | Medium      | High   | Regular performance testing           |
| Third-party API changes        | Medium      | Medium | Version pinning, monitoring           |

#### **Project Risks:**

| Risk                     | Probability | Impact | Mitigation Strategy                |
| ------------------------ | ----------- | ------ | ---------------------------------- |
| Scope creep              | High        | Medium | Clear requirements, change control |
| Resource availability    | Medium      | High   | Cross-training, documentation      |
| Timeline delays          | Medium      | High   | Buffer time, priority management   |
| Quality issues           | Low         | High   | Comprehensive testing strategy     |
| User adoption challenges | Medium      | High   | User research, beta testing        |

### Success Metrics & KPIs

#### **Development Metrics:**

- **Velocity:** Story points completed per sprint
- **Code Quality:** Test coverage >80%, ESLint compliance
- **Bug Rate:** <5 bugs per 100 story points
- **Deployment Frequency:** Daily to staging, weekly to production
- **Lead Time:** <3 days from commit to production

#### **Product Metrics:**

- **User Engagement:** 70% of users log ≥3 meals/week
- **App Performance:** <2s load time, >90 Lighthouse score
- **Crash Rate:** <1% crash-free sessions
- **User Satisfaction:** >4.5 app store rating
- **Retention:** 60% monthly active user retention

## 📈 Scaling Considerations

### Team Growth Plan

#### **Month 6: Add Mobile Specialist**

- Focus on advanced Capacitor features
- iOS/Android platform optimizations
- App store management and updates

#### **Month 9: Add Backend Developer**

- Convex optimization and scaling
- Third-party integrations
- Analytics and monitoring

#### **Month 12: Add DevOps Engineer**

- Infrastructure automation
- Monitoring and alerting
- Performance optimization

### Process Evolution

#### **Months 1-3: Startup Mode**

- Minimal process overhead
- Fast iteration and learning
- Direct communication

#### **Months 4-6: Growth Mode**

- Formalized processes
- Better documentation
- Quality gates

#### **Months 7-12: Scale Mode**

- Advanced tooling
- Automated workflows
- Performance monitoring

This comprehensive development planning document provides a roadmap for successfully building FoodyLog from concept to production, with clear roles, processes, and success metrics.
