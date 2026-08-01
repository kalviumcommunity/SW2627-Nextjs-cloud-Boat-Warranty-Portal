# ============================================
# Dockerfile — Production Multi-Stage Build
# boAt Warranty Hub (Next.js 16 + Prisma + Postgres)
# ============================================
# Three-stage build that produces a minimal production image:
#   Stage 1 (deps):    Install production-only dependencies
#   Stage 2 (builder): Build the Next.js app with standalone output
#   Stage 3 (runner):  Minimal runtime image (~150MB vs ~1.2GB)
#
# Usage:
#   docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
# ============================================

# ── Base image ──
FROM node:22-slim AS base
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl curl && \
    rm -rf /var/lib/apt/lists/*

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# ── Stage 2: Build the application ──
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate the Prisma Client
RUN npx prisma generate

# Build Next.js in standalone mode (configured in next.config.ts)
RUN npm run build

# ── Stage 3: Production runtime ──
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN groupadd --system appgroup && \
    useradd --system --gid appgroup --create-home appuser

# Copy the standalone server output from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma schema and generated client (needed at runtime for queries)
# COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib/generated ./lib/generated
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Copy the prisma config for migrations
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json

# Copy production entrypoint script
COPY docker-entrypoint.prod.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set file ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check — Docker monitors if the app is responsive
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
