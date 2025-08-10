/**
 * HomePage - Landing page for FoodyLog application
 * 
 * Displays welcome message and basic app information for MVP.
 * Will be expanded in future sprints to show meal dashboard,
 * quick actions, and recent meals.
 * 
 * Features:
 * - Welcome message for new users
 * - App version and status information
 * - Convex backend connection test (temporary for Sprint 1)
 * - Mobile-friendly responsive design
 * - Accessibility compliant structure
 */

import { ConvexTest } from '../components/ConvexTest';

export function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h1 className="home-page__title">
          Welcome to FoodyLog
        </h1>
        
        <p className="home-page__subtitle">
          The simplest way to remember every meal that matters
        </p>
        
        <div className="home-page__features">
          <div className="home-page__feature">
            <div className="home-page__feature-icon">📸</div>
            <h3 className="home-page__feature-title">Capture Meals</h3>
            <p className="home-page__feature-description">
              Take photos and log details about your favorite meals
            </p>
          </div>
          
          <div className="home-page__feature">
            <div className="home-page__feature-icon">🔍</div>
            <h3 className="home-page__feature-title">Find & Filter</h3>
            <p className="home-page__feature-description">
              Search and filter your meal history to find what you're looking for
            </p>
          </div>
          
          <div className="home-page__feature">
            <div className="home-page__feature-icon">📊</div>
            <h3 className="home-page__feature-title">Track Insights</h3>
            <p className="home-page__feature-description">
              Get insights into your eating patterns and preferences
            </p>
          </div>
          
          <div className="home-page__feature">
            <div className="home-page__feature-icon">📱</div>
            <h3 className="home-page__feature-title">Works Offline</h3>
            <p className="home-page__feature-description">
              Log meals even without internet - syncs when you're back online
            </p>
          </div>
        </div>
      </div>
      
      {/* Convex Backend Connection Test - Remove after Sprint 1 */}
      <ConvexTest />
      
      <div className="home-page__status">
        <div className="home-page__status-item">
          <span className="home-page__status-label">Version:</span>
          <span className="home-page__status-value">
            {import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </span>
        </div>
        
        <div className="home-page__status-item">
          <span className="home-page__status-label">Environment:</span>
          <span className="home-page__status-value">
            {import.meta.env.VITE_ENVIRONMENT || 'development'}
          </span>
        </div>
        
        <div className="home-page__status-item">
          <span className="home-page__status-label">PWA:</span>
          <span className="home-page__status-value">
            {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Inline styles for HomePage
const styles = `
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  min-height: 100%;
}

.home-page__hero {
  text-align: center;
  padding: var(--spacing-8) 0;
}

.home-page__title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-4);
}

.home-page__subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.home-page__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);
}

.home-page__feature {
  text-align: center;
  padding: var(--spacing-6);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-page__feature:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.home-page__feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-3);
}

.home-page__feature-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.home-page__feature-description {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.home-page__status {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  border: 1px solid var(--color-border);
  margin-top: auto;
}

.home-page__status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid var(--color-border);
}

.home-page__status-item:last-child {
  border-bottom: none;
}

.home-page__status-label {
  font-weight: 500;
  color: var(--color-text);
}

.home-page__status-value {
  color: var(--color-text-muted);
  font-family: monospace;
  font-size: var(--font-size-sm);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .home-page__title {
    font-size: var(--font-size-2xl);
  }
  
  .home-page__subtitle {
    font-size: var(--font-size-base);
  }
  
  .home-page__features {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  .home-page__feature {
    padding: var(--spacing-4);
  }
}
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}