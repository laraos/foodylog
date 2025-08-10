/**
 * Development Auth Wrapper
 * 
 * Shows setup instructions when Clerk is not properly configured.
 * This allows developers to see the app structure before setting up authentication.
 */

import React from 'react';

interface DevelopmentAuthWrapperProps {
  children: React.ReactNode;
  isClerkConfigured: boolean;
}

export const DevelopmentAuthWrapper: React.FC<DevelopmentAuthWrapperProps> = ({
  children,
  isClerkConfigured,
}) => {
  if (isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🍽️ FoodyLog
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The simplest way to remember every meal that matters
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            🔧 Setup Required
          </h2>
          <p className="text-muted-foreground mb-6">
            To use FoodyLog, you need to configure Clerk authentication.
          </p>

          <div className="text-left space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">
                Step 1: Create Clerk Account
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Go to{' '}
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  dashboard.clerk.com
                </a>{' '}
                and create a new application called &quot;FoodyLog&quot;
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">
                Step 2: Get Your API Keys
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Copy your Publishable Key from the Clerk dashboard
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">
                Step 3: Update Environment Variables
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Update your <code className="bg-background px-1 rounded">.env.local</code> file:
              </p>
              <pre className="bg-background p-2 rounded text-xs text-foreground mt-2 overflow-x-auto">
{`VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here`}
              </pre>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">
                Step 4: Restart Development Server
              </h3>
              <p className="text-sm text-muted-foreground">
                Run <code className="bg-background px-1 rounded">bun run dev</code> again
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Why Clerk?
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Clerk provides secure, production-ready authentication with features like
            social login, multi-factor authentication, and user management - perfect
            for FoodyLog&apos;s freemium model.
          </p>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Need help? Check the{' '}
            <a
              href="https://clerk.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Clerk documentation
            </a>{' '}
            or the FoodyLog setup guide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentAuthWrapper;