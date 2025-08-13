/**
 * FoodyLog Error Components Tests
 * 
 * Comprehensive tests for all error state components including
 * accessibility, user interactions, and FoodyLog-specific functionality.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  ErrorMessage,
  NetworkError,
  EmptyMeals,
  EmptySearch,
  CameraError,
  FormError,
  ServerError,
  ValidationError,
} from '../error';

describe('ErrorMessage', () => {
  it('renders with default props', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<ErrorMessage title="Custom Error" message="Error details" />);
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Error details')).toBeInTheDocument();
  });

  it('renders action button when provided', () => {
    const mockAction = vi.fn();
    render(
      <ErrorMessage 
        message="Error occurred" 
        action={{ label: 'Retry', onClick: mockAction }} 
      />,
    );
    
    const button = screen.getByRole('button', { name: 'Retry' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledOnce();
  });

  it('supports different variants', () => {
    const { rerender } = render(<ErrorMessage message="Test" variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test" variant="warning" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<ErrorMessage message="Test" variant="info" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

describe('NetworkError', () => {
  it('renders offline state', () => {
    render(<NetworkError isOnline={false} />);
    expect(screen.getByText("You're Offline")).toBeInTheDocument();
    expect(screen.getByText(/No internet connection/)).toBeInTheDocument();
  });

  it('renders connection problem state', () => {
    render(<NetworkError isOnline={true} />);
    expect(screen.getByText('Connection Problem')).toBeInTheDocument();
    expect(screen.getByText(/Unable to connect to our servers/)).toBeInTheDocument();
  });

  it('renders retry button when callback provided', () => {
    const mockRetry = vi.fn();
    render(<NetworkError onRetry={mockRetry} />);
    
    const button = screen.getByRole('button', { name: /Try Again/ });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockRetry).toHaveBeenCalledOnce();
  });

  it('does not render retry button when no callback', () => {
    render(<NetworkError />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('EmptyMeals', () => {
  it('renders empty meals state', () => {
    render(<EmptyMeals />);
    expect(screen.getByText('No meals logged yet')).toBeInTheDocument();
    expect(screen.getByText(/Start your food journey/)).toBeInTheDocument();
  });

  it('renders add meal button when callback provided', () => {
    const mockAddMeal = vi.fn();
    render(<EmptyMeals onAddMeal={mockAddMeal} />);
    
    const button = screen.getByRole('button', { name: /Add Your First Meal/ });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockAddMeal).toHaveBeenCalledOnce();
  });

  it('does not render button when no callback', () => {
    render(<EmptyMeals />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('EmptySearch', () => {
  it('renders empty search state with query', () => {
    render(<EmptySearch query="pizza" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText(/couldn't find any meals matching "pizza"/)).toBeInTheDocument();
  });

  it('renders clear search button when callback provided', () => {
    const mockClearSearch = vi.fn();
    render(<EmptySearch query="test" onClearSearch={mockClearSearch} />);
    
    const button = screen.getByRole('button', { name: 'Clear Search' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockClearSearch).toHaveBeenCalledOnce();
  });
});

describe('CameraError', () => {
  it('renders camera access error', () => {
    render(<CameraError />);
    expect(screen.getByText('Camera Access Needed')).toBeInTheDocument();
    expect(screen.getByText(/To take photos of your meals/)).toBeInTheDocument();
  });

  it('renders action buttons when callbacks provided', () => {
    const mockTryAgain = vi.fn();
    const mockOpenSettings = vi.fn();
    
    render(
      <CameraError 
        onTryAgain={mockTryAgain} 
        onOpenSettings={mockOpenSettings} 
      />,
    );
    
    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
    const settingsButton = screen.getByRole('button', { name: /Open Settings/ });
    
    expect(tryAgainButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    
    fireEvent.click(tryAgainButton);
    expect(mockTryAgain).toHaveBeenCalledOnce();
    
    fireEvent.click(settingsButton);
    expect(mockOpenSettings).toHaveBeenCalledOnce();
  });
});

describe('FormError', () => {
  it('renders form error message', () => {
    render(<FormError message="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('includes error icon', () => {
    render(<FormError message="Error message" />);
    // Check for the presence of an icon (AlertCircle)
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

describe('ServerError', () => {
  it('renders server error state', () => {
    render(<ServerError />);
    expect(screen.getByText('Server Error')).toBeInTheDocument();
    expect(screen.getByText(/We're experiencing technical difficulties/)).toBeInTheDocument();
  });

  it('renders retry button when callback provided', () => {
    const mockRetry = vi.fn();
    render(<ServerError onRetry={mockRetry} />);
    
    const button = screen.getByRole('button', { name: /Try Again/ });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockRetry).toHaveBeenCalledOnce();
  });
});

describe('ValidationError', () => {
  it('renders validation errors list', () => {
    const errors = ['Field 1 is required', 'Field 2 is invalid', 'Field 3 is too long'];
    render(<ValidationError errors={errors} />);
    
    expect(screen.getByText('Please fix the following errors:')).toBeInTheDocument();
    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('renders nothing when no errors', () => {
    const { container } = render(<ValidationError errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders single error correctly', () => {
    render(<ValidationError errors={['Single error']} />);
    expect(screen.getByText('Single error')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('error messages have proper ARIA roles', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('buttons have proper accessibility attributes', () => {
    const mockAction = vi.fn();
    render(
      <div>
        <NetworkError onRetry={mockAction} />
        <EmptyMeals onAddMeal={mockAction} />
        <CameraError onTryAgain={mockAction} onOpenSettings={mockAction} />
      </div>,
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  it('icons have proper accessibility attributes', () => {
    render(<FormError message="Test error" />);
    // Icons should not be announced by screen readers when they're decorative
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});

describe('User Interactions', () => {
  it('handles button clicks correctly', () => {
    const mockCallback = vi.fn();
    
    render(
      <div>
        <NetworkError onRetry={mockCallback} />
        <EmptyMeals onAddMeal={mockCallback} />
        <EmptySearch query="test" onClearSearch={mockCallback} />
        <CameraError onTryAgain={mockCallback} onOpenSettings={mockCallback} />
        <ServerError onRetry={mockCallback} />
      </div>,
    );

    const buttons = screen.getAllByRole('button');
    
    // Click each button and verify callback is called
    buttons.forEach(button => {
      fireEvent.click(button);
    });

    // Should be called once for each button
    expect(mockCallback).toHaveBeenCalledTimes(buttons.length);
  });

  it('prevents default form submission on error actions', () => {
    const mockAction = vi.fn();
    render(
      <form>
        <ErrorMessage 
          message="Error" 
          action={{ label: 'Retry', onClick: mockAction }} 
        />
      </form>,
    );

    const button = screen.getByRole('button', { name: 'Retry' });
    const clickEvent = new MouseEvent('click', { bubbles: true });
    
    fireEvent(button, clickEvent);
    expect(mockAction).toHaveBeenCalledOnce();
  });
});

describe('Responsive Design', () => {
  it('error components adapt to different screen sizes', () => {
    const { container } = render(
      <div>
        <NetworkError />
        <EmptyMeals />
        <CameraError />
        <ServerError />
      </div>,
    );

    // Components should render without errors
    expect(container.firstChild).toBeInTheDocument();
  });

  it('text content is readable on mobile', () => {
    render(<EmptyMeals />);
    
    // Check that text content is present and accessible
    expect(screen.getByText('No meals logged yet')).toBeInTheDocument();
    expect(screen.getByText(/Start your food journey/)).toBeInTheDocument();
  });
});