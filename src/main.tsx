/**
 * FoodyLog Application Entry Point
 * 
 * Initializes the React application with routing, error boundaries,
 * Clerk authentication, Convex backend connection, and PWA service worker registration. 
 * Follows FoodyLog architecture with mobile-first design and offline-first capabilities.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ConvexProvider } from 'convex/react';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { DevelopmentAuthWrapper } from './components/auth/DevelopmentAuthWrapper.tsx';
import { registerSW } from './lib/pwa.ts';
import { convex } from './lib/convex/client.ts';
import { clerkConfig } from './lib/auth/clerk.ts';
import './index.css';

// Register service worker for PWA functionality
registerSW();

// Check if Clerk is properly configured
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = CLERK_PUBLISHABLE_KEY && 
  !CLERK_PUBLISHABLE_KEY.includes('your_publishable_key_here') &&
  !CLERK_PUBLISHABLE_KEY.includes('REPLACE_WITH_YOUR_ACTUAL') &&
  !CLERK_PUBLISHABLE_KEY.includes('your_actual_publishable_key_from_clerk_dashboard') &&
  CLERK_PUBLISHABLE_KEY.startsWith('pk_');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DevelopmentAuthWrapper isClerkConfigured={isClerkConfigured}>
        <ClerkProvider
          publishableKey={clerkConfig.publishableKey}
          appearance={clerkConfig.appearance}
          localization={clerkConfig.localization}
        >
          <ConvexProvider client={convex}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConvexProvider>
        </ClerkProvider>
      </DevelopmentAuthWrapper>
    </ErrorBoundary>
  </React.StrictMode>,
);