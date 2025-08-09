/**
 * LoadingSpinner - Reusable loading indicator component
 * 
 * Displays a spinning loader with optional text. Used throughout
 * the app for async operations and route transitions. Implements
 * accessibility best practices with proper ARIA labels.
 * 
 * @param size - Size variant (sm, md, lg)
 * @param text - Optional loading text to display
 * @param className - Additional CSS classes
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div 
      className={`loading-spinner-container ${className}`}
      role="status"
      aria-label={text}
    >
      <div className={`loading-spinner ${sizeClasses[size]}`}>
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      
      {text && (
        <span className="loading-spinner-text sr-only">
          {text}
        </span>
      )}
    </div>
  )
}

// Inline styles for the loading spinner
const styles = `
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}

.loading-spinner {
  color: var(--color-primary);
}

.loading-spinner-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}