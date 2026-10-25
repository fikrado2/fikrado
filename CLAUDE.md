# CLAUDE.md — Personal OpenCode Guidelines for fikrado2.github.io

> **Personal configuration for OpenCode in this repository**  
> Cloned from `fikrado2/fikrado2.github.io` — FIKRADO Security website (React 19, TanStack Start, TypeScript, Tailwind CSS)

---

## Behavioral Guidelines (Core)

*These guidelines reduce common LLM coding mistakes. They bias toward caution over speed. For trivial tasks, use judgment.*

### 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

**Before implementing:**
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

**Ask yourself:** "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

**When editing existing code:**
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

**When your changes create orphans:**
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

Define success criteria. Loop until verified.

**Transform tasks into verifiable goals:**
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

**For multi-step tasks, state a brief plan:**
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Project Context: fikrado2.github.io

| Property | Value |
|----------|-------|
| **Stack** | React 19, TanStack Start, TypeScript, Tailwind CSS |
| **Purpose** | FIKRADO Security — cybersecurity services & technology courses for Horn of Africa |
| **Owner** | Yahye Abdirahman (`fikrado2`) |
| **Repo** | `github.com/fikrado2/fikrado2.github.io` |
| **Deployment** | GitHub Pages (likely) |

### Stack-Specific Conventions

**TypeScript/React:**
- Strict mode enabled. No `any` unless justified.
- Prefer function components + hooks. No class components.
- Component files: `PascalCase.tsx`, colocated tests: `*.test.tsx`
- State: React context for global, `useState`/`useReducer` for local

**TanStack Start (File-based routing):**
- Routes in `src/routes/` — follow TanStack conventions
- Server functions for data mutations, loaders for data fetching
- Use `@tanstack/react-query` patterns for caching

**Tailwind CSS:**
- Utility-first. No custom CSS unless design system requires it.
- Use `clsx` or `tailwind-merge` for conditional classes
- Respect the existing color palette / design tokens

**Git/GitHub:**
- Conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- PRs target `main`. No direct pushes to `main`.
- CI must pass before merge (typecheck, lint, tests, build)

---

## OpenCode-Specific Configuration

### Model & Failover
- **Default:** `opencode/nemotron-3-ultra-free` (free tier)
- **Failover chain:** 23 free models configured in `~/.config/opencode/model-fallback.json`
- **Behavior:** Auto-failover after 2 failed attempts, 250ms delay, stops when exhausted

### Memory (Persistent)
- **Plugin:** `@bandonker/opencode-memory@1.2.1` (SQLite + BM25, local-only)
- **Scope:** `global`, `topK: 25`, `budgetChars: 8000`, `autoRecall: true`
- **Rule:** Store durable facts proactively via `memory_remember` (importance 5–8). Don't store transient chatter.

### Available Skills (ECC)
- `frontend-design` — for UI/component work (delegate to `ui-planner`)
- `code-explorer` — for understanding existing features
- `code-architect` — for architecture/implementation plans
- `feature-dev` — 7-phase structured feature workflow
- `security-review` — for auth/input/secrets/API endpoints
- `code-review` / `code-reviewer` — for PR/diff review
- `e2e-testing` — Playwright patterns
- `tdd-workflow` — test-driven development enforcement
- `github-ops` — issue/PR/CI/release management

### Agents to Delegate To
| Agent | When |
|-------|------|
| `explorer` | "Where is X?", "Find Y" — fast codebase grep |
| `librarian` | External docs, GitHub examples, library internals |
| `oracle` | Architecture decisions, debugging, code review |
| `ui-planner` | **All visual/styling work** — never edit CSS/UI directly |
| `inspector` | Verify implementation — runs tests/build/lint, reports PASS/FAIL |

### Verification Protocol
After non-trivial implementation (3+ files, security code, architecture changes):
1. Run `git diff` and capture actual diff
2. Delegate to `oracle` for self-review with the diff
3. Address Critical/High findings before delivering
4. Delegate to `inspector` with explicit "Done when:" checks

---

## Quick Reference: Common Commands

```bash
# Project setup (run once)
cd /home/yahye/github/fikrado2.github.io
# Install deps (if package.json exists)
# pnpm install  # or npm/yarn

# Development
# pnpm dev      # or npm run dev

# Quality checks (run before committing)
# pnpm typecheck   # tsc --noEmit
# pnpm lint        # eslint
# pnpm test        # vitest/jest
# pnpm build       # production build
```

---

## Notes for Future Sessions

- This repo was cloned fresh — no `node_modules`, no build artifacts yet
- First task will likely be: install dependencies, verify dev server runs
- The global AGENTS.md at `/home/yahye/AGENTS.md` contains machine-level config (KWin, Flameshot, opencode plugins, memory, model failover) — reference it for environment issues
- This CLAUDE.md is **repo-specific**. Keep it focused on this project's conventions.

---

*Generated: 2026-10-25 — personalized for OpenCode in fikrado2.github.io*