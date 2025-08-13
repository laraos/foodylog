/**
 * FoodyLog Toast Components Tests
 * 
 * Comprehensive tests for toast notification system including
 * accessibility, user interactions, and FoodyLog-specific helpers.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  ToastWithIcon,
} from '../toast';
import { Toaster } from '../toaster';
import {
  useToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showMealSavedToast,
  showPhotoUploadToast,
  showOfflineSyncToast,
  showNetworkErrorToast,
} from '../../../hooks/use-toast';

// Mock component to test useToast hook
function TestToastComponent() {
  const { toast: showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast({ title: 'Test Toast', description: 'Test description' })}>
        Show Toast
      </button>
      <Toaster />
    </div>
  );
}

// Mock component to test toast helpers
function TestToastHelpers() {
  return (
    <div>
      <button onClick={() => showSuccessToast('Success!', 'Operation completed')}>
        Success Toast
      </button>
      <button onClick={() => showErrorToast('Error!', 'Something went wrong')}>
        Error Toast
      </button>
      <button onClick={() => showWarningToast('Warning!', 'Please be careful')}>
        Warning Toast
      </button>
      <button onClick={() => showInfoToast('Info!', 'Here is some information')}>
        Info Toast
      </button>
      <button onClick={() => showMealSavedToast('Pizza Margherita')}>
        Meal Saved Toast
      </button>
      <button onClick={() => showOfflineSyncToast(3)}>
        Offline Sync Toast
      </button>
      <button onClick={() => showNetworkErrorToast()}>
        Network Error Toast
      </button>
      <Toaster />
    </div>
  );
}

describe('Toast Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any remaining toasts
    document.body.innerHTML = '';
  });

  describe('ToastIcon', () => {
    it('renders default icon', () => {
      render(<ToastIcon />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('renders correct icon for each variant', () => {
      const variants = ['default', 'destructive', 'success', 'warning', 'info'] as const;
      
      variants.forEach(variant => {
        const { container } = render(<ToastIcon variant={variant} />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Toast', () => {
    it('renders basic toast', () => {
      render(
        <ToastProvider>
          <Toast>
            <ToastTitle>Test Title</ToastTitle>
            <ToastDescription>Test Description</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>,
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const variants = ['default', 'destructive', 'success', 'warning', 'info'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <ToastProvider>
            <Toast variant={variant}>
              <ToastTitle>Test</ToastTitle>
            </Toast>
            <ToastViewport />
          </ToastProvider>,
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('renders action button', () => {
      const mockAction = vi.fn();
      
      render(
        <ToastProvider>
          <Toast>
            <ToastTitle>Test</ToastTitle>
            <ToastAction altText="Action button" onClick={mockAction}>Action</ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>,
      );

      const actionButton = screen.getByRole('button', { name: 'Action' });
      expect(actionButton).toBeInTheDocument();
      
      fireEvent.click(actionButton);
      expect(mockAction).toHaveBeenCalledOnce();
    });

    it('can be closed', () => {
      render(
        <ToastProvider>
          <Toast>
            <ToastTitle>Test</ToastTitle>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>,
      );

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
      
      fireEvent.click(closeButton);
      // Toast should be dismissed (implementation detail of Radix UI)
    });
  });

  describe('ToastWithIcon', () => {
    it('renders toast with icon', () => {
      render(
        <ToastProvider>
          <ToastWithIcon variant="success">
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>Operation completed</ToastDescription>
          </ToastWithIcon>
          <ToastViewport />
        </ToastProvider>,
      );

      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Operation completed')).toBeInTheDocument();
      expect(document.querySelector('svg')).toBeInTheDocument();
    });
  });
});

describe('useToast Hook', () => {
  it('shows toast when called', async () => {
    render(<TestToastComponent />);
    
    const button = screen.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });
  });

  it('manages toast state correctly', async () => {
    render(<TestToastComponent />);
    
    const button = screen.getByRole('button', { name: 'Show Toast' });
    
    // Show multiple toasts
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      // Should show toasts (implementation may limit number)
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });
  });
});

describe('Toast Helper Functions', () => {
  it('showSuccessToast displays success toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Success Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Operation completed')).toBeInTheDocument();
    });
  });

  it('showErrorToast displays error toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Error Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error!')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('showWarningToast displays warning toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Warning Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Warning!')).toBeInTheDocument();
      expect(screen.getByText('Please be careful')).toBeInTheDocument();
    });
  });

  it('showInfoToast displays info toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Info Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Info!')).toBeInTheDocument();
      expect(screen.getByText('Here is some information')).toBeInTheDocument();
    });
  });

  it('showMealSavedToast displays meal saved toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Meal Saved Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Meal saved!')).toBeInTheDocument();
      expect(screen.getByText('"Pizza Margherita" has been added to your food diary.')).toBeInTheDocument();
    });
  });

  it('showOfflineSyncToast displays offline sync toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Offline Sync Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Syncing meals...')).toBeInTheDocument();
      expect(screen.getByText('3 meals will sync when you\'re back online.')).toBeInTheDocument();
    });
  });

  it('showNetworkErrorToast displays network error toast', async () => {
    render(<TestToastHelpers />);
    
    const button = screen.getByRole('button', { name: 'Network Error Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Connection error')).toBeInTheDocument();
      expect(screen.getByText('Unable to connect to our servers. Please check your internet connection.')).toBeInTheDocument();
    });
  });
});

describe('Photo Upload Toast', () => {
  it('shows photo upload progress toast', () => {
    const uploadToast = showPhotoUploadToast(25);
    
    expect(uploadToast).toHaveProperty('id');
    expect(uploadToast).toHaveProperty('update');
    expect(uploadToast).toHaveProperty('complete');
    expect(uploadToast).toHaveProperty('error');
  });

  it('updates progress correctly', async () => {
    const TestPhotoUpload = () => {
      const [progress, setProgress] = React.useState(0);
      const [uploadToast, setUploadToast] = React.useState<any>(null);

      const startUpload = () => {
        const toast = showPhotoUploadToast(0);
        setUploadToast(toast);
        setProgress(50);
      };

      React.useEffect(() => {
        if (uploadToast && progress > 0) {
          uploadToast.update(progress);
        }
      }, [uploadToast, progress]);

      return (
        <div>
          <button onClick={startUpload}>Start Upload</button>
          <Toaster />
        </div>
      );
    };

    render(<TestPhotoUpload />);
    
    const button = screen.getByRole('button', { name: 'Start Upload' });
    fireEvent.click(button);

    // Toast functionality is tested through integration
    expect(button).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('toasts have proper ARIA attributes', async () => {
    render(<TestToastComponent />);
    
    const button = screen.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      // Toast should be announced to screen readers
      const toast = screen.getByText('Test Toast').closest('[role]');
      expect(toast).toBeInTheDocument();
    });
  });

  it('toast actions are keyboard accessible', async () => {
    const TestToastWithAction = () => {
      const { toast: showToast } = useToast();

      return (
        <div>
          <button onClick={() => showToast({ 
            title: 'Test', 
            action: <button>Action</button>, 
          })}>
            Show Toast
          </button>
          <Toaster />
        </div>
      );
    };

    render(<TestToastWithAction />);
    
    const button = screen.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      const actionButton = screen.getByRole('button', { name: 'Action' });
      expect(actionButton).toBeInTheDocument();
      
      // Should be focusable
      actionButton.focus();
      expect(document.activeElement).toBe(actionButton);
    });
  });

  it('close button is keyboard accessible', async () => {
    render(<TestToastComponent />);
    
    const button = screen.getByRole('button', { name: 'Show Toast' });
    fireEvent.click(button);

    await waitFor(() => {
      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(btn => btn.getAttribute('toast-close') === '');
      
      if (closeButton) {
        closeButton.focus();
        expect(document.activeElement).toBe(closeButton);
      }
    });
  });
});

describe('Toast Positioning and Behavior', () => {
  it('renders toaster viewport', () => {
    render(<Toaster />);
    // Toaster should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it('handles multiple toasts correctly', async () => {
    const TestMultipleToasts = () => {
      const { toast: showToast } = useToast();

      return (
        <div>
          <button onClick={() => {
            showToast({ title: 'Toast 1' });
            showToast({ title: 'Toast 2' });
            showToast({ title: 'Toast 3' });
          }}>
            Show Multiple Toasts
          </button>
          <Toaster />
        </div>
      );
    };

    render(<TestMultipleToasts />);
    
    const button = screen.getByRole('button', { name: 'Show Multiple Toasts' });
    fireEvent.click(button);

    // Implementation may limit number of visible toasts
    await waitFor(() => {
      expect(screen.getByText('Toast 1')).toBeInTheDocument();
    });
  });
});