# CLAUDE.md

React frontend for a NestJS API. Login is Google only.

## Stack

- React 19, TypeScript (strict), Tailwind CSS v4 (components) + CSS Modules (pages)
- shadcn/ui on Radix for accessible components (source copied into `shared/components/ui/`)
- React Router v8 in **framework mode, SPA** (`ssr: false`, `appDirectory: 'src'`)
- Plain `fetch` through `apiFetch`, React context. No auth libraries.

## Commands

- `npm run dev`: dev server
- `npm run typecheck`: route typegen + `tsc` (run after changes)
- `npm run build`: SPA build to `build/client/`

Requires `.env` with `VITE_API_URL` (see `.env.example`). The app throws at startup without it.

## Folder structure (pages + features)

```
src/
├── root.tsx              # root route: html shell, <AppProviders>, HydrateFallback
├── routes.ts             # ALL routes in one place: URL → file in pages/
├── pages/                # every screen (route modules, default export), thin
│   ├── HomePage.tsx      #   + HomePage.module.css (page layout)
│   ├── LoginPage.tsx, DashboardPage.tsx, ...
│   └── layouts/          # layout routes: MarketingLayout, ProtectedLayout
├── providers/            # app-wide providers (AppProviders, ThemeProvider)
├── features/<name>/      # one folder per feature (auth, marketing), no pages
│   ├── index.ts          # public exports of the feature
│   ├── api.ts            # all HTTP calls of the feature (via apiFetch)
│   ├── components/       # UI of the feature (Tailwind)
│   └── hooks/            # logic and state
├── shared/               # code used by 2+ features
│   ├── api/              # tokenStore.ts, client.ts
│   ├── components/       # BrandMark, ProductShowcase
│   │   └── ui/           # shadcn/ui components (generated, see Styling)
│   ├── hooks/
│   └── utils/            # cn.ts (class merging for components)
└── config/env.ts         # the ONLY place that reads import.meta.env
```

Only create a folder once something goes in it.

## Structure rules

1. Dependencies point one way: pages → features → shared → config.
   - Features NEVER import other features. When a section needs another feature's UI, take it as a prop/slot
     and let the page compose them (e.g. `<Hero action={<AuthCta … />} />`).
   - `shared/` NEVER imports from `features/`. When shared code must reach a feature, expose a subscription
     (see `onLoggedOut` in `shared/api/client.ts`).
2. Pages live in `pages/`, never inside a feature. A page composes features; it holds no logic or HTTP calls.
   Name pages `XPage.tsx`, layouts `XLayout.tsx`, each with its CSS Module next to it.
3. Outside a feature, import only from its `index.ts` (`@/features/auth`), never deep paths.
   Inside a feature, use relative imports (`../useAuth`), never its own `index.ts` (avoids circular imports).
4. Feature code lives in its feature: components, hooks, `api.ts`. Removing a feature = its folder + the pages using it.
5. Move code to `shared/` only when two features need it. Exception: `shared/components/ui/` (design-system primitives).
6. Use the `@/` alias (`@/*` → `src/*`) for cross-folder imports.

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
- User identity comes from `GET /auth/me`, never from decoding the JWT. Pages behind `ProtectedLayout` use `useCurrentUser()`.
- `GET /auth/google` is a full-page navigation (`window.location.assign`), never `fetch`.
- SPA mode still renders the root once at build time in Node: no `window`/`navigator` during render or at module top level. Use effects, or guard with `typeof`.
- Business rules (credits, limits) are enforced by the backend. The frontend only displays server state.

## Code style

- TypeScript strict; no `any`. Type-only imports with `import type` / `type X` (`verbatimModuleSyntax` is on).
- 2-space indent, single quotes, semicolons, trailing commas.
- Named exports, except route modules, which `export default` their component.
- Files: components `PascalCase.tsx`, hooks `useThing.ts`, everything else `camelCase.ts`.
  A page's CSS Module is named after its page file (`DashboardPage.module.css`, `LoginPage.module.css`).
  Exception: `shared/components/ui/` keeps shadcn's lowercase names and code style (double quotes, no semicolons), so the CLI can update them.
- Import order: external packages, blank line, `@/` imports, then relative imports.
- Comments explain *why*, not *what*. Keep them short.
- Contexts live in a `.ts` file next to their hook (e.g. `useAuth.ts`), so `.tsx` files export only components (Fast Refresh).
- `useContext` hooks throw when used outside their provider instead of returning a default.

## Styling

Two layers, one set of tokens:

- **Components use Tailwind** (`components/`, `shared/components/`). Anything reusable (buttons, cards, inputs) is a component.
- **Pages use CSS Modules** for page layout only (grids, sections, spacing between blocks).
  Put `thing.module.css` next to the page and `import styles from './thing.module.css'`.
  If a module starts styling buttons or cards, turn that into a component instead. No `@apply` in modules.

### Design tokens (`src/app.css`), the only source of design values

Never hardcode a color, font size, spacing, radius, shadow or width. If no token fits, add one; don't invent a value.

| Kind | Tailwind (components) | CSS Modules (pages) |
|---|---|---|
| Color | `bg-surface`, `text-muted-foreground`, `border-border`, `bg-primary`, ... | `var(--surface)`, `var(--muted-foreground)`, ... |
| Type | `text-display` / `title` / `heading` / `body` / `caption` / `label` | `var(--text-title)` + `--text-title--line-height`, `--letter-spacing`, `--font-weight` |
| Spacing | Tailwind scale (`p-6`, `gap-4`) | `var(--space-6)`, `var(--space-4)` (same 4px scale) |
| Radius | `rounded-card` / `panel` / `pill` | `var(--radius-card)`, ... |
| Shadow | `shadow-card` / `float` | `var(--elevation-card)`, `var(--elevation-float)` |
| Width | `max-w-form` / `narrow` / `content` / `page` | `var(--container-form)`, ... |
| Page side padding | `px-(--gutter)` | `var(--gutter)` (16px → 24px → 40px as the screen grows) |

- Colors: `bg-background`, `bg-surface`, `bg-surface-muted`, `border-border`, `text-foreground`, `text-muted-foreground`,
  `bg-primary`/`text-primary-foreground`, `bg-primary-soft`, `bg-inverse`/`text-inverse-foreground`, `bg-accent` (teal),
  `text-success`/`bg-success-soft`, `text-danger`, `bg-chart-1..4`. Stripes: `bg-hatch text-chart-1`.
- Cards: `rounded-card border border-border bg-surface shadow-card`.
- A bare `border` already uses `--border` (base rule in `app.css`), as shadcn components assume.
- Theme-dependent tokens (colors, elevation) live in `:root` and `[data-theme='dark']`, mapped in `@theme inline`.
  To add one: both themes + `@theme inline`. Raw and Tailwind names must differ (`--surface` → `--color-surface`), or the variable references itself.
- Scales (type, radius, widths) live in `@theme static`, so their variables always exist for CSS Modules.
- New size/radius/shadow/width tokens must also be added to `extendTailwindMerge` in `shared/utils/cn.ts`.
  Otherwise `cn()` misreads them (e.g. treats `text-body` as a color) and silently drops other classes.
- Don't reuse names Tailwind already has built in (e.g. `max-w-prose` is 65ch and wins over a token).
- Exceptions: brand marks (the Google G and its white circle), and per-item data such as chart bar heights via `style`.
- Media queries can't read variables: use `64rem` (Tailwind `lg`) etc. with a comment.

### Accessible components (shadcn/ui)

- Use shadcn/ui (Radix) for interactive widgets (dialog, dropdown, tabs, tooltip, select, ...). Don't hand-roll focus/ARIA logic.
- Add with `npx shadcn@latest add <name> --yes`. Files land in `src/shared/components/ui/`; import from `@/shared/components/ui/<name>`.
- After every `add`, fix what the CLI gets wrong:
  - It writes `import { cn } from "cn"` and may install an unrelated `cn` npm package. Change the import to
    `@/shared/utils/cn` and `npm uninstall cn`.
  - Check `package.json` for missing deps (e.g. `class-variance-authority`) and install them.
  - shadcn's `accent` is a subtle hover background; ours is teal. Replace `hover:bg-accent` / `text-accent-foreground`
    with `hover:bg-surface-muted` / `text-foreground`.
  - Replace hardcoded colors (`text-white`, ...) with tokens, and check every color class it uses exists in `@theme inline`
    (a missing token produces no CSS and no error). Run `npm run build` and look.

## Known TODOs

- `Dockerfile` / `npm start` still expect an SSR server build; SPA mode outputs static files in `build/client/`.
- Spec places providers in `src/app/providers.tsx`; they currently live in `src/providers/`.
