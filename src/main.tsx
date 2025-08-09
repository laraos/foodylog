/**
 * FoodyLog Application Entry Point
 * 
 * Initializes the React application with routing, error boundaries,
 * and PWA service worker registration. Follows FoodyLog architecture
 * with mobile-first design and offline-first capabilities.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { registerSW } from './lib/pwa.ts'
import './index.css'

// Register service worker for PWA functionality
registerSW()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)