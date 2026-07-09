# AGENTS.md — StoreFront Management System

This file gives any AI coding agent (or human) working in this repo the context needed to make consistent decisions. Read this before generating code.

## Project Summary

A marketplace web app connecting **Sellers** (list products) and **Buyers** (browse, cart, checkout). Role-based access control throughout.

## Stack

| Layer | Tech |
|---|---|
| Backend | .NET (C#), ASP.NET Core |
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Icons | React Icons (`react-icons`) |
| Database | SQL Server (MSSQL) |
| Auth | JWT via System.IdentityModel.Tokens.Jwt |
| Containerization | Docker & Docker Compose |
| Proxy | Nginx (reverse proxy routing web and api) |
| Testing | xUnit / NUnit |

## Repo Structure

```
/Api
  /Api             # .NET project config (Program.cs, appsettings)
  /Controllers     # API controllers (Auth, Products, Orders, Cart)
  /Models          # Entity models (User, Product, Order, OrderItem, Cart)
  /Services        # Business logic services
  /Data            # DbContext and migrations
  appsettings.json
  appsettings.Development.json
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

## API Conventions (ASP.NET Core)

- Base path: `/api/`
- Use ASP.NET Core controllers inheriting from `ControllerBase`; use standard HTTP methods (GET, POST, PUT, DELETE) with proper routing attributes.
- **Data Transfer Objects (DTOs)** live in each feature folder — separate request/response DTOs when the shapes differ (e.g., `CreateProductDto`, `ProductDto`).
- **Authorization**: use `[Authorize]` attributes with custom `AuthorizationHandler` for role-based checks (`Buyer`, `Seller`) — never rely on frontend role checks alone.
- **Auth**: JWT via System.IdentityModel.Tokens.Jwt
  - `POST /api/auth/register` — includes role selection, returns access/refresh tokens
  - `POST /api/auth/login` — returns access/refresh tokens
  - `POST /api/auth/refresh` — refresh token endpoint
  - `GET /api/auth/me` — current user + role
- **Products**: `GET /api/products` (list/filter), `POST /api/products` (create), `GET /api/products/{id}` (detail), `PUT /api/products/{id}` (update), `DELETE /api/products/{id}` (delete), `GET /api/products/mine` (seller's own listings)
- **Cart**: `GET /api/cart` (current buyer's cart), `POST /api/cart/items` (add), `PUT /api/cart/items/{id}` (update), `DELETE /api/cart/items/{id}` (remove)
- **Checkout**: `POST /api/orders/checkout` — transactional with row-level locking on Product records to prevent overselling
- **Orders**: `GET /api/orders` (buyer history), `GET /api/orders/{id}` (detail)
- Responses: standard JSON; proper HTTP status codes (400 validation, 401 unauth, 403 forbidden, 404 not found)
- Filtering: use query parameters (`?minPrice=&maxPrice=&search=`) in controller actions for product list filtering

## Backend Testing (.NET)

- Use xUnit or NUnit with `HttpClient` for integration tests; `Moq` for mocking services.
- Priority coverage: role-based authorization enforcement, checkout inventory decrement (incl. concurrency scenarios), ownership checks on product edit/delete, cart/order total calculations, input validation (negative quantity, price ≤ 0, purchase exceeding stock).
- Run via `dotnet test` from the Api directory.

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

- C#: Follow Microsoft .NET naming conventions, clean architecture with separation of concerns (controllers, services, repositories), async/await for I/O operations
- Required NuGet packages: `Microsoft.AspNetCore.Authentication.JwtBearer`, `EntityFrameworkCore`, `EntityFrameworkCore.SqlServer`, `xUnit` or `NUnit`
- TypeScript: strict mode, interfaces for objects, React functional components with hooks
- Naming: `snake_case` (Python/DB), `camelCase` (TS/JS), `PascalCase` (React components, TS types)
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Exclusions: Never commit `.env`, `node_modules/`, `bin/`, `obj/`, or `.vs/`