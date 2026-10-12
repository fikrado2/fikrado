import communityPosts from "../../data/community-posts.json";

const STORAGE_KEY = "fikrado-community-likes";

export function getCommunityPosts() {
  return communityPosts
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function readLocalLikes() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function writeLocalLikes(likes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  } catch {
    // Storage unavailable
  }
}

export function toggleLocalLike(currentLikes, postId) {
  const next = { ...currentLikes };
  if (next[postId]) {
    delete next[postId];
  } else {
    next[postId] = true;
  }
  writeLocalLikes(next);
  return next;
}