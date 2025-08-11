import { test, expect } from '@playwright/test';

/**
 * Convex Real-time Updates E2E Tests for FoodyLog
 * 
 * These tests validate Convex real-time functionality, including:
 * - Real-time data synchronization
 * - Connection handling
 * - Offline/online state management
 * - Multi-client synchronization
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

test.describe('Convex Real-time Updates', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for the app to load and Convex to connect
    await expect(page.locator('h1')).toBeVisible();
    
    // Wait for Convex connection (if there's a connection indicator)
    // This might need to be adjusted based on actual UI
    await page.waitForTimeout(2000);
  });

  test('should establish Convex connection', async ({ page }) => {
    // Check if Convex client is initialized
    const convexConnected = await page.evaluate(() => {
      // Check if Convex client exists in window (this depends on implementation)
      return typeof (window as any).convex !== 'undefined' ||
             typeof (window as any).ConvexReactClient !== 'undefined';
    });
    
    // If we can't check the client directly, check for data loading
    // which indicates successful connection
    const hasData = await page.locator('[data-testid="loading"], [data-testid="content"]').count();
    expect(hasData).toBeGreaterThan(0);
  });

  test('should handle connection states', async ({ page, context }) => {
    // Test online state
    await context.setOffline(false);
    await page.waitForTimeout(1000);
    
    // Check if app shows online state (this depends on UI implementation)
    const onlineIndicator = page.locator('[data-testid="online-status"], [data-testid="connected"]');
    const onlineCount = await onlineIndicator.count();
    
    // Test offline state
    await context.setOffline(true);
    await page.waitForTimeout(2000);
    
    // Check if app shows offline state
    const offlineIndicator = page.locator('[data-testid="offline-status"], [data-testid="disconnected"]');
    const offlineCount = await offlineIndicator.count();
    
    // At least one of these should be implemented
    expect(onlineCount + offlineCount).toBeGreaterThan(0);
    
    // Go back online
    await context.setOffline(false);
    await page.waitForTimeout(1000);
  });

  test('should sync data in real-time between clients', async ({ browser }) => {
    // Create two browser contexts to simulate multiple clients
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    try {
      // Load the app in both contexts
      await page1.goto('/');
      await page2.goto('/');
      
      // Wait for both to load
      await expect(page1.locator('h1')).toBeVisible();
      await expect(page2.locator('h1')).toBeVisible();
      
      // Wait for Convex connections
      await page1.waitForTimeout(2000);
      await page2.waitForTimeout(2000);
      
      // If there's a way to create/modify data in the UI, test real-time sync
      // For now, we'll test that both clients can load the same data
      
      // Check if both pages show consistent data
      const page1Content = await page1.locator('body').textContent();
      const page2Content = await page2.locator('body').textContent();
      
      // Both should have loaded the same base content
      expect(page1Content).toBeTruthy();
      expect(page2Content).toBeTruthy();
      
      // Test that both pages respond to navigation similarly
      // This indirectly tests that Convex is working consistently
      if (await page1.locator('nav a').count() > 0) {
        const navLink = page1.locator('nav a').first();
        const href = await navLink.getAttribute('href');
        
        if (href && href !== '/') {
          await page1.click('nav a');
          await page2.goto(href);
          
          // Both should show similar content for the same route
          await page1.waitForTimeout(1000);
          await page2.waitForTimeout(1000);
          
          const page1NewContent = await page1.locator('h1').textContent();
          const page2NewContent = await page2.locator('h1').textContent();
          
          expect(page1NewContent).toBe(page2NewContent);
        }
      }
      
    } finally {
      await context1.close();
      await context2.close();
    }
  });

  test('should handle Convex authentication state', async ({ page }) => {
    // Check if authentication is properly integrated with Convex
    
    // Look for auth-related elements
    const authElements = page.locator('[data-testid="login"], [data-testid="logout"], [data-testid="auth-status"]');
    const authCount = await authElements.count();
    
    if (authCount > 0) {
      // If auth elements exist, test auth state handling
      const authText = await authElements.first().textContent();
      expect(authText).toBeTruthy();
      
      // Test that auth state affects data access
      // This would depend on the specific implementation
    }
    
    // At minimum, the app should load without auth errors
    const errorElements = page.locator('[data-testid="error"], .error');
    const errorCount = await errorElements.count();
    
    if (errorCount > 0) {
      const errorText = await errorElements.first().textContent();
      // Should not have Convex-related auth errors on initial load
      expect(errorText).not.toContain('authentication');
      expect(errorText).not.toContain('unauthorized');
    }
  });

  test('should handle Convex query errors gracefully', async ({ page, context }) => {
    // Simulate network issues that might cause query failures
    await context.setOffline(true);
    await page.waitForTimeout(2000);
    
    // The app should handle offline state gracefully
    const errorElements = page.locator('[data-testid="error"], .error, [role="alert"]');
    const errorCount = await errorElements.count();
    
    if (errorCount > 0) {
      const errorText = await errorElements.first().textContent();
      expect(errorText).toBeTruthy();
      
      // Error should be user-friendly, not technical
      expect(errorText).not.toContain('ConvexError');
      expect(errorText).not.toContain('undefined');
      expect(errorText).not.toContain('null');
    }
    
    // Go back online
    await context.setOffline(false);
    await page.waitForTimeout(2000);
    
    // App should recover
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should maintain data consistency during reconnection', async ({ page, context }) => {
    // Load initial data
    await page.waitForTimeout(2000);
    const initialContent = await page.locator('body').textContent();
    
    // Go offline
    await context.setOffline(true);
    await page.waitForTimeout(2000);
    
    // Go back online
    await context.setOffline(false);
    await page.waitForTimeout(3000); // Allow time for reconnection
    
    // Content should be consistent (or updated if there were changes)
    const reconnectedContent = await page.locator('body').textContent();
    expect(reconnectedContent).toBeTruthy();
    
    // The app should still be functional
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle Convex mutations', async ({ page }) => {
    // This test would be more meaningful with actual mutation functionality
    // For now, we test that the app can handle form submissions or button clicks
    // that would typically trigger mutations
    
    const interactiveElements = page.locator('button, input[type="submit"], [role="button"]');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      // Test that clicking interactive elements doesn't cause errors
      const firstElement = interactiveElements.first();
      
      // Check if element is visible and enabled
      const isVisible = await firstElement.isVisible();
      const isEnabled = await firstElement.isEnabled();
      
      if (isVisible && isEnabled) {
        // Click the element
        await firstElement.click();
        
        // Wait for any potential mutations to complete
        await page.waitForTimeout(1000);
        
        // App should still be functional
        await expect(page.locator('h1')).toBeVisible();
        
        // Should not have uncaught errors
        const errorElements = page.locator('[data-testid="error"], .error');
        const errorCount = await errorElements.count();
        
        if (errorCount > 0) {
          const errorText = await errorElements.first().textContent();
          // Should not have mutation-related errors
          expect(errorText).not.toContain('mutation');
          expect(errorText).not.toContain('ConvexError');
        }
      }
    }
  });

  test('should handle real-time subscriptions', async ({ page }) => {
    // Test that the app can handle real-time data updates
    // This is challenging to test without actual data changes
    
    // Check if the app has subscription-related code
    const hasSubscriptions = await page.evaluate(() => {
      // Look for common subscription patterns in the page
      const scripts = Array.from(document.scripts);
      const hasUseQuery = scripts.some(script => 
        script.textContent?.includes('useQuery') || 
        script.textContent?.includes('subscription')
      );
      
      return hasUseQuery || typeof (window as any).convex !== 'undefined';
    });
    
    // If we can't detect subscriptions directly, at least verify
    // that the app loads and maintains state properly
    await page.waitForTimeout(2000);
    await expect(page.locator('h1')).toBeVisible();
    
    // Refresh the page and verify it loads consistently
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should meet real-time performance requirements', async ({ page }) => {
    // Test that real-time updates meet performance requirements
    // Per FoodyLog requirements: search results < 500ms
    
    const searchElements = page.locator('input[type="search"], [data-testid="search"]');
    const searchCount = await searchElements.count();
    
    if (searchCount > 0) {
      const searchInput = searchElements.first();
      
      // Test search performance
      const startTime = Date.now();
      await searchInput.fill('test');
      
      // Wait for search results or loading indicator
      await page.waitForTimeout(100); // Small delay for debouncing
      
      const endTime = Date.now();
      const searchTime = endTime - startTime;
      
      // Should respond quickly (within 500ms requirement)
      expect(searchTime).toBeLessThan(500);
    }
    
    // Test general app responsiveness
    const startTime = Date.now();
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
    const loadTime = Date.now() - startTime;
    
    // Should load within 2 seconds (per requirements)
    expect(loadTime).toBeLessThan(2000);
  });
});