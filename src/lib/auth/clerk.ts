/**
 * Clerk Authentication Configuration
 * 
 * Configures Clerk for FoodyLog with proper environment variables,
 * appearance customization, and integration with our design system.
 * 
 * Key Features:
 * - Environment-based configuration
 * - Custom appearance matching FoodyLog design
 * - Mobile-optimized authentication flows
 * - Integration with Convex backend
 */

// Validate required environment variables
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we're in development mode with placeholder keys
const isPlaceholderKey = CLERK_PUBLISHABLE_KEY?.includes('your_publishable_key_here') || 
                        CLERK_PUBLISHABLE_KEY?.includes('REPLACE_WITH_YOUR_ACTUAL') ||
                        CLERK_PUBLISHABLE_KEY?.includes('your_actual_publishable_key_from_clerk_dashboard');

if (!CLERK_PUBLISHABLE_KEY || isPlaceholderKey) {
  console.warn(
    '⚠️  Clerk not configured properly. Using development mode.\n' +
    'To set up Clerk:\n' +
    '1. Go to https://dashboard.clerk.com\n' +
    '2. Create a new application\n' +
    '3. Copy your publishable key to VITE_CLERK_PUBLISHABLE_KEY in .env.local',
  );
}

/**
 * Clerk configuration object
 * 
 * This configuration customizes Clerk's appearance and behavior
 * to match FoodyLog's design system and user experience.
 */
export const clerkConfig = {
  publishableKey: CLERK_PUBLISHABLE_KEY || 'pk_test_development_mode',
  
  // Routing configuration
  routing: 'path' as const,
  
  // Custom appearance to match FoodyLog design
  appearance: {
    // Use our custom CSS variables for theming
    variables: {
      colorPrimary: 'hsl(var(--primary))',
      colorBackground: 'hsl(var(--background))',
      colorInputBackground: 'hsl(var(--background))',
      colorInputText: 'hsl(var(--foreground))',
      colorText: 'hsl(var(--foreground))',
      colorTextSecondary: 'hsl(var(--muted-foreground))',
      colorDanger: 'hsl(var(--destructive))',
      colorSuccess: 'hsl(var(--primary))',
      colorWarning: 'hsl(var(--warning))',
      colorNeutral: 'hsl(var(--muted))',
      
      // Typography
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      // Border radius to match our design system
      borderRadius: 'var(--radius)',
      
      // Spacing
      spacingUnit: '1rem',
    },
    
    // Custom elements styling
    elements: {
      // Main container
      rootBox: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      },
      
      // Card styling
      card: {
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
      },
      
      // Header styling
      headerTitle: {
        color: 'hsl(var(--foreground))',
        fontSize: '1.5rem',
        fontWeight: '600',
        textAlign: 'center',
      },
      
      headerSubtitle: {
        color: 'hsl(var(--muted-foreground))',
        fontSize: '0.875rem',
        textAlign: 'center',
      },
      
      // Form elements
      formButtonPrimary: {
        backgroundColor: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        borderRadius: 'var(--radius)',
        fontSize: '0.875rem',
        fontWeight: '500',
        padding: '0.5rem 1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        
        '&:hover': {
          backgroundColor: 'hsl(var(--primary) / 0.9)',
        },
        
        '&:focus': {
          outline: '2px solid hsl(var(--ring))',
          outlineOffset: '2px',
        },
      },
      
      formFieldInput: {
        backgroundColor: 'hsl(var(--background))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
        color: 'hsl(var(--foreground))',
        fontSize: '0.875rem',
        padding: '0.5rem 0.75rem',
        
        '&:focus': {
          outline: '2px solid hsl(var(--ring))',
          outlineOffset: '2px',
          borderColor: 'hsl(var(--ring))',
        },
      },
      
      // Links
      footerActionLink: {
        color: 'hsl(var(--primary))',
        textDecoration: 'none',
        fontSize: '0.875rem',
        
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      
      // Social buttons (if enabled)
      socialButtonsBlockButton: {
        backgroundColor: 'hsl(var(--secondary))',
        color: 'hsl(var(--secondary-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
        
        '&:hover': {
          backgroundColor: 'hsl(var(--secondary) / 0.8)',
        },
      },
    },
  },
  
  // Localization (can be extended for multiple languages)
  localization: {
    signIn: {
      start: {
        title: 'Welcome back to FoodyLog',
        subtitle: 'Sign in to continue tracking your meals',
      },
    },
    signUp: {
      start: {
        title: 'Join FoodyLog',
        subtitle: 'Start remembering every meal that matters',
      },
    },
  },
} as const;

/**
 * Helper function to get the current user's Clerk ID
 * 
 * This is useful for mapping Clerk users to Convex user records.
 */
export const getClerkUserId = (user: any): string | null => {
  return user?.id || null;
};

/**
 * Helper function to extract user profile data from Clerk
 * 
 * Standardizes user data extraction for consistency across the app.
 */
export const extractUserProfile = (user: any) => {
  if (!user) {return null;}
  
  return {
    clerkId: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    profileImageUrl: user.imageUrl || '',
    createdAt: user.createdAt ? new Date(user.createdAt).getTime() : Date.now(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt).getTime() : Date.now(),
  };
};

/**
 * Configuration for different environments
 */
export const clerkEnvironmentConfig = {
  development: {
    // Development-specific settings
    debug: true,
    allowedOrigins: ['http://localhost:5173', 'http://10.0.2.2:5173'],
  },
  production: {
    // Production-specific settings
    debug: false,
    allowedOrigins: [], // Will be configured based on deployment
  },
} as const;

export default clerkConfig;