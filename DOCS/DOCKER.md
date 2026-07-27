# 🐳 Docker Guide — boAt Warranty Hub

This document explains how to run the project using Docker, and **how to update Docker when you add, remove, or change features**.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Available Commands](#available-commands)
- [How Docker Works in This Project](#how-docker-works-in-this-project)
- [When & How to Update Docker](#when--how-to-update-docker)
- [Troubleshooting](#troubleshooting)
- [File Reference](#file-reference)

---

## Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and **running**
- Git

### First Time Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd boat-warranty-hub

# 2. Create your environment file
cp .env.example .env
# Edit .env and fill in your real values (GCS keys, NEXTAUTH_SECRET, etc.)

# 3. Place Google Cloud credentials
# Copy your service account JSON to: ./credentials/your-key.json

# 4. Start everything
docker compose up --build

# 5. Visit the app
# Open http://localhost:3000
```

### Daily Development

```bash
# Start (uses cached build — fast)
docker compose up

# Start with rebuild (if you changed dependencies)
docker compose up --build

# Stop
docker compose down

# Stop AND delete database data
docker compose down -v
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Docker Compose                  │
│                                              │
│  ┌────────────────────┐  ┌───────────────┐  │
│  │    web (Next.js)    │  │   database    │  │
│  │    Port: 3000       │──│  (Postgres)   │  │
│  │                     │  │  Port: 5432   │  │
│  │  Dockerfile.dev     │  │  postgres:17  │  │
│  │  + entrypoint.sh    │  │  -alpine      │  │
│  └────────────────────┘  └───────────────┘  │
│           │                      │           │
│     bind mount (./)        named volume      │
│     (hot-reload)          (postgres_data)    │
└─────────────────────────────────────────────┘
```

**Development flow:**
1. `docker compose up` starts both containers
2. `database` starts first with a health check (`pg_isready`)
3. `web` waits for `database` to be healthy
4. `docker-entrypoint.dev.sh` runs: applies Prisma schema → seeds DB → starts dev server
5. Source code is bind-mounted — edits reflect instantly via hot-reload

---

## Available Commands

### Using `make` (Recommended)

| Command | Description |
|---------|-------------|
| `make dev` | Start development environment |
| `make dev-build` | Force rebuild and start |
| `make down` | Stop all containers (keep data) |
| `make down-clean` | Stop all containers + delete DB data |
| `make logs` | Follow all container logs |
| `make logs-web` | Follow web logs only |
| `make logs-db` | Follow database logs only |
| `make shell` | Open shell in web container |
| `make db-shell` | Open psql in database container |
| `make migrate` | Run Prisma migrations |
| `make seed` | Run database seeder |
| `make test` | Run tests in container |
| `make lint` | Run linter in container |
| `make prod` | Start production environment |
| `make prod-build` | Rebuild + start production |
| `make clean` | Remove everything (containers, images, volumes) |
| `make status` | Show container status |
| `make help` | Show all commands |

### Using `docker compose` directly

```bash
# Development
docker compose up --build
docker compose down
docker compose logs -f web
docker compose exec web sh

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

---

## How Docker Works in This Project

### File Responsibilities

| File | Purpose |
|------|---------|
| `Dockerfile.dev` | Development image — includes devDependencies, hot-reload ready |
| `Dockerfile` | Production image — multi-stage build, ~150MB, standalone output |
| `docker-compose.yml` | Development compose — bind mounts, exposed ports, local Postgres |
| `docker-compose.prod.yml` | Production overrides — no bind mounts, no exposed DB port |
| `docker-entrypoint.dev.sh` | Runs before dev server: `prisma db push` → seed → `npm run dev` |
| `docker-entrypoint.prod.sh` | Runs before prod server: `prisma migrate deploy` → `node server.js` |
| `.dockerignore` | Files excluded from Docker build context |
| `.env.example` | Template for environment variables |
| `Makefile` | Shortcut commands |

### Environment Variable Priority

Docker Compose loads variables with this priority (highest to lowest):
1. `environment:` block in `docker-compose.yml` ← **WINS**
2. `env_file:` (.env file)
3. Shell environment on host

**This means:** Even though `.env` has a Neon DATABASE_URL, the `docker-compose.yml` overrides it with the local Postgres URL. This is intentional — Docker uses the local container, not Neon.

---

## When & How to Update Docker

### ✅ Scenario 1: Added a New Page or Component

**Docker change needed:** ❌ None.

Next.js pages/components are source code. The bind mount (`- .:/app`) ensures they're available in the container automatically. Hot-reload picks up changes instantly.

```bash
# Just keep docker running — changes appear automatically
```

---

### ✅ Scenario 2: Added a New npm Package

**Docker change needed:** 🔄 Rebuild the image.

The `node_modules` inside the container come from `npm ci` in the Dockerfile, not from your host. You need to rebuild:

```bash
# Rebuild the container image to install the new package
docker compose up --build

# Or equivalently:
make dev-build
```

---

### ✅ Scenario 3: Changed the Prisma Schema

**Docker change needed:** 🔄 Restart containers.

The entrypoint script (`docker-entrypoint.dev.sh`) runs `prisma db push` every time the container starts, so it will apply schema changes automatically:

```bash
# Restart to re-run the entrypoint (which runs prisma db push)
docker compose restart web

# Or stop and start:
docker compose down && docker compose up
```

If you want to create a formal migration:
```bash
# Generate a migration file
docker compose exec web npx prisma migrate dev --name your_migration_name
```

---

### ✅ Scenario 4: Added a New Environment Variable

**Docker change needed:** 📝 Update files.

1. Add it to `.env`:
   ```env
   MY_NEW_VAR=value
   ```

2. Add a placeholder to `.env.example`:
   ```env
   MY_NEW_VAR=your-value-here
   ```

3. If the web container needs it, **no change to docker-compose.yml is needed** — `env_file: .env` passes all vars automatically.

4. Only add it to the `environment:` block in docker-compose.yml if you need to **override** the .env value for Docker specifically.

5. Restart:
   ```bash
   docker compose down && docker compose up
   ```

---

### ✅ Scenario 5: Added a New API Route

**Docker change needed:** ❌ None.

API routes are part of the Next.js app source. The bind mount handles it automatically with hot-reload.

---

### ✅ Scenario 6: Added a New Service (e.g., Redis, Email Worker)

**Docker change needed:** ✏️ Edit `docker-compose.yml`.

Example — adding Redis:

```yaml
# Add to docker-compose.yml under 'services:'
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: always
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

# Add to 'volumes:' section:
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
```

Then update `web.depends_on` to include the new service:
```yaml
  web:
    depends_on:
      database:
        condition: service_healthy
      redis:
        condition: service_healthy
```

---

### ✅ Scenario 7: Removed a Feature or Page

**Docker change needed:** ❌ None.

Deleting source files is picked up by the bind mount. Hot-reload handles the rest.

If you also removed an npm package:
```bash
docker compose up --build
```

---

### ✅ Scenario 8: Deploying to Production

```bash
# Build and start production containers
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Or:
make prod-build
```

---

## Quick Reference Decision Table

| What Changed? | Rebuild Needed? | Restart Needed? | Compose Edit? |
|--------------|-----------------|-----------------|---------------|
| New page / component | ❌ | ❌ (hot-reload) | ❌ |
| New API route | ❌ | ❌ (hot-reload) | ❌ |
| New npm package | ✅ `--build` | ✅ (automatic) | ❌ |
| Prisma schema change | ❌ | ✅ restart | ❌ |
| New env variable | ❌ | ✅ restart | ⚠️ Only if override needed |
| New service (Redis, etc.) | ✅ `--build` | ✅ (automatic) | ✅ |
| Removed a page | ❌ | ❌ (hot-reload) | ❌ |
| Removed npm package | ✅ `--build` | ✅ (automatic) | ❌ |
| Dockerfile change | ✅ `--build` | ✅ (automatic) | ❌ |

---

## Troubleshooting

### "Docker daemon is not running"

```
failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine
```

**Fix:** Open Docker Desktop from the Start menu. Wait ~30 seconds for initialization.

---

### "Port 3000 already in use"

```bash
# Find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change the port in docker-compose.yml:
# ports:
#   - "3001:3000"
```

---

### "Database tables don't exist"

The entrypoint script runs `prisma db push` automatically. If it fails:

```bash
# Manually apply the schema
docker compose exec web npx prisma db push --accept-data-loss

# Or nuke and restart
docker compose down -v && docker compose up --build
```

---

### "node_modules issues after installing new package"

```bash
# Remove the anonymous volume and rebuild
docker compose down -v
docker compose up --build
```

---

### "Permission denied on Linux/macOS"

The Dockerfile creates an `appuser`. If you see permission errors with bind mounts:

```bash
# Fix ownership on host
sudo chown -R $(whoami):$(whoami) .
```

---

## File Reference

```
boat-warranty-hub/
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development image
├── docker-compose.yml      # Development compose (primary)
├── docker-compose.prod.yml # Production compose (overlay)
├── docker-entrypoint.dev.sh    # Dev startup script (migrate → seed → dev)
├── docker-entrypoint.prod.sh   # Prod startup script (migrate → start)
├── .dockerignore           # Build context exclusions
├── .env                    # Your secrets (NEVER commit this)
├── .env.example            # Template (safe to commit)
├── Makefile                # Developer shortcuts
└── DOCKER.md               # This file
```
