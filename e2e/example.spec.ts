import { test, expect } from '@playwright/test';

/**
 * Basic E2E tests for FoodyLog application
 * 
 * These tests verify core functionality works across different browsers
 * and devices. Tests run in CI/CD pipeline to catch regressions.
 */

test.describe('FoodyLog App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads and has the expected title
    await expect(page).toHaveTitle(/FoodyLog/);
    
    // Verify the main heading is present
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Basic accessibility checks
    // Check for proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check for proper navigation landmarks
    const nav = page.locator('nav');
    if (await nav.count() > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });

  test('should work offline (PWA)', async ({ page, context }) => {
    // Go online first to load the app
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    
    // Simulate offline mode
    await context.setOffline(true);
    
    // Reload the page - should still work due to service worker
    await page.reload();
    
    // The app should still be functional offline
    await expect(page.locator('h1')).toBeVisible();
    
    // Go back online
    await context.setOffline(false);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check that content is visible and properly sized on mobile
    await expect(page.locator('h1')).toBeVisible();
    
    // Verify no horizontal scrolling
    const bodyWidth = await page.locator('body').boundingBox();
    expect(bodyWidth?.width).toBeLessThanOrEqual(375);
  });
});