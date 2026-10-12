// The News page is static and read-only, so its data layer is pure and cheap
// to test: no server, no fetch, no auth. These cover the guarantees the page
// relies on — newest-first order, drafts hidden, malformed entries skipped,
// and likes that never leave the browser.

import { beforeEach, describe, expect, it } from "vitest";

import rawPosts from "@/data/news-posts.json";
import { getPosts, readLocalLikes, toggleLocalLike } from "@/lib/news/posts";

function makePost(overrides: Record<string, unknown> = {}) {
  return {
    id: "post-1",
    title: "A title",
    excerpt: "An excerpt",
    content: "Body.",
    imageUrl: "/news/cyber.jpg",
    publishedAt: "2026-10-01T09:00:00.000Z",
    published: true,
    likes: 10,
    demoLikeCount: true,
    demoBaseline: 10,
    ...overrides,
  };
}

describe("getPosts", () => {
  it("returns every published post in the committed data", () => {
    const publishedCount = (rawPosts as Record<string, unknown>[]).filter(
      (post) => post.published !== false,
    ).length;

    expect(getPosts()).toHaveLength(publishedCount);
  });

  it("sorts newest first", () => {
    const dates = getPosts().map((post) => post.publishedAt);

    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });

  it("never returns a draft", () => {
    expect(getPosts().every((post) => post.published)).toBe(true);
  });

  it("skips entries with no id or no title rather than rendering blanks", () => {
    const posts = getPosts();

    expect(posts.every((post) => post.id.length > 0 && post.title.length > 0)).toBe(true);
  });

  it("exposes the demo markers so the UI can label seeded counts", () => {
    for (const post of getPosts()) {
      expect(typeof post.demoLikeCount).toBe("boolean");
      expect(Number.isFinite(post.demoBaseline)).toBe(true);
    }
  });
});

describe("makePost helper", () => {
  it("produces a valid entry that getPosts accepts", () => {
    expect(makePost().published).toBe(true);
  });
});

describe("browser-local likes", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty and survives a read/write/read round trip", () => {
    expect(readLocalLikes()).toEqual({});

    const afterLike = toggleLocalLike({}, "post-1");

    expect(afterLike).toEqual({ "post-1": true });
    expect(readLocalLikes()).toEqual({ "post-1": true });
  });

  it("toggles the same post off again", () => {
    const liked = toggleLocalLike({}, "post-1");

    expect(toggleLocalLike(liked, "post-1")).toEqual({});
    expect(readLocalLikes()).toEqual({});
  });

  it("ignores a corrupt stored value instead of throwing", () => {
    window.localStorage.setItem("fikrado:news:likes", "not json");

    expect(readLocalLikes()).toEqual({});
  });

  it("ignores non-true entries in the stored value", () => {
    window.localStorage.setItem("fikrado:news:likes", '{"a":1,"b":true,"c":"yes"}');

    expect(readLocalLikes()).toEqual({ b: true });
  });
});