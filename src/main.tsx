/**
 * FoodyLog Application Entry Point
 * 
 * Initializes the React application with routing, error boundaries,
 * Convex backend connection, and PWA service worker registration. 
 * Follows FoodyLog architecture with mobile-first design and offline-first capabilities.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConvexProvider } from 'convex/react';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { registerSW } from './lib/pwa.ts';
import { convex } from './lib/convex/client.ts';
import './index.css';

// Register service worker for PWA functionality
registerSW();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConvexProvider client={convex}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConvexProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);