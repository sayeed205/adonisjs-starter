<critical>
- Package manager: use `pnpm` exclusively; keep `pnpm-lock.yaml` synchronized with dependency changes.
- Code style: no emojis in code, comments, or commit messages. Omit unnecessary comments; JSDocs for public interfaces and Tenkai `SAFETY:` comments are permitted. Double quotes, no semicolons.
- Linting and formatting: use Oxlint (`pnpm lint`) and Oxfmt (`pnpm format`) exclusively; `oxlint.config.ts` and `oxfmt.config.ts` own code style.
- Generated code: treat `.adonisjs/` as generated code. Regenerate through `node ace build` or the Adonis dev server; never edit manually.
</critical>

## Architecture

Application stack: AdonisJS 7 (`@adonisjs/core`), Lucid ORM (`@adonisjs/lucid`) with PostgreSQL (`pg`), and Inertia.js with React 19.

Architecture guide: read [the application architecture](docs/architecture/application.md) before adding or refactoring controllers, models, validators, middleware, or pages.

AdonisJS 7 skill: consult `.agents/skills/adonisjs-v7-agent/SKILL.md` for framework APIs, services, and best practices.
Inertia skill: consult `.agents/skills/inertia-adonisjs/SKILL.md` for page patterns, forms, and responses.
AdonisJS docs: append `.md` to any `docs.adonisjs.com` URL (e.g., `https://docs.adonisjs.com/guides/basics/routing.md`) to fetch pure Markdown directly.

Routing & types: routes defined in `start/routes.ts` generate typed route definitions via Tuyau (`@tuyau/core`). Use `urlFor` from `~/client` and `<Form route="...">` from `~/components/ui/form` for typesafe route interactions.

Domain language: read [the glossary](CONTEXT.md) before naming or changing domain concepts.

## Design system

UI stack: official ShadCN with Base UI (`@base-ui/react`), style `base-maia` (preset `b6ld6pX79E`), and Tailwind CSS v4. Re-export the compiled `cn` utility from `~/lib/utils`.

Components: UI primitives live in `inertia/components/ui/`. Reusable layout components live in `inertia/components/` and `inertia/layouts/`.

Theming: dark mode supports `'system'` (default), `'light'`, and `'dark'`. Theme state is persisted via the `app_theme` cookie for zero-FOUC server-side rendering and synchronized via `ThemeToggle` in `inertia/components/theme_toggle.tsx`.

## Verification

Run `pnpm format`, `pnpm lint`, `pnpm typecheck`, and `pnpm test` before committing.
Run `pnpm test:lint` whenever modifying `tools/oxlint` or `oxlint.config.ts`. Custom lint rules live under the `tenkai/` namespace; see [tools/oxlint/README.md](tools/oxlint/README.md) before modifying rules.
Use Conventional Commits for commit messages.
