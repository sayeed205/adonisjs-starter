# AdonisJS 7 + Inertia React Starter

A production-ready full-stack web application starter built with AdonisJS 7, Inertia.js, React 19, Tailwind CSS v4, official ShadCN with Base UI, and PostgreSQL.

## Features

- **AdonisJS 7 Backend**: Modern Node.js framework architecture utilizing service providers, IoC container, and Lucid ORM.
- **Inertia.js & React 19**: Server-driven client routing with full React 19 support and zero API glue code.
- **Official ShadCN with Base UI**: Accessible UI component primitives built with `@base-ui/react` using the `base-maia` style preset.
- **Tailwind CSS v4**: High-performance CSS engine with compiled class utility integration.
- **Type-safe Routing**: End-to-end typed route definitions via Tuyau (`@tuyau/core`) and typesafe form helpers.
- **Session Authentication**: Built-in authentication flow covering registration, login, logout, Scrypt password hashing, and Shield CSRF protection.
- **SSR-Friendly Theming**: Dark and light mode with zero Flash of Unstyled Content (FOUC), synchronized via cookies and system preferences.
- **Comprehensive Testing Suite**: Japa test runner with API client plugins, transactional database isolation, and 100% coverage via c8.
- **Modern Tooling**: Sub-second linting and formatting via Oxlint and Oxfmt with custom Tenkai architectural rules.
- **Production Containerization**: Multi-stage Dockerfile built on `node:lts` with an entrypoint supporting automated database migrations.

## Tech Stack

| Layer               | Technologies                                                              |
| ------------------- | ------------------------------------------------------------------------- |
| **Backend**         | AdonisJS 7, Lucid ORM, PostgreSQL (`pg`), VineJS                          |
| **Frontend**        | Inertia.js, React 19, Tuyau                                               |
| **UI & Styling**    | ShadCN, Base UI (`@base-ui/react`), Tailwind CSS v4, Lucide React, Sonner |
| **Testing**         | Japa (Runner, API Client, Assert, AdonisJS Plugin), c8                    |
| **Tooling**         | Oxlint, Oxfmt, pnpm                                                       |
| **Runtime & Infra** | Node.js (LTS), Docker                                                     |

## Getting Started

### Prerequisites

- Node.js >= 24.0.0 (LTS recommended)
- pnpm >= 10.0.0 (configured with `pnpm@12.21.0`)
- PostgreSQL database instance (local or containerized)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:sayeed205/adonisjs-starter.git
cd adonisjs-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Copy the `.env.example` file (or update your `.env`):

```bash
cp .env.example .env
```

Ensure `DATABASE_URL` points to your PostgreSQL database:

```env
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=your-app-key-here
NODE_ENV=development
SESSION_DRIVER=cookie
DATABASE_URL=postgres://admin:password@localhost:5432/postgres
```

> [!NOTE]
> Generate a secure `APP_KEY` using `node ace generate:key` if creating a new configuration.

4. Run database migrations:

```bash
node ace migration:run
```

5. Start the development server with Hot Module Replacement (HMR):

```bash
pnpm dev
```

The application will be accessible at `http://localhost:3333`.

## Project Structure

```text
├── app/
│   ├── controllers/      # HTTP controllers
│   ├── middleware/       # Global, named, and router middleware
│   ├── models/           # Lucid ORM database models
│   ├── transformers/     # API and payload transformers
│   └── validators/       # VineJS request schema validators
├── config/               # Application configuration files
├── database/
│   └── migrations/       # Lucid schema migration files
├── docker-entrypoint.js  # Production migration and startup script
├── Dockerfile            # Optimized multi-stage Docker build
├── docs/                 # Architectural documentation and guides
├── inertia/
│   ├── app/              # Inertia client entry point and SSR provider
│   ├── components/       # Reusable React components and ShadCN UI primitives
│   ├── css/              # Tailwind CSS entry point and design tokens
│   ├── hooks/            # Custom React hooks (theme, forms)
│   ├── layouts/          # Page layouts (AppLayout, AuthLayout)
│   └── pages/            # Inertia page views
├── start/
│   ├── env.ts            # Environment variable validation schemas
│   ├── kernel.ts         # Middleware stack registration
│   └── routes.ts         # Application route definitions
├── tests/
│   ├── functional/       # End-to-end HTTP and route tests
│   └── unit/             # Model, transformer, and validator tests
└── tools/
    └── oxlint/           # Custom Tenkai architectural lint rules
```

## Available Scripts

| Script               | Command                        | Purpose                                                |
| -------------------- | ------------------------------ | ------------------------------------------------------ |
| `pnpm dev`           | `node ace serve --hmr`         | Starts the development server with asset HMR           |
| `pnpm build`         | `node ace build`               | Compiles frontend assets and TypeScript backend        |
| `pnpm start`         | `node bin/server.js`           | Runs the compiled production build                     |
| `pnpm test`          | `node ace test`                | Executes unit and functional tests with Japa           |
| `pnpm test:coverage` | `c8 node ace test`             | Runs tests and generates a code coverage report        |
| `pnpm test:lint`     | `node --test tools/oxlint/...` | Verifies custom Tenkai lint rules                      |
| `pnpm lint`          | `oxlint --fix`                 | Runs Oxlint linter with automated fixes                |
| `pnpm format`        | `oxfmt --write .`              | Formats all files using Oxfmt                          |
| `pnpm typecheck`     | `tsc --noEmit ...`             | Validates TypeScript types across backend and frontend |

## Testing and Quality Assurance

The starter includes test suites covering models, request validators, data transformers, authentication flows, theme negotiation, and page rendering.

Run the test suite:

```bash
pnpm test
```

Generate a code coverage report:

```bash
pnpm test:coverage
```

> [!TIP]
> Functional tests use `testUtils.db().wrapInGlobalTransaction()` to run each test inside an isolated database transaction, preventing state leakage and eliminating test cleanup overhead.

Run code quality checks:

```bash
pnpm format
pnpm lint
pnpm typecheck
```

## Docker Deployment

The application includes an optimized multi-stage `Dockerfile` based on `node:lts`.

### Build the Image

```bash
docker build -t adonisjs-starter:latest .
```

### Run the Container

```bash
docker run -p 3333:3333 \
  -e APP_KEY="base64:your-production-app-key" \
  -e DATABASE_URL="postgres://admin:password@db-host:5432/production_db" \
  -e MIGRATE=true \
  adonisjs-starter:latest
```

> [!IMPORTANT]
> When `MIGRATE=true` is supplied, `docker-entrypoint.js` automatically executes pending database migrations via `node ace migration:run --force` before starting the HTTP server.
