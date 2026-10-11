/**
 * Saves News posts to the site's GitHub repository as a JSON file, so admin
 * edits are versioned in the repo. Server-only.
 */
import { readServerEnv } from "./news-env";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";
const REPO = "fikrado2/fikrado2.github.io";
const FILE_PATH = "public/news-posts.json";
const BRANCH = "main";

function headers(): Record<string, string> | null {
  const lovableKey = readServerEnv("LOVABLE_API_KEY");
  const githubKey = readServerEnv("GITHUB_API_KEY");
  if (!lovableKey || !githubKey) return null;
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": githubKey,
    "Content-Type": "application/json",
  };
}

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromBase64(b64: string): string {
  const bin = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function getFile(h: Record<string, string>): Promise<{ sha: string; text: string } | null> {
  const res = await fetch(
    `${GATEWAY_URL}/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: h },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub read failed [${res.status}]: ${await res.text()}`);
  }
  const json = (await res.json()) as { sha: string; content: string };
  return { sha: json.sha, text: fromBase64(json.content) };
}

/** Load posts saved in the repo, or null when unavailable. */
export async function loadPostsFromGitHub(): Promise<unknown[] | null> {
  const h = headers();
  if (!h) return null;
  try {
    const file = await getFile(h);
    if (!file) return null;
    const parsed = JSON.parse(file.text);
    return Array.isArray(parsed) ? parsed : null;
  } catch (err) {
    console.error("[news-github] load failed", err);
    return null;
  }
}

/** Commit the full posts list to the repo. */
export async function savePostsToGitHub(posts: unknown[], message: string): Promise<void> {
  const h = headers();
  if (!h) throw new Error("GitHub is not connected");
  const existing = await getFile(h);
  const res = await fetch(`${GATEWAY_URL}/repos/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: h,
    body: JSON.stringify({
      message,
      content: toBase64(JSON.stringify(posts, null, 2) + "\n"),
      branch: BRANCH,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub save failed [${res.status}]: ${await res.text()}`);
  }
}
