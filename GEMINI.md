# GEMINI.md — StoreFront Management System

This file gives any AI coding agent (or human) working in this repo the context needed to make consistent decisions. Read this before generating code.

## Project Summary

A marketplace web app connecting **Sellers** (list products) and **Buyers** (browse, cart, checkout). Role-based access control throughout.

## Stack

| Layer | Tech |
|---|---|
| Backend | .NET (C#) |
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Icons | React Icons (`react-icons`) |
| Database | SQL Server (MSSQL) |
| Containerization | Docker & Docker Compose |
| Proxy | Nginx (reverse proxy routing web and api) |

## Repo Structure

```
/Api
  /Api             # .NET API project configuration
  appsettings.json
  appsettings.Development.json
  Program.cs
  Dockerfile

/Web
  /src
    /components    # reusable UI components (e.g., BuyerNav)
    /assets        # static assets
    App.tsx
    App.css
    index.css
    main.tsx
  vite.config.ts
  package.json
  Dockerfile

docker-compose.yml # orchestrates database, api, web, pgadmin, and nginx
nginx.conf         # routes frontend and backend requests
.env               # environment configuration
README.md
GEMINI.md
AGENTS.md
```

## API Conventions

- Base path: `/api/`
- Auth: Custom / JWT authentication
- Products: REST endpoints under `/api/products/`
- Cart: `/api/cart/`
- All endpoints return standard Django REST/JSON responses; use proper status codes (400 validation, 401 unauth, 403 wrong role/not owner, 404 not found)

## Frontend Conventions

- **Tailwind v4** for styling — no utility conflicts. Custom CSS configurations in [index.css](file:///C:/Users/kitti/Projects/StoreFrontManagement/Web/src/index.css).
- Reusable UI elements extracted into components inside `Web/src/components`.

## Commands

### Docker (Recommended)
```bash
# Run complete system (Web, Api, Postgres, Nginx)
docker compose up --build -V

# Stop system and clean volumes
docker compose down -v
```

### Local Development (Without Docker)
```bash
# Backend (from repository root)
cd Api
dotnet run

# Frontend (from repository root)
cd Web
npm install
npm run dev
```

## Conventions & Style

- C#: .NET conventions, clean architecture with controllers/services, async/await patterns
- TypeScript: strict mode, interfaces for objects, React functional components with hooks
- Naming: `snake_case` (Python/DB), `camelCase` (TS/JS), `PascalCase` (React components, TS types)
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Exclusions: Never commit `.env`, `node_modules/`, `db.sqlite3`, or `__pycache__/`