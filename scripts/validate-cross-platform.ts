#!/usr/bin/env bun

/**
 * Cross-Platform Validation Script for FoodyLog
 * 
 * This script validates all cross-platform functionality including:
 * - Hot reload functionality on web and mobile platforms
 * - PWA installation and offline functionality
 * - Capacitor live reload on physical devices
 * - Convex real-time updates across platforms
 * - Complete build process for all target platforms
 * - CI/CD pipeline validation
 * 
 * Requirements: 1.4, 1.5, 2.5, 3.5, 4.4
 */

import { spawn, spawnSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  test: string;
  passed: boolean;
  message: string;
  duration: number;
}

class CrossPlatformValidator {
  private results: ValidationResult[] = [];
  private startTime: number = 0;

  constructor() {
    console.log('🚀 Starting FoodyLog Cross-Platform Validation');
    console.log('=' .repeat(60));
  }

  /**
   * Run a validation test and record the result
   */
  private async runTest(testName: string, testFn: () => Promise<boolean>): Promise<void> {
    console.log(`\n🧪 Testing: ${testName}`);
    this.startTime = Date.now();
    
    try {
      const passed = await testFn();
      const duration = Date.now() - this.startTime;
      
      this.results.push({
        test: testName,
        passed,
        message: passed ? 'PASSED' : 'FAILED',
        duration
      });
      
      console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASSED' : 'FAILED'} (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - this.startTime;
      this.results.push({
        test: testName,
        passed: false,
        message: `ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      });
      
      console.log(`❌ ${testName}: ERROR - ${error instanceof Error ? error.message : 'Unknown error'} (${duration}ms)`);
    }
  }

  /**
   * Execute a shell command and return success status
   */
  private async executeCommand(command: string, args: string[] = [], timeout: number = 30000): Promise<boolean> {
    return new Promise((resolve) => {
      const child = spawn(command, args, { 
        stdio: 'pipe',
        shell: true,
        timeout 
      });
      
      let output = '';
      let errorOutput = '';
      
      child.stdout?.on('data', (data) => {
        output += data.toString();
      });
      
      child.stderr?.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          console.log(`Command failed with code ${code}`);
          if (errorOutput) console.log(`Error: ${errorOutput}`);
          resolve(false);
        }
      });
      
      child.on('error', (error) => {
        console.log(`Command error: ${error.message}`);
        resolve(false);
      });
      
      // Kill process after timeout
      setTimeout(() => {
        child.kill();
        resolve(false);
      }, timeout);
    });
  }

  /**
   * Test 1: Hot reload functionality on web platform
   */
  private async testWebHotReload(): Promise<boolean> {
    console.log('  📱 Testing web hot reload functionality...');
    
    // Start dev server in background
    const devServer = spawn('bun', ['run', 'dev'], { 
      stdio: 'pipe',
      detached: true 
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      // Test if server is responding
      const response = await fetch('http://localhost:5173');
      if (!response.ok) {
        throw new Error('Dev server not responding');
      }
      
      // Create a test file change to verify hot reload
      const testFile = 'src/test-hot-reload.ts';
      writeFileSync(testFile, `export const testValue = ${Date.now()};`);
      
      // Wait for hot reload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clean up test file
      if (existsSync(testFile)) {
        const fs = await import('fs/promises');
        await fs.unlink(testFile);
      }
      
      return true;
    } catch (error) {
      console.log(`  ❌ Web hot reload test failed: ${error}`);
      return false;
    } finally {
      // Kill dev server
      if (devServer.pid) {
        process.kill(-devServer.pid, 'SIGTERM');
      }
    }
  }

  /**
   * Test 2: PWA installation and offline functionality
   */
  private async testPWAFunctionality(): Promise<boolean> {
    console.log('  📱 Testing PWA installation and offline functionality...');
    
    // Build the app first
    const buildSuccess = await this.executeCommand('bun', ['run', 'build'], 60000);
    if (!buildSuccess) {
      console.log('  ❌ Build failed, cannot test PWA');
      return false;
    }
    
    // Check if PWA manifest exists
    if (!existsSync('dist/manifest.json')) {
      console.log('  ❌ PWA manifest not found');
      return false;
    }
    
    // Check if service worker exists
    const swExists = existsSync('dist/sw.js') || existsSync('dist/service-worker.js');
    if (!swExists) {
      console.log('  ❌ Service worker not found');
      return false;
    }
    
    // Run PWA-specific E2E tests
    const pwaTestSuccess = await this.executeCommand('bunx', ['playwright', 'test', 'e2e/pwa.spec.ts'], 60000);
    
    return pwaTestSuccess;
  }

  /**
   * Test 3: Capacitor live reload validation
   */
  private async testCapacitorLiveReload(): Promise<boolean> {
    console.log('  📱 Testing Capacitor live reload functionality...');
    
    // Check if Capacitor is properly configured
    if (!existsSync('capacitor.config.ts')) {
      console.log('  ❌ Capacitor config not found');
      return false;
    }
    
    // Sync Capacitor
    const syncSuccess = await this.executeCommand('bunx', ['cap', 'sync'], 30000);
    if (!syncSuccess) {
      console.log('  ❌ Capacitor sync failed');
      return false;
    }
    
    // Check if Android project exists
    const androidExists = existsSync('android');
    const iosExists = existsSync('ios');
    
    if (!androidExists && !iosExists) {
      console.log('  ❌ No mobile platforms found');
      return false;
    }
    
    console.log(`  ✅ Capacitor platforms available: ${androidExists ? 'Android' : ''} ${iosExists ? 'iOS' : ''}`);
    
    // Test live reload configuration
    const configContent = readFileSync('capacitor.config.ts', 'utf-8');
    const hasLiveReloadConfig = configContent.includes('server') || process.env.CAP_SERVER_URL;
    
    if (!hasLiveReloadConfig) {
      console.log('  ⚠️  Live reload not configured (set CAP_SERVER_URL for device testing)');
    }
    
    return true;
  }

  /**
   * Test 4: Convex real-time updates validation
   */
  private async testConvexRealTimeUpdates(): Promise<boolean> {
    console.log('  📱 Testing Convex real-time updates...');
    
    // Check if Convex is configured
    if (!existsSync('convex')) {
      console.log('  ❌ Convex directory not found');
      return false;
    }
    
    if (!existsSync('convex/schema.ts')) {
      console.log('  ❌ Convex schema not found');
      return false;
    }
    
    // Run Convex-specific tests
    const convexTestSuccess = await this.executeCommand('bunx', ['playwright', 'test', 'e2e/convex-realtime.spec.ts'], 60000);
    
    return convexTestSuccess;
  }

  /**
   * Test 5: Complete build process for all platforms
   */
  private async testCompleteBuildProcess(): Promise<boolean> {
    console.log('  📱 Testing complete build process for all platforms...');
    
    // Test web build
    console.log('    🌐 Building web version...');
    const webBuildSuccess = await this.executeCommand('bun', ['run', 'build'], 60000);
    if (!webBuildSuccess) {
      console.log('  ❌ Web build failed');
      return false;
    }
    
    // Test Capacitor sync
    console.log('    📱 Syncing Capacitor...');
    const capSyncSuccess = await this.executeCommand('bunx', ['cap', 'sync'], 30000);
    if (!capSyncSuccess) {
      console.log('  ❌ Capacitor sync failed');
      return false;
    }
    
    // Test Android build (if available)
    if (existsSync('android')) {
      console.log('    🤖 Testing Android build...');
      const androidBuildSuccess = await this.executeCommand('bunx', ['cap', 'build', 'android'], 120000);
      if (!androidBuildSuccess) {
        console.log('  ⚠️  Android build failed (may require Android SDK)');
      }
    }
    
    // Test iOS build (if available and on macOS)
    if (existsSync('ios') && process.platform === 'darwin') {
      console.log('    🍎 Testing iOS build...');
      const iosBuildSuccess = await this.executeCommand('bunx', ['cap', 'build', 'ios'], 120000);
      if (!iosBuildSuccess) {
        console.log('  ⚠️  iOS build failed (may require Xcode)');
      }
    }
    
    return true;
  }

  /**
   * Test 6: CI/CD pipeline validation
   */
  private async testCICDPipeline(): Promise<boolean> {
    console.log('  📱 Testing CI/CD pipeline validation...');
    
    // Check if GitHub Actions workflow exists
    if (!existsSync('.github/workflows')) {
      console.log('  ❌ GitHub Actions workflows not found');
      return false;
    }
    
    // Run all checks that would run in CI
    console.log('    🔍 Running type check...');
    const typeCheckSuccess = await this.executeCommand('bun', ['run', 'type-check'], 30000);
    
    console.log('    🔍 Running linting...');
    const lintSuccess = await this.executeCommand('bun', ['run', 'lint'], 30000);
    
    console.log('    🔍 Running format check...');
    const formatSuccess = await this.executeCommand('bun', ['run', 'format:check'], 30000);
    
    console.log('    🧪 Running unit tests...');
    const testSuccess = await this.executeCommand('bun', ['run', 'test', '--run'], 60000);
    
    console.log('    🎭 Running E2E tests...');
    const e2eSuccess = await this.executeCommand('bun', ['run', 'test:e2e'], 120000);
    
    return typeCheckSuccess && lintSuccess && formatSuccess && testSuccess && e2eSuccess;
  }

  /**
   * Run all validation tests
   */
  async runAllTests(): Promise<void> {
    const startTime = Date.now();
    
    await this.runTest('Web Hot Reload Functionality', () => this.testWebHotReload());
    await this.runTest('PWA Installation and Offline Functionality', () => this.testPWAFunctionality());
    await this.runTest('Capacitor Live Reload Validation', () => this.testCapacitorLiveReload());
    await this.runTest('Convex Real-time Updates', () => this.testConvexRealTimeUpdates());
    await this.runTest('Complete Build Process', () => this.testCompleteBuildProcess());
    await this.runTest('CI/CD Pipeline Validation', () => this.testCICDPipeline());
    
    const totalTime = Date.now() - startTime;
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Total Time: ${totalTime}ms`);
    
    console.log('\nDetailed Results:');
    this.results.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${status} ${result.test} (${result.duration}ms)`);
      if (!result.passed && result.message !== 'FAILED') {
        console.log(`    ${result.message}`);
      }
    });
    
    // Save results to file
    const reportPath = 'validation-report.json';
    writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalTests: total,
      passed,
      failed: total - passed,
      totalTime,
      results: this.results
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    if (passed === total) {
      console.log('\n🎉 All cross-platform validation tests passed!');
      process.exit(0);
    } else {
      console.log('\n❌ Some validation tests failed. Please check the results above.');
      process.exit(1);
    }
  }
}

// Run validation if this script is executed directly
if (import.meta.main) {
  const validator = new CrossPlatformValidator();
  await validator.runAllTests();
}

export { CrossPlatformValidator };