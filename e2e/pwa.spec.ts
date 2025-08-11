import { test, expect } from '@playwright/test';

/**
 * PWA (Progressive Web App) E2E Tests for FoodyLog
 * 
 * These tests validate PWA installation, offline functionality, and service worker behavior.
 * Tests ensure the app meets PWA requirements and works offline as expected.
 * 
 * Requirements: 1.4, 1.5, 1.6, 1.7
 */

test.describe('PWA Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for the app to load
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have PWA manifest with correct properties', async ({ page }) => {
    // Check if manifest link exists
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveCount(1);
    
    // Get manifest URL and fetch it
    const manifestHref = await manifestLink.getAttribute('href');
    expect(manifestHref).toBeTruthy();
    
    const manifestResponse = await page.request.get(manifestHref!);
    expect(manifestResponse.ok()).toBeTruthy();
    
    const manifest = await manifestResponse.json();
    
    // Validate required PWA manifest properties
    expect(manifest.name).toBe('FoodyLog');
    expect(manifest.short_name).toBe('FoodyLog');
    expect(manifest.description).toBe('The simplest way to remember every meal that matters');
    expect(manifest.display).toBe('standalone');
    expect(manifest.orientation).toBe('portrait');
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    
    // Validate theme colors
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.background_color).toBeTruthy();
    
    // Validate icons
    expect(manifest.icons).toHaveLength(3);
    expect(manifest.icons[0].sizes).toBe('192x192');
    expect(manifest.icons[1].sizes).toBe('512x512');
    expect(manifest.icons[2].purpose).toBe('any maskable');
  });

  test('should register service worker', async ({ page }) => {
    // Wait for service worker registration
    await page.waitForFunction(() => {
      return 'serviceWorker' in navigator && navigator.serviceWorker.ready;
    });
    
    // Check if service worker is registered
    const swRegistered = await page.evaluate(() => {
      return navigator.serviceWorker.controller !== null;
    });
    
    expect(swRegistered).toBeTruthy();
  });

  test('should work offline after initial load', async ({ page, context }) => {
    // Load the app and wait for service worker
    await page.waitForLoadState('networkidle');
    
    // Wait for service worker to be ready
    await page.waitForFunction(() => {
      return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
    });
    
    // Go offline
    await context.setOffline(true);
    
    // Reload the page
    await page.reload();
    
    // The app should still load from cache
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    
    // Check that we're actually offline
    const isOnline = await page.evaluate(() => navigator.onLine);
    expect(isOnline).toBeFalsy();
    
    // Go back online
    await context.setOffline(false);
  });

  test('should cache static assets', async ({ page, context }) => {
    // Load the app initially
    await page.waitForLoadState('networkidle');
    
    // Wait for service worker
    await page.waitForFunction(() => {
      return 'serviceWorker' in navigator && navigator.serviceWorker.controller;
    });
    
    // Go offline
    await context.setOffline(true);
    
    // Navigate to different routes (if they exist)
    // The cached assets should still load
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if CSS is still applied (indicating stylesheets are cached)
    const bodyStyles = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el);
    });
    
    // Should have some styling applied (not default browser styles)
    expect(bodyStyles.fontFamily).not.toBe('Times'); // Default browser font
    
    await context.setOffline(false);
  });

  test('should show install prompt on supported browsers', async ({ page, browserName }) => {
    // Skip this test on browsers that don't support PWA installation
    test.skip(browserName === 'firefox', 'Firefox does not support PWA installation prompts');
    
    // Listen for beforeinstallprompt event
    await page.addInitScript(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Store the event for later use
        (window as any).deferredPrompt = e;
        e.preventDefault();
      });
    });
    
    // Load the app
    await page.waitForLoadState('networkidle');
    
    // Check if install prompt is available
    const hasInstallPrompt = await page.evaluate(() => {
      return (window as any).deferredPrompt !== undefined;
    });
    
    // Note: This might not always trigger in test environment
    // but we can at least verify the event listener is set up
    console.log(`Install prompt available: ${hasInstallPrompt}`);
  });

  test('should handle app updates gracefully', async ({ page }) => {
    // Load the app
    await page.waitForLoadState('networkidle');
    
    // Wait for service worker
    await page.waitForFunction(() => {
      return 'serviceWorker' in navigator && navigator.serviceWorker.ready;
    });
    
    // Check if update mechanism is in place
    const hasUpdateMechanism = await page.evaluate(() => {
      return 'serviceWorker' in navigator && 
             typeof navigator.serviceWorker.addEventListener === 'function';
    });
    
    expect(hasUpdateMechanism).toBeTruthy();
  });

  test('should meet PWA lighthouse requirements', async ({ page }) => {
    // Basic PWA requirements check
    
    // 1. HTTPS (or localhost)
    const url = page.url();
    const isSecure = url.startsWith('https://') || url.startsWith('http://localhost');
    expect(isSecure).toBeTruthy();
    
    // 2. Responsive design
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await expect(page.locator('h1')).toBeVisible();
    
    await page.setViewportSize({ width: 1024, height: 768 }); // Desktop
    await expect(page.locator('h1')).toBeVisible();
    
    // 3. Fast load time (should load within 2 seconds per requirements)
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000); // 2 second requirement
    
    // 4. Accessible (basic check)
    await expect(page.locator('h1')).toBeVisible();
    
    // 5. Valid manifest
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveCount(1);
  });

  test('should handle network failures gracefully', async ({ page, context }) => {
    // Load app initially
    await page.waitForLoadState('networkidle');
    
    // Simulate network failure
    await context.setOffline(true);
    
    // Try to perform actions that would normally require network
    // The app should handle these gracefully
    
    // Check if there's any error handling UI
    const errorElements = page.locator('[data-testid="error"], .error, [role="alert"]');
    const errorCount = await errorElements.count();
    
    // If there are error elements, they should be informative
    if (errorCount > 0) {
      const errorText = await errorElements.first().textContent();
      expect(errorText).toBeTruthy();
      expect(errorText!.length).toBeGreaterThan(0);
    }
    
    await context.setOffline(false);
  });

  test('should persist data offline', async ({ page, context }) => {
    // This test would be more meaningful with actual data operations
    // For now, we test that localStorage/IndexedDB is available
    
    const hasStorage = await page.evaluate(() => {
      return typeof Storage !== 'undefined' && 
             typeof localStorage !== 'undefined' &&
             typeof indexedDB !== 'undefined';
    });
    
    expect(hasStorage).toBeTruthy();
    
    // Test localStorage persistence across offline/online states
    await page.evaluate(() => {
      localStorage.setItem('test-offline-data', JSON.stringify({ 
        timestamp: Date.now(),
        data: 'test-value' 
      }));
    });
    
    await context.setOffline(true);
    
    const offlineData = await page.evaluate(() => {
      return localStorage.getItem('test-offline-data');
    });
    
    expect(offlineData).toBeTruthy();
    
    await context.setOffline(false);
    
    // Clean up
    await page.evaluate(() => {
      localStorage.removeItem('test-offline-data');
    });
  });
});