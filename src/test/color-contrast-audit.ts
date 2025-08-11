/**
 * Color Contrast Audit Tool
 * 
 * Audits FoodyLog's color palette for WCAG 2.1 AA compliance.
 * Converts HSL values from CSS custom properties to hex and calculates
 * contrast ratios for all color combinations used in the design system.
 */

/**
 * Convert HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (1/6 <= h && h < 2/6) {
    r = x; g = c; b = 0;
  } else if (2/6 <= h && h < 3/6) {
    r = 0; g = c; b = x;
  } else if (3/6 <= h && h < 4/6) {
    r = 0; g = x; b = c;
  } else if (4/6 <= h && h < 5/6) {
    r = x; g = 0; b = c;
  } else if (5/6 <= h && h < 1) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

/**
 * Convert HSL string to hex
 * @param hslString HSL string in format "h s% l%" (e.g., "30 43% 90%")
 */
function hslStringToHex(hslString: string): string {
  const [h, s, l] = hslString.split(' ').map((val, index) => {
    if (index === 0) return parseInt(val);
    return parseInt(val.replace('%', ''));
  });
  
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/**
 * Calculate relative luminance of a color
 * @param hex Hex color string (e.g., "#ffffff")
 */
function getLuminance(hex: string): number {
  const rgb = hex.substring(1).match(/.{2}/g);
  if (!rgb) return 0;
  
  const [r, g, b] = rgb.map(val => {
    const num = parseInt(val, 16) / 255;
    return num <= 0.03928 ? num / 12.92 : Math.pow((num + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 First color in hex format
 * @param color2 Second color in hex format
 */
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param ratio Contrast ratio
 * @param level 'AA' or 'AAA'
 * @param isLargeText Whether the text is large (18pt+ or 14pt+ bold)
 */
function meetsWCAG(ratio: number, level: 'AA' | 'AAA' = 'AA', isLargeText: boolean = false): boolean {
  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
}

/**
 * FoodyLog color palette from CSS custom properties
 */
export const foodylogColors = {
  light: {
    background: "30 43% 90%",        // #f0e5d9
    foreground: "30 12% 16%",        // #2f2a25
    card: "30 43% 90%",              // #f0e5d9
    cardForeground: "30 12% 16%",    // #2f2a25
    primary: "139 35% 35%",          // #4a7c5d
    primaryForeground: "0 0% 100%",  // #ffffff
    secondary: "30 33% 80%",         // #d4c2b2
    secondaryForeground: "30 12% 16%", // #2f2a25
    muted: "30 40% 87%",             // #e3d5c5
    mutedForeground: "30 12% 16%",   // #2f2a25
    accent: "139 35% 35%",           // #4a7c5d
    accentForeground: "0 0% 100%",   // #ffffff
    destructive: "0 84% 50%",        // #dc2626
    destructiveForeground: "0 0% 100%", // #ffffff
    border: "30 33% 80%",            // #d4c2b2
    input: "30 40% 87%",             // #e3d5c5
    ring: "139 29% 42%",             // #5da271
    
    // Rating colors - WCAG AA Compliant
    ratingExcellent: "139 45% 28%",  // #366142 - Darker green
    ratingGreat: "139 40% 30%",      // #3d6b4a - Darker green
    ratingGood: "45 85% 27%",        // #826907 - Darkest yellow
    ratingPoor: "25 90% 35%",        // #b84a00 - Darker orange
    ratingBad: "0 84% 42%",          // #c41c1c - Darker red
  },
  dark: {
    background: "24 7% 12%",         // #1e1b1a
    foreground: "30 43% 90%",        // #f0e5d9
    card: "24 7% 12%",               // #1e1b1a
    cardForeground: "30 43% 90%",    // #f0e5d9
    primary: "139 45% 35%",          // #3f8653
    primaryForeground: "0 0% 100%",  // #ffffff
    secondary: "34 12% 22%",         // #453f3b
    secondaryForeground: "30 43% 90%", // #f0e5d9
    muted: "28 9% 16%",              // #2a2522
    mutedForeground: "30 43% 90%",   // #f0e5d9
    accent: "139 45% 35%",           // #3f8653
    accentForeground: "0 0% 100%",   // #ffffff
    destructive: "0 84% 50%",        // #dc2626
    destructiveForeground: "0 0% 100%", // #ffffff
    border: "34 12% 22%",            // #453f3b
    input: "28 9% 16%",              // #2a2522
    ring: "139 45% 35%",             // #3f8653
    
    // Rating colors - dark mode adjusted
    ratingExcellent: "139 35% 50%",  // Brighter green
    ratingGreat: "139 29% 45%",      // Adjusted green
    ratingGood: "45 93% 55%",        // Brighter yellow
    ratingPoor: "25 95% 60%",        // Brighter orange
    ratingBad: "0 84% 65%",          // Brighter red
  }
};

/**
 * Color combinations to audit
 */
const colorCombinations = [
  // Basic text combinations
  { bg: 'background', fg: 'foreground', context: 'Body text' },
  { bg: 'card', fg: 'cardForeground', context: 'Card text' },
  { bg: 'muted', fg: 'mutedForeground', context: 'Muted text' },
  
  // Interactive elements
  { bg: 'primary', fg: 'primaryForeground', context: 'Primary buttons' },
  { bg: 'secondary', fg: 'secondaryForeground', context: 'Secondary buttons' },
  { bg: 'accent', fg: 'accentForeground', context: 'Accent elements' },
  { bg: 'destructive', fg: 'destructiveForeground', context: 'Destructive actions' },
  
  // Form elements
  { bg: 'input', fg: 'foreground', context: 'Input fields' },
  
  // Rating colors (against background)
  { bg: 'background', fg: 'ratingExcellent', context: 'Excellent rating text' },
  { bg: 'background', fg: 'ratingGreat', context: 'Great rating text' },
  { bg: 'background', fg: 'ratingGood', context: 'Good rating text' },
  { bg: 'background', fg: 'ratingPoor', context: 'Poor rating text' },
  { bg: 'background', fg: 'ratingBad', context: 'Bad rating text' },
];

/**
 * Audit color contrast for FoodyLog theme
 */
export function auditColorContrast() {
  const results = {
    light: [] as Array<{
      context: string;
      bgColor: string;
      fgColor: string;
      ratio: number;
      passesAA: boolean;
      passesAAA: boolean;
      passesAALarge: boolean;
    }>,
    dark: [] as Array<{
      context: string;
      bgColor: string;
      fgColor: string;
      ratio: number;
      passesAA: boolean;
      passesAAA: boolean;
      passesAALarge: boolean;
    }>,
  };

  // Audit light mode
  for (const combo of colorCombinations) {
    const bgHsl = foodylogColors.light[combo.bg as keyof typeof foodylogColors.light];
    const fgHsl = foodylogColors.light[combo.fg as keyof typeof foodylogColors.light];
    
    if (!bgHsl || !fgHsl) continue;
    
    const bgHex = hslStringToHex(bgHsl);
    const fgHex = hslStringToHex(fgHsl);
    const ratio = getContrastRatio(bgHex, fgHex);
    
    results.light.push({
      context: combo.context,
      bgColor: bgHex,
      fgColor: fgHex,
      ratio: Math.round(ratio * 100) / 100,
      passesAA: meetsWCAG(ratio, 'AA', false),
      passesAAA: meetsWCAG(ratio, 'AAA', false),
      passesAALarge: meetsWCAG(ratio, 'AA', true),
    });
  }

  // Audit dark mode
  for (const combo of colorCombinations) {
    const bgHsl = foodylogColors.dark[combo.bg as keyof typeof foodylogColors.dark];
    const fgHsl = foodylogColors.dark[combo.fg as keyof typeof foodylogColors.dark];
    
    if (!bgHsl || !fgHsl) continue;
    
    const bgHex = hslStringToHex(bgHsl);
    const fgHex = hslStringToHex(fgHsl);
    const ratio = getContrastRatio(bgHex, fgHex);
    
    results.dark.push({
      context: combo.context,
      bgColor: bgHex,
      fgColor: fgHex,
      ratio: Math.round(ratio * 100) / 100,
      passesAA: meetsWCAG(ratio, 'AA', false),
      passesAAA: meetsWCAG(ratio, 'AAA', false),
      passesAALarge: meetsWCAG(ratio, 'AA', true),
    });
  }

  return results;
}

/**
 * Print color contrast audit results
 */
export function printColorContrastAudit() {
  const results = auditColorContrast();
  
  console.log('\n🎨 FoodyLog Color Contrast Audit Results\n');
  console.log('WCAG 2.1 Standards:');
  console.log('- AA Normal Text: 4.5:1 minimum');
  console.log('- AA Large Text: 3:1 minimum');
  console.log('- AAA Normal Text: 7:1 minimum');
  console.log('- AAA Large Text: 4.5:1 minimum\n');
  
  // Light mode results
  console.log('🌞 Light Mode Results:');
  console.log('─'.repeat(80));
  
  for (const result of results.light) {
    const status = result.passesAA ? '✅' : '❌';
    console.log(`${status} ${result.context}`);
    console.log(`   ${result.bgColor} → ${result.fgColor} (${result.ratio}:1)`);
    console.log(`   AA: ${result.passesAA ? 'PASS' : 'FAIL'} | AAA: ${result.passesAAA ? 'PASS' : 'FAIL'} | AA Large: ${result.passesAALarge ? 'PASS' : 'FAIL'}`);
    console.log('');
  }
  
  // Dark mode results
  console.log('🌙 Dark Mode Results:');
  console.log('─'.repeat(80));
  
  for (const result of results.dark) {
    const status = result.passesAA ? '✅' : '❌';
    console.log(`${status} ${result.context}`);
    console.log(`   ${result.bgColor} → ${result.fgColor} (${result.ratio}:1)`);
    console.log(`   AA: ${result.passesAA ? 'PASS' : 'FAIL'} | AAA: ${result.passesAAA ? 'PASS' : 'FAIL'} | AA Large: ${result.passesAALarge ? 'PASS' : 'FAIL'}`);
    console.log('');
  }
  
  // Summary
  const lightFailures = results.light.filter(r => !r.passesAA).length;
  const darkFailures = results.dark.filter(r => !r.passesAA).length;
  const totalTests = results.light.length + results.dark.length;
  const totalFailures = lightFailures + darkFailures;
  
  console.log('📊 Summary:');
  console.log(`Total combinations tested: ${totalTests}`);
  console.log(`WCAG AA failures: ${totalFailures}`);
  console.log(`Success rate: ${Math.round(((totalTests - totalFailures) / totalTests) * 100)}%`);
  
  if (totalFailures > 0) {
    console.log('\n⚠️  Color contrast issues found! Please review failing combinations.');
  } else {
    console.log('\n🎉 All color combinations pass WCAG 2.1 AA standards!');
  }
  
  return results;
}

// Export utility functions for testing
export { hslStringToHex, getContrastRatio, meetsWCAG };