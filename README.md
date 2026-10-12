<div align="center">
  <img src="public/logo.jpg" alt="FIKRADO Security logo" width="150" height="150" />
  <h1>FIKRADO Security — Website</h1>
  <p><strong>Cybersecurity services and technology education for the Horn of Africa.</strong></p>
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![three.js](https://img.shields.io/badge/three.js-r186-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org)

[![Deploy to GitHub Pages](https://github.com/fikrado2/fikrado2.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/fikrado2/fikrado2.github.io/actions/workflows/deploy.yml)
[![Deploy to Netlify](https://github.com/fikrado2/fikrado2.github.io/actions/workflows/netlify-deploy.yml/badge.svg)](https://github.com/fikrado2/fikrado2.github.io/actions/workflows/netlify-deploy.yml)
[![Live site](https://img.shields.io/badge/Live-fikrado2.github.io-2EA44F?style=flat-square)](https://fikrado2.github.io)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/fikrado2/fikrado2.github.io)
[![Last commit](https://img.shields.io/github/last-commit/fikrado2/fikrado2.github.io?style=flat-square)](https://github.com/fikrado2/fikrado2.github.io/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/fikrado2/fikrado2.github.io?style=flat-square)](https://github.com/fikrado2/fikrado2.github.io)

</div>

---

## About

Website for **FIKRADO Security**, a 50% non-profit company specializing in
cybersecurity services and affordable technology courses, with offices in
Hargeisa (Somaliland) and Jijiga (Ethiopia).

- **Live site (GitHub Pages):** <https://fikrado2.github.io>
- **Live site (Netlify):** <https://fikrado1.netlify.app> (configured, currently password-protected)
- **Repository:** <https://github.com/fikrado2/fikrado2.github.io>
- **Contact:** fikrado1@gmail.com · +252 63 4048063 · +251 98 4858498

### Social

| Platform | Link |
| --- | --- |
| GitHub | <https://github.com/fikrado-orgnasation/> |
| LinkedIn | <https://www.linkedin.com/company/fikrado> |
| YouTube | <https://www.youtube.com/@fikrad0> |

## Owner

**Yahye Abdirahman** — [@fikrado2](https://github.com/fikrado2) · [fikrado1@gmail.com](mailto:fikrado1@gmail.com)

All code in this repository is written and maintained by Yahye Abdirahman.

## Contributors

| Contributor | Role |
| --- | --- |
| [@fikrado2](https://github.com/fikrado2) — Yahye Abdirahman | Project owner and developer |
| [OpenCode](https://opencode.ai) | AI coding assistant used for the News page, the Contact crash fix, and this documentation |
| [Claude Code](https://claude.com/claude-code) | AI coding assistant |

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start 1.168 (SSR + file-based routing) |
| UI | React 19 |
| Language | TypeScript 5.8 (`.tsx` routes and libs) with JSX page components |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 + a hand-written `src/styles.css` design system |
| Animation | Framer Motion 14 |
| 3D background | three.js + `@react-three/fiber` + `@react-three/drei` |
| Icons | lucide-react |
| i18n | Custom `LanguageContext` (English, Somali, Amharic) |
| Linting | ESLint 9 + Prettier |
| Tests | Vitest 4 |
| Hosting | GitHub Pages + Netlify (dual, pre-rendered static site) |

The site is fully static: it has no API routes and no server-side storage.

## Features

- **Home** — service overview, trust badges, statistics, featured content.
- **Services** — penetration testing, network defense, incident response, and more.
- **Courses** — cybersecurity, Linux, networking, ethical hacking, and AI courses.
- **Books** — downloadable technology books.
- **Videos** — embedded YouTube tutorial library.
- **About** — mission, values, team, and offices.
- **Contact** — contact details plus an **EngageBay CRM** web form (see below).
- **News** — read-only announcements rendered from `src/data/news-posts.json`.
- **Multilingual** — English, Somali, and Amharic with automatic detection.
- **Accessibility & SEO** — semantic markup, meta/JSON-LD tags, sitemap, and reduced-motion support.

## News page

`/news` is a normal read-only page. Posts live in `src/data/news-posts.json`,
which is imported at build time, so the cards are baked into the prerendered
HTML — no fetch, no API, no server, and no sign-in. There is no admin UI.

### Adding, editing, or removing a post

Edit `src/data/news-posts.json` and push. The next deploy renders the change.

```json
{
  "id": "unique-slug",
  "title": "Post title",
  "excerpt": "One-line summary shown on the card.",
  "content": "First paragraph.\n\nSecond paragraph — separate paragraphs with a blank line.",
  "imageUrl": "/news/cyber.jpg",
  "publishedAt": "2026-10-12T09:00:00.000Z",
  "published": true,
  "likes": 1487,
  "demoLikeCount": true,
  "demoBaseline": 1487
}
```

| Field | Purpose |
| --- | --- |
| `id` | Unique, stable slug. Used as the React key. |
| `publishedAt` | ISO date used for sorting (newest first) and display. |
| `published` | Set `false` to hide a draft. Anything else publishes. |
| `imageUrl` | Site-relative path (`/news/…`) or absolute URL. Images live in `public/news/`. |
| `content` | Plain text. Blank lines separate paragraphs. |

Malformed entries are skipped rather than breaking the page.

### Likes

Likes are **cosmetic and browser-local**. Clicking the heart stores that post id
in this visitor's own `localStorage` and nothing is sent anywhere, so a like from
one visitor is never counted for anyone else and no server sees it.

The seeded posts carry **demo** like counts. Those are flagged with
`demoLikeCount`/`demoBaseline` and the UI shows a **"Demo like counts"** badge,
so generated numbers are never presented as genuine engagement.

## Contact / CRM integration

The Contact page embeds the existing **EngageBay CRM** form (form id
`6207068009398272`) via their `ehform.js` script into the
`#eh_form_6207068009398272` container. Submissions are handled entirely by
EngageBay — the fields, submission method, and data format are unchanged and
are not proxied through this site.

The page also themes the CRM iframe to match the site and removes duplicate
iframes, but it does not alter the form itself.

## Development

Requires **Node.js 22+** or **Bun**.

```sh
git clone https://github.com/fikrado2/fikrado2.github.io.git
cd fikrado2.github.io

# With Bun (bun.lock is the maintained lockfile)
bun install
bun run dev

# Or with npm
npm install
npm run dev
```

The dev server runs on <http://localhost:8080>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (SSR bundle + static assets) |
| `npm run preview` | Preview the production build |
| `npm run deploy` | Trigger the GitHub Pages workflow on `main` (requires authenticated GitHub CLI) |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Format the repository with Prettier |
| `npm test` | Run the Vitest suite |

### Project layout

| Path | Purpose |
| --- | --- |
| `src/routes/` | File-based routes (`__root.tsx` is the app shell) |
| `src/pages/` | Page components rendered by the routes |
| `src/components/` | Shared UI, including the `ui/` primitives |
| `src/i18n/` | Language context and translations |
| `src/lib/news/` | News post loading and browser-local likes |
| `src/data/` | News post data (`news-posts.json`) |
| `src/styles.css` | Global design system |
| `public/` | Static assets, including `public/news/` images |

`src/routeTree.gen.ts` is generated by TanStack Router — do not edit it by hand.

## Deployment

The site is prerendered to static HTML and deploys to **both GitHub Pages and Netlify** in parallel.

### GitHub Pages

Every push to `main` builds the pages and deploys `.output/public` to
<https://fikrado2.github.io>. The workflow is defined in
`.github/workflows/deploy.yml`. No secrets or third-party credentials are
required — the only credential is the repository's own Actions token.

To trigger a deployment manually after the changes are committed and pushed:

```sh
npm run deploy
```

This requires the GitHub CLI to be authenticated with permission to dispatch
repository workflows. Alternatively, use **Actions → Deploy to GitHub Pages →
Run workflow** on GitHub.

### Netlify

A second workflow (`.github/workflows/netlify-deploy.yml`) runs on every push
to `main` and deploys the same `.output/public` directory to Netlify.

**One-time Netlify setup:**
1. Go to <https://app.netlify.com/start/deploy?repository=https://github.com/fikrado2/fikrado2.github.io>
2. Authorize Netlify to access the `fikrado2` GitHub org/repo
3. Netlify will auto-detect the `netlify.toml` config:
   - Build command: `npm run build`
   - Publish directory: `.output/public`
   - Node version: 22
   - `VITE_STATIC_PAGES=true` environment variable
4. Click **Deploy site**
5. Optionally rename the site (e.g., `fikrado` → `https://fikrado.netlify.app`)
6. In Netlify site settings, add two **Build environment variables** if not auto-picked:
   - `NETLIFY_AUTH_TOKEN` (from User Settings → Applications → Personal access tokens)
   - `NETLIFY_SITE_ID` (from Site settings → General → Site details)

After setup, every push to `main` deploys to both platforms automatically.

Both deployments are static only. TanStack Start's server entry is built but
never runs, and the app deliberately has no API routes — everything visitors
see is prerendered HTML plus a small client bundle.

---

<div align="center">
  <sub>© FIKRADO Security — Hargeisa, Somaliland &amp; Jijiga, Ethiopia</sub>
</div>
