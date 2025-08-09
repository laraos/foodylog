# FoodyLog - Product Requirements Document (2025)

_Version 2.0 - August 2025_

## 📋 Executive Summary

FoodyLog is a mobile-first food logging application that enables users to quickly capture, organize, and analyze their dining experiences. The app focuses on simplicity, offline-first functionality, and personal food journey tracking with optional social features. Delivery assumption: MVP executed by a solo developer, with selective contractor support for design/QA.

### Vision Statement

_"The simplest way to remember every meal that matters"_

### Mission

To help food enthusiasts create a comprehensive, personal record of their culinary experiences while providing insights into their eating patterns, preferences, and spending habits.

## 🎯 Product Goals

### Primary Goals

1. **Effortless Meal Logging**: Enable users to log meals in under 30 seconds
2. **Offline-First Experience**: Work seamlessly without internet connectivity
3. **Personal Insights**: Provide meaningful analytics about eating patterns
4. **Mobile-First Design**: Native mobile (Capacitor) and Web PWA from a single SPA codebase

## 👨‍💻 Development Quickstart (Bun)

```bash
bun install
bun run dev

# Mobile (first time)
bunx cap add android
# bunx cap add ios

# Sync and run
bunx cap sync
bunx cap run android
```

## 🔁 Live Reload on Device (Capacitor)

```bash
# .env.example
# Android Emulator
CAP_SERVER_URL=http://10.0.2.2:5173
# Physical device (replace with your PC IP)
# CAP_SERVER_URL=http://192.168.1.123:5173
```

Run Vite with LAN host (already in scripts): `bun run dev`. Then: `bunx cap run android --no-sync`.

## 📦 PWA Details

- Manifest: name/short_name/start_url/display/icons (192/512 PNG + maskable) and `apple-touch-icon` (180x180).
- Service worker: `registerType: 'autoUpdate'` and in-app update toast.
- Audits: Lighthouse PWA checks (installable, offline-capable, HTTPS).

## 🤖 CI Improvements (Bun)

- Use `oven-sh/setup-bun@v1`, `bun install`, caching Bun cache, `bun run build`.
- Mobile builds with `bunx cap build android` and artifact upload.
- Convex deploy with `bunx convex deploy` (use secrets).
- Concurrency to cancel stale runs:

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

## 🧾 Documentation Hygiene

- Prefer Bun commands in docs; commit `bun.lockb` only (no `package-lock.json`).
- Keep `.env.example` updated:

```bash
VITE_CONVEX_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_GOOGLE_PLACES_API_KEY=
VITE_SENTRY_DSN=
CAP_SERVER_URL=
```

### Success Metrics

- **Engagement**: 70% of users log at least 3 meals per week (12 per month)
- **Retention**: 60% monthly active user retention
- **Performance**: App loads in under 2 seconds
- **Reliability**: 99.5% uptime with offline functionality

## 👥 Target Audience

### Primary Users

- **Food Enthusiasts** (Ages 25-45): People who enjoy trying new restaurants and cuisines
- **Travelers** (Ages 28-50): Frequent travelers who want to remember dining experiences
- **Budget-Conscious Diners** (Ages 22-40): Users tracking food spending and value

### User Personas

#### Sarah - The Food Explorer

- Age: 32, Marketing Manager
- Lives in urban area, dines out 4-5 times per week
- Values: Discovery, quality, sharing experiences
- Pain Points: Forgetting great restaurants, tracking spending
- Goals: Remember favorite dishes, discover similar places

#### Mike - The Business Traveler

- Age: 38, Sales Director
- Travels 2-3 times per month for work
- Values: Efficiency, reliability, offline access
- Pain Points: Limited internet, forgetting local recommendations
- Goals: Track meals across cities, expense reporting

#### Emma - The Budget Tracker

- Age: 26, Graduate Student
- Careful with spending, cooks and dines out occasionally
- Values: Value for money, tracking expenses
- Pain Points: Overspending, forgetting good value meals
- Goals: Stay within budget, find affordable quality meals

## 🚀 Core Features

### MVP Features (Phase 1)

#### 1. User Authentication & Profile (Clerk)

- Authentication handled by Clerk (SignUp/SignIn components)
- Secure session management via Clerk SDK
- Password reset and email verification handled by Clerk
- Basic user preferences (timezone, default currency)
- Simple profile with name and email
- Account deletion via Clerk

#### 2. Meal Logging

- **Quick Add**: Title, rating (1-10), date
- **Photo Capture**: Single photo per meal with basic optimization
- **Location**: Simple text location entry (restaurant name or "Home")
- **Tags**: Basic free-text tagging (max 3 tags)
- **Meal Types**: Breakfast, Lunch, Dinner, Snack
- **Optional Price**: Simple price entry without currency (user's default)

#### 3. Meal Management

- View meal history in chronological order
- Edit existing meals (title, rating, photo, tags)
- Delete meals with confirmation
- Basic search by title
- Simple meal list with photos and ratings

#### 4. Basic Analytics

- Total meal count
- Average rating overall
- Meals logged this week/month
- Simple statistics dashboard

#### 5. Offline Functionality

- Log meals without internet connection
- Automatic sync when connectivity returns
- Offline queue with conflict resolution
- Local data persistence with Convex client
- Offline photo storage and batch upload
- Smart sync prioritization for critical data

### Enhanced Features (Phase 2)

#### 6. Advanced Photo System

- Multiple photos per meal (up to 5) with ordering
- Image optimization and compression with metadata
- Progressive loading with thumbnails
- Photo editing (crop, rotate, filters)
- Photo captions and primary photo selection
- Photo dimensions and file size tracking

#### 7. Enhanced Meal Details

- Description and notes fields
- Cuisine type and dish classification
- Spice level and serving size
- Companions and occasion tracking
- Value for money rating
- Recommendation flags

#### 8. Advanced Search & Filtering

- Search by title, tags, location, cuisine, or companions
- Advanced filtering (date range, rating, price, meal type)
- Saved search queries
- Tag autocomplete from user history

#### 9. Budget & Expense Tracking

- Multiple budget creation (monthly, weekly, yearly)
- Spending categories and alerts
- Budget vs actual spending analysis
- Currency conversion and multi-currency support
- Expense categorization by cuisine, meal type, or custom tags
- Budget sharing and family expense tracking

#### 10. Places Integration

- GPS location detection with coordinates
- Restaurant database with comprehensive info (cuisine, price range, contact)
- Google Places API integration with place IDs
- Location-based meal filtering and discovery
- Favorite places tracking with personal notes
- Place statistics (meal count, average rating, total spent)
- City and country-based meal organization

#### 11. Enhanced Analytics

- Visual charts and graphs with interactive insights
- Eating pattern insights (time, frequency, companions)
- Spending analysis with visual breakdowns
- Cuisine preference analysis with recommendations
- Monthly/yearly comparisons with trend analysis
- Rating distribution and value-for-money insights
- Top places and dishes recommendations
- Personalized insights based on user behavior

#### 12. Notifications & Activity Feed

- Push notifications for meal logging reminders
- Budget alert notifications when approaching limits
- Social notifications (likes, comments, follows)
- Weekly/monthly summary notifications
- Custom reminder scheduling
- In-app notification center with read/unread status
- User activity feed showing recent actions

#### 13. Marketing Website

- Landing page showcasing app features
- App store download links (iOS/Android)
- User testimonials and screenshots
- SEO-optimized content for discovery

#### 14. Export & Backup

- CSV export for data portability with all meal details
- PDF reports with photos and analytics
- Automated cloud backup via Convex
- Data import from other food logging apps
- GDPR-compliant data export with complete user history
- Meal collection exports and sharing
- Analytics report generation with custom date ranges

### Growth Features (Phase 3)

#### 15. Social Features

- Optional public profiles with bio, location, and stats
- Meal sharing with granular privacy controls
- Follow/unfollow other users with follower counts
- Discovery feed of public meals with engagement metrics
- Like and comment on shared meals with nested replies
- Activity feed showing user actions and updates
- Meal collections sharing and collaboration
- User recommendations based on similar tastes

#### 16. AI-Powered Features

- Food recognition from photos
- Smart meal suggestions
- Automatic cuisine classification
- Personalized recommendations

#### 17. Premium Subscription Benefits

- Access to all Phase 2 and Phase 3 features
- Multiple photos per meal (up to 5 vs 1 for free)
- Unlimited photo storage (vs 100MB for free)
- Advanced analytics with unlimited history (vs 30 days for free)
- Priority customer support and feature requests
- Early access to new features and beta testing
- Ad-free experience with enhanced performance

## 🎨 User Experience Principles

### Design Philosophy

1. **Simplicity First**: Every feature should be intuitive and require minimal learning
2. **Mobile-Optimized**: Touch-first design with thumb-friendly interactions
3. **Fast & Responsive**: Sub-second response times for core actions
4. **Offline-Ready**: Full functionality without internet connection
5. **Privacy-Focused**: User data is private by default
6. **Accessibility-First**: Inclusive design for users with disabilities
7. **Globally Inclusive**: Multi-language and cultural considerations

### Key User Flows

#### Primary Flow: Log a Meal

1. Open app → Tap "Add Meal"
2. Take photo or select from gallery
3. Enter title and rating (1-10)
4. Select meal type (Breakfast, Lunch, Dinner, Snack)
5. Add optional location and price
6. Add up to 3 tags if desired
7. Save → Return to meal list

**Target Time**: Under 30 seconds

#### Secondary Flow: Find Past Meal

1. Open app → View meal list with photos
2. Use basic search by title or scroll through chronological list
3. Tap meal to view details (photo, rating, location, tags)
4. Edit meal details if needed
5. Return to meal list

**Target Time**: Under 15 seconds

## ♿ Accessibility & Internationalization

### Accessibility Requirements

#### Visual Accessibility

- **High Contrast Mode**: Support for high contrast themes and dark mode
- **Font Scaling**: Dynamic text sizing up to 200% without breaking layouts
- **Color Independence**: No information conveyed through color alone
- **Focus Indicators**: Clear visual focus indicators for keyboard navigation
- **Minimum Touch Targets**: 44px minimum touch target size (iOS) / 48dp (Android)

#### Motor Accessibility

- **Keyboard Navigation**: Full app functionality accessible via keyboard/external keyboard
- **Voice Control**: Support for iOS Voice Control and Android Voice Access
- **Switch Control**: Compatible with assistive switch devices
- **Gesture Alternatives**: Alternative input methods for complex gestures
- **Timeout Extensions**: Adjustable or extendable timeout periods

#### Cognitive Accessibility

- **Simple Language**: Clear, concise text with reading level considerations
- **Consistent Navigation**: Predictable navigation patterns throughout the app
- **Error Prevention**: Clear validation messages and error recovery
- **Progress Indicators**: Clear feedback for multi-step processes
- **Undo Functionality**: Easy reversal of actions, especially deletions

#### Screen Reader Support

- **VoiceOver/TalkBack**: Full compatibility with native screen readers
- **Semantic Markup**: Proper heading structure and landmark regions
- **Alt Text**: Descriptive alternative text for all images and photos
- **Live Regions**: Dynamic content updates announced to screen readers
- **Custom Actions**: Screen reader shortcuts for common actions

#### Hearing Accessibility

- **Visual Notifications**: Visual alternatives to audio notifications
- **Captions**: Text alternatives for any audio content
- **Vibration Patterns**: Customizable haptic feedback patterns

### Internationalization (i18n) Strategy

#### Language Support

**Phase 1 Languages (Launch)**

- English (US) - Primary

**Phase 2 Languages (Months 7-12)**

- Spanish (ES/MX) - Large food culture markets
- French (FR) - European market
- Japanese (JP) - Strong food logging culture
- German (DE) - European expansion
- Italian (IT) - Food culture alignment
- Portuguese (BR) - Latin American market
- Korean (KR) - Asian market expansion
- Chinese Simplified (CN) - Large market potential

**Phase 3 Languages (Year 2)**

- Dutch (NL), Swedish (SE), Norwegian (NO) - Nordic markets
- Arabic (AR) - Middle East expansion
- Hindi (IN) - Indian market
- Thai (TH), Vietnamese (VN) - Southeast Asian markets

#### Cultural Considerations

**Currency & Pricing**

- Local currency display and input
- Currency conversion with live exchange rates
- Regional price formatting (€1,50 vs $1.50)
- Local tipping culture considerations

**Date & Time Formats**

- Regional date formats (DD/MM/YYYY vs MM/DD/YYYY)
- 12/24 hour time format preferences
- Local timezone handling
- Cultural calendar considerations (lunar calendars, holidays)

**Food Culture Adaptations**

- Regional cuisine classifications
- Local meal timing conventions (siesta, late dinners)
- Cultural dietary restrictions and preferences
- Regional portion size expectations
- Local food terminology and slang

**Social & Privacy Norms**

- Regional privacy expectations
- Cultural sharing preferences
- Local social media integration preferences
- Regional content moderation standards

#### Technical Implementation

**Text Handling**

- Unicode support for all character sets
- Right-to-left (RTL) language support for Arabic
- Text expansion considerations (German text ~30% longer)
- Font selection for different scripts
- Input method support (IME for Asian languages)

**Content Management**

- Translation management system integration
- Context-aware translations for food terms
- Pluralization rules for different languages
- Gender-specific translations where applicable
- Regional content variations

**Data Localization**

- Regional cuisine databases
- Local restaurant chain recognition
- Regional food classification systems
- Local measurement units (metric/imperial)
- Regional tax and pricing structures

### Implementation Roadmap

#### Phase 1: Foundation (Months 1-3)

- [ ] Basic accessibility audit and compliance
- [ ] Screen reader compatibility implementation
- [ ] High contrast and dark mode support
- [ ] English localization infrastructure setup
- [ ] Basic keyboard navigation support

#### Phase 2: Core Accessibility (Months 4-6)

- [ ] Full WCAG 2.1 AA compliance
- [ ] Voice control compatibility
- [ ] Advanced keyboard navigation
- [ ] Spanish and French localization
- [ ] Cultural adaptation for target markets

#### Phase 3: Advanced Features (Months 7-12)

- [ ] Switch control and assistive device support
- [ ] Additional language rollouts
- [ ] Regional cuisine database expansion
- [ ] Cultural customization features
- [ ] Advanced accessibility preferences

### Compliance & Standards

#### Accessibility Standards

- **WCAG 2.1 AA**: Web Content Accessibility Guidelines compliance
- **Section 508**: US federal accessibility requirements
- **EN 301 549**: European accessibility standard
- **iOS Accessibility**: Apple's accessibility guidelines
- **Android Accessibility**: Google's accessibility best practices

#### Testing Strategy

- **Automated Testing**: Integration with accessibility testing tools
- **Manual Testing**: Regular testing with assistive technologies
- **User Testing**: Testing with users who have disabilities
- **Accessibility Audits**: Quarterly third-party accessibility reviews
- **Compliance Monitoring**: Ongoing monitoring of accessibility metrics

#### Internationalization Standards

- **ISO 639**: Language code standards
- **ISO 3166**: Country code standards
- **Unicode**: Character encoding standards
- **CLDR**: Common Locale Data Repository
- **ICU**: International Components for Unicode

### Success Metrics

#### Accessibility Metrics

- **Screen Reader Usage**: Percentage of users using assistive technologies
- **Accessibility Feature Adoption**: Usage of high contrast, font scaling, etc.
- **Task Completion Rates**: Success rates for users with disabilities
- **Accessibility Complaints**: Number and resolution of accessibility issues
- **Compliance Score**: Automated accessibility testing scores

#### Internationalization Metrics

- **Language Distribution**: User distribution across supported languages
- **Localization Quality**: Translation accuracy and cultural appropriateness
- **Regional Engagement**: User engagement rates by region
- **Cultural Feature Usage**: Adoption of region-specific features
- **Market Penetration**: Growth rates in international markets

**Target Time**: Under 15 seconds

## 🏗️ Technical Architecture

### Technology Stack

#### Application (Single SPA)

- **Framework**: React + TypeScript + Vite (PWA) with Capacitor 7 for native builds
- **Navigation**: react-router-dom (SPA routing)
- **State Management**: Convex React hooks; React 19 features optional
- **UI Components**: shadcn/ui with Tailwind CSS
- **Auth**: Clerk SDK on frontend; Convex verifies Clerk JWT for backend
- **Storage**: Convex client with Capacitor 7 Preferences and Filesystem APIs

#### Marketing Website (Phase 2 option)

- Optional landing built separately (out of scope for single SPA codebase). If needed, use a simple static site or Next.js later.

#### Backend & Database

- **Backend**: Convex (serverless functions + database + real-time)
- **Authentication**: Clerk-issued JWTs verified in Convex; user mapping persisted in Convex
- **File Storage**: Convex File Storage for photos
- **Real-time Sync**: Convex subscriptions for live updates
- **Offline Support**: Convex client handles offline queuing and sync

#### Development Tools

- **Mobile Build**: Capacitor 7 CLI for iOS/Android builds
- **Package Manager**: Bun for fast package management and scripts
- **Build Tool**: Vite 6+ (vite-plugin-pwa for service worker/manifest)
- **Testing**: Playwright for automated E2E testing, Vitest for unit tests, axe-core for accessibility testing
- **CI/CD**: GitHub Actions for automated builds and deployments
- **Analytics**: Convex dashboard for backend metrics
- **Internationalization**: react-i18next for translations, Crowdin for translation management
- **Accessibility**: ESLint accessibility plugins, Capacitor 7 accessibility features

### Data Model

#### Core Entities (Convex Schema)

```typescript
// Users (managed by Clerk; mapped in Convex)
users: {
  _id: Id<"users">,
  email: string,
  name?: string,
  avatar?: Id<"_storage">, // profile picture
  preferences: {
    defaultCurrency: string, // "USD", "EUR", etc.
    timezone: string,
    units: "metric" | "imperial",
    language: string, // "en", "es", "fr", "ja", etc.
    region: string, // "US", "ES", "FR", "JP", etc.
    dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD",
    timeFormat: "12h" | "24h",
    accessibility: {
      highContrast: boolean,
      fontSize: "small" | "medium" | "large" | "xlarge",
      reduceMotion: boolean,
      screenReader: boolean,
      voiceControl: boolean
    },
    privacy: {
      profilePublic: boolean,
      mealsPublic: boolean,
      allowFollowers: boolean
    }
  },
  stats: {
    totalMeals: number,
    totalSpent: number,
    averageRating: number,
    favoritesCuisine?: string
  },
  subscription: {
    tier: "free" | "premium",
    expiresAt?: number,
    provider?: "appstore" | "play" | "web",
    externalRef?: string
  },
  _creationTime: number,
  _updatedTime?: number
}

// User Profiles (for social features)
userProfiles: {
  _id: Id<"userProfiles">,
  userId: Id<"users">,
  displayName: string,
  bio?: string,
  location?: string,
  website?: string,
  isPublic: boolean,
  followerCount: number,
  followingCount: number,
  mealCount: number,
  _creationTime: number
}

// Meals - Core fields for MVP, enhanced fields for premium
meals: {
  _id: Id<"meals">,
  userId: Id<"users">,
  title: string, // max 100 characters
  rating: number, // 1-10, validated
  price?: number, // min 0, max 99999.99 - optional
  dateEaten: number, // timestamp
  mealType: "breakfast" | "lunch" | "dinner" | "snack",

  // MVP fields
  locationText?: string, // simple text location - max 100 characters
  tags: string[], // max 3 tags for free, 10 for premium, each max 30 characters

  // Premium/Phase 2 fields (null for free users until they upgrade)
  description?: string, // max 500 characters - premium only
  mealTypeExtended?: "dessert" | "drink" | "brunch", // premium meal types

  // Location data
  location?: {
    name: string, // restaurant/place name
    address?: string,
    city?: string,
    country?: string,
    coordinates?: {
      lat: number,
      lng: number
    },
    placeId?: string // Google Places ID
  },

  // Premium/Phase 2 meal details
  cuisine?: string, // "Italian", "Japanese", etc. - max 50 characters - premium only
  dishType?: string, // "Pizza", "Sushi", etc. - max 50 characters - premium only
  servingSize?: "small" | "medium" | "large" | "sharing", // premium only
  spiceLevel?: 1 | 2 | 3 | 4 | 5, // validated range - premium only

  // Social and sharing
  isPublic: boolean,
  allowComments: boolean,
  likeCount: number,
  commentCount: number,
  shareCount: number,

  // Premium/Phase 2 metadata
  notes?: string, // max 1000 characters - premium only
  occasion?: string, // "birthday", "date", "business", etc. - max 50 characters - premium only
  companions?: string[], // who you ate with - max 10 people, each max 50 characters - premium only

  // Premium/Phase 2 tracking
  isRecommended?: boolean, // would recommend to others - premium only
  wouldOrderAgain?: boolean, // premium only
  valueForMoney?: number, // 1-5 rating, validated range - premium only

  _creationTime: number,
  _updatedTime?: number
}

// Photos - Enhanced with metadata
mealPhotos: {
  _id: Id<"mealPhotos">,
  mealId: Id<"meals">,
  storageId: Id<"_storage">,
  fileName: string, // max 255 characters
  fileSize: number, // max 10MB for premium, 5MB for free
  mimeType: string, // "image/jpeg", "image/png", "image/webp"
  width?: number,
  height?: number,
  isPrimary: boolean, // main photo for the meal
  caption?: string, // max 200 characters
  order: number, // 0-4 for multiple photos (max 5 for premium, 1 for free)
  _creationTime: number
}

// Places - Restaurant/location database
places: {
  _id: Id<"places">,
  name: string,
  address?: string,
  city: string,
  country: string,
  coordinates?: {
    lat: number,
    lng: number
  },
  placeId?: string, // Google Places ID
  cuisine?: string[],
  priceRange?: "$" | "$$" | "$$$" | "$$$$",
  rating?: number, // aggregated from meals
  mealCount: number, // how many meals logged here
  website?: string,
  phone?: string,
  _creationTime: number,
  _updatedTime?: number
}

// User favorite places
favoritePlaces: {
  _id: Id<"favoritePlaces">,
  userId: Id<"users">,
  placeId: Id<"places">,
  notes?: string,
  _creationTime: number
}

// Social follows
follows: {
  _id: Id<"follows">,
  followerId: Id<"users">,
  followingId: Id<"users">,
  _creationTime: number
}

// Meal likes
mealLikes: {
  _id: Id<"mealLikes">,
  userId: Id<"users">,
  mealId: Id<"meals">,
  _creationTime: number
}

// Meal comments
mealComments: {
  _id: Id<"mealComments">,
  userId: Id<"users">,
  mealId: Id<"meals">,
  content: string, // max 500 characters
  parentCommentId?: Id<"mealComments">, // for replies
  likeCount: number,
  isModerated: boolean, // for content moderation
  isReported: boolean, // user reporting system
  reportCount: number, // number of reports
  _creationTime: number,
  _updatedTime?: number
}

// User tags (for autocomplete and analytics)
userTags: {
  _id: Id<"userTags">,
  userId: Id<"users">,
  name: string,
  usageCount: number,
  lastUsed: number,
  _creationTime: number
}

// Budget tracking
budgets: {
  _id: Id<"budgets">,
  userId: Id<"users">,
  name: string, // "Monthly Dining", "Travel Food", etc. - max 50 characters
  amount: number, // min 0, max 999999.99
  currency: string, // required for budget tracking
  period: "weekly" | "monthly" | "yearly",
  startDate: number,
  endDate: number,
  spent: number, // calculated field, updated on meal creation
  isActive: boolean,
  _creationTime: number,
  _updatedTime?: number
}

// Meal collections/lists
mealCollections: {
  _id: Id<"mealCollections">,
  userId: Id<"users">,
  name: string,
  description?: string,
  isPublic: boolean,
  mealIds: Id<"meals">[],
  coverPhotoId?: Id<"mealPhotos">,
  _creationTime: number,
  _updatedTime?: number
}

// User activity feed
activities: {
  _id: Id<"activities">,
  userId: Id<"users">,
  type: "meal_logged" | "place_visited" | "user_followed" | "meal_liked" | "comment_added",
  entityId: string, // ID of the related entity
  metadata?: Record<string, any>,
  _creationTime: number
}

// App analytics and insights
userInsights: {
  _id: Id<"userInsights">,
  userId: Id<"users">,
  period: "weekly" | "monthly" | "yearly",
  startDate: number,
  endDate: number,
  data: {
    totalMeals: number,
    totalSpent: number,
    averageRating: number,
    topCuisines: Array<{ cuisine: string, count: number }>,
    topPlaces: Array<{ placeId: Id<"places">, count: number }>,
    spendingByCategory: Record<string, number>,
    mealsByType: Record<string, number>,
    ratingDistribution: Record<string, number>
  },
  _creationTime: number
}

// Notifications
notifications: {
  _id: Id<"notifications">,
  userId: Id<"users">,
  type: "follow" | "like" | "comment" | "budget_alert" | "reminder",
  title: string, // max 100 characters
  message: string, // max 300 characters
  isRead: boolean,
  actionUrl?: string,
  metadata?: Record<string, any>,
  _creationTime: number
}

// User storage quota tracking (for free tier limits)
userStorageQuota: {
  _id: Id<"userStorageQuota">,
  userId: Id<"users">,
  totalUsed: number, // bytes used
  photoCount: number, // total photos uploaded
  lastCalculated: number, // timestamp of last calculation
  _creationTime: number,
  _updatedTime?: number
}

// Content reports (for moderation)
contentReports: {
  _id: Id<"contentReports">,
  reporterId: Id<"users">,
  contentType: "meal" | "comment" | "profile",
  contentId: string, // ID of reported content
  reason: "spam" | "inappropriate" | "harassment" | "copyright" | "other",
  description?: string, // max 500 characters
  status: "pending" | "reviewed" | "resolved" | "dismissed",
  _creationTime: number,
  _updatedTime?: number
}

// Search optimization (denormalized data for fast queries)
mealSearchIndex: {
  _id: Id<"mealSearchIndex">,
  mealId: Id<"meals">,
  userId: Id<"users">,
  searchText: string, // combined title, description, tags, cuisine for full-text search
  dateEaten: number,
  rating: number,
  isPublic: boolean,
  _creationTime: number,
  _updatedTime?: number
}
```

#### Entity Relationships

```typescript
// Key relationships and indexes for optimal queries:

// User -> Meals (one-to-many)
// User -> Photos (through Meals)
// User -> Places (through Meals and Favorites)
// User -> Followers/Following (many-to-many through follows)
// Meal -> Photos (one-to-many)
// Meal -> Place (many-to-one)
// Meal -> Likes/Comments (one-to-many)
// Place -> Meals (one-to-many)

// Recommended Convex indexes:
// - meals: by userId, by dateEaten, by isPublic, by rating
// - mealPhotos: by mealId, by isPrimary, by userId (for storage quota)
// - places: by coordinates (for location search), by city, by cuisine
// - follows: by followerId, by followingId
// - mealLikes: by userId, by mealId
// - userTags: by userId, by usageCount, by lastUsed
// - mealComments: by mealId, by userId, by isReported
// - budgets: by userId, by isActive, by period
// - userStorageQuota: by userId
// - contentReports: by status, by contentType
// - mealSearchIndex: by searchText (full-text), by userId, by dateEaten
```

### Performance Requirements

- **App Launch**: < 2 seconds cold start
- **Meal List Load**: < 1 second for 100 meals
- **Photo Upload**: < 5 seconds for 5MB image
- **Offline Sync**: < 10 seconds for 50 pending items
- **Search Results**: < 500ms for text search

### Security & Privacy

- **Data Encryption**: All data encrypted in transit and at rest via Convex
- **Authentication**: Clerk for identity; Convex verifies Clerk-issued JWT and maps to user record
- **Privacy**: All user data private by default with Convex access control
- **GDPR Compliance**: Full data export and deletion via Convex functions
- **Access Control**: Function-level security with user authentication checks

## 📱 Platform Strategy

### Mobile-First Approach

- **Primary Platform**: iOS and Android via Capacitor
- **Distribution**: App Store and Google Play Store
- **Updates**: App store updates with Capacitor Live Updates for minor changes
- **Offline**: Full offline functionality with Convex sync

### Marketing Website

- **Purpose**: App promotion and user acquisition
- **Features**: Feature showcase, download links, testimonials
- **Responsive**: Mobile-optimized landing page
- **SEO**: Optimized for app discovery and downloads

### Future Platforms

- **Apple Watch**: Quick meal logging and reminders
- **Desktop Apps**: Native apps for power users
- **Browser Extension**: Quick save from restaurant websites

## 💰 Business Model

### Freemium Model

#### Free Tier

- Unlimited meal logging (MVP features only)
- Basic analytics (last 30 days, simple metrics)
- Single photo per meal (up to 100MB total storage)
- Core features with occasional ads
- Basic search by title only
- Standard sync frequency

#### Premium Tier ($3.99/month or $39.99/year)

- Access to all Phase 2 enhanced features
- Access to Phase 3 growth features (when available)
- Ad-free experience
- Priority customer support
- Early access to new features
- Unlimited photo storage
- Real-time sync priority

### Revenue Projections (Year 1)

- **Target Users**: 8,000 active users by end of year 1
- **Conversion Rate**: 5% to premium (conservative estimate)
- **Premium Users**: 400 users
- **Monthly Revenue**: $1,596 (400 premium users × $3.99)
- **Annual Revenue**: $19,152

### Revenue Projections (Year 2-3)

- **Target Users**: 25,000 active users by end of year 2
- **Conversion Rate**: 7% to premium (with feature maturity)
- **Premium Users**: 1,750 users
- **Monthly Revenue**: $6,983 (1,750 premium users × $3.99)
- **Annual Revenue**: $83,796

### Monetization Timeline

- **Months 1-6**: Focus on user acquisition and engagement, no monetization
- **Months 7-9**: Introduce premium features with limited beta testing
- **Months 10-12**: Full premium launch with conservative pricing
- **Year 2**: Optimize conversion funnel and introduce annual subscriptions
- **Year 3+**: Explore partnerships and additional revenue streams

### Ads & Consent Plan (Free Tier)

- **SDK Choice**: Google AdMob for iOS/Android (via Capacitor plugin). No ads on the marketing website.
- **Consent & Compliance**:
  - Use Google User Messaging Platform (UMP) SDK for GDPR/CCPA consent collection.
  - Age gating (tag for non–child-directed treatment). Respect regional regulations.
  - Store consent locally; do not request ads until consent is resolved. Provide settings to revoke/change consent.
- **Ad Placements (UX-safe)**:
  - Meal List: Native/banner unit between cards after the 3rd item, then every ~10 items (frequency capped).
  - Meal Detail: Single bottom banner (no overlap with action buttons).
  - Interstitials: Optional “app open” or between non-critical navigations; never during camera capture, form submit, or authentication.
  - No ads on login/onboarding, camera/photo flows, checkout/subscription, or while offline.
- **Premium Exclusion**: Ads fully disabled and SDK not initialized for premium users.
- **Frequency & Quality**:
  - Global frequency caps; per-session and per-day limits. Category and content filters to avoid sensitive categories.
  - A/B testing for placement density vs. retention.
- **Measurement**: Track impressions/fill rate/estimated earnings (aggregated, no PII). Respect ad SDK policies.
- **Timeline**: Implement Months 7–9 alongside premium; soft launch with limited geo to validate impact.

### Cost Structure (Annual)

- **Development & Maintenance**: $45,000 (contractor/part-time dev)
- **Infrastructure (Convex, hosting)**: $3,600 ($300/month)
- **Third-party APIs (Google Places, etc.)**: $2,400 ($200/month)
- **Translation & Localization**: $4,800 ($400/month for 4 languages)
- **Accessibility Testing & Compliance**: $3,000 (quarterly audits)
- **Marketing & User Acquisition**: $12,000 (reduced budget)
- **App Store Fees (30% of revenue)**: $5,746
- **Total Operating Costs**: $76,546
- **Net Revenue (Year 1)**: -$57,394 (investment phase)
- **Break-even**: Month 22-24 with 1,600+ premium users ($6,384/month revenue)

## 🗓️ Development Roadmap

### Phase 1: Foundation (Months 1-3)

**Goal**: Solid MVP with core functionality

#### Month 1: Core Infrastructure

- [ ] Complete authentication system with basic user preferences
- [ ] Simple meal CRUD operations (title, rating, photo, tags, meal type)
- [ ] Basic photo upload and storage
- [ ] Offline functionality foundation with Convex sync
- [ ] Simple user profile (name, email, timezone, currency)
- [ ] Basic accessibility implementation (screen reader, keyboard navigation)
- [ ] Internationalization infrastructure setup

#### Month 2: User Experience

- [ ] Clean UI/UX design with shadcn/ui components
- [ ] Basic search functionality by title
- [ ] Simple analytics dashboard (meal count, average rating)
- [ ] Basic tag system (max 3 tags per meal)
- [ ] Performance optimization and caching
- [ ] WCAG 2.1 AA compliance implementation
- [ ] High contrast and dark mode support
- [ ] Spanish localization planning (implementation deferred to Phase 2 unless capacity allows)

#### Month 3: Polish & Testing

- [ ] Playwright E2E testing suite with accessibility tests
- [ ] Bug fixes and stability improvements
- [ ] App store preparation and assets (multiple languages)
- [ ] Beta user feedback integration
- [ ] Accessibility testing with assistive technologies
- [ ] Localization asset preparation (copy, keys, screenshots); French and Japanese implementation targeted for Phase 2

### Phase 2: Enhancement (Months 4-6)

**Goal**: Feature-complete application

#### Month 4: Premium Features Foundation

- [ ] Premium subscription system planning with Clerk identity; implementation targeted Months 7–9
- [ ] Multiple photo support with captions and ordering
- [ ] Enhanced meal details fields (description, cuisine, companions)
- [ ] Marketing website launch
- [ ] Premium feature access control

#### Month 5: Advanced Premium Features

- [ ] Advanced search and filtering capabilities
- [ ] Enhanced analytics with visual charts
- [ ] Budget tracking and expense management
- [ ] Places integration with Google Places API
- [ ] Export and backup system
- [ ] Performance optimization

#### Month 6: Launch Preparation

- [ ] Marketing website
- [ ] App store optimization
- [ ] Customer support system
- [ ] Analytics and monitoring

### Phase 3: Growth (Months 7-12)

**Goal**: User acquisition and monetization

#### Months 7-9: Market Launch

- [ ] Public app store launch (English markets first)
- [ ] Organic marketing campaigns
- [ ] User acquisition optimization through app store
- [ ] Premium subscription beta testing

#### Months 10-12: Scale & Optimize

- [ ] Premium subscription full launch
- [ ] User retention optimization
- [ ] Basic AI-powered features (food recognition)
- [ ] Spanish and French market expansion
- [ ] Partnership exploration and integration

## 📊 Success Metrics & KPIs

### User Engagement

- **Daily Active Users (DAU)**: Target 25% of MAU
- **Monthly Active Users (MAU)**: Target 8,000 by end of year 1
- **Session Length**: Average 3-5 minutes per session
- **Meals per User**: Average 12 meals logged per month

### Product Metrics

- **Feature Adoption**: 80% of users use basic search within first week
- **Photo Upload Rate**: 70% of meals include photos
- **Retention**: 60% monthly retention, 30% quarterly retention
- **App Store Rating**: Maintain 4.5+ stars

### Business Metrics

- **Premium Conversion**: 5-7% of active users convert to premium
- **Customer Acquisition Cost (CAC)**: Under $15 per user
- **Lifetime Value (LTV)**: $48+ per premium user (12 months average retention)
- **Churn Rate**: Under 8% monthly for premium users
- **Average Revenue Per User (ARPU)**: $2.40 per month (blended free/premium)

### Technical Metrics

- **App Performance**: 99.5% crash-free sessions
- **Load Times**: 95% of screens load under 2 seconds
- **Offline Reliability**: 99% successful sync rate
- **API Response Time**: 95% of requests under 500ms

### Accessibility & Internationalization Metrics

- **Accessibility Compliance**: WCAG 2.1 AA compliance score >95%
- **Screen Reader Usage**: Track and support assistive technology users
- **Language Distribution**: User adoption across supported languages
- **Cultural Feature Usage**: Adoption of region-specific features
- **Translation Quality**: User feedback on localization accuracy

## 🎯 Go-to-Market Strategy

### Pre-Launch (Months 1-6)

- **Beta Testing**: 50-75 beta users for feedback (more focused group)
- **Content Marketing**: Food blogging and social media (organic focus)
- **Community Building**: Engage with food enthusiast communities
- **App Store Optimization**: Prepare store listings and screenshots for multiple languages

### Launch (Months 7-9)

- **Soft Launch**: Limited geographic release (English-speaking markets first)
- **Micro-Influencer Partnerships**: Smaller food bloggers and travel influencers (budget-conscious)
- **PR Campaign**: Targeted tech and food media outreach
- **Organic Marketing**: Focus on app store optimization and word-of-mouth

### Growth (Months 10-12)

- **Referral Program**: Simple user referral incentives (premium trial extensions)
- **Strategic Partnerships**: Explore partnerships with food delivery apps
- **Content Expansion**: User-generated content and community features
- **International Markets**: Gradual expansion to Spanish and French markets with cultural adaptations
- **Accessibility Outreach**: Partner with disability advocacy organizations
- **Regional Partnerships**: Local food bloggers and cultural influencers

### Marketing Channels (Priority Order)

1. **Organic**: App store optimization, content marketing (primary focus)
2. **Social Media**: Instagram, TikTok, food communities (organic content)
3. **Word-of-Mouth**: User referrals and community building
4. **PR & Media**: Food and tech publications (earned media)
5. **Strategic Partnerships**: Food delivery apps, travel apps (revenue sharing)
6. **Paid Advertising**: Limited budget Google Ads, Facebook/Instagram ads (Year 2+)

## 🔮 Future Vision

### Year 2-3 Expansion

- **AI Integration**: Advanced food recognition and recommendations
- **Social Platform**: Full social network for food enthusiasts
- **Business Features**: Restaurant owner tools and analytics
- **Health Integration**: Nutrition tracking and health insights
- **Global Expansion**: Multi-language support and local partnerships

### Long-term Vision (5+ years)

- **Platform Ecosystem**: Third-party integrations and API
- **Enterprise Solutions**: Corporate dining and expense management
- **AR/VR Features**: Immersive dining experience capture
- **IoT Integration**: Smart kitchen and restaurant integrations
- **Marketplace**: Food-related product recommendations and sales

---

_This PRD serves as the foundation for FoodyLog's development and should be updated regularly based on user feedback, market changes, and business priorities._
