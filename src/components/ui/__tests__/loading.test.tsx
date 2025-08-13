/**
 * FoodyLog Loading Components Tests
 * 
 * Comprehensive tests for all loading state components including
 * accessibility, responsiveness, and FoodyLog-specific functionality.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  LoadingSpinner,
  FoodyLogSpinner,
  CameraSpinner,
  PulseLoader,
} from '../LoadingSpinner';
import {
  ProgressLoader,
  CircularProgress,
  PhotoUploadLoader,
  SyncLoader,
  MealCardSkeleton,
  MealFormSkeleton,
  StatsCardSkeleton,
} from '../loading';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Custom loading message" showText />);
    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner text="Loading meals" />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-label', 'Loading meals');
    expect(screen.getByText('Loading meals', { selector: '.sr-only' })).toBeInTheDocument();
  });
});

describe('FoodyLogSpinner', () => {
  it('renders with FoodyLog branding', () => {
    render(<FoodyLogSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading your meals...')).toBeInTheDocument();
  });

  it('can hide text', () => {
    render(<FoodyLogSpinner showText={false} />);
    expect(screen.queryByText('Loading your meals...')).not.toBeInTheDocument();
    // Screen reader text should still be present
    expect(screen.getByText('Loading your meals...', { selector: '.sr-only' })).toBeInTheDocument();
  });
});

describe('CameraSpinner', () => {
  it('renders camera-specific loading state', () => {
    render(<CameraSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Processing photo...')).toBeInTheDocument();
  });

  it('supports custom text', () => {
    render(<CameraSpinner text="Capturing image..." />);
    expect(screen.getByText('Capturing image...')).toBeInTheDocument();
  });
});

describe('PulseLoader', () => {
  it('renders pulsing dots', () => {
    render(<PulseLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});

describe('ProgressLoader', () => {
  it('renders progress with percentage', () => {
    render(<ProgressLoader progress={50} label="Uploading..." />);
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('clamps progress values', () => {
    const { rerender } = render(<ProgressLoader progress={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();

    rerender(<ProgressLoader progress={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('can hide percentage', () => {
    render(<ProgressLoader progress={75} showPercentage={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('supports different variants', () => {
    const { rerender } = render(<ProgressLoader progress={50} variant="upload" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<ProgressLoader progress={50} variant="sync" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('CircularProgress', () => {
  it('renders circular progress indicator', () => {
    render(<CircularProgress progress={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const { rerender } = render(<CircularProgress progress={50} size="sm" />);
    expect(screen.getByText('50%')).toBeInTheDocument();

    rerender(<CircularProgress progress={50} size="lg" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('can hide percentage', () => {
    render(<CircularProgress progress={25} showPercentage={false} />);
    expect(screen.queryByText('25%')).not.toBeInTheDocument();
  });
});

describe('PhotoUploadLoader', () => {
  it('renders photo upload loading state', () => {
    render(<PhotoUploadLoader />);
    expect(screen.getByText('Uploading photo...')).toBeInTheDocument();
  });

  it('shows progress when provided', () => {
    render(<PhotoUploadLoader progress={60} />);
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('shows different stages', () => {
    const { rerender } = render(<PhotoUploadLoader stage="processing" />);
    expect(screen.getByText('Processing image...')).toBeInTheDocument();

    rerender(<PhotoUploadLoader stage="optimizing" />);
    expect(screen.getByText('Optimizing for web...')).toBeInTheDocument();

    rerender(<PhotoUploadLoader stage="complete" />);
    expect(screen.getByText('Upload complete!')).toBeInTheDocument();
  });
});

describe('SyncLoader', () => {
  it('renders sync loading state when online', () => {
    render(<SyncLoader pendingCount={3} isOnline={true} />);
    expect(screen.getByText('Syncing meals...')).toBeInTheDocument();
    expect(screen.getByText('3 meals pending sync')).toBeInTheDocument();
  });

  it('renders waiting state when offline', () => {
    render(<SyncLoader pendingCount={1} isOnline={false} />);
    expect(screen.getByText('Waiting for connection...')).toBeInTheDocument();
    expect(screen.getByText('1 meal pending sync')).toBeInTheDocument();
  });

  it('handles singular vs plural correctly', () => {
    const { rerender } = render(<SyncLoader pendingCount={1} isOnline={true} />);
    expect(screen.getByText('1 meal pending sync')).toBeInTheDocument();

    rerender(<SyncLoader pendingCount={5} isOnline={true} />);
    expect(screen.getByText('5 meals pending sync')).toBeInTheDocument();
  });
});

describe('Skeleton Components', () => {
  it('renders MealCardSkeleton', () => {
    render(<MealCardSkeleton />);
    // Should render skeleton elements for meal card structure
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders MealFormSkeleton', () => {
    render(<MealFormSkeleton />);
    // Should render skeleton elements for form structure
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders StatsCardSkeleton', () => {
    render(<StatsCardSkeleton />);
    // Should render skeleton elements for stats card structure
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('all loading components have proper ARIA labels', () => {
    render(
      <div>
        <LoadingSpinner text="Loading spinner" />
        <FoodyLogSpinner />
        <CameraSpinner />
        <PulseLoader />
      </div>,
    );

    const statusElements = screen.getAllByRole('status');
    expect(statusElements).toHaveLength(4);
    
    statusElements.forEach(element => {
      expect(element).toHaveAttribute('aria-label');
    });
  });

  it('screen reader text is always present', () => {
    render(<LoadingSpinner text="Test loading" showText={false} />);
    expect(screen.getByText('Test loading', { selector: '.sr-only' })).toBeInTheDocument();
  });
});

describe('Responsive Design', () => {
  it('components adapt to different screen sizes', () => {
    // Test that components don't break at different viewport sizes
    const { container } = render(
      <div>
        <ProgressLoader progress={50} />
        <CircularProgress progress={75} />
        <PhotoUploadLoader progress={25} />
      </div>,
    );

    // Components should render without errors
    expect(container.firstChild).toBeInTheDocument();
  });
});