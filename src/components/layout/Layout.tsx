/**
 * Layout - Main layout component for FoodyLog
 * 
 * Provides the overall structure for the application including
 * header, main content area, and navigation. Handles safe area
 * insets for mobile devices and responsive design.
 * 
 * Features:
 * - Mobile-first responsive design
 * - Safe area handling for iOS/Android
 * - Consistent spacing and structure
 * - Accessibility landmarks
 */

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      {/* Header */}
      <header className="layout__header safe-area-inset-top" role="banner">
        <div className="layout__header-content">
          <h1 className="layout__title">
            <span className="layout__logo">🍽️</span>
            FoodyLog
          </h1>
          
          {/* TODO: Add user menu and navigation in future sprints */}
        </div>
      </header>

      {/* Main Content */}
      <main className="layout__main" role="main">
        <div className="layout__content">
          {children}
        </div>
      </main>

      {/* Footer / Bottom Navigation */}
      <footer className="layout__footer safe-area-inset-bottom" role="contentinfo">
        <div className="layout__footer-content">
          {/* TODO: Add bottom navigation in future sprints */}
          <p className="layout__footer-text">
            FoodyLog MVP v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </p>
        </div>
      </footer>
    </div>
  )
}

// Inline styles for Layout component
const styles = `
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
}

.layout__header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.layout__header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.layout__logo {
  font-size: var(--font-size-2xl);
}

.layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4);
  width: 100%;
  flex: 1;
}

.layout__footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.layout__footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4);
  text-align: center;
}

.layout__footer-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .layout__header-content,
  .layout__content,
  .layout__footer-content {
    padding: var(--spacing-3);
  }
  
  .layout__title {
    font-size: var(--font-size-lg);
  }
}

/* Tablet and desktop */
@media (min-width: 768px) {
  .layout__content {
    padding: var(--spacing-6);
  }
}
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}