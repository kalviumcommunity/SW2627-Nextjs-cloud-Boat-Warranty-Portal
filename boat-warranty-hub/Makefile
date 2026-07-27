# ============================================
# Makefile — boAt Warranty Hub
# ============================================
# Developer-friendly shortcuts for common Docker tasks.
#
# Usage:
#   make dev        → Start development environment
#   make down       → Stop all containers
#   make logs       → Follow live logs
#   make help       → Show all available commands
# ============================================

.PHONY: help dev dev-build down down-clean logs logs-web logs-db \
        shell db-shell migrate seed test lint prod prod-build \
        status restart clean

# Default target — show help
help: ## Show this help message
	@echo.
	@echo   boAt Warranty Hub — Docker Commands
	@echo   ====================================
	@echo.
	@echo   DEVELOPMENT:
	@echo     make dev          Start dev environment (build if needed)
	@echo     make dev-build    Force rebuild and start dev environment
	@echo     make down         Stop all containers
	@echo     make down-clean   Stop all containers AND delete volumes (DB data)
	@echo     make restart      Restart all containers
	@echo.
	@echo   DEBUGGING:
	@echo     make logs         Follow all container logs
	@echo     make logs-web     Follow web container logs only
	@echo     make logs-db      Follow database container logs only
	@echo     make shell        Open a shell inside the web container
	@echo     make db-shell     Open psql inside the database container
	@echo     make status       Show container status
	@echo.
	@echo   DATABASE:
	@echo     make migrate      Run Prisma migrations (deploy)
	@echo     make seed         Run Prisma database seed
	@echo.
	@echo   TESTING:
	@echo     make test         Run tests inside the web container
	@echo     make lint         Run linter inside the web container
	@echo.
	@echo   PRODUCTION:
	@echo     make prod         Start production environment
	@echo     make prod-build   Force rebuild and start production
	@echo.
	@echo   CLEANUP:
	@echo     make clean        Remove all containers, images, and volumes
	@echo.

# ── Development ──

dev: ## Start dev environment (uses cached build)
	docker compose up

dev-build: ## Force rebuild and start dev environment
	docker compose up --build

down: ## Stop all containers (keeps volumes)
	docker compose down

down-clean: ## Stop all containers AND delete volumes (⚠️  deletes DB data)
	docker compose down -v

restart: ## Restart all containers
	docker compose restart

# ── Debugging ──

logs: ## Follow all container logs
	docker compose logs -f

logs-web: ## Follow web container logs only
	docker compose logs -f web

logs-db: ## Follow database container logs only
	docker compose logs -f database

shell: ## Open a bash shell inside the web container
	docker compose exec web sh

db-shell: ## Open psql inside the database container
	docker compose exec database psql -U postgres -d boat_warranty_hub

status: ## Show running container status
	docker compose ps

# ── Database ──

migrate: ## Run Prisma migrations inside the web container
	docker compose exec web npx prisma migrate deploy

seed: ## Run Prisma database seed
	docker compose exec web npx prisma db seed

# ── Testing ──

test: ## Run tests inside the web container
	docker compose exec web npm test

lint: ## Run linter inside the web container
	docker compose exec web npm run lint

# ── Production ──

prod: ## Start production environment
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

prod-build: ## Force rebuild and start production environment
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# ── Cleanup ──

clean: ## Remove ALL containers, images, and volumes for this project
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v --rmi local
