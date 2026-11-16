# AdonisJS Starter

A modern full-stack web application starter built with AdonisJS 7, Inertia.js, React 19, Tailwind CSS v4, and official ShadCN with Base UI.

## Tech Stack

- **Backend**: [AdonisJS 7](https://docs.adonisjs.com) with [Lucid ORM](https://docs.adonisjs.com/guides/database/lucid) and PostgreSQL
- **Frontend**: [Inertia.js](https://inertiajs.com) with [React 19](https://react.dev)
- **UI Components**: Official [ShadCN](https://ui.shadcn.com) with [Base UI](https://base-ui.com) (`base-maia` style)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with compiled `cn` utility
- **Type Safety**: [Tuyau](https://github.com/tuyau/core) for end-to-end typed route definitions
- **Validation**: [VineJS](https://vinejs.dev)
- **Tooling**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), and [pnpm](https://pnpm.io)

## Getting Started

### Prerequisites

- Node.js >= 20.6.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run database migrations
node ace migration:run

# Start development server with HMR
pnpm dev
```

The application will be available at `http://localhost:3333`.

## Available Scripts

- `pnpm dev`: Start the AdonisJS development server with HMR.
- `pnpm build`: Build the production application and assets.
- `pnpm start`: Run the compiled production server.
- `pnpm test`: Execute application tests with Japa.
- `pnpm lint`: Run Oxlint with Tenkai custom rules.
- `pnpm format`: Format codebase with Oxfmt.
- `pnpm typecheck`: Run TypeScript compiler checks for backend and Inertia frontend.
- `pnpm test:lint`: Run tests for custom Tenkai lint rules.

## Documentation

- [AGENTS.md](AGENTS.md): Coding standards, guidelines, and tool verification rules for AI agents.
- [CONTEXT.md](CONTEXT.md): Domain glossary and terminology reference.
- [docs/architecture/application.md](docs/architecture/application.md): Full architectural overview and patterns.
- [AdonisJS Documentation](https://docs.adonisjs.com): Append `.md` to any guide URL (e.g. `https://docs.adonisjs.com/guides/basics/routing.md`) to read pure Markdown.
