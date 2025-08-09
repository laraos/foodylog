/**
 * ErrorBoundary - Global error boundary for React error handling
 * 
 * Catches JavaScript errors anywhere in the component tree and displays
 * a fallback UI instead of crashing the entire application. Implements
 * FoodyLog's error handling strategy with user-friendly messages.
 * 
 * Features:
 * - Catches and logs React errors
 * - Provides fallback UI with recovery options
 * - Supports error reporting to external services
 * - Mobile-friendly error display
 */

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // TODO: Report error to external service (Sentry, etc.)
    // reportError(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            
            <h1 className="error-boundary__title">
              Oops! Something went wrong
            </h1>
            
            <p className="error-boundary__message">
              We're sorry, but something unexpected happened. Don't worry - your meal data is safe.
            </p>
            
            <div className="error-boundary__actions">
              <button
                onClick={this.handleReset}
                className="error-boundary__button error-boundary__button--primary"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="error-boundary__button error-boundary__button--secondary"
              >
                Reload App
              </button>
            </div>
            
            {import.meta.env.VITE_ENVIRONMENT === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Styles for ErrorBoundary (inline to ensure they're always available)
const styles = `
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  background-color: var(--color-background);
}

.error-boundary__container {
  max-width: 400px;
  text-align: center;
}

.error-boundary__icon {
  color: var(--color-error);
  margin-bottom: var(--spacing-4);
}

.error-boundary__title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-3);
}

.error-boundary__message {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-6);
  line-height: 1.6;
}

.error-boundary__actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: center;
  margin-bottom: var(--spacing-6);
}

.error-boundary__button {
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--radius-md);
  border: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.error-boundary__button--primary {
  background-color: var(--color-primary);
  color: white;
}

.error-boundary__button--primary:hover {
  background-color: var(--color-primary-dark);
}

.error-boundary__button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.error-boundary__button--secondary:hover {
  background-color: var(--color-border);
}

.error-boundary__details {
  text-align: left;
  margin-top: var(--spacing-4);
}

.error-boundary__stack {
  background-color: var(--color-surface);
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 640px) {
  .error-boundary__actions {
    flex-direction: column;
  }
  
  .error-boundary__button {
    width: 100%;
  }
}
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}