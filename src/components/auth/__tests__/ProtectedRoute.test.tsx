/**
 * ProtectedRoute Component Tests
 * 
 * Tests for the ProtectedRoute component to ensure proper authentication
 * handling, redirects, and integration with Clerk's SignedIn/SignedOut components.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { vi } from 'vitest';
import { ProtectedRoute, PublicRoute } from '../ProtectedRoute';

// Mock Clerk hooks
vi.mock('@clerk/clerk-react', async () => {
  const actual = await vi.importActual('@clerk/clerk-react');
  return {
    ...actual,
    useAuth: vi.fn(),
    SignedIn: ({ children }: { children: React.ReactNode }) => <div data-testid="signed-in">{children}</div>,
    SignedOut: ({ children }: { children: React.ReactNode }) => <div data-testid="signed-out">{children}</div>,
  };
});

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to, state }: { to: string; state?: any }) => (
      <div data-testid="navigate" data-to={to} data-state={JSON.stringify(state)} />
    ),
    useLocation: () => ({ pathname: '/test', search: '', state: null }),
  };
});

const { useAuth } = await import('@clerk/clerk-react');

// Helper function to create mock auth states
const createMockAuthState = (overrides: any = {}) => ({
  isLoaded: true,
  isSignedIn: false,
  userId: null,
  sessionId: null,
  sessionClaims: null,
  actor: null,
  orgId: null,
  orgRole: null,
  orgSlug: null,
  has: vi.fn(),
  signOut: vi.fn(),
  getToken: vi.fn(),
  ...overrides,
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <ClerkProvider publishableKey="pk_test_test">
      {children}
    </ClerkProvider>
  </BrowserRouter>
);

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when Clerk is not loaded', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: false,
      isSignedIn: undefined,
    }));

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>,
    );

    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
  });

  it('renders protected content when user is signed in', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: true,
      userId: 'user_123',
      sessionId: 'sess_123',
    }));

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to sign-in when user is not signed in', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: false,
    }));

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/auth/sign-in');
  });

  it('uses custom redirect URL when provided', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: false,
    }));

    render(
      <TestWrapper>
        <ProtectedRoute redirectTo="/custom-signin">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/custom-signin');
  });

  it('shows custom fallback when provided and loading', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: false,
      isSignedIn: undefined,
    }));

    const customFallback = <div>Custom Loading...</div>;

    render(
      <TestWrapper>
        <ProtectedRoute fallback={customFallback}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>,
    );

    expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
  });
});

describe('PublicRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when Clerk is not loaded', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: false,
      isSignedIn: undefined,
    }));

    render(
      <TestWrapper>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </TestWrapper>,
    );

    // Should show loading spinner
    expect(screen.getByRole('generic')).toHaveClass('animate-spin');
  });

  it('renders public content when user is not signed in', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: false,
    }));

    render(
      <TestWrapper>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });

  it('redirects to main app when user is signed in', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: true,
      userId: 'user_123',
      sessionId: 'sess_123',
    }));

    render(
      <TestWrapper>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/meals');
  });

  it('uses custom redirect URL when provided', () => {
    vi.mocked(useAuth).mockReturnValue(createMockAuthState({
      isLoaded: true,
      isSignedIn: true,
      userId: 'user_123',
      sessionId: 'sess_123',
    }));

    render(
      <TestWrapper>
        <PublicRoute redirectTo="/custom-dashboard">
          <div>Public Content</div>
        </PublicRoute>
      </TestWrapper>,
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/custom-dashboard');
  });
});