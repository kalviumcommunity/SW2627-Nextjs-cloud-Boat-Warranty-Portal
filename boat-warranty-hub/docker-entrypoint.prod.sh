#!/bin/sh
# ============================================
# docker-entrypoint.prod.sh
# Production entrypoint for boAt Warranty Hub
# ============================================
# Uses 'prisma migrate deploy' (not db push) for safe,
# versioned migrations in production.
# ============================================

set -e

echo ""
echo "=========================================="
echo "  boAt Warranty Hub — Production"
echo "=========================================="
echo ""

# ── Step 1: Run versioned migrations ──
echo "⏳ Running database migrations..."
npx prisma migrate deploy 2>&1
echo "✅ Migrations applied successfully."
echo ""

# ── Step 2: Start the production server ──
echo "🚀 Starting Next.js production server..."
echo ""

# The standalone output produces a server.js at the root
exec node server.js
