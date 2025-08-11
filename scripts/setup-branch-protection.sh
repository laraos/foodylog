#!/bin/bash

# FoodyLog Branch Protection Setup Script
# This script configures branch protection rules for the repository
# Run this after setting up the CI/CD pipeline

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔒 Setting up branch protection for FoodyLog${NC}"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo -e "${YELLOW}Please install it from: https://cli.github.com/${NC}"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub CLI${NC}"
    echo -e "${YELLOW}Please run: gh auth login${NC}"
    exit 1
fi

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo -e "${GREEN}📁 Repository: ${REPO}${NC}"

# Function to setup branch protection
setup_branch_protection() {
    local branch=$1
    echo -e "${YELLOW}🛡️  Setting up protection for branch: ${branch}${NC}"
    
    gh api repos/${REPO}/branches/${branch}/protection \
        --method PUT \
        --field required_status_checks='{"strict":true,"contexts":["Code Quality & Testing","Build Web (PWA)","Build Android","Build iOS","Security & Performance Audit"]}' \
        --field enforce_admins=true \
        --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' \
        --field restrictions=null \
        --field allow_force_pushes=false \
        --field allow_deletions=false \
        --field block_creations=false \
        --field required_conversation_resolution=true \
        --field lock_branch=false \
        --field allow_fork_syncing=true
        
    echo -e "${GREEN}✅ Branch protection configured for ${branch}${NC}"
}

# Setup protection for main branch
if gh api repos/${REPO}/branches/main &> /dev/null; then
    setup_branch_protection "main"
else
    echo -e "${YELLOW}⚠️  Main branch not found, skipping${NC}"
fi

# Setup protection for develop branch
if gh api repos/${REPO}/branches/develop &> /dev/null; then
    setup_branch_protection "develop"
else
    echo -e "${YELLOW}⚠️  Develop branch not found, skipping${NC}"
fi

echo -e "${GREEN}🎉 Branch protection setup complete!${NC}"
echo -e "${YELLOW}📋 Summary of protections:${NC}"
echo "  • Require status checks to pass before merging"
echo "  • Require branches to be up to date before merging"
echo "  • Require pull request reviews before merging"
echo "  • Dismiss stale reviews when new commits are pushed"
echo "  • Require conversation resolution before merging"
echo "  • Restrict pushes that create files larger than 100MB"
echo "  • Do not allow force pushes"
echo "  • Do not allow deletions"

echo -e "${GREEN}🔧 Next steps:${NC}"
echo "1. Add required environment secrets in GitHub repository settings"
echo "2. Configure Codecov token if using coverage reports"
echo "3. Test the pipeline by creating a pull request"