#!/bin/sh
# ============================================
# docker-entrypoint.dev.sh
# Development entrypoint for boAt Warranty Hub
# ============================================
# This script runs BEFORE the Next.js dev server starts.
# It ensures the database schema is applied and optionally seeds data.
#
# How it works:
#   1. Applies the Prisma schema to the database (db push)
#   2. Optionally runs seed scripts
#   3. Starts the Next.js dev server
# ============================================

set -e

echo ""
echo "=========================================="
echo "  boAt Warranty Hub — Dev Container"
echo "=========================================="
echo ""

# ── Step 1: Apply database schema ──
echo "⏳ Applying database schema with Prisma..."
npx prisma db push --accept-data-loss 2>&1
echo "✅ Database schema applied successfully."
echo ""

# ── Step 2: Seed the database (skip if already seeded) ──
echo "🌱 Attempting to seed database..."
npx prisma db seed 2>&1 || echo "⚠️  Seed skipped (data may already exist)."
echo ""

# ── Step 3: Start the development server ──
echo "🚀 Starting Next.js dev server..."
echo ""

# Use 'exec' to replace this shell with the node process
# This ensures proper signal handling (Ctrl+C, docker stop)
exec npm run dev
