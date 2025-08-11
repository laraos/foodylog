#!/bin/bash

# FoodyLog Development Environment Setup Script
# This script helps set up the development environment quickly

set -e

echo "🍽️  FoodyLog Development Setup"
echo "================================"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun is installed"

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Setup environment file
if [ ! -f .env ]; then
    echo "🔧 Setting up environment file..."
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo "⚠️  Please edit .env with your actual values before running the app"
else
    echo "✅ .env file already exists"
fi

# Check if Convex is configured
if [ ! -d "convex" ]; then
    echo "🔧 Initializing Convex..."
    bunx convex dev --once
else
    echo "✅ Convex is already configured"
fi

# Run type check
echo "🔍 Running type check..."
bun run type-check

# Run linting
echo "🧹 Running linter..."
bun run lint

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your actual API keys and URLs"
echo "2. Run 'bun run dev' to start the development server"
echo "3. For mobile development, run 'bun run cap:android' or 'bun run cap:ios'"
echo ""
echo "For more information, see docs/DEVELOPMENT_SETUP.md"