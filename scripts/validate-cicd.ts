#!/usr/bin/env bun

/**
 * CI/CD Pipeline Validation Script for FoodyLog
 * 
 * This script validates the CI/CD pipeline configuration and runs
 * all checks that would be performed in the continuous integration
 * environment. Ensures code quality, testing, and deployment readiness.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */

import { spawn, spawnSync } from 'child_process';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface CICDCheck {
  name: string;
  required: boolean;
  passed: boolean;
  duration: number;
  output: string;
  errors: string[];
}

class CICDValidator {
  private checks: CICDCheck[] = [];

  constructor() {
    console.log('🔄 FoodyLog CI/CD Pipeline Validation');
    console.log('=' .repeat(45));
  }

  /**
   * Execute a command and return detailed result
   */
  private async executeCommand(
    command: string, 
    args: string[] = [], 
    timeout: number = 60000
  ): Promise<{ success: boolean; stdout: string; stderr: string; duration: number }> {
    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const child = spawn(command, args, { 
        stdio: 'pipe',
        shell: true,
        timeout 
      });
      
      let stdout = '';
      let stderr = '';
      
      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
      
      child.on('close', (code) => {
        const duration = Date.now() - startTime;
        resolve({
          success: code === 0,
          stdout,
          stderr,
          duration
        });
      });
      
      child.on('error', (error) => {
        const duration = Date.now() - startTime;
        resolve({
          success: false,
          stdout,
          stderr: stderr + error.message,
          duration
        });
      });
      
      // Kill process after timeout
      setTimeout(() => {
        child.kill();
        const duration = Date.now() - startTime;
        resolve({
          success: false,
          stdout,
          stderr: stderr + 'Process timed out',
          duration
        });
      }, timeout);
    });
  }

  /**
   * Run a CI/CD check and record the result
   */
  private async runCheck(
    name: string, 
    command: string, 
    args: string[] = [], 
    required: boolean = true,
    timeout: number = 60000
  ): Promise<void> {
    console.log(`\n🔍 Running: ${name}`);
    
    const result = await this.executeCommand(command, args, timeout);
    
    const check: CICDCheck = {
      name,
      required,
      passed: result.success,
      duration: result.duration,
      output: result.stdout,
      errors: result.success ? [] : [result.stderr]
    };
    
    this.checks.push(check);
    
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    const requiredText = required ? '' : ' (optional)';
    console.log(`  ${status} ${name}${requiredText} (${result.duration}ms)`);
    
    if (!result.success && result.stderr) {
      console.log(`  Error: ${result.stderr.slice(0, 200)}${result.stderr.length > 200 ? '...' : ''}`);
    }
  }

  /**
   * Validate GitHub Actions workflow files
   */
  private validateGitHubActions(): boolean {
    console.log('\n📋 Validating GitHub Actions workflows...');
    
    const workflowDir = '.github/workflows';
    if (!existsSync(workflowDir)) {
      console.log('  ❌ .github/workflows directory not found');
      return false;
    }
    
    const workflowFiles = readdirSync(workflowDir).filter(file => 
      file.endsWith('.yml') || file.endsWith('.yaml')
    );
    
    if (workflowFiles.length === 0) {
      console.log('  ❌ No workflow files found');
      return false;
    }
    
    console.log(`  ✅ Found ${workflowFiles.length} workflow file(s):`);
    
    let allValid = true;
    
    for (const file of workflowFiles) {
      const filePath = join(workflowDir, file);
      console.log(`    📄 ${file}`);
      
      try {
        const content = readFileSync(filePath, 'utf-8');
        
        // Basic validation checks
        const requiredSections = ['name', 'on', 'jobs'];
        const missingSections = requiredSections.filter(section => 
          !content.includes(`${section}:`)
        );
        
        if (missingSections.length > 0) {
          console.log(`      ❌ Missing sections: ${missingSections.join(', ')}`);
          allValid = false;
        } else {
          console.log('      ✅ Basic structure valid');
        }
        
        // Check for Bun usage
        if (content.includes('bun')) {
          console.log('      ✅ Uses Bun package manager');
        } else {
          console.log('      ⚠️  Does not use Bun package manager');
        }
        
        // Check for common CI steps
        const ciSteps = [
          { name: 'Checkout', pattern: /checkout@/ },
          { name: 'Install dependencies', pattern: /bun install|npm install|yarn install/ },
          { name: 'Type checking', pattern: /type-check|tsc/ },
          { name: 'Linting', pattern: /lint|eslint/ },
          { name: 'Testing', pattern: /test|vitest|jest/ },
          { name: 'Build', pattern: /build/ }
        ];
        
        ciSteps.forEach(step => {
          if (step.pattern.test(content)) {
            console.log(`      ✅ Includes ${step.name}`);
          } else {
            console.log(`      ⚠️  Missing ${step.name}`);
          }
        });
        
      } catch (error) {
        console.log(`      ❌ Error reading file: ${error}`);
        allValid = false;
      }
    }
    
    return allValid;
  }

  /**
   * Validate environment configuration
   */
  private validateEnvironmentConfig(): boolean {
    console.log('\n🌍 Validating environment configuration...');
    
    let allValid = true;
    
    // Check for .env.example
    if (existsSync('.env.example')) {
      console.log('  ✅ .env.example found');
      
      try {
        const envExample = readFileSync('.env.example', 'utf-8');
        const requiredVars = [
          'VITE_CONVEX_URL',
          'VITE_CLERK_PUBLISHABLE_KEY',
          'VITE_APP_VERSION',
          'VITE_ENVIRONMENT'
        ];
        
        const missingVars = requiredVars.filter(varName => 
          !envExample.includes(varName)
        );
        
        if (missingVars.length > 0) {
          console.log(`    ❌ Missing environment variables: ${missingVars.join(', ')}`);
          allValid = false;
        } else {
          console.log('    ✅ All required environment variables present');
        }
        
      } catch (error) {
        console.log(`    ❌ Error reading .env.example: ${error}`);
        allValid = false;
      }
    } else {
      console.log('  ❌ .env.example not found');
      allValid = false;
    }
    
    // Check for .env.local (should be gitignored)
    if (existsSync('.env.local')) {
      console.log('  ✅ .env.local found (for local development)');
    } else {
      console.log('  ⚠️  .env.local not found (create for local development)');
    }
    
    // Check .gitignore
    if (existsSync('.gitignore')) {
      const gitignore = readFileSync('.gitignore', 'utf-8');
      const shouldIgnore = ['.env.local', '.env', 'dist/', 'node_modules/'];
      
      shouldIgnore.forEach(pattern => {
        if (gitignore.includes(pattern)) {
          console.log(`  ✅ .gitignore includes ${pattern}`);
        } else {
          console.log(`  ⚠️  .gitignore missing ${pattern}`);
        }
      });
    }
    
    return allValid;
  }

  /**
   * Validate package.json scripts
   */
  private validatePackageScripts(): boolean {
    console.log('\n📦 Validating package.json scripts...');
    
    if (!existsSync('package.json')) {
      console.log('  ❌ package.json not found');
      return false;
    }
    
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
      const scripts = packageJson.scripts || {};
      
      const requiredScripts = [
        'dev',
        'build',
        'lint',
        'type-check',
        'test',
        'test:e2e'
      ];
      
      const missingScripts = requiredScripts.filter(script => !scripts[script]);
      
      if (missingScripts.length > 0) {
        console.log(`  ❌ Missing scripts: ${missingScripts.join(', ')}`);
        return false;
      }
      
      console.log('  ✅ All required scripts present');
      
      // Check for Bun usage in scripts
      const bunScripts = Object.values(scripts).filter((script: any) => 
        typeof script === 'string' && script.includes('bun')
      );
      
      console.log(`  ✅ ${bunScripts.length} scripts use Bun`);
      
      return true;
    } catch (error) {
      console.log(`  ❌ Error reading package.json: ${error}`);
      return false;
    }
  }

  /**
   * Run all CI/CD validation checks
   */
  async runAllChecks(): Promise<void> {
    const startTime = Date.now();
    
    // Validate configuration files
    const workflowsValid = this.validateGitHubActions();
    const envValid = this.validateEnvironmentConfig();
    const scriptsValid = this.validatePackageScripts();
    
    // Run CI/CD pipeline checks
    await this.runCheck('Install Dependencies', 'bun', ['install'], true, 120000);
    await this.runCheck('Type Check', 'bun', ['run', 'type-check'], true, 60000);
    await this.runCheck('Lint Code', 'bun', ['run', 'lint'], true, 60000);
    await this.runCheck('Format Check', 'bun', ['run', 'format:check'], true, 30000);
    await this.runCheck('Unit Tests', 'bun', ['run', 'test', '--run'], true, 120000);
    await this.runCheck('Build Application', 'bun', ['run', 'build'], true, 120000);
    await this.runCheck('E2E Tests', 'bun', ['run', 'test:e2e'], true, 180000);
    
    // Optional checks
    await this.runCheck('Accessibility Tests', 'bun', ['run', 'test:a11y'], false, 60000);
    await this.runCheck('Test Coverage', 'bun', ['run', 'test:coverage'], false, 120000);
    
    const totalTime = Date.now() - startTime;
    
    // Calculate results
    const requiredChecks = this.checks.filter(c => c.required);
    const passedRequired = requiredChecks.filter(c => c.passed).length;
    const totalRequired = requiredChecks.length;
    
    const optionalChecks = this.checks.filter(c => !c.required);
    const passedOptional = optionalChecks.filter(c => c.passed).length;
    const totalOptional = optionalChecks.length;
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 CI/CD VALIDATION SUMMARY');
    console.log('='.repeat(50));
    
    console.log(`Configuration Validation:`);
    console.log(`  GitHub Actions: ${workflowsValid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  Environment Config: ${envValid ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  Package Scripts: ${scriptsValid ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log(`\nRequired Checks: ${passedRequired}/${totalRequired} passed`);
    console.log(`Optional Checks: ${passedOptional}/${totalOptional} passed`);
    console.log(`Total Time: ${totalTime}ms`);
    
    console.log('\nDetailed Results:');
    this.checks.forEach(check => {
      const status = check.passed ? '✅ PASS' : '❌ FAIL';
      const requiredText = check.required ? '' : ' (optional)';
      console.log(`  ${status} ${check.name}${requiredText} (${check.duration}ms)`);
      
      if (check.errors.length > 0) {
        check.errors.forEach(error => {
          console.log(`    ❌ ${error.slice(0, 100)}${error.length > 100 ? '...' : ''}`);
        });
      }
    });
    
    // Performance analysis
    console.log('\n📈 Performance Analysis:');
    const slowChecks = this.checks.filter(c => c.duration > 30000);
    if (slowChecks.length > 0) {
      console.log('  Slow checks (>30s):');
      slowChecks.forEach(check => {
        console.log(`    ⏱️  ${check.name}: ${check.duration}ms`);
      });
    } else {
      console.log('  ✅ All checks completed in reasonable time');
    }
    
    // Save detailed report
    const reportPath = 'cicd-validation-report.json';
    const fs = await import('fs/promises');
    await fs.writeFile(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      configurationValid: workflowsValid && envValid && scriptsValid,
      requiredChecksPassed: passedRequired,
      totalRequiredChecks: totalRequired,
      optionalChecksPassed: passedOptional,
      totalOptionalChecks: totalOptional,
      totalTime,
      checks: this.checks
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Determine overall success
    const configValid = workflowsValid && envValid && scriptsValid;
    const allRequiredPassed = passedRequired === totalRequired;
    
    if (configValid && allRequiredPassed) {
      console.log('\n🎉 CI/CD pipeline validation passed!');
      console.log('   Your project is ready for continuous integration and deployment.');
      process.exit(0);
    } else {
      console.log('\n❌ CI/CD pipeline validation failed!');
      
      if (!configValid) {
        console.log('   Configuration issues need to be resolved.');
      }
      
      if (!allRequiredPassed) {
        console.log(`   ${totalRequired - passedRequired} required checks failed.`);
      }
      
      console.log('   Please fix the issues above before deploying.');
      process.exit(1);
    }
  }
}

// Run validation if this script is executed directly
if (import.meta.main) {
  const validator = new CICDValidator();
  await validator.runAllChecks();
}

export { CICDValidator };