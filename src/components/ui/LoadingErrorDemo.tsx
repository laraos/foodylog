/**
 * FoodyLog Loading and Error States Demo
 * 
 * Demonstration component showing all the loading and error state components
 * implemented for task 4. This component showcases the FoodyLog branding,
 * animations, and responsive design across different screen sizes.
 */

import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { 
  LoadingSpinner, 
  FoodyLogSpinner, 
  CameraSpinner, 
  PulseLoader, 
} from './LoadingSpinner';
import {
  ProgressLoader,
  CircularProgress,
  PhotoUploadLoader,
  SyncLoader,
  MealFormSkeleton,
  StatsCardSkeleton,
  SearchResultsSkeleton,
  PhotoGridSkeleton,
  TableLoader,
} from './loading';
import {
  ErrorMessage,
  NetworkError,
  EmptyMeals,
  EmptySearch,
  CameraError,
  FormError,
  ServerError,
  ValidationError,
} from './error';
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showMealSavedToast,
  showPhotoUploadToast,
  showOfflineSyncToast,
  showNetworkErrorToast,
} from '../../hooks/use-toast';
import { Toaster } from './toaster';

export function LoadingErrorDemo() {
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [currentDemo, setCurrentDemo] = useState<'loading' | 'error' | 'toast'>('loading');

  // Simulate progress for demo
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToastDemo = (type: string) => {
    switch (type) {
      case 'success':
        showSuccessToast('Success!', 'Operation completed successfully');
        break;
      case 'error':
        showErrorToast('Error!', 'Something went wrong');
        break;
      case 'warning':
        showWarningToast('Warning!', 'Please be careful');
        break;
      case 'info':
        showInfoToast('Info!', 'Here is some information');
        break;
      case 'meal-saved':
        showMealSavedToast('Pizza Margherita', () => console.log('Undo clicked'));
        break;
      case 'photo-upload': {
        const uploadToast = showPhotoUploadToast(0);
        let uploadProgress = 0;
        const uploadInterval = setInterval(() => {
          uploadProgress += 20;
          if (uploadProgress <= 100) {
            uploadToast.update(uploadProgress);
          }
          if (uploadProgress >= 100) {
            uploadToast.complete();
            clearInterval(uploadInterval);
          }
        }, 300);
        break;
      }
      case 'offline-sync':
        showOfflineSyncToast(3);
        break;
      case 'network-error':
        showNetworkErrorToast(() => console.log('Retry clicked'));
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            FoodyLog Loading & Error States Demo
          </h1>
          <p className="text-muted-foreground">
            Comprehensive showcase of loading states, error handling, and toast notifications
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={currentDemo === 'loading' ? 'default' : 'outline'}
            onClick={() => setCurrentDemo('loading')}
          >
            Loading States
          </Button>
          <Button
            variant={currentDemo === 'error' ? 'default' : 'outline'}
            onClick={() => setCurrentDemo('error')}
          >
            Error States
          </Button>
          <Button
            variant={currentDemo === 'toast' ? 'default' : 'outline'}
            onClick={() => setCurrentDemo('toast')}
          >
            Toast Notifications
          </Button>
        </div>

        {/* Loading States Demo */}
        {currentDemo === 'loading' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Loading Spinners</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">Standard Spinner</h3>
                  <LoadingSpinner size="lg" showText />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">FoodyLog Branded</h3>
                  <FoodyLogSpinner size="lg" />
                </div>
                <div className="text-center space-y-4 bg-black/80 rounded-lg p-4">
                  <h3 className="font-semibold text-white">Camera Spinner</h3>
                  <CameraSpinner />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">Pulse Loader</h3>
                  <PulseLoader />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Linear Progress</h3>
                  <ProgressLoader progress={progress} label="Uploading photo..." />
                </div>
                <div className="flex items-center space-x-8">
                  <div>
                    <h3 className="font-semibold mb-4">Circular Progress</h3>
                    <CircularProgress progress={progress} size="lg" />
                  </div>
                  <div className="relative w-48 h-32 bg-black/80 rounded-lg">
                    <PhotoUploadLoader progress={progress} stage="uploading" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loading States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Meal Card Skeletons</h3>
                  <SearchResultsSkeleton count={3} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Form Skeleton</h3>
                    <MealFormSkeleton />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Stats & Photo Grid</h3>
                    <div className="space-y-4">
                      <StatsCardSkeleton />
                      <PhotoGridSkeleton count={4} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialized Loading States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Sync Loader</h3>
                  <div className="space-y-4">
                    <SyncLoader pendingCount={3} isOnline={isOnline} />
                    <Button
                      variant="outline"
                      onClick={() => setIsOnline(!isOnline)}
                    >
                      Toggle {isOnline ? 'Offline' : 'Online'}
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Table Loader</h3>
                  <TableLoader rows={3} columns={4} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error States Demo */}
        {currentDemo === 'error' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>General Error States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ErrorMessage
                  message="This is a general error message"
                  action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
                />
                <ErrorMessage
                  title="Warning"
                  message="This is a warning message"
                  variant="warning"
                />
                <ErrorMessage
                  title="Information"
                  message="This is an informational message"
                  variant="info"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Connection Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <NetworkError
                  isOnline={isOnline}
                  onRetry={() => console.log('Network retry clicked')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empty States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <EmptyMeals onAddMeal={() => console.log('Add meal clicked')} />
                <EmptySearch
                  query="pizza"
                  onClearSearch={() => console.log('Clear search clicked')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialized Error States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CameraError
                  onTryAgain={() => console.log('Try again clicked')}
                  onOpenSettings={() => console.log('Open settings clicked')}
                />
                <ServerError onRetry={() => console.log('Server retry clicked')} />
                <FormError message="This field is required" />
                <ValidationError
                  errors={[
                    'Meal title is required',
                    'Rating must be between 1 and 10',
                    'At least one photo is required',
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Toast Notifications Demo */}
        {currentDemo === 'toast' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => handleToastDemo('success')} variant="outline">
                    Success Toast
                  </Button>
                  <Button onClick={() => handleToastDemo('error')} variant="outline">
                    Error Toast
                  </Button>
                  <Button onClick={() => handleToastDemo('warning')} variant="outline">
                    Warning Toast
                  </Button>
                  <Button onClick={() => handleToastDemo('info')} variant="outline">
                    Info Toast
                  </Button>
                  <Button onClick={() => handleToastDemo('meal-saved')} variant="outline">
                    Meal Saved
                  </Button>
                  <Button onClick={() => handleToastDemo('photo-upload')} variant="outline">
                    Photo Upload
                  </Button>
                  <Button onClick={() => handleToastDemo('offline-sync')} variant="outline">
                    Offline Sync
                  </Button>
                  <Button onClick={() => handleToastDemo('network-error')} variant="outline">
                    Network Error
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toast Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Automatic icons based on toast variant</li>
                    <li>Action buttons with proper accessibility</li>
                    <li>Progress tracking for uploads</li>
                    <li>Swipe to dismiss on mobile</li>
                    <li>Keyboard navigation support</li>
                    <li>Screen reader announcements</li>
                    <li>FoodyLog theme integration</li>
                    <li>Mobile-optimized positioning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Loading Components</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• FoodyLog branded spinners</li>
                  <li>• Progress indicators with animations</li>
                  <li>• Meal-specific skeleton states</li>
                  <li>• Photo upload progress</li>
                  <li>• Offline sync indicators</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Error Handling</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• User-friendly error messages</li>
                  <li>• Recovery action buttons</li>
                  <li>• Network status awareness</li>
                  <li>• Empty state guidance</li>
                  <li>• Form validation feedback</li>
                  <li>• Camera permission handling</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Toast System</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Multiple variants with icons</li>
                  <li>• Action buttons and undo</li>
                  <li>• Progress tracking</li>
                  <li>• Accessibility compliant</li>
                  <li>• Mobile-optimized</li>
                  <li>• FoodyLog helper functions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}