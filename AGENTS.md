# AGENTS.md — StoreFront Management System

This file gives any AI coding agent (or human) working in this repo the context needed to make consistent decisions. Read this before generating code.

## Project Summary

A marketplace web app connecting **Sellers** (list products) and **Buyers** (browse, cart, checkout). Role-based access control throughout.

## Stack

| Layer | Tech |
|---|---|
| Backend | Python, Django 6.0+, Django REST Framework |
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Icons | React Icons (`react-icons`) |
| Database | PostgreSQL (via Docker) / SQLite (local dev) |
| Auth | JWT via `djangorestframework-simplejwt` |
| Containerization | Docker & Docker Compose |
| Proxy | Nginx (reverse proxy routing web and api) |
| Testing | Django's built-in test framework / `pytest-django` |

## Repo Structure

```
/Api
  /Api             # Django project config (settings, urls, wsgi/asgi)
  /apps
    /accounts      # custom User model, auth views/serializers, roles
    /products      # Product model, serializers, viewsets
    /orders        # Cart, Order, OrderItem, checkout logic
  manage.py
  requirements.txt
  Dockerfile
  db.sqlite3

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

## API Conventions (Django REST Framework)

- Base path: `/api/`
- Use DRF `ModelViewSet` + `DefaultRouter` for standard CRUD resources (products, cart items); use plain `APIView`/`generics` for non-CRUD actions (checkout, auth).
- **Serializers** live in each app's `serializers.py` — one serializer per model minimum; use separate `Create`/`Detail` serializers only when the shapes genuinely differ (e.g. write vs. read fields).
- **Permissions**: use DRF permission classes (`IsAuthenticated`, custom `IsSeller`, `IsOwner`) on each viewset — never rely on frontend role checks alone.
- **Auth**: `djangorestframework-simplejwt`
  - `POST /api/auth/register/` — includes role selection
  - `POST /api/auth/login/` — returns access/refresh tokens
  - `POST /api/auth/refresh/`
  - `GET /api/auth/me/` — current user + role
- **Products**: `/api/products/` (list/create), `/api/products/{id}/` (detail/update/delete), `/api/products/mine/` (seller's own listings) — ViewSet with `get_queryset()` filtering by role
- **Cart**: `/api/cart/` (current buyer's cart), `/api/cart/items/` (add/update/remove line items)
- **Checkout**: `POST /api/orders/checkout/` — plain `APIView`, wrapped in `transaction.atomic()` with `select_for_update()` on Product rows to prevent overselling under concurrent requests
- **Orders**: `/api/orders/` (buyer history), `/api/orders/{id}/` (detail)
- Responses: standard DRF/JSON; proper status codes (400 validation, 401 unauth, 403 wrong role/not owner, 404 not found)
- Filtering: use `django-filter` (`DjangoFilterBackend`) for product list query params (`?min_price=&max_price=&search=`) rather than hand-rolled query parsing

## Backend Testing (DRF)

- Use `rest_framework.test.APITestCase` / `APIClient` for endpoint tests, not just plain Django `TestCase`.
- Priority coverage: role-based permission enforcement, checkout inventory decrement (incl. race conditions), ownership checks on product edit/delete, cart/order total calculations, input validation (negative quantity, price ≤ 0, purchase exceeding stock).
- Run via `python manage.py test` or `pytest` if `pytest-django` is configured.

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
python manage.py runserver 0.0.0.0:8000

# Frontend (from repository root)
cd Web
npm install
npm run dev
```

## Conventions & Style

- Python: PEP8, clean views/serializers/viewsets, keep business logic out of views where practical (use model methods or a small services layer for checkout logic)
- Required packages (in `requirements.txt`): `djangorestframework`, `djangorestframework-simplejwt`, `django-filter`, `django-cors-headers`
- TypeScript: strict mode, interfaces for objects, React functional components with hooks
- Naming: `snake_case` (Python/DB), `camelCase` (TS/JS), `PascalCase` (React components, TS types)
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Exclusions: Never commit `.env`, `node_modules/`, `db.sqlite3`, or `__pycache__/`