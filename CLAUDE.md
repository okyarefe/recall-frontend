# CLAUDE.md

React frontend for a NestJS API. Login is Google only.

## Stack

- React 19, TypeScript (strict), Tailwind CSS v4
- React Router v8 in **framework mode, SPA** (`ssr: false`, `appDirectory: 'src'`)
- Plain `fetch` through `apiFetch`, React context. No auth libraries.

## Commands

- `npm run dev`: dev server
- `npm run typecheck`: route typegen + `tsc` (run after changes)
- `npm run build`: SPA build to `build/client/`

Requires `.env` with `VITE_API_URL` (see `.env.example`). The app throws at startup without it.

## Folder structure (feature-based)

```
src/
├── root.tsx              # root route: html shell, <AppProviders>, HydrateFallback
├── routes.ts             # ALL routes in one place (file paths relative to src/)
├── providers/            # app-wide providers (AppProviders, ThemeProvider)
├── features/<name>/      # one folder per feature
│   ├── index.ts          # public exports of the feature
│   ├── api.ts            # all HTTP calls of the feature (via apiFetch)
│   ├── components/       # UI pieces used inside the feature
│   ├── hooks/            # logic and state
│   └── pages/            # route modules (default export), thin
├── shared/               # code used by 2+ features
│   ├── api/              # tokenStore.ts, client.ts
│   ├── components/
│   ├── hooks/
│   └── utils/
└── config/env.ts         # the ONLY place that reads import.meta.env
```

Only create a folder once something goes in it.

## Structure rules

1. Code lives in its feature. Deleting a feature = deleting its folder.
2. Dependencies point one way: app → features → shared → config. `shared/` NEVER imports from `features/`.
   When shared code must reach a feature, expose a subscription (see `onLoggedOut` in `shared/api/client.ts`).
3. Outside a feature, import only from its `index.ts` (`@/features/auth`), never deep paths.
   Inside a feature, use relative imports (`../useAuth`), never its own `index.ts` (avoids circular imports).
4. Move code to `shared/` only when two features need it.
5. Pages stay thin: compose components and hooks. Logic goes in hooks, HTTP calls go in `api.ts`.
6. Use the `@/` alias (`@/*` → `src/*`) for cross-folder imports.
7. Route modules (`pages/*`, layouts) are referenced by file path in `routes.ts` and don't need to be in `index.ts`.

## Auth architecture: invariants, do not break

- Backend sets an httpOnly `refresh_token` cookie (Path=/auth). `POST /auth/refresh` with
  `credentials: 'include'` returns `{ accessToken }` and rotates the cookie.
- **Refresh tokens are single-use.** Sending one twice logs the user out everywhere. So:
  - Only `shared/api/tokenStore.ts` touches the refresh cookie: `refresh()` calls `/auth/refresh`, `logout()` calls `/auth/logout`.
    tokenStore functions are named after the endpoint they call.
  - `refresh()` shares one in-flight promise. Never put an `await` between the `if (!inFlight)` check and the assignment.
  - A Web Lock (`navigator.locks`) serializes refresh and logout across tabs; `logout()` also waits for a running refresh.
- The access token lives **in memory only** (`tokenStore.ts`). Never store it in localStorage/sessionStorage or React state.
- All API calls go through `apiFetch` (`shared/api/client.ts`). Never call `fetch` for the API directly.
  It adds the Bearer header and, on 401, refreshes once and retries once.
- `refresh()` results: token = logged in; `null` (401) = logged out; throw = unknown (network/5xx), don't log out.
- React only holds `{ status, user }` in `AuthProvider` (`user` exists only when `'authenticated'`).
  It changes in three places only: the startup session check (`refresh()` then `GET /auth/me`),
  the `onLoggedOut` listener (session expired), and `logout()` (user-initiated).
- "logout" always means the user chose to log out (backend call). A session that died on its own is
  "session expired" (`handleSessionExpired` in `client.ts`, no request).
- User identity comes from `GET /auth/me`, never from decoding the JWT. Pages behind `ProtectedRoute` use `useCurrentUser()`.
- `GET /auth/google` is a full-page navigation (`window.location.assign`), never `fetch`.
- SPA mode still renders the root once at build time in Node: no `window`/`navigator` during render or at module top level. Use effects, or guard with `typeof`.
- Business rules (credits, limits) are enforced by the backend. The frontend only displays server state.

## Code style

- TypeScript strict; no `any`. Type-only imports with `import type` / `type X` (`verbatimModuleSyntax` is on).
- 2-space indent, single quotes, semicolons, trailing commas.
- Named exports, except route modules, which `export default` their component.
- Files: components `PascalCase.tsx`, hooks `useThing.ts`, everything else `camelCase.ts`.
- Import order: external packages, blank line, `@/` imports, then relative imports.
- Comments explain *why*, not *what*. Keep them short.
- Contexts live in a `.ts` file next to their hook (e.g. `useAuth.ts`), so `.tsx` files export only components (Fast Refresh).
- `useContext` hooks throw when used outside their provider instead of returning a default.

## Styling

- Tailwind only. Use the theme tokens from `src/app.css`, never hardcoded colors:
  `bg-background`, `bg-surface`, `bg-surface-muted`, `border-border`, `text-foreground`, `text-muted-foreground`,
  `bg-primary`/`text-primary-foreground`, `bg-inverse`/`text-inverse-foreground`, `bg-accent`, `text-success`, `text-danger`.
- Cards: `rounded-card border border-border bg-surface`.
- Every token has a light and a dark value (`[data-theme='dark']`), so using tokens makes components theme-aware automatically.
  To add a color, add it to both themes and to `@theme inline` in `app.css`.

## Known TODOs

- `Dockerfile` / `npm start` still expect an SSR server build; SPA mode outputs static files in `build/client/`.
- Spec places providers in `src/app/providers.tsx`; they currently live in `src/providers/`.
