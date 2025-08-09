# FoodyLog Systematic Problem Solving & Knowledge Management

**For every FoodyLog development task, use a systematic approach combining Clear Thought MCP tools, Context7 documentation access, and Basic Memory integration.**

## FoodyLog Project Context

**Vision:** "The simplest way to remember every meal that matters"

**Mission:** To help food enthusiasts create a comprehensive, personal record of their culinary experiences while providing insights into their eating patterns, preferences, and spending habits.

**Core Stack:**

- **Frontend**: React + TypeScript + Vite (SPA with react-router-dom)
- **Mobile**: Capacitor 7 for iOS/Android native builds
- **Backend**: Convex (serverless functions + database + real-time sync)
- **Authentication**: Clerk (frontend-first with JWT verification in Convex)
- **UI Components**: shadcn/ui with Tailwind CSS
- **Package Manager**: Bun for fast package management and scripts

**Development Approach:** Solo developer with 12-month timeline, MVP in 3 months, 2-week sprints

## Required Task Assessment Process

**Before starting ANY FoodyLog task:**

1. **Check Basic Memory** for relevant FoodyLog patterns and lessons learned
2. **Use Context7 MCP** to access up-to-date library documentation (React 19, Convex, Capacitor 7, Clerk)
3. **Apply Sequential Thinking** for complex problem-solving and multi-step analysis
4. **Document learnings** in Basic Memory after completion

## Clear Thought MCP Capabilities

- **sequentialthinking**: Process thoughts step-by-step, with branching, revision, and memory management ⭐ **PRIMARY TOOL**
- **mentalmodel**: Apply mental models for systematic analysis (first_principles, opportunity_cost, error_propagation, rubber_duck, pareto_principle, occams_razor)
- **debuggingapproach**: Use structured debugging methods to identify and resolve issues
- **decisionframework**: Use structured frameworks for decision-making
- **metacognitivemonitoring**: Monitor and assess your own thinking and knowledge
- **socraticmethod**: Guide inquiry through systematic questioning
- **creativethinking**: Employ creative and lateral thinking strategies
- **systemsthinking**: Analyze complex systems and their interactions
- **scientificmethod**: Apply the scientific method for systematic inquiry
- **structuredargumentation**: Build and analyze structured arguments
- **visualreasoning**: Use visual reasoning and diagrammatic operations

## Context7 MCP Integration

**Always use Context7 for library documentation:**

1. **resolve-library-id**: Find the correct Context7-compatible library ID
2. **get-library-docs**: Fetch up-to-date documentation with focused topics
3. **Use before implementation**: Never assume library APIs - always verify current documentation

## Mandatory Task Workflow

### 1. Pre-Task Assessment (REQUIRED)

```
1. Search Basic Memory for relevant context: `search_notes` with task keywords
2. Check Context7 for library documentation: `resolve-library-id` → `get-library-docs`
3. Use `sequentialthinking` to break down the task systematically
4. Apply `metacognitivemonitoring` to assess knowledge gaps and confidence
```

### 2. During Implementation

```
1. Continue `sequentialthinking` for complex multi-step processes
2. Use `debuggingapproach` when encountering issues
3. Apply `systemsthinking` for understanding component interactions
4. Reference Context7 docs for API verification
```

### 3. Post-Task Documentation (REQUIRED)

```
1. Document key learnings in Basic Memory
2. Update patterns and lessons learned
3. Cross-reference related implementations
4. Tag with relevant technologies
```

## Tool Selection Guide

### Primary Tools (Use First)

- **sequentialthinking**: Default for ANY complex task or multi-step process
- **Context7 MCP**: Always verify library APIs and documentation
- **Basic Memory**: Check existing knowledge before starting, document after completing

### Secondary Tools (Use When Needed)

- **debuggingapproach**: When encountering bugs or unexpected behavior
- **decisionframework**: For architectural choices and trade-offs
- **mentalmodel**: For systematic analysis (first_principles, opportunity_cost)
- **systemsthinking**: For understanding complex component relationships

## FoodyLog Basic Memory Organization

### Folder Structure (REQUIRED)

```
specs/[feature-name]/     # Feature specifications and requirements
  ├── requirements.md     # Feature requirements
  ├── design.md          # Design decisions
  ├── implementation.md  # Implementation notes
  └── lessons.md         # Lessons learned

patterns/                # Reusable patterns and solutions
  ├── ui-components/     # shadcn/ui component patterns
  ├── data-flow/         # Convex data management patterns
  ├── auth/              # Clerk authentication patterns
  ├── offline/           # Capacitor offline-first patterns
  ├── camera/            # Capacitor Camera integration
  └── routing/           # React Router v7 patterns

issues/                  # Problem resolution documentation
  ├── bugs/              # Bug investigation and fixes
  ├── performance/       # Performance optimization
  ├── integration/       # Integration challenges
  └── mobile/            # Mobile-specific issues

libraries/               # Library-specific knowledge
  ├── react19/           # React 19 patterns and hooks
  ├── convex/            # Convex backend patterns
  ├── capacitor/         # Capacitor 7 mobile integration
  ├── clerk/             # Clerk authentication
  ├── shadcn/            # shadcn/ui component usage
  └── react-router-v7/   # React Router v7 file-based routing

sprints/                 # Sprint-specific documentation
  ├── sprint-1/          # Foundation & Authentication
  ├── sprint-2/          # Core Meal Logging
  ├── sprint-3/          # Meal Management & Search
  └── sprint-4/          # Offline Support & Polish
```

### FoodyLog Tagging Strategy (REQUIRED)

- **Technologies**: `react`, `typescript`, `vite`, `convex`, `capacitor7`, `clerk`, `shadcn`, `tailwind`, `react-router-dom`, `bun`
- **Features**: `auth`, `meals`, `photos`, `offline`, `search`, `analytics`, `camera`, `storage`, `budget-tracking`, `places-integration`
- **Phases**: `mvp`, `phase1`, `phase2`, `phase3`, `premium`, `freemium`
- **Types**: `pattern`, `issue`, `lesson`, `spec`, `config`, `sprint`, `story`
- **Mobile**: `ios`, `android`, `capacitor`, `native`, `permissions`, `pwa`
- **User Types**: `food-enthusiasts`, `travelers`, `budget-conscious`, `solo-developer`

### FoodyLog Documentation Requirements

- **Include code snippets** with working examples using FoodyLog stack
- **Cross-reference related tasks** using `[[note-name]]` syntax
- **Document Context7 findings** with library versions and API details
- **Record Sequential Thinking insights** and decision rationale
- **Reference sprint documentation** from root folder (PRD, Technical Architecture, Sprint Breakdown)
- **Include mobile-specific considerations** for Capacitor 7 integration
- **Document offline-first patterns** for Convex sync strategies

### FoodyLog Code Documentation Standards (REQUIRED)

- **ALL code must be well-commented** to explain what it does and why
- **Function/Component headers** must explain purpose, parameters, and return values
- **Complex logic** must have inline comments explaining the approach
- **Business logic** must reference PRD requirements or user stories
- **API integrations** must document expected inputs/outputs and error handling
- **Mobile-specific code** must explain Capacitor plugin usage and platform differences
- **Offline patterns** must document sync strategies and conflict resolution
- **Performance optimizations** must explain the problem being solved
- **Accessibility features** must document WCAG compliance approach

## FoodyLog Integration Examples

### Example: Meal Logging Feature Implementation

```
1. Search Basic Memory: `search_notes("meal form convex")`
2. Check Context7: `resolve-library-id("convex")` → `get-library-docs`
3. Sequential Thinking: Break down meal creation flow (photo capture → form input → validation → Convex storage)
4. Reference: PRD_2025_Convex_Stack.md for requirements, FoodyLog_Technical_Architecture.md for implementation
5. Document in: `specs/meal-logging/implementation.md`
6. Tag with: `meals`, `convex`, `react`, `typescript`, `capacitor7`, `mvp`, `pattern`, `solo-developer`
```

### Example: Camera Integration Bug Investigation

```
1. Search Basic Memory: `search_notes("capacitor camera error")`
2. Check Context7: `resolve-library-id("capacitor")` → `get-library-docs`
3. Debugging Approach: Systematic mobile investigation (permissions → hardware access → photo processing)
4. Reference: FoodyLog_Technical_Architecture.md for camera setup, FoodyLog_Development_Planning.md for testing strategy
5. Document in: `issues/bugs/camera-permissions-android.md`
6. Tag with: `bug`, `camera`, `capacitor7`, `android`, `permissions`, `resolved`, `solo-developer`
```

### Example: Offline Sync Pattern Development

```
1. Search Basic Memory: `search_notes("offline convex sync")`
2. Check Context7: `resolve-library-id("convex")` → `get-library-docs`
3. Systems Thinking: Analyze offline-first architecture (Capacitor Preferences → queue → sync → conflict resolution)
4. Reference: FoodyLog_Detailed_Sprint_Breakdown.md Sprint 4, FoodyLog_Technical_Architecture.md offline section
5. Document in: `patterns/offline/convex-sync-strategy.md`
6. Tag with: `offline`, `convex`, `capacitor7`, `sync`, `pattern`, `phase1`, `mvp`, `solo-developer`
```

## FoodyLog Enforcement Rules

- **NO task starts** without checking Basic Memory first
- **NO library usage** without Context7 documentation verification
- **NO complex task** without Sequential Thinking breakdown
- **NO task completion** without Basic Memory documentation
- **ALL patterns** must be documented for reuse
- **ALL decisions** must include rationale and alternatives considered
- **ALWAYS reference** FoodyLog documentation (PRD, Technical Architecture, Sprint Breakdown)
- **MOBILE-FIRST** considerations must be documented for all features
- **OFFLINE-FIRST** patterns must be considered for data operations
- **FREEMIUM MODEL** constraints must be considered for feature implementation
- **ACCESSIBILITY** requirements must be documented per WCAG 2.1 AA standards
- **PERFORMANCE** targets must be validated (app launch <2s, meal list <1s, photo upload <5s)
- **ALL CODE must be well-commented** explaining what it does, why it exists, and how it works
- **NO code without documentation** - every function, component, and complex logic must be explained

## FoodyLog Success Metrics Integration

When documenting patterns and solutions, always consider:

- **User Engagement**: 70% of users log at least 3 meals per week (12 per month)
- **Retention**: 60% monthly active user retention
- **Performance**: App launch <2s cold start, meal list load <1s for 100 meals, photo upload <5s for 5MB image, offline sync <10s for 50 pending items, search results <500ms
- **Reliability**: 99.5% uptime with offline functionality
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design
- **Business Model**: Freemium constraints (free: 1 photo/meal, 3 tags max, 30-day analytics, 100MB storage; premium: 5 photos/meal, unlimited)

This ensures systematic knowledge building aligned with FoodyLog's vision and prevents repeated problem-solving.

## FoodyLog Code Documentation Examples

### React Component Documentation

```typescript
/**
 * MealCard - Displays a meal entry with photo, rating, and details
 *
 * Used in meal list to show user's logged meals. Supports both MVP (basic info)
 * and premium features (extended details). Handles offline state gracefully.
 * Implements freemium model constraints per PRD requirements.
 *
 * @param meal - Meal object from Convex database
 * @param onEdit - Callback when user wants to edit meal
 * @param onDelete - Callback when user wants to delete meal
 * @param isOffline - Whether app is currently offline
 */
export function MealCard({ meal, onEdit, onDelete, isOffline }: MealCardProps) {
  // Show premium features only for premium users (freemium model)
  const { user } = useAuth();
  const isPremium = user?.subscription?.tier === 'premium';

  // Handle photo loading with fallback for offline mode
  // Free tier: 1 photo per meal, Premium: up to 5 photos per meal
  const photoUrl = usePhotoUrl(meal.primaryPhotoId, {
    fallback: '/placeholder-meal.jpg',
    offline: isOffline
  });

  return (
    // Component JSX with accessibility attributes (WCAG 2.1 AA compliance)
    <Card role="article" aria-label={`Meal: ${meal.title}, rated ${meal.rating} out of 10`}>
      {/* shadcn/ui Card component with custom FoodyLog theme */}
      {/* Rest of component */}
    </Card>
  );
}
```

### Convex Function Documentation

```typescript
/**
 * createMeal - Creates a new meal entry for authenticated user
 *
 * Validates input data, checks subscription limits (free tier: 3 tags max),
 * associates photos, and updates user statistics. Implements freemium model
 * constraints per PRD requirements. Supports offline-first architecture.
 *
 * @param args - Meal creation data (title, rating, photos, etc.)
 * @returns Created meal ID
 * @throws Error if validation fails or subscription limits exceeded
 */
export const createMeal = mutation({
  args: {
    title: v.string(), // max 100 characters per schema
    rating: v.number(), // 1-10 scale per PRD
    price: v.optional(v.number()), // optional price tracking
    mealType: v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"), v.literal("snack")),
    tags: v.array(v.string()), // max 3 for free, 10 for premium
    // ... other args per schema
  },
  handler: async (ctx, args) => {
    // Verify user authentication via Clerk JWT
    const user = await requireAuth(ctx);

    // Enforce freemium model constraints per PRD
    if (user.subscription.tier === "free" && args.tags.length > 3) {
      throw new Error("Free tier limited to 3 tags per meal");
    }

    // Create meal with offline-first considerations
    const mealId = await ctx.db.insert("meals", {
      userId: user._id,
      ...validatedData,
      // Default values for real-time sync and social features
      isPublic: false,
      allowComments: false,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    });

    // Update user statistics for analytics
    await updateUserStats(ctx, user._id);

    return mealId;
  },
});
```

### Capacitor Mobile Integration Documentation

```typescript
/**
 * useCamera - Hook for Capacitor 7 Camera integration
 *
 * Handles camera permissions, photo capture, and gallery selection.
 * Implements mobile-first approach with platform-specific optimizations.
 * Supports offline photo storage and freemium model constraints.
 * Performance target: photo upload <5s for 5MB image.
 *
 * @returns Camera functions and state
 */
export const useCamera = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const { user } = useAuth();

  /**
   * Capture photo using device camera
   *
   * Requests camera permissions, opens native camera interface,
   * and returns optimized photo for upload. Handles iOS/Android differences.
   * Enforces freemium model: free tier 1 photo/meal, premium 5 photos/meal.
   */
  const capturePhoto = useCallback(async (): Promise<Photo | null> => {
    try {
      setIsCapturing(true);

      // Check storage quota for free users (100MB limit)
      if (user?.subscription?.tier === "free") {
        const quota = await checkStorageQuota(user._id);
        if (quota.exceeded) {
          throw new Error("Storage quota exceeded. Upgrade to premium for unlimited storage.");
        }
      }

      // Capacitor 7 camera configuration for optimal quality/performance
      const image = await Camera.getPhoto({
        quality: 80, // Balance quality vs file size for 5MB upload limit per PRD
        allowEditing: true, // Let users crop/adjust before saving
        resultType: CameraResultType.Uri, // Use URI for better performance
        source: CameraSource.Camera,
        width: 1024, // Max width per performance requirements
        height: 1024,
        correctOrientation: true, // Handle device rotation automatically
        // Capacitor 7 improved options
        promptLabelHeader: "Select Photo Source",
        promptLabelCancel: "Cancel",
        promptLabelPhoto: "From Photos",
        promptLabelPicture: "Take Picture",
      });

      return image;
    } catch (error) {
      // Handle camera permission denied or hardware issues
      console.error("Camera capture failed:", error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [user]);

  return { capturePhoto, isCapturing };
};
```

### Offline-First Pattern Documentation

```typescript
/**
 * useOfflineSync - Manages offline meal logging and sync
 *
 * Implements offline-first architecture per FoodyLog_Technical_Architecture.md.
 * Queues actions when offline, syncs when connection restored. Uses Capacitor 7
 * Preferences with groups for persistent storage to avoid localStorage limitations.
 *
 * Performance target: offline sync <10s for 50 pending items.
 * Supports FoodyLog's 99.5% uptime requirement by working without internet.
 */
export const useOfflineSync = () => {
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const { isAuthenticated } = useConvexAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  /**
   * Queue action for later sync when offline
   *
   * Stores action in Capacitor 7 Preferences with groups (not localStorage) for
   * mobile compatibility. Actions include meal creation, updates, deletions.
   * Implements conflict resolution for concurrent edits.
   *
   * @param action - Action to queue (CREATE_MEAL, UPDATE_MEAL, DELETE_MEAL, UPLOAD_PHOTO)
   */
  const queueAction = async (
    action: Omit<OfflineAction, "id" | "timestamp" | "retryCount">
  ) => {
    const newAction: OfflineAction = {
      ...action,
      id: crypto.randomUUID(), // Unique ID for deduplication
      timestamp: Date.now(),
      retryCount: 0,
    };

    // Use Capacitor 7 Preferences with groups for better organization
    const updatedActions = [...pendingActions, newAction];
    setPendingActions(updatedActions);

    await Preferences.set({
      key: "foodylog_offline_actions",
      value: JSON.stringify(updatedActions),
      group: "foodylog_sync", // Capacitor 7 feature for grouped preferences
    });
  };

  /**
   * Sync pending actions when connection restored
   * 
   * Processes queued actions in order, handles conflicts, and provides
   * user feedback. Implements exponential backoff for failed syncs.
   */
  const syncPendingActions = async () => {
    // Implementation handles conflict resolution and retry logic
    // Performance target: <10s for 50 pending items
  };

  return { 
    queueAction, 
    syncPendingActions,
    pendingActions: pendingActions.length,
    isOnline 
  };
};
```
