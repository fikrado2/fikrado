<p align="center">
  <img src="https://avatars.githubusercontent.com/u/72925343?s=200&v=4" width="120" height="120" alt="FIKRADO Logo" style="border-radius: 50%;" />
</p>

<h1 align="center">🛡️ FIKRADO</h1>
<p align="center"><strong>Cybersecurity & Technology Education Platform</strong></p>

<p align="center">
  <a href="https://fikrado2.github.io/fikrado/"><strong>Explore Live Demo »</strong></a>
</p>


---

## 📝 Description / Faahfaahin

**FIKRADO** is a modern, full-stack platform specializing in cybersecurity solutions and advanced technology training. The application delivers premium enterprise-grade security tools alongside an integrated, intuitive learning management ecosystem.

> 🇸🇴 **FIKRADO** waa shirkad ku takhasustay amniga cyber-ka (Cybersecurity) iyo bixinta koorsooyin teknoloji ah oo tignoolajiyada casriga ah ku saabsan. Madashani waxay bixisaa xalal amni oo heer sare ah iyo nidaam waxbarasho oo isku xidhan.

---

## 🚀 Key Features / Astaamaha Guud

* 🔒 **Secure Authentication:** Robust user authentication and session handling powered by `Passport.js`.
* 🎨 **Interactive UI/UX:** A beautiful, responsive interface engineered with `Tailwind CSS`, `Radix UI` primitives, and fluid animations via `Framer Motion`.
* 📚 **Course Management System:** An intuitive dashboard tracking modern tech and security training tracks.
* 🗄️ **Robust Database Layer:** High-performance data persistence utilizing `Neon PostgreSQL` paired with type-safe `Drizzle ORM`.
* ⚡ **Real-time Capabilities:** Embedded WebSocket (`ws`) support for instantaneous data updates and live communication.

---

## 💻 Tech Stack / Tignoolajiyada La Isticmaalay

| Frontend (Client) | Backend (Server) | Database & Tools |
| :--- | :--- | :--- |
| **React 19** & **TypeScript** | **TanStack Start** (Full-stack React) | **Static Export** (GitHub Pages) |
| **Vite 6** (Build Tool) | **TanStack Router** (File-based routing) | **TanStack Query** (Data Fetching) |
| **Tailwind CSS v4** (Styling) | **Nitro** (Server engine) | **Zod** (Schema Validation) |
| **Radix UI** (Primitives) | **Prerendering** (Static generation) | **Framer Motion** (Animations) |

---

## 📂 Project Structure / Qaab-dhismeedka Galka

The project is structured as a modern, type-safe full-stack React application:

```text
├── public/             # Global static assets
├── src/                # App components, routes, and state logic
│   ├── routes/         # File-based routing (TanStack Router)
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utilities and helpers
│   └── styles/         # Global styles
├── .output/            # Optimized production build output
│   └── public/         # Static site for GitHub Pages
├── .github/workflows/  # CI/CD pipelines
├── package.json        # Project dependencies and scripts
├── vite.config.ts      # Vite bundler configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🚀 Deployment

This site is automatically deployed to **GitHub Pages** via GitHub Actions on every push to `main`:

- **Live URL:** https://fikrado2.github.io/fikrado/
- **Workflow:** `.github/workflows/deploy.yml`

---

## 📄 License

This project is licensed under the MIT License.
