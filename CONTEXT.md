# Domain Glossary

This glossary defines the domain language and concepts used across the application.

## Identity & Access

**User**:
A person who can authenticate and use the application. Represented by the `User` Lucid model in `#models/user`, storing credentials, email, full name, and initials.

**Account**:
The user's registered identity. New accounts are created via `NewAccountController` (`new_account.create` / `new_account.store`) using `signupValidator`.

**Session**:
An authenticated browsing session backed by `@adonisjs/session` and `@adonisjs/auth` (web session guard). Sessions are created via `SessionController.store` (`session.store`) and destroyed via `SessionController.destroy` (`session.destroy`).

**Preferences**:
User-level client preferences, including the theme selection (`'system' | 'light' | 'dark'`). Stored in the `app_theme` cookie and shared with all Inertia pages through `InertiaMiddleware`.
