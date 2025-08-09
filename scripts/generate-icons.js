/**
 * Generate Placeholder PWA Icons
 * 
 * Creates simple SVG-based placeholder icons for PWA functionality.
 * In production, these should be replaced with proper branded icons.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// SVG template for icons
function createIconSVG(size, text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#f97316" rx="${size * 0.1}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">🍽️</text>
  <text x="50%" y="${size * 0.8}" font-family="Arial, sans-serif" font-size="${size * 0.1}" fill="white" text-anchor="middle" dominant-baseline="central">${text}</text>
</svg>`
}

// Generate different sized icons
const icons = [
  { name: 'pwa-192x192.png', size: 192, text: 'FoodyLog' },
  { name: 'pwa-512x512.png', size: 512, text: 'FoodyLog' },
  { name: 'apple-touch-icon.png', size: 180, text: 'FoodyLog' },
  { name: 'mstile-150x150.png', size: 150, text: 'FL' },
  { name: 'shortcut-add-meal.png', size: 96, text: '+' },
]

// Create placeholder files (in production, use proper image generation)
icons.forEach(icon => {
  const svgContent = createIconSVG(icon.size, icon.text)
  const filePath = path.join(publicDir, icon.name.replace('.png', '.svg'))
  fs.writeFileSync(filePath, svgContent)
  console.log(`Created placeholder icon: ${icon.name} (as SVG)`)
})

// Create favicon
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#f97316" rx="3"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dominant-baseline="central">🍽️</text>
</svg>`

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG)
console.log('Created favicon.svg')

console.log('\n✅ Placeholder icons generated successfully!')
console.log('📝 Note: Replace these with proper branded icons for production')