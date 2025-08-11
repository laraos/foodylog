#!/usr/bin/env bun

/**
 * Color Contrast Audit Script
 * 
 * Runs the FoodyLog color contrast audit and reports results.
 * This script can be run independently to check color compliance.
 */

import { printColorContrastAudit } from '../src/test/color-contrast-audit';

console.log('Running FoodyLog Color Contrast Audit...\n');

try {
  printColorContrastAudit();
} catch (error) {
  console.error('Error running color contrast audit:', error);
  process.exit(1);
}