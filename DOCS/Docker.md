# Docker Setup Guide

This document describes how to containerize the **Next.js Cloud Boat Warranty Portal** using Docker. It covers the Docker creation process, file structure, and the commands needed to build, run, and manage the application containers.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) (usually bundled with Docker Desktop)
- A Next.js project with a `package.json` at the root

---

## 1. Docker File Structure

The Docker setup consists of two main files placed at the root of the project:

```
SW2627-Nextjs-cloud-Boat-Warranty-Portal/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── next.config.js
└── ... (rest of the Next.js app)
```

| File | Purpose |
|------|---------|
| `Dockerfile` | Defines the image build steps for the Next.js application |
| `docker-compose.yml` | Orchestrates the app container alongside dependent services (e.g., database) |
| `.dockerignore` | Excludes files/folders from the Docker build context to keep images lean |

---

## 2. Creating the `.dockerignore` File

Create a `.dockerignore` file at the project root to speed up builds and reduce image size:

```dockerignore
node_modules
.git
.gitignore
.env.local
.env.development
.next
Dockerfile
docker-compose.yml
.dockerignore
README.md
Docker.md
*.md
*.log
npm-debug.log*
```

---

## 3. Creating the `Dockerfile`

Create a multi-stage `Dockerfile` at the project root for a production-optimized Next.js image:

```dockerfile
# syntax=docker/dockerfile-upstream

# ——— Stage 1: Install dependencies and build the app ———
FROM node:20-alpine AS builder

WORKDIR /app

# Copy lockfile first for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# ——— Stage 2: Production runtime image ———
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV
ENV NODE_ENV=production

# Copy lockfile and package.json for installing only production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built output and source from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Run the app in production mode
CMD ["npm", "start"]
```

> **Why multi-stage?** Multi-stage builds keep the final image small by discarding development dependencies and build tools. The runtime image only contains what is needed to serve the app.

---

## 4. Creating the `docker-compose.yml` File

Create a `docker-compose.yml` at the project root to run the app (and optional dependencies like a database) together:

```yaml
version: "3.8"

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    env_file:
      - .env.production
    restart: unless-stopped
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    container_name: warranty-db
    environment:
      POSTGRES_USER: warranty_user
      POSTGRES_PASSWORD: warranty_pass
      POSTGRES_DB: warranty_portal
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  pgdata:
```

> Adjust the database service (`db`) according to your stack. Replace with `mongo`, `mysql`, or omit entirely if the app has no external dependencies.

---

## 5. Docker Build Commands

### Build the image locally

```bash
docker build -t boat-warranty-portal .
```

### Build using a specific Dockerfile

```bash
docker build -f Dockerfile -t boat-warranty-portal .
```

### Build with BuildKit (faster, parallel builds)

```bash
DOCKER_BUILDKIT=1 docker build -t boat-warranty-portal .
```

---

## 6. Docker Run Commands

### Run the standalone app container

```bash
docker run -d \
  --name boat-warranty-portal \
  -p 3000:3000 \
  --restart unless-stopped \
  boat-warranty-portal
```

### Run with environment variables

```bash
docker run -d \
  --name boat-warranty-portal \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000 \
  boat-warranty-portal
```

### Run with a volume for logs (mount to host)

```bash
docker run -d \
  --name boat-warranty-portal \
  -p 3000:3000 \
  -v $(pwd)/logs:/app/logs \
  boat-warranty-portal
```

---

## 7. Docker Compose Commands

### Build and start all services

```bash
docker-compose up --build
```

### Start in detached mode (background)

```bash
docker-compose up -d
```

### Build without starting

```bash
docker-compose build
```

### Stop and remove containers

```bash
docker-compose down
```

### Stop and remove containers **and** volumes

```bash
docker-compose down -v
```

### View running services

```bash
docker-compose ps
```

### View logs

```bash
docker-compose logs -f
```

### Run a command inside a service container

```bash
docker-compose run --rm web npm run lint
```

---

## 8. Common Docker Commands

### List all images

```bash
docker images
```

### Remove an image

```bash
docker rmi boat-warranty-portal
```

### List all running containers

```bash
docker ps
```

### List all containers (including stopped)

```bash
docker ps -a
```

### Start / stop a container

```bash
docker start boat-warranty-portal
docker stop boat-warranty-portal
```

### Remove a container

```bash
docker rm boat-warranty-portal
```

### View container logs

```bash
docker logs boat-warranty-portal
```

### View live logs

```bash
docker logs -f boat-warranty-portal
```

### Execute a command inside a running container

```bash
docker exec -it boat-warranty-portal sh
```

### Remove dangling images and stopped containers

```bash
docker system prune
```

### Remove everything (including unused volumes and networks)

```bash
docker system prune -a --volumes
```

---

## 9. Environment Variables

Create a `.env.production` file at the project root for production environment variables:

```
DATABASE_URL=postgresql://warranty_user:warranty_pass@db:5432/warranty_portal
NEXT_PUBLIC_API_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
NEXTAUTH_URL=http://localhost:3000
```

> In `docker-compose.yml`, the `.env.production` file is referenced via the `env_file` directive. For services that need to communicate over Docker networks, use the service name (e.g., `db`) instead of `localhost` in connection strings.

---

## 10. Multi-Environment Notes

| Environment | Command |
|-------------|---------|
| Production build locally | `docker build -t boat-warranty-portal . && docker run -p 3000:3000 boat-warranty-portal` |
| Development (hot reload) | Use `docker-compose -f docker-compose.yml up --build` (see below) |
| Staging | Pass `--env-file .env.staging` to the `docker run` or `docker-compose` command |

---

## 11. Development Mode (Optional)

For local development with hot-reloading, add a separate compose file — `docker-compose.dev.yml`:

```yaml
version: "3.8"

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
    env_file:
      - .env.development

  db:
    image: postgres:16-alpine
    container_name: warranty-db-dev
    environment:
      POSTGRES_USER: warranty_user
      POSTGRES_PASSWORD: warranty_pass
      POSTGRES_DB: warranty_portal
    volumes:
      - pgdata-dev:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata-dev:
```

Run it with:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

---

## Summary Checklist

1. **Create `.dockerignore`** — excludes unwanted files from the build context
2. **Create `Dockerfile`** — multi-stage build for a lean production image
3. **Create `docker-compose.yml`** — orchestrate the app and its dependencies
4. **Create `.env.production`** — define environment variables
5. **Build**: `docker-compose up --build`
6. **Verify**: open `http://localhost:3000`
7. **Shutdown**: `docker-compose down`
