/**
 * NotFoundPage - 404 error page for invalid routes
 * 
 * Displays a user-friendly 404 error when users navigate to
 * non-existent routes. Provides navigation back to home page
 * and maintains consistent design with the rest of the app.
 * 
 * Features:
 * - Clear error message and explanation
 * - Navigation back to home page
 * - Mobile-friendly responsive design
 * - Accessibility compliant structure
 */

import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <div className="not-found-page__icon">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 9 6 6" />
            <path d="m15 9-6 6" />
          </svg>
        </div>
        
        <h1 className="not-found-page__title">
          Page Not Found
        </h1>
        
        <p className="not-found-page__message">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="not-found-page__actions">
          <Link 
            to="/" 
            className="not-found-page__button not-found-page__button--primary"
          >
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="not-found-page__button not-found-page__button--secondary"
          >
            Go Back
          </button>
        </div>
        
        <div className="not-found-page__help">
          <p className="not-found-page__help-text">
            Need help? Here are some things you can try:
          </p>
          
          <ul className="not-found-page__help-list">
            <li>Check the URL for typos</li>
            <li>Use the navigation menu to find what you're looking for</li>
            <li>Go back to the home page and start over</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Inline styles for NotFoundPage
const styles = `
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--spacing-4);
}

.not-found-page__content {
  max-width: 500px;
  text-align: center;
}

.not-found-page__icon {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-6);
  opacity: 0.6;
}

.not-found-page__title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-4);
}

.not-found-page__message {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-8);
}

.not-found-page__actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  margin-bottom: var(--spacing-8);
}

.not-found-page__button {
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.not-found-page__button--primary {
  background-color: var(--color-primary);
  color: white;
}

.not-found-page__button--primary:hover {
  background-color: var(--color-primary-dark);
}

.not-found-page__button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.not-found-page__button--secondary:hover {
  background-color: var(--color-border);
}

.not-found-page__help {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  border: 1px solid var(--color-border);
  text-align: left;
}

.not-found-page__help-text {
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: var(--spacing-3);
}

.not-found-page__help-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.not-found-page__help-list li {
  color: var(--color-text-muted);
  padding: var(--spacing-1) 0;
  position: relative;
  padding-left: var(--spacing-5);
}

.not-found-page__help-list li::before {
  content: "•";
  color: var(--color-primary);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .not-found-page__title {
    font-size: var(--font-size-2xl);
  }
  
  .not-found-page__message {
    font-size: var(--font-size-base);
  }
  
  .not-found-page__actions {
    flex-direction: column;
  }
  
  .not-found-page__button {
    width: 100%;
  }
  
  .not-found-page__help {
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