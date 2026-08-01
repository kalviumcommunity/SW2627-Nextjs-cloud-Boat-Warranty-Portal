# Docker Guide — boAt Warranty Hub

> **Last updated:** August 2026

---

## Quick Start

### Development (hot-reload)
```bash
cp .env.example .env          # fill in secrets
docker compose up --build     # start dev stack
# Visit http://localhost:3000
```

### Production
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

---

## File Reference

| File | Purpose |
|------|---------|
| `Dockerfile` | Production multi-stage build (builder → runner, standalone output) |
| `Dockerfile.dev` | Development image with devDeps and hot-reload |
| `docker-compose.yml` | Dev compose — bind mounts, local Postgres, hot-reload |
| `docker-compose.prod.yml` | Standalone production compose — no bind mounts, DB not exposed |
| `docker-entrypoint.dev.sh` | Dev startup: `prisma db push` → seed → `npm run dev` |
| `docker-entrypoint.prod.sh` | Prod startup: `prisma migrate deploy` → `node server.js` |
| `.dockerignore` | Excludes node_modules, .next, secrets from build context |
| `.env.example` | Env variable template (safe to commit) |
| `Makefile` | Shortcut commands |

---

## Architecture

### Development
```
docker-compose.yml
  ├── web  (Dockerfile.dev, bind-mount, port 3000)
  └── database  (postgres:17-alpine, port 5432, named volume)
```

### Production
```
docker-compose.prod.yml
  ├── web  (Dockerfile, standalone build, port 3000)
  └── database  (postgres:17-alpine, no host port, named volume)
```

**Prod differs from dev:**
- Source code baked into image (no bind mount)
- DB not exposed to host (internal Docker network only)
- Next.js standalone output — self-contained, smaller image
- Only `./credentials:/app/credentials:ro` mounted at runtime (GCS key)

---

## How the Production Dockerfile Works

### Stage 1 — builder
1. Install `openssl` (needed for Prisma binary)
2. `npm install` — installs all deps including devDeps (needed for build)
3. `npx prisma generate` — generates Prisma Client to `lib/generated/prisma`
4. `npm run build` — produces `.next/standalone/` (self-contained server)

### Stage 2 — runner
1. Fresh `node:22-slim` (no build tools)
2. Copies only runtime artifacts:
   - `.next/standalone/` — server (no node_modules needed)
   - `.next/static/` + `public/` — assets
   - `prisma/` — schema + migrations (for `prisma migrate deploy`)
   - `lib/generated/` — Prisma Client
3. Creates non-root `appuser`
4. Runs `docker-entrypoint.prod.sh`

> **Why `npm install` not `npm ci`?**
> `npm ci` fails in Docker on some platforms due to platform-specific optional
> binaries (e.g., SWC). `npm install` resolves these gracefully.

---

## CI Pipeline — docker-ci.yml

| Step | What it does |
|------|-------------|
| Checkout | Clone repo |
| Docker Buildx | Multi-platform builder setup |
| Build Image | Build with GHA layer cache (`cache-from/cache-to: type=gha`) |
| Smoke Test | Run container, verify server process starts (no real DB needed) |
| Report Size | Print image size to job summary |

**Triggers:** Pushes/PRs to `main`, `master`, `develop` — but only when Docker-relevant files change (saves CI minutes on doc-only commits).

**Concurrency:** Old runs on the same branch are cancelled automatically.

---

## Common Commands

```bash
# Dev
docker compose up                   # start (cached)
docker compose up --build           # rebuild (after adding packages)
docker compose down                 # stop, keep data
docker compose down -v              # stop, delete data
docker compose exec web sh          # shell into web container
docker compose logs -f web          # stream web logs

# Prod
docker compose -f docker-compose.prod.yml up --build -d
docker compose -f docker-compose.prod.yml logs -f web
docker compose -f docker-compose.prod.yml down
```

---

## When to Rebuild

| What Changed | Dev | Prod |
|-------------|-----|------|
| New page / component | ❌ hot-reload | ✅ push → CI rebuilds |
| New npm package | ✅ `--build` | ✅ `--build` |
| Prisma schema change | 🔄 restart (entrypoint runs `db push`) | ✅ rebuild + migrate |
| New env variable | 🔄 restart | 🔄 restart |
| New service (Redis, etc.) | ✅ rebuild + edit compose | ✅ rebuild + edit compose |
| Dockerfile change | ✅ `--build` | ✅ `--build` |

---

## Troubleshooting

**"Docker daemon is not running"**
→ Open Docker Desktop, wait ~30s.

**"Port 3000 already in use"**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**"Database tables don't exist"**
```bash
docker compose exec web npx prisma db push --accept-data-loss
# or nuke:
docker compose down -v && docker compose up --build
```

**"node_modules issues after new package"**
```bash
docker compose down -v && docker compose up --build
```

**"Permission denied on Linux/macOS"**
```bash
sudo chown -R $(whoami):$(whoami) .
```

---

## What Changed — August 2026 Refactor

### Dockerfile
- **Removed** `npm prune --omit=dev` — redundant, Next.js standalone is self-contained
- **Removed** `COPY node_modules` in runner stage — standalone bundles its own deps
- **Removed** `COPY prisma.config.ts` — only needed for seeding, not runtime
- **Kept** `npm install` (not `npm ci`) — avoids platform-specific lockfile failures in Docker

### docker-compose.prod.yml
- **Changed** from a merge-overlay file (needed `-f docker-compose.yml -f docker-compose.prod.yml`) to a **standalone** production compose file
- Simpler usage: `docker compose -f docker-compose.prod.yml up --build -d`
- Added `depends_on` with `service_healthy` — DB must be ready before web starts
- DB port not exposed to host

### docker-ci.yml
- **Added** `paths:` filter — only triggers on Docker-relevant file changes
- **Added** `concurrency:` — cancels stale runs
- **Added** `load: true` — loads image into daemon for smoke testing
- **Added** layer caching via GitHub Actions cache (`type=gha`)
- **Added** smoke test — verifies image starts without fatal errors
- **Added** image size report to job summary
