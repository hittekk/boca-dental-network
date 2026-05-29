#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Boca Dental Network — 3-Way Sync
# Run this on your local machine before and after any work
# Usage: ./sync.sh              → pull latest + push any local changes
#        ./sync.sh "my message" → commit with custom message then sync
# ─────────────────────────────────────────────────────────────

set -e

BRANCH="main"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "🔄 Boca Dental Sync"
echo "───────────────────"

# 1. Pull latest from GitHub first
echo "⬇️  Pulling latest from GitHub..."
git pull origin $BRANCH --rebase

# 2. Check for local changes
if [[ -n $(git status --porcelain) ]]; then
  MSG="${1:-sync: local changes $(date '+%Y-%m-%d %H:%M')}"
  echo "📦 Staging all changes..."
  git add -A
  echo "💾 Committing: $MSG"
  git commit -m "$MSG"
  echo "⬆️  Pushing to GitHub..."
  git push origin $BRANCH
  echo "✅ Local changes pushed to GitHub"
else
  echo "✅ Already up to date — nothing to push"
fi

echo ""
echo "🌐 GitHub    → up to date"
echo "🖥️  Local     → up to date"
echo "☁️  Netlify   → auto-deploying from GitHub"
echo "🤖 Claude    → run 'git pull origin main' at session start"
