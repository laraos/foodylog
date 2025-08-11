@echo off
REM FoodyLog Development Environment Setup Script (Windows)
REM This script helps set up the development environment quickly

echo 🍽️  FoodyLog Development Setup
echo ================================

REM Check if bun is installed
bun --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Bun is not installed. Please install it first:
    echo    Visit https://bun.sh and follow the installation instructions
    pause
    exit /b 1
)

echo ✅ Bun is installed

REM Install dependencies
echo 📦 Installing dependencies...
bun install

REM Setup environment file
if not exist .env (
    echo 🔧 Setting up environment file...
    copy .env.example .env
    echo ✅ Created .env file from .env.example
    echo ⚠️  Please edit .env with your actual values before running the app
) else (
    echo ✅ .env file already exists
)

REM Check if Convex is configured
if not exist convex (
    echo 🔧 Initializing Convex...
    bunx convex dev --once
) else (
    echo ✅ Convex is already configured
)

REM Run type check
echo 🔍 Running type check...
bun run type-check

REM Run linting
echo 🧹 Running linter...
bun run lint

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit .env with your actual API keys and URLs
echo 2. Run 'bun run dev' to start the development server
echo 3. For mobile development, run 'bun run cap:android' or 'bun run cap:ios'
echo.
echo For more information, see docs/DEVELOPMENT_SETUP.md
pause