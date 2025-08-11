#!/usr/bin/env bun

/**
 * Capacitor Live Reload Testing Script for FoodyLog
 * 
 * This script helps test and validate Capacitor live reload functionality
 * on physical devices and emulators. It provides step-by-step guidance
 * and automated checks for live reload setup.
 * 
 * Requirements: 2.5, 2.6
 */

import { spawn, spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { networkInterfaces } from 'os';

interface DeviceTestResult {
  platform: 'android' | 'ios';
  device: string;
  liveReloadWorking: boolean;
  connectionTime: number;
  errors: string[];
}

class CapacitorLiveReloadTester {
  private results: DeviceTestResult[] = [];

  constructor() {
    console.log('📱 FoodyLog Capacitor Live Reload Tester');
    console.log('=' .repeat(50));
  }

  /**
   * Get the local IP address for live reload configuration
   */
  private getLocalIPAddress(): string {
    const nets = networkInterfaces();
    const results: string[] = [];

    for (const name of Object.keys(nets)) {
      const netInterface = nets[name];
      if (!netInterface) continue;

      for (const net of netInterface) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          results.push(net.address);
        }
      }
    }

    return results[0] || 'localhost';
  }

  /**
   * Check if Capacitor is properly configured
   */
  private checkCapacitorConfiguration(): boolean {
    console.log('\n🔍 Checking Capacitor configuration...');

    // Check if capacitor.config.ts exists
    if (!existsSync('capacitor.config.ts')) {
      console.log('❌ capacitor.config.ts not found');
      return false;
    }

    // Check if platforms are added
    const androidExists = existsSync('android');
    const iosExists = existsSync('ios');

    if (!androidExists && !iosExists) {
      console.log('❌ No mobile platforms found. Run: bunx cap add android/ios');
      return false;
    }

    console.log(`✅ Platforms available: ${androidExists ? 'Android' : ''} ${iosExists ? 'iOS' : ''}`);

    // Check capacitor.config.ts content
    const configContent = readFileSync('capacitor.config.ts', 'utf-8');
    const hasServerConfig = configContent.includes('server');

    if (!hasServerConfig) {
      console.log('⚠️  No server configuration found in capacitor.config.ts');
      console.log('   Live reload will use environment variable CAP_SERVER_URL');
    }

    return true;
  }

  /**
   * Setup live reload configuration
   */
  private setupLiveReloadConfig(): void {
    console.log('\n⚙️  Setting up live reload configuration...');

    const localIP = this.getLocalIPAddress();
    const serverUrl = `http://${localIP}:5173`;

    console.log(`🌐 Local IP detected: ${localIP}`);
    console.log(`🔗 Server URL: ${serverUrl}`);

    // Set environment variable
    process.env.CAP_SERVER_URL = serverUrl;

    // Create or update .env.local with live reload configuration
    const envLocalPath = '.env.local';
    let envContent = '';

    if (existsSync(envLocalPath)) {
      envContent = readFileSync(envLocalPath, 'utf-8');
    }

    // Update or add CAP_SERVER_URL
    const capServerUrlRegex = /^CAP_SERVER_URL=.*$/m;
    const newCapServerUrl = `CAP_SERVER_URL=${serverUrl}`;

    if (capServerUrlRegex.test(envContent)) {
      envContent = envContent.replace(capServerUrlRegex, newCapServerUrl);
    } else {
      envContent += `\n${newCapServerUrl}\n`;
    }

    writeFileSync(envLocalPath, envContent);
    console.log(`✅ Updated ${envLocalPath} with live reload configuration`);

    // Display instructions
    console.log('\n📋 Live Reload Setup Instructions:');
    console.log('1. Make sure your device is on the same WiFi network as your computer');
    console.log(`2. Your computer IP address is: ${localIP}`);
    console.log(`3. Live reload server will be available at: ${serverUrl}`);
    console.log('4. Run "bun run dev" in one terminal');
    console.log('5. Run "bunx cap run android --no-sync" or "bunx cap run ios --no-sync" in another terminal');
  }

  /**
   * Test Android live reload
   */
  private async testAndroidLiveReload(): Promise<DeviceTestResult> {
    console.log('\n🤖 Testing Android live reload...');

    const result: DeviceTestResult = {
      platform: 'android',
      device: 'emulator/device',
      liveReloadWorking: false,
      connectionTime: 0,
      errors: []
    };

    const startTime = Date.now();

    try {
      // Check if Android platform exists
      if (!existsSync('android')) {
        result.errors.push('Android platform not found. Run: bunx cap add android');
        return result;
      }

      // Sync Capacitor
      console.log('  📦 Syncing Capacitor...');
      const syncResult = spawnSync('bunx', ['cap', 'sync', 'android'], { 
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (syncResult.status !== 0) {
        result.errors.push(`Capacitor sync failed: ${syncResult.stderr}`);
        return result;
      }

      // Check if we can list Android devices
      console.log('  📱 Checking for Android devices...');
      const adbResult = spawnSync('adb', ['devices'], { 
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (adbResult.status !== 0) {
        result.errors.push('ADB not found. Make sure Android SDK is installed and adb is in PATH');
        return result;
      }

      const devices = adbResult.stdout.split('\n')
        .filter(line => line.includes('\tdevice'))
        .map(line => line.split('\t')[0]);

      if (devices.length === 0) {
        result.errors.push('No Android devices found. Connect a device or start an emulator');
        return result;
      }

      result.device = devices[0];
      console.log(`  ✅ Found Android device: ${result.device}`);

      // Test live reload by creating a temporary file change
      const testFile = 'src/test-live-reload-android.ts';
      const testContent = `// Live reload test - ${Date.now()}`;
      
      writeFileSync(testFile, testContent);
      
      // Wait a moment for file system events
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clean up test file
      if (existsSync(testFile)) {
        const fs = await import('fs/promises');
        await fs.unlink(testFile);
      }

      result.connectionTime = Date.now() - startTime;
      result.liveReloadWorking = true;
      console.log(`  ✅ Android live reload test completed in ${result.connectionTime}ms`);

    } catch (error) {
      result.errors.push(`Android test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Test iOS live reload
   */
  private async testIOSLiveReload(): Promise<DeviceTestResult> {
    console.log('\n🍎 Testing iOS live reload...');

    const result: DeviceTestResult = {
      platform: 'ios',
      device: 'simulator/device',
      liveReloadWorking: false,
      connectionTime: 0,
      errors: []
    };

    const startTime = Date.now();

    try {
      // Check if iOS platform exists
      if (!existsSync('ios')) {
        result.errors.push('iOS platform not found. Run: bunx cap add ios');
        return result;
      }

      // Check if we're on macOS
      if (process.platform !== 'darwin') {
        result.errors.push('iOS testing requires macOS');
        return result;
      }

      // Sync Capacitor
      console.log('  📦 Syncing Capacitor...');
      const syncResult = spawnSync('bunx', ['cap', 'sync', 'ios'], { 
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (syncResult.status !== 0) {
        result.errors.push(`Capacitor sync failed: ${syncResult.stderr}`);
        return result;
      }

      // Check if Xcode command line tools are available
      const xcodeResult = spawnSync('xcode-select', ['--version'], { 
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (xcodeResult.status !== 0) {
        result.errors.push('Xcode command line tools not found. Install Xcode and run: xcode-select --install');
        return result;
      }

      // Check for iOS simulators
      console.log('  📱 Checking for iOS simulators...');
      const simctlResult = spawnSync('xcrun', ['simctl', 'list', 'devices', 'available'], { 
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (simctlResult.status !== 0) {
        result.errors.push('Failed to list iOS simulators');
        return result;
      }

      const simulators = simctlResult.stdout.split('\n')
        .filter(line => line.includes('iPhone') && line.includes('Booted'))
        .map(line => line.trim());

      if (simulators.length === 0) {
        console.log('  ⚠️  No booted iOS simulators found. You may need to start one manually');
        result.device = 'No active simulator';
      } else {
        result.device = simulators[0];
        console.log(`  ✅ Found iOS simulator: ${result.device}`);
      }

      // Test live reload by creating a temporary file change
      const testFile = 'src/test-live-reload-ios.ts';
      const testContent = `// Live reload test - ${Date.now()}`;
      
      writeFileSync(testFile, testContent);
      
      // Wait a moment for file system events
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clean up test file
      if (existsSync(testFile)) {
        const fs = await import('fs/promises');
        await fs.unlink(testFile);
      }

      result.connectionTime = Date.now() - startTime;
      result.liveReloadWorking = true;
      console.log(`  ✅ iOS live reload test completed in ${result.connectionTime}ms`);

    } catch (error) {
      result.errors.push(`iOS test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Provide manual testing instructions
   */
  private provideManualTestingInstructions(): void {
    console.log('\n📋 Manual Live Reload Testing Instructions:');
    console.log('=' .repeat(50));
    
    const localIP = this.getLocalIPAddress();
    
    console.log('\n1. Start the development server:');
    console.log('   bun run dev');
    
    console.log('\n2. In another terminal, run the mobile app:');
    console.log('   # For Android:');
    console.log('   bunx cap run android --no-sync');
    console.log('   # For iOS:');
    console.log('   bunx cap run ios --no-sync');
    
    console.log('\n3. Test live reload by:');
    console.log('   - Editing a React component file');
    console.log('   - Saving the file');
    console.log('   - Observing the app update on the device without manual refresh');
    
    console.log('\n4. Troubleshooting:');
    console.log(`   - Ensure device is on same WiFi network (IP: ${localIP})`);
    console.log('   - Check firewall settings allow port 5173');
    console.log('   - Verify CAP_SERVER_URL environment variable is set');
    console.log('   - Check device console for connection errors');
    
    console.log('\n5. Performance expectations:');
    console.log('   - Hot reload should occur within 1-2 seconds');
    console.log('   - No manual app restart should be required');
    console.log('   - Changes should preserve app state when possible');
  }

  /**
   * Run all live reload tests
   */
  async runAllTests(): Promise<void> {
    const startTime = Date.now();

    // Check configuration
    if (!this.checkCapacitorConfiguration()) {
      console.log('\n❌ Capacitor configuration check failed');
      return;
    }

    // Setup live reload
    this.setupLiveReloadConfig();

    // Test Android if available
    if (existsSync('android')) {
      const androidResult = await this.testAndroidLiveReload();
      this.results.push(androidResult);
    }

    // Test iOS if available
    if (existsSync('ios')) {
      const iosResult = await this.testIOSLiveReload();
      this.results.push(iosResult);
    }

    // Provide manual testing instructions
    this.provideManualTestingInstructions();

    const totalTime = Date.now() - startTime;

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 LIVE RELOAD TEST SUMMARY');
    console.log('='.repeat(50));

    const successful = this.results.filter(r => r.liveReloadWorking).length;
    const total = this.results.length;

    console.log(`Total Platforms Tested: ${total}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${total - successful}`);
    console.log(`Total Time: ${totalTime}ms`);

    console.log('\nDetailed Results:');
    this.results.forEach(result => {
      const status = result.liveReloadWorking ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${status} ${result.platform.toUpperCase()} (${result.device}) - ${result.connectionTime}ms`);
      
      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          console.log(`    ❌ ${error}`);
        });
      }
    });

    // Save results
    const reportPath = 'capacitor-live-reload-report.json';
    writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      localIP: this.getLocalIPAddress(),
      totalPlatforms: total,
      successful,
      failed: total - successful,
      totalTime,
      results: this.results
    }, null, 2));

    console.log(`\n📄 Detailed report saved to: ${reportPath}`);

    if (successful === total && total > 0) {
      console.log('\n🎉 All live reload tests passed!');
    } else if (total === 0) {
      console.log('\n⚠️  No platforms available for testing. Add platforms with: bunx cap add android/ios');
    } else {
      console.log('\n❌ Some live reload tests failed. Check the results above.');
    }
  }
}

// Run tests if this script is executed directly
if (import.meta.main) {
  const tester = new CapacitorLiveReloadTester();
  await tester.runAllTests();
}

export { CapacitorLiveReloadTester };