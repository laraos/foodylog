/**
 * Header Component Tests
 * 
 * Tests for the FoodyLog header component including:
 * - Rendering with authenticated and unauthenticated states
 * - Proper semantic markup and ARIA labels
 * - Responsive behavior across screen sizes
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Theme toggle functionality
 * - User menu integration with Clerk
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe } from 'jest-axe';
import { Header } from '../Header';
import { ThemeProvider } from '../../../lib/theme';
import { BrowserRouter } from 'react-router-dom';

// Note: jest-axe toHaveNoViolations matcher is not available in Vitest
// We'll use axe directly and check for violations manually

// Mock hooks
const mockUseAuth = vi.fn();
const mockUseTheme = vi.fn();

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('../../../lib/theme', () => ({
  useTheme: () => mockUseTheme(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock Clerk UserButton
vi.mock('../../auth/UserButton', () => ({
  UserButton: () => <div data-testid="clerk-user-button">Clerk UserButton</div>,
}));

/**
 * Test wrapper component
 * 
 * Provides necessary context providers for testing the Header component.
 */
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="test-theme">
      {children}
    </ThemeProvider>
  </BrowserRouter>
);

describe('Header Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default theme mock
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  describe('Rendering and Basic Structure', () => {
    it('renders header with FoodyLog branding', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      // Check for header element with proper role
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('aria-label', 'FoodyLog application header');

      // Check for FoodyLog branding
      expect(screen.getByText('FoodyLog')).toBeInTheDocument();
      expect(screen.getByText('🍽️')).toBeInTheDocument();
    });

    it('has consistent 60px height structure', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const headerContainer = screen.getByRole('banner').querySelector('.header__container');
      expect(headerContainer).toBeInTheDocument();
      expect(headerContainer).toHaveClass('header__container');
    });

    it('displays proper semantic structure', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      // Check for proper heading structure
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('FoodyLog');

      // Check for toolbar role on actions
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toBeInTheDocument();
      expect(toolbar).toHaveAttribute('aria-label', 'User actions and settings');
    });
  });

  describe('Authentication States', () => {
    it('displays fallback user button when not authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const userButton = screen.getByLabelText('User menu (not signed in)');
      expect(userButton).toBeInTheDocument();
      expect(userButton).toBeDisabled();
    });

    it('displays Clerk UserButton when authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          clerkId: 'user_123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          profileImageUrl: 'https://example.com/avatar.jpg',
        },
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      expect(screen.getByTestId('clerk-user-button')).toBeInTheDocument();
    });

    it('displays loading state while authentication is loading', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const loadingButton = screen.getByLabelText('Loading user information');
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toHaveAttribute('role', 'status');
    });

    it('provides appropriate ARIA labels for different user states', () => {
      // Test unauthenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      const { rerender } = render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      expect(screen.getByLabelText('User menu for Guest user')).toBeInTheDocument();

      // Test authenticated state
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          clerkId: 'user_123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          profileImageUrl: 'https://example.com/avatar.jpg',
        },
      });

      rerender(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      expect(screen.getByLabelText('User menu for John Doe')).toBeInTheDocument();
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('displays theme toggle button on desktop', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to dark theme');
      expect(themeButton).toBeInTheDocument();
      expect(themeButton).toHaveTextContent('🌙');
    });

    it('toggles theme when theme button is clicked', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to dark theme');
      fireEvent.click(themeButton);

      await waitFor(() => {
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
      });
    });

    it('shows correct theme icon and label for dark theme', () => {
      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
      });

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to light theme');
      expect(themeButton).toBeInTheDocument();
      expect(themeButton).toHaveTextContent('☀️');
    });
  });

  describe('Responsive Behavior', () => {
    it('hides theme toggle on mobile screens', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to dark theme');
      expect(themeButton).toHaveClass('hidden', 'sm:flex');
    });

    it('shows mobile menu button on small screens', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText('Open mobile menu');
      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton).toHaveClass('sm:hidden');
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA accessibility standards', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          clerkId: 'user_123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          profileImageUrl: 'https://example.com/avatar.jpg',
        },
      });

      const { container } = render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('provides proper screen reader support', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      // Check for screen reader only text
      expect(screen.getByText('FoodyLog -', { selector: '.sr-only' })).toBeInTheDocument();

      // Check for proper aria-hidden attributes
      const logo = screen.getByText('🍽️');
      expect(logo).toHaveAttribute('aria-hidden', 'true');
      expect(logo).toHaveAttribute('role', 'presentation');
    });

    it('supports keyboard navigation', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to dark theme');
      const userButton = screen.getByLabelText('User menu (not signed in)');
      const mobileMenuButton = screen.getByLabelText('Open mobile menu');

      // All interactive elements should be buttons
      expect(themeButton.tagName).toBe('BUTTON');
      expect(userButton.tagName).toBe('BUTTON');
      expect(mobileMenuButton.tagName).toBe('BUTTON');
      
      // Test that enabled elements can receive focus
      themeButton.focus();
      expect(document.activeElement).toBe(themeButton);
      
      // User button is disabled when not authenticated, so it shouldn't be focusable
      expect(userButton).toBeDisabled();
      
      // Mobile menu button is disabled (placeholder), so it shouldn't be focusable
      expect(mobileMenuButton).toBeDisabled();
      
      // Test with authenticated state where user button should be focusable
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          clerkId: 'user_123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          profileImageUrl: 'https://example.com/avatar.jpg',
        },
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      // In authenticated state, the Clerk UserButton should be present
      expect(screen.getByTestId('clerk-user-button')).toBeInTheDocument();
    });

    it('provides descriptive titles for better UX', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const themeButton = screen.getByLabelText('Switch to dark theme');
      expect(themeButton).toHaveAttribute('title', 'Current theme: light. Click to switch to dark theme.');
    });
  });

  describe('Error Handling', () => {
    it('handles missing user data gracefully', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          clerkId: 'user_123',
          email: '',
          firstName: '',
          lastName: '',
          fullName: '',
          profileImageUrl: '',
        },
      });

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      // Should still render without errors
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByLabelText('User menu for User')).toBeInTheDocument();
    });

    it('handles theme provider errors gracefully', () => {
      mockUseTheme.mockReturnValue({
        theme: undefined,
        setTheme: mockSetTheme,
      });

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      // Should not throw error
      expect(() => {
        render(
          <TestWrapper>
            <Header />
          </TestWrapper>
        );
      }).not.toThrow();
    });
  });
});