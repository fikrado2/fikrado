// Static News data source.
//
// The site is published to GitHub Pages as prerendered static files, so News is
// deliberately read-only. Posts live in `src/data/news-posts.json`, which is
// committed to the repository and imported at build time — so the posts are
// baked into the prerendered HTML and the page needs no fetch, no API, no
// session, and no server-side storage.
//
// To add, edit, or remove a post: edit `src/data/news-posts.json` and push.
//
// Likes are cosmetic. They are stored in this visitor's own browser only and
// are never sent anywhere, so they must never be presented as real engagement —
// see `readLocalLikes` and the `demoBaseline` field in `types.ts`.

import rawPosts from "../../data/news-posts.json";
import type { NewsPost } from "./types";

const LIKES_KEY = "fikrado:news:likes";

/** Shape accepted from `news-posts.json`; every field is normalised below. */
type RawPost = Record<string, unknown>;

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asCount(value: unknown): number {
  return Number.isFinite(value) && Number(value) > 0 ? Math.trunc(Number(value)) : 0;
}

/**
 * Coerces one entry into a `NewsPost`, or returns null when it is unusable.
 * A malformed entry drops out instead of blanking the whole page.
 */
function normalizePost(raw: RawPost): NewsPost | null {
  const id = asString(raw.id).trim();
  const title = asString(raw.title).trim();
  if (!id || !title) return null;

  const imageUrl = asString(raw.imageUrl).trim();
  const content = asString(raw.content);

  return {
    id,
    title,
    excerpt: asString(raw.excerpt),
    content,
    imageUrl,
    publishedAt: asString(raw.publishedAt, new Date().toISOString()),
    // Only an explicit `false` is treated as a draft, so a missing flag still
    // publishes rather than silently hiding the post.
    published: raw.published !== false,
    likes: asCount(raw.likes),
    demoLikeCount: raw.demoLikeCount === true,
    demoBaseline: asCount(raw.demoBaseline),
  };
}

/**
 * Every published post, newest first.
 *
 * The data is imported at build time, so this is synchronous and cannot fail at
 * runtime. Drafts are filtered out here so unpublished posts never ship.
 */
export function getPosts(): NewsPost[] {
  return (rawPosts as RawPost[])
    .map(normalizePost)
    .filter((post): post is NewsPost => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

/**
 * Reads this browser's own like set, keyed by post id.
 *
 * Returns an empty set when storage is blocked or the stored value is corrupt.
 */
export function readLocalLikes(): Record<string, true> {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(LIKES_KEY) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const liked: Record<string, true> = {};
    for (const [id, value] of Object.entries(parsed)) {
      if (value === true) liked[id] = true;
    }
    return liked;
  } catch {
    return {};
  }
}

/** Adds or removes a post id from this browser's like set. Returns the new set. */
export function toggleLocalLike(liked: Record<string, true>, id: string): Record<string, true> {
  const next = { ...liked };
  if (next[id]) delete next[id];
  else next[id] = true;

  try {
    window.localStorage.setItem(LIKES_KEY, JSON.stringify(next));
  } catch {
    // Private browsing can refuse writes; the in-memory set still works.
  }

  return next;
}
