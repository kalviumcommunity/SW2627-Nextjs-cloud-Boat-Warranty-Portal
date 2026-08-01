# =====================================================
# Dockerfile — boAt Warranty Hub (Production)
# Multi-stage build: builder → runner
# Next.js standalone output + Prisma Client
# =====================================================

# ── Stage 1: Builder ──────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Install openssl for Prisma binary (required at generate time)
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (cache layer)
COPY package.json package-lock.json ./

# Install ALL deps (including devDeps needed for build & prisma generate)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client into lib/generated/prisma
RUN npx prisma generate

# Build Next.js standalone bundle
RUN npm run build

# ── Stage 2: Runner ───────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Install openssl (Prisma needs it at runtime) + curl (healthcheck)
# Create a non-root user for security
RUN apt-get update && apt-get install -y --no-install-recommends openssl curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system appgroup \
    && useradd --system --gid appgroup appuser

# Copy standalone Next.js server (self-contained, no node_modules needed)
COPY --from=builder /app/.next/standalone ./

# Copy static assets & public folder
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma schema + generated client (needed for prisma migrate deploy)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib/generated ./lib/generated

# Copy production entrypoint
COPY docker-entrypoint.prod.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
