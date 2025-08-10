/**
 * DeviceEmulationWarning Component
 * 
 * Shows a helpful warning banner when device emulation is detected
 * during authentication flows to help developers avoid Cloudflare issues.
 * 
 * Only shows in development mode and when device emulation is detected.
 */

import React, { useState, useEffect } from 'react';
import { isDeviceEmulation } from '../../lib/auth/clerk';

/**
 * DeviceEmulationWarning Component
 * 
 * Displays a dismissible warning banner about device emulation issues
 * with Clerk authentication and Cloudflare protection.
 */
export const DeviceEmulationWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Only show in development and if device emulation is detected
    if (process.env.NODE_ENV === 'development' && isDeviceEmulation() && !isDismissed) {
      setShowWarning(true);
    }
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowWarning(false);
    // Store dismissal in sessionStorage so it doesn't show again this session
    sessionStorage.setItem('foodylog-device-emulation-warning-dismissed', 'true');
  };

  // Check if already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('foodylog-device-emulation-warning-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  if (!showWarning) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 p-3">
      <div className="max-w-4xl mx-auto flex items-start space-x-3">
        {/* Warning Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="w-5 h-5 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Warning Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-yellow-800">
            Device Emulation Detected
          </h3>
          <div className="mt-1 text-sm text-yellow-700">
            <p className="mb-2">
              Chrome DevTools device emulation can cause Cloudflare verification loops during authentication.
            </p>
            <div className="space-y-1">
              <p className="font-medium">Quick fixes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Disable device toolbar (📱 icon) in DevTools</li>
                <li>Complete sign-up/sign-in in desktop mode</li>
                <li>Re-enable device toolbar after authentication</li>
                <li>Or use real mobile devices with <code className="bg-yellow-100 px-1 rounded">bunx cap run android</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
            aria-label="Dismiss warning"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceEmulationWarning;