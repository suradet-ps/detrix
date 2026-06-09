# Suradet Pratomsak | Portfolio

> Personal portfolio showcasing professional works, innovations, speaker experiences, and academic contributions.

[![License](https://img.shields.io/badge/license-MIT-blue?logo=opensourceinitiative&logoColor=ffffff)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/suradet-ps/suradet-portfolio?color=blue&logo=git&logoColor=ffffff)](https://github.com/suradet-ps/suradet-portfolio/commits/main)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![Svelte](https://img.shields.io/badge/Svelte-%5E5-FF3E00?logo=svelte&logoColor=ffffff)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-%5E2-FF3E00?logo=svelte&logoColor=ffffff)](https://kit.svelte.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=ffffff)](https://supabase.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3.14-f9f1e1?logo=bun&logoColor=ffffff)](https://bun.sh/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?logo=github&logoColor=ffffff)](https://github.com/suradet-ps/suradet-portfolio/pulls)

---

**Suradet Portfolio** is a modern, server-side-rendered portfolio application for healthcare professionals. Portfolio items are fetched from a **Supabase** backend and dynamically grouped by category, with a key-protected route for adding new entries. Built with Svelte 5 runes, SvelteKit 2, and strict TypeScript.

---

## Features

- **Dynamic content** — portfolio items fetched from Supabase; no redeploy needed for updates.
- **Categorized view** — items automatically grouped by category (Speaker, Academic Work, Innovation, etc.).
- **Detail modal** — click any item to open an accessible, keyboard-navigable modal with full details.
- **Key-protected submission** — secure `/add` route verifies a secret key **server-side** (no client-side secrets).
- **Notification system** — accessible toast notifications replace `alert()` for all user feedback.
- **Scroll-reveal animations** — subtle Intersection Observer-based reveal on category sections.
- **Mobile-first responsive** — optimized for all screen sizes with hamburger navigation.
- **Dark-mode ready** — CSS custom properties architecture; theme can be toggled via `prefers-color-scheme`.
- **Fully accessible** — keyboard navigation, focus traps, ARIA attributes, screen-reader support.
- **SSR-safe architecture** — no `window`/`document` access during server rendering.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (strict mode, no unchecked access) |
| **Framework** | [Svelte 5](https://svelte.dev/) (runes API: $state, $derived, $effect) |
| **Meta-framework** | [SvelteKit 2](https://kit.svelte.dev/) (file-based routing, layout system) |
| **Build tool** | [Vite 8](https://vite.dev/) (via SvelteKit) |
| **Backend** | [Supabase](https://supabase.com/) (PostgreSQL, REST API, anon key) |
| **Package manager** | [Bun](https://bun.sh/) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.1+

### Install

```bash
git clone https://github.com/suradet-ps/suradet-portfolio.git
cd suradet-portfolio
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
VITE_ADD_POST_SECRET_KEY="your-secret-key"
```

> `VITE_ADD_POST_SECRET_KEY` is only accessed **server-side** in `+page.server.ts` — never exposed to the client.

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
bun run build      # svelte-kit sync + Vite build (SSR + client)
bun run preview    # preview the production bundle
```

### Quality Checks

```bash
bun run check      # svelte-kit sync + svelte-check (type + Svelte diagnostics)
```

---

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Navbar.svelte              # Responsive nav with hamburger menu
│   │   ├── PortfolioDetailModal.svelte # Accessible modal with focus trap
│   │   └── Notification.svelte        # Toast notification system
│   ├── services/
│   │   └── portfolio.service.ts       # Data access layer (fetch, create, validate)
│   ├── stores/
│   │   └── notification.svelte.ts     # Rune-based notification store
│   ├── styles/
│   │   ├── tokens.css                 # Design tokens (spacing, typography, colors)
│   │   └── global.css                 # CSS reset + base styles
│   ├── supabase/
│   │   └── client.ts                  # Singleton Supabase client (SSR-safe)
│   ├── types/
│   │   └── portfolio.ts               # All database models & DTOs
│   └── utils/
│       ├── date.ts                    # Date formatting utilities
│       ├── focusTrap.ts               # Focus trap Svelte action
│       └── scrollReveal.ts            # Intersection Observer action
├── routes/
│   ├── +layout.svelte                 # App shell (Navbar + Notification)
│   ├── +page.svelte                   # Portfolio listing page
│   ├── +page.ts                       # Server load: fetch + group items
│   ├── add/
│   │   ├── +page.svelte               # Add-portfolio form
│   │   └── +page.server.ts            # Server action: secret-key verification + insert
│   └── api/
│       └── portfolio/
│           └── +server.ts             # REST endpoint for portfolio creation
├── app.html                           # HTML shell
└── app.d.ts                           # SvelteKit type declarations
```

---

## Svelte 5 Architecture

This project uses Svelte 5 **runes** exclusively — no legacy `export let`, no `on:click`, no stores for component state:

- **`$state()`** — local reactive state (`isModalOpen`, `selectedItem`, `isSubmitting`)
- **`$derived()`** — computed values (`items`, `grouped` from page data)
- **`$effect()`** — side effects (body scroll lock when modal opens)
- **`$props()`** — typed component props (`item: PortfolioItem`, `onclose: () => void`)
- **`{@render children()}`** — layout slot pattern in `+layout.svelte`
- **`use:action`** — DOM interactions (`focusTrap`, `scrollReveal`)

Key architectural decisions:

- **No global stores for page state** — notification is the only rune-based store (truly global concern)
- **Data fetching in `+page.ts`** — Supabase queries run in the load function, not in components
- **Server-only authorization** — secret key validation in `+page.server.ts` form actions
- **Progressive enhancement** — form uses `use:enhance` for JS-enabled clients, falls back to server actions

---

## TypeScript Architecture

- **`strict: true`** — all strict checks enabled
- **Zero `any` types** — no type assertions, no `@ts-ignore`
- **`verbatimModuleSyntax`** — enforces `import type` for type-only imports
- **Full model typing** — `PortfolioItem`, `PortfolioItemInput`, `PortfolioFormData`, `FormErrors`, `ApiResponse`, `Notification`
- **Service layer isolation** — components never call Supabase directly

---

## Security

- **Server-side key verification** — `VITE_ADD_POST_SECRET_KEY` is checked in `+page.server.ts` only
- **No client-side secrets** — the secret key is never `import.meta.env`-accessed in browser code
- **Supabase anon key** — safe for client use with Row-Level Security; read-only queries in load functions
- **Environment validation** — `client.ts` throws during build if required vars are missing

---

## Accessibility

| Feature | Implementation |
|---------|---------------|
| **Keyboard navigation** | All interactive elements reachable via Tab |
| **Focus trap** | Modal cycles focus; restores previous focus on close |
| **Escape key** | Closes modal; closes mobile menu |
| **ARIA** | `dialog`, `aria-modal`, `aria-labelledby`, `aria-expanded`, `aria-controls`, `aria-invalid`, `aria-describedby` |
| **Live regions** | `aria-live="polite"` for notifications, `role="alert"` for errors |
| **Reduced motion** | `prefers-reduced-motion` media query disables animations |
| **Focus visibility** | `focus-visible` outlines on all interactive elements |

---

## Deployment

The app can be deployed to any platform supported by `@sveltejs/adapter-auto` (Vercel, Netlify, Cloudflare Pages, etc.):

```bash
bun run build
```

The output is in `.svelte-kit/output/`. Configure your platform's adapter in `svelte.config.js` for production deployment.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit using [conventional commits](https://www.conventionalcommits.org/)
4. Push to your branch: `git push origin feat/my-feature`
5. Open a pull request

### Commit Convention

```
feat: add new category filter
fix: correct date formatting for empty end_date
refactor: extract grouping logic into service
chore(deps): update svelte to v5.56
```

---

## License

Distributed under the MIT License.
