# Application Architecture

This application is an AdonisJS 7 monolith combining a backend API and session layer with an Inertia.js and React 19 frontend.

## Directory Structure

```text
app/
  controllers/      # HTTP request handling and Inertia page rendering
  exceptions/       # Global exception handler
  middleware/       # HTTP middleware (auth, guest, inertia, session)
  models/           # Lucid ORM models
  transformers/     # Data transformers for serialized models
  validators/       # VineJS request validation schemas
config/             # AdonisJS service configurations
database/           # Migrations
inertia/
  components/       # Shared UI components and ShadCN Base UI primitives
  css/              # Tailwind CSS v4 and theme token definitions
  layouts/          # Page layouts (App, Auth, Marketing, Settings)
  lib/              # Client utilities (cn re-export)
  pages/            # Inertia page components
providers/          # Custom AdonisJS providers
resources/views/    # Edge template (inertia_layout.edge)
start/              # Preloaded files (routes, kernel, env, validator)
tools/oxlint/       # Tenkai custom Oxlint rules and test suite
```

## Backend Architecture

### Routing and Tuyau Type Generation

Routes defined in `start/routes.ts` are indexed by Tuyau (`@tuyau/core`). Route definitions generate compile-time types into `.adonisjs/`, providing full type safety for URLs, parameters, and form submission payloads.

### Controllers

Controllers are grouped by resource or workflow. They validate incoming request payloads via VineJS, invoke model methods or services, and return Inertia renders or redirects:

- `renderInertia(page, props)` renders Inertia pages.
- `response.redirect().toRoute(route)` redirects using named routes.

### Validation

Input validation uses VineJS schemas in `app/validators/`. Controllers validate using `request.validateUsing(validator)` before business logic execution.

### Persistence

Data access is managed by Lucid ORM (`@adonisjs/lucid`) with PostgreSQL (`pg`) using the `DATABASE_URL` connection string. Schema changes are recorded as migrations in `database/migrations/`.

### Inertia Middleware and Shared State

`InertiaMiddleware` in `app/middleware/inertia_middleware.ts` hydrates state shared across all Inertia pages:

- `errors`: Form validation errors.
- `user`: Authenticated user model serialized through `UserTransformer`.
- `preferences`: User theme preference derived from the `app_theme` cookie (`system`, `light`, `dark`).

## Frontend Architecture

### Inertia.js with React 19

Inertia bridges backend routing to React client pages. Pages in `inertia/pages/` declare persistent layouts via `Component.layout = [Layout]`.

### Design System and Base UI

- Components are built using official ShadCN with Base UI (`@base-ui/react`), style `base-maia` (preset `b6ld6pX79E`).
- UI primitives live in `inertia/components/ui/`.
- Class merging uses the standalone compiled `cn` package, re-exported from `~/lib/utils`.

### Form and Field Bridge

The custom `Form` component (`inertia/components/ui/form.tsx`) bridges `@adonisjs/inertia/react` route-based form submissions with `@base-ui/react/form` and `@base-ui/react/field`, enabling automatic error mapping to fields without manual prop-drilling.

### Theming and Dark Mode

Theme management uses a zero-FOUC architecture:

- Default theme is `system`.
- The `app_theme` cookie stores user preferences across sessions.
- In `resources/views/inertia_layout.edge`, a synchronous inline `<head>` script evaluates `prefers-color-scheme` before the DOM renders.
- `ThemeToggle` (`inertia/components/theme_toggle.tsx`) provides a segmented 3-option control (System, Light, Dark) with OS color-scheme listener and a keyboard shortcut (<kbd>D</kbd>).

## Verification Workflow

Before committing, run the full verification suite:

- `pnpm format` runs Oxfmt.
- `pnpm lint` runs Oxlint with Tenkai rules.
- `pnpm typecheck` validates backend and Inertia TypeScript programs.
- `pnpm test:lint` verifies the Tenkai rule suite.
- `pnpm build` creates the production bundle with Vite and Ace.
