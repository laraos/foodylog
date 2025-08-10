/**
 * useAuth Hook Tests
 * 
 * Tests for the authentication hook to ensure proper state management
 * and integration with Clerk authentication.
 */

import { renderHook } from '@testing-library/react';
import { useAuth, useUserProfile, useIsAuthenticated } from '../useAuth';

// Mock Clerk hooks
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(),
  useAuth: vi.fn(),
}));

import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const mockUseUser = vi.mocked(useUser);
const mockUseClerkAuth = vi.mocked(useClerkAuth);

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state when Clerk is not loaded', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: false,
      isSignedIn: false,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: undefined,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('should return authenticated state when user is signed in', () => {
    const mockUser = {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      primaryEmailAddress: { emailAddress: 'john@example.com' },
      imageUrl: 'https://example.com/avatar.jpg',
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
      isSignedIn: true,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: true,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      clerkId: 'user_123',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      profileImageUrl: 'https://example.com/avatar.jpg',
      fullName: 'John Doe',
    });
  });

  it('should handle user with no name gracefully', () => {
    const mockUser = {
      id: 'user_123',
      firstName: '',
      lastName: '',
      primaryEmailAddress: { emailAddress: 'user@example.com' },
      imageUrl: '',
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
      isSignedIn: true,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: true,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.user?.fullName).toBe('user');
  });

  it('should return unauthenticated state when user is not signed in', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
      isSignedIn: false,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: false,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('should handle signOut function', async () => {
    const mockSignOut = vi.fn().mockResolvedValue(undefined);
    
    mockUseUser.mockReturnValue({
      user: { id: 'user_123' },
      isLoaded: true,
      isSignedIn: true,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: mockSignOut,
      isSignedIn: true,
    } as any);

    const { result } = renderHook(() => useAuth());

    await result.current.signOut();

    expect(mockSignOut).toHaveBeenCalledOnce();
  });
});

describe('useUserProfile', () => {
  it('should return user profile data', () => {
    const mockUser = {
      id: 'user_123',
      firstName: 'Jane',
      lastName: 'Smith',
      primaryEmailAddress: { emailAddress: 'jane@example.com' },
      imageUrl: 'https://example.com/jane.jpg',
    };

    mockUseUser.mockReturnValue({
      user: mockUser,
      isLoaded: true,
      isSignedIn: true,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: true,
    } as any);

    const { result } = renderHook(() => useUserProfile());

    expect(result.current).toEqual({
      clerkId: 'user_123',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      profileImageUrl: 'https://example.com/jane.jpg',
      fullName: 'Jane Smith',
    });
  });

  it('should return null when not authenticated', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
      isSignedIn: false,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: false,
    } as any);

    const { result } = renderHook(() => useUserProfile());

    expect(result.current).toBe(null);
  });
});

describe('useIsAuthenticated', () => {
  it('should return true when authenticated', () => {
    mockUseUser.mockReturnValue({
      user: { id: 'user_123' },
      isLoaded: true,
      isSignedIn: true,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: true,
    } as any);

    const { result } = renderHook(() => useIsAuthenticated());

    expect(result.current).toBe(true);
  });

  it('should return false when not authenticated', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
      isSignedIn: false,
    } as any);
    mockUseClerkAuth.mockReturnValue({
      signOut: vi.fn(),
      isSignedIn: false,
    } as any);

    const { result } = renderHook(() => useIsAuthenticated());

    expect(result.current).toBe(false);
  });
});